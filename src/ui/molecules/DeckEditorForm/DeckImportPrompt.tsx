"use client";

import { Decklist, fetchDecklistFromEmeraldDB } from "@/data/emeraldDB";
import { Button } from "@/ui/elements/Button/Button";
import { FC, useState } from "react";

function safeParseUrl(url: string) {
  try {
    return new URL(url);
  } catch (e) {
    return;
  }
}

export const DeckImportPrompt: FC<{
  onDeckFetched: (decklist: Decklist) => void;
}> = (props) => {
  const [importingDeck, setImportingDeck] = useState(false);

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();
        setImportingDeck(true);

        const url = new FormData(ev.currentTarget).get("url");
        if (typeof url !== "string") {
          return;
        }

        const inputUrl = safeParseUrl(url);
        if (!inputUrl) {
          ev.currentTarget.reset();
          setImportingDeck(false);
          return;
        }

        inputUrl.pathname = inputUrl.pathname.replace(
          "/decks/",
          "/api/decklists/",
        );
        const fetchDeckUrl = inputUrl.toString();
        await fetchDecklistFromEmeraldDB(fetchDeckUrl).then(
          props.onDeckFetched,
        );

        ev.currentTarget.reset();
        setImportingDeck(false);
      }}
    >
      <input
        type="url"
        name="url"
        placeholder="https://www.emeralddb.org/decks/1234"
      />
      <Button type="submit" disabled={importingDeck}>
        Import
      </Button>
    </form>
  );
};
