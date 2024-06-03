"use client";

import { fetchDecklistFromEmeraldDB } from "@/data/emeraldDB";
import { Button } from "@/ui/elements/Button/Button";
import { useCallback, useRef } from "react";

export function DeckImportPrompt(props: { open: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const promptImportDeck = useCallback(
    () => dialogRef.current?.showModal(),
    [],
  );

  return (
    <dialog ref={dialogRef} open={props.open}>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();

          const url = new FormData(ev.currentTarget).get("url") as string;
          if (!url) {
            return;
          }

          fetchDecklistFromEmeraldDB(url).then((a) => console.log(a));
        }}
      >
        <input
          type="url"
          name="url"
          placeholder="https://www.emeralddb.org/decks/1234"
        />
        <Button
          type="submit"
          onClick={() => {
            console.log(1);
          }}
        >
          Import
        </Button>
      </form>
    </dialog>
  );
}
