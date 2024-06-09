import { ObjectId, db } from "./db";

let cardsCache: Map<string, Card> | null = null;
type Card = { name: string; side: string; type: string; pack: string };
async function fetchCards(): Promise<Map<string, Card>> {
  if (cardsCache) {
    return cardsCache;
  }

  const cardsCursor = db
    .collection("cards")
    .aggregate<{ id: string; card: Card }>([
      {
        $project: {
          _id: 0,
          id: 1,
          card: {
            name: "$name",
            side: "$side",
            type: "$type",
            pack: {
              $getField: {
                field: "pack_id",
                input: {
                  $last: "$versions",
                },
              },
            },
          },
        },
      },
    ]);
  const cards = new Map<string, Card>();
  for await (const card of cardsCursor) {
    cards.set(card.id, card.card);
  }

  cardsCache = cards;
  return cards;
}

let packsCache: null | {
  byName: Map<string, string>;
  byId: Map<string, string>;
} = null;
type Pack = { id: string; name: string };
async function fetchPacks() {
  if (packsCache) {
    return packsCache;
  }

  const packs = {
    byName: new Map<string, string>(),
    byId: new Map<string, string>(),
  };
  const packsCursor = db
    .collection<Pack>("packs")
    .find({}, { projection: { _id: 0, id: 1, name: 1 } });
  for await (const pack of packsCursor) {
    packs.byId.set(pack.id, pack.name);
    packs.byName.set(pack.name, pack.id);
  }

  packsCache = packs;
  return packs;
}

export type CardListItem = {
  name: string;
  image: string;
  pack: string;
  typeInDeck:
    | "role"
    | "stronghold"
    | "provinces"
    | "dynastyHoldings"
    | "conflictAttachments"
    | "dynastyEvents"
    | "conflictEvents"
    | "dynastyCharacters"
    | "conflictCharacters";
};
export type CardListEntry = [string, CardListItem];
export async function fetchCardList() {
  const cardList = new Map<string, CardListItem>();
  const [cards, packs] = await Promise.all([fetchCards(), fetchPacks()]);
  for (const [id, card] of cards) {
    const packName = packs.byId.get(card.pack)!;
    cardList.set(id, {
      name: card.name,
      image: `https://jigoku.online/img/cards/${id}.jpg`,
      pack: packName,
      typeInDeck: typeInDeck(card)!,
    });
  }
  return Array.from(cardList);
}

type NameValue = { name: string; value: string };

type CardCount = {
  card: { id: string };
  count: number;
};

export type Deck = {
  username: string;
  name: string;
  lastUpdated: string;
  alliance: NameValue;
  format: NameValue;
  faction: NameValue;
  provinceCards: Array<CardCount>;
  stronghold: Array<CardCount>;
  role: Array<CardCount>;
  conflictCards: Array<CardCount>;
  dynastyCards: Array<CardCount>;
};

export type DeckWithId = Deck & { id: string };

export type DeckForDecklist = {
  id: string;
  faction: NameValue;
  alliance: NameValue;
  name: string;
  lastUpdated: string;
};

export async function fetchDecks() {
  const deckCursor = db
    .collection<DeckWithId>("decks")
    .find({ username: "siri" }, { sort: { lastUpdated: -1 } });
  const decks: Array<DeckWithId> = [];
  for await (const deck of deckCursor) {
    deck.id = deck._id.toString();
    decks.push(deck);
  }
  return decks;
}

export async function fetchDeckLists(username: string) {
  const deckCursor = db.collection<DeckForDecklist>("decks").find(
    { username },
    {
      projection: {
        _id: 1,
        faction: 1,
        alliance: 1,
        name: 1,
        lastUpdated: 1,
      },
      sort: { lastUpdated: -1 },
    },
  );
  const decks: Array<DeckForDecklist> = [];
  for await (const deck of deckCursor) {
    const { _id, ...rest } = deck;
    rest.id = _id.toString();
    decks.push(rest);
  }
  return decks;
}

export type DetailedDecklist = {
  deckId: string;
  name: string;
  alliance: string;
  format: string;
  faction: string;
  stronghold: Array<{ id: string; count: number }>;
  role: Array<{ id: string; count: number }>;
  provinces: Array<{ id: string; count: number }>;
  dynastyEvents: Array<{ id: string; count: number }>;
  dynastyCharacters: Array<{ id: string; count: number }>;
  dynastyHoldings: Array<{ id: string; count: number }>;
  conflictEvents: Array<{ id: string; count: number }>;
  conflictCharacters: Array<{ id: string; count: number }>;
  conflictAttachments: Array<{ id: string; count: number }>;
};

function typeInDeck(card: Card) {
  switch (card.type) {
    case "stronghold":
      return "stronghold" as const;
    case "role":
      return "role" as const;
    case "province":
      return "provinces" as const;
    case "holding":
      return "dynastyHoldings" as const;
    case "attachment":
      return "conflictAttachments" as const;
    case "event":
      if (card.side === "dynasty") {
        return "dynastyEvents" as const;
      } else {
        return "conflictEvents" as const;
      }
    case "character":
      if (card.side === "dynasty") {
        return "dynastyCharacters" as const;
      } else {
        return "conflictCharacters" as const;
      }
  }
}

export async function fetchDetailedDecklist(deckId: string) {
  const deck = await db
    .collection<Deck>("decks")
    .findOne({ _id: new ObjectId(deckId) });

  if (!deck) {
    return;
  }

  const res: DetailedDecklist = {
    deckId,
    name: deck.name,
    alliance: deck.alliance.value,
    format: deck.format.value,
    faction: deck.faction.value,
    stronghold: [],
    role: [],
    provinces: [],
    dynastyEvents: [],
    dynastyCharacters: [],
    dynastyHoldings: [],
    conflictEvents: [],
    conflictCharacters: [],
    conflictAttachments: [],
  };
  const cards = await fetchCards();
  for (const cardList of [
    deck.provinceCards,
    deck.stronghold,
    deck.role,
    deck.conflictCards,
    deck.dynastyCards,
  ]) {
    for (const {
      count,
      card: { id },
    } of cardList) {
      const card = cards.get(id);
      const slotInDeck = card && typeInDeck(card);
      if (slotInDeck) {
        res[slotInDeck].push({ count, id });
      }
    }
  }

  return res;
}
