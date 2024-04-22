import type { DetailedDecklist } from "@/data/fetchDecks";
import { ClanMon } from "@/ui/elements/ClanMon/ClanMon";
import styles from "./styles.module.css";
import { ContentBox } from "../ContentBox/ContentBox";
import { CardName } from "@/ui/atoms/CardName/CardName";
import { capitalize } from "@/lib/text/capitalize";

function addCount(acc: number, card: { count: number }) {
  return acc + card.count;
}

function CardBlock(p: {
  title: string;
  cards: Array<{ count: number; id: string }>;
}) {
  if (p.cards.length === 0) {
    return null;
  }

  return (
    <ContentBox internal title={`${p.title} (${p.cards.length})`}>
      {p.cards.map((card) => (
        <div key={card.id}>
          <span>{card.count}x </span>
          <CardName cardId={card.id} />
        </div>
      ))}
    </ContentBox>
  );
}

export function DeckView(p: { deck: DetailedDecklist }) {
  const provinceCount = p.deck.provinces.reduce(addCount, 0);
  const dynastyCharactersCount = p.deck.dynastyCharacters.reduce(addCount, 0);
  const dynastyEventsCount = p.deck.dynastyEvents.reduce(addCount, 0);
  const dynastyHoldingCount = p.deck.dynastyHoldings.reduce(addCount, 0);
  const dynastyCardsCount =
    dynastyCharactersCount + dynastyEventsCount + dynastyHoldingCount;
  const conflictCharactersCount = p.deck.conflictCharacters.reduce(addCount, 0);
  const conflictEventsCount = p.deck.conflictEvents.reduce(addCount, 0);
  const conflictAttachmentCount = p.deck.conflictAttachments.reduce(
    addCount,
    0,
  );
  const conflictCardsCount =
    conflictCharactersCount + conflictEventsCount + conflictAttachmentCount;

  return (
    <div>
      <div className={styles.buttons}>
        <button>Edit</button>
        <button>Delete</button>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaLeft}>
          <ClanMon clan={p.deck.faction} color="colored" size={130} />
        </div>

        <div className={styles.metaCenter}>
          <div>
            <span>Clan:</span>
            <span>{capitalize(p.deck.faction)}</span>
          </div>
          <div>
            <span>Alliance:</span>
            <span>{capitalize(p.deck.alliance)}</span>
          </div>
          <div>
            <span>Format:</span>
            <span>{capitalize(p.deck.format)}</span>
          </div>
          <div>
            <span>Province deck:</span>
            <span>{provinceCount} cards</span>
          </div>
          <div>
            <span>Dynasty Deck:</span>
            <span>{dynastyCardsCount} cards</span>
          </div>
          <div>
            <span>Conflict Deck:</span>
            <span>{conflictCardsCount} cards</span>
          </div>
          <div>
            <span>Validity:</span>
            <span>Valid</span>
          </div>
        </div>

        <div className={styles.metaRight}>
          <ClanMon clan={p.deck.alliance} color="colored" size={90} />
        </div>
      </div>

      <div className={styles.deck}>
        <div>
          <CardBlock title="stronghold" cards={p.deck.stronghold} />
          <CardBlock title="role" cards={p.deck.role} />
          <CardBlock title="province" cards={p.deck.provinces} />
        </div>
        <div>
          <CardBlock
            title="dynasty character"
            cards={p.deck.dynastyCharacters}
          />
          <CardBlock title="dynasty event" cards={p.deck.dynastyEvents} />
          <CardBlock title="holding" cards={p.deck.dynastyHoldings} />
        </div>
        <div>
          <CardBlock title="conflict event" cards={p.deck.conflictEvents} />
          <CardBlock
            title="conflict character"
            cards={p.deck.conflictCharacters}
          />
          <CardBlock title="attachment" cards={p.deck.conflictAttachments} />
        </div>
      </div>
    </div>
  );
}
