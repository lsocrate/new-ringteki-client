"use client";

import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";

import { useCards } from "@/context/CardProvider";
import { clans } from "@/data/clans";
import { formats } from "@/data/formats";
import { useDeckEditing } from "@/context/DeckEditing";
import { cardHumanName } from "@/lib/text/cardHumanName";
import { Button } from "@/ui/elements/Button/Button";
import { usePrompt } from "@/context/PromptOverlayProvider";
import { CardListItem } from "@/data/fetchDecks";
import { fetchDecklistFromEmeraldDB, type Decklist } from "@/data/emeraldDB";

import styles from "./styles.module.css";

function useCardList() {
  const cardRegistry = useCards();
  return useMemo(() => {
    const cardList: Array<CardListItem> = [];
    for (const card of cardRegistry.values()) {
      cardList.push(card);
    }
    return cardList;
  }, [cardRegistry]);
}

function useSynchronizeDeckWithDisplay(formRef: RefObject<HTMLFormElement>) {
  const { updateDeck } = useDeckEditing();
  const synchronize = useCallback(() => {
    const data = new FormData(formRef.current!);
    updateDeck({
      name: data.get("name") as string,
      format: data.get("format") as string,
      faction: data.get("faction") as string,
      alliance: data.get("alliance") as string,
      decklist: data.get("decklist") as string,
    });
  }, []);
  useEffect(synchronize, []);

  return synchronize;
}

function useInsertCard(opts: {
  cardRef: RefObject<HTMLInputElement>;
  countRef: RefObject<HTMLInputElement>;
  deckRef: RefObject<HTMLTextAreaElement>;
  onInsert: () => void;
}) {
  return useCallback(() => {
    const card = opts.cardRef.current?.value;
    if (!card) {
      return;
    }
    const count = opts.countRef.current?.value;
    if (!count) {
      return;
    }

    const line = `${count} ${card}`;
    opts.cardRef.current!.value = "";
    opts.deckRef.current!.value =
      opts.deckRef.current!.value === ""
        ? line
        : `${opts.deckRef.current!.value}\n${line}`;

    opts.onInsert();
  }, []);
}

export function DeckEditorForm() {
  const cardList = useCardList();

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const formatRef = useRef<HTMLSelectElement>(null);
  const factionRef = useRef<HTMLSelectElement>(null);
  const allianceRef = useRef<HTMLSelectElement>(null);
  const deckRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLInputElement>(null);

  const synchronizeDeckWithDisplay = useSynchronizeDeckWithDisplay(formRef);
  const insertCard = useInsertCard({
    onInsert: synchronizeDeckWithDisplay,
    cardRef,
    countRef,
    deckRef,
  });

  const prompt = usePrompt();
  const handleImportedData = useCallback((imported: Decklist) => {
    nameRef.current!.value = imported.name;
    formatRef.current!.value = imported.format;
    factionRef.current!.value = imported.primary_clan;
    allianceRef.current!.value = imported.secondary_clan;
    deckRef.current!.value = "oj oj oj";

    synchronizeDeckWithDisplay();
    prompt.close();
  }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const promptImportDeck = useCallback(
    () => dialogRef.current?.showModal(),
    [],
  );

  return (
    <>
      <dialog ref={dialogRef} className={styles.deckImport}>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();

            const url = new FormData(ev.currentTarget).get("url") as string;
            if (!url) {
              return;
            }

            fetchDecklistFromEmeraldDB(url).then(handleImportedData);
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
      <div className={styles.top}>
        <Button onClick={promptImportDeck}>Import deck</Button>
        <p>
          Either type the cards manually into the box below, add the cards one
          by one using the card box and autocomplete or for best results, copy
          the permalink url from{" "}
          <Link href="https://www.emeralddb.org/">Emerald DB</Link> and paste it
          into the popup from clicking the "Import Deck" button.
        </p>
      </div>

      <form className={styles.form} ref={formRef}>
        <div>
          <label htmlFor="name">Deck Name</label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            placeholder="My new deck"
            autoComplete="off"
            autoCorrect="off"
            maxLength={128}
            onChange={synchronizeDeckWithDisplay}
          />
        </div>
        <div>
          <label htmlFor="format">Format</label>
          <select
            ref={formatRef}
            id="format"
            name="format"
            onChange={synchronizeDeckWithDisplay}
          >
            {formats.map((format) => (
              <option key={format.id} value={format.id}>
                {format.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="faction">Clan</label>
          <select
            ref={factionRef}
            id="faction"
            name="faction"
            onChange={synchronizeDeckWithDisplay}
          >
            {clans.map((clan) => (
              <option key={clan.id} value={clan.id}>
                {clan.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="alliance">Alliance</label>
          <select
            ref={allianceRef}
            id="alliance"
            name="alliance"
            onChange={synchronizeDeckWithDisplay}
          >
            <option value="">- Select -</option>
            {clans.map((clan) => (
              <option key={clan.id} value={clan.id}>
                {clan.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="card">Card</label>
          <input
            ref={cardRef}
            id="card"
            autoComplete="off"
            className={styles.card}
            list="cardlist"
            placeholder="Search by card name"
          />
          <datalist id="cardlist">
            {cardList.map((card) => {
              const name = cardHumanName(card);
              return <option key={name} value={name} />;
            })}
          </datalist>
          <label htmlFor="numcards">Num</label>
          <input
            ref={countRef}
            id="numcards"
            className={styles.num}
            type="number"
            min={1}
            max={3}
            defaultValue={1}
          />
          <Button onClick={insertCard}>Add</Button>
        </div>
        <div>
          <label>Cards</label>
          <textarea
            ref={deckRef}
            rows={10}
            spellCheck="false"
            name="decklist"
            onChange={synchronizeDeckWithDisplay}
          />
        </div>
        <div>
          <Button type="submit">Save Deck</Button>
        </div>
      </form>
    </>
  );
}
