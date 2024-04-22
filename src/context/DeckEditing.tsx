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
  updateDeck: Dispatch<SetStateAction<Deck>>;
  deck: Deck;
};

const DeckEditingContext = createContext<Context>({
  updateDeck: () => {},
  deck: {},
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
