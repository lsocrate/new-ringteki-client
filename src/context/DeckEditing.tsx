"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Deck = Partial<{
  name: string;
  format: string;
  faction: string;
  alliance: string;
  decklist: string;
}>;

type Context = {
  deck: Deck;
  updateDeck: Dispatch<SetStateAction<Deck>>;
};

const DeckEditingContext = createContext<Context>({
  deck: {},
  updateDeck: () => {},
});

export function useDeckEditing() {
  return useContext(DeckEditingContext);
}

export function DeckEditing(p: { children: React.ReactNode }) {
  const [deck, updateDeck] = useState<Deck>({});

  return (
    <DeckEditingContext.Provider value={{ updateDeck, deck }}>
      {p.children}
    </DeckEditingContext.Provider>
  );
}
