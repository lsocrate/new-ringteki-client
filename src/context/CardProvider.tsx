"use client";

import type { CardListEntry, CardListItem } from "@/data/fetchDecks";
import { createContext, useContext, useEffect, useState } from "react";

type Cards = Map<string, CardListItem>;

export const CardContext = createContext<Cards>(new Map());

export function useCards() {
  return useContext(CardContext);
}

export function CardProvider(p: { children: React.ReactNode }) {
  const [cards, setCards] = useState<Cards>(new Map());
  useEffect(() => {
    fetch("/api/cards")
      .then((res) => res.json())
      .then((data: Array<CardListEntry>) => setCards(new Map(data)));
  }, []);

  return (
    <CardContext.Provider value={cards}>{p.children}</CardContext.Provider>
  );
}
