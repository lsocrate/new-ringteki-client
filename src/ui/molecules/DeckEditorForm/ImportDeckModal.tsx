"use client";

import { Decklist, fetchDecklistFromEmeraldDB } from "@/data/emeraldDB";
import { Button } from "@/ui/elements/Button/Button";

export function ImportDeckModal(p: { onDone: (decklist: Decklist) => void }) {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();

        const url = new FormData(ev.currentTarget).get("url") as string;
        if (!url) {
          return;
        }

        fetchDecklistFromEmeraldDB(url).then(p.onDone);
      }}
    >
      <input
        type="url"
        name="url"
        placeholder="https://www.emeralddb.org/decks/1234"
      />
      <Button type="submit">Import</Button>
    </form>
  );
}
