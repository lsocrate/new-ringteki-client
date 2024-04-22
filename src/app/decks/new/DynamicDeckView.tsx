"use client";

import { useCards } from "@/context/CardProvider";
import { useDeckEditing } from "@/context/DeckEditing";
import type { DetailedDecklist } from "@/data/fetchDecks";
import { cardHumanName } from "@/lib/text/cardHumanName";
import { ContentBox } from "@/ui/molecules/ContentBox/ContentBox";
import { DeckView } from "@/ui/molecules/DeckView/DeckView";
import { useMemo } from "react";

export function DynamicDeckView() {
  const cards = useCards();
  const cardByName = useMemo(
    () =>
      new Map(
        Array.from(cards.entries()).map(([id, card]) => [
          cardHumanName(card),
          id,
        ]),
      ),
    [cards],
  );

  const { deck } = useDeckEditing();
  const detailed: DetailedDecklist = {
    deckId: "",
    name: deck.name || "New deck",
    format: deck.format ?? "emerald",
    faction: deck.faction ?? "crab",
    alliance: deck.alliance ?? "",
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

  if (deck.decklist) {
    for (const line of deck.decklist.split("\n")) {
      const trimmed = line.trim();
      const divider = trimmed.indexOf(" ");
      const count = parseInt(trimmed.slice(0, divider), 10);
      if (isNaN(count)) {
        continue;
      }
      const cardName = trimmed.slice(divider + 1);
      const id = cardByName.get(cardName);
      if (!id) {
        continue;
      }
      const card = cards.get(id);
      if (!card) {
        continue;
      }
      detailed[card.typeInDeck].push({ id, count });
    }
  }

  return (
    <ContentBox title={detailed.name}>
      <DeckView deck={detailed} />
    </ContentBox>
  );
}
