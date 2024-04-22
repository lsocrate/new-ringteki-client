import Link from "next/link";
import type { DeckForDecklist } from "@/data/fetchDecks";
import { NiceDate } from "@/ui/atoms/formattedDate";
import { ClanMon } from "@/ui/elements/ClanMon/ClanMon";
import styles from "./styles.module.css";

export function DeckList(p: {
  decks: DeckForDecklist[];
  activeDeckId: string;
}) {
  return (
    <div className={styles.decklists}>
      {p.decks.map((deck) => (
        <Link
          key={deck.id}
          href={`?${new URLSearchParams({ deckId: deck.id })}`}
          className={`${styles.row} ${deck.id === p.activeDeckId ? styles.active : ""}`}
        >
          <div className={styles.mon}>
            <ClanMon clan={deck.faction.value} color="colored" size={35} />
          </div>
          <div className={styles.description}>
            {deck.name}
            <br />
            {deck.faction.name} / <span className={styles.alliance}>{deck.alliance.name}</span>
          </div>
          <div className={styles.details}>
            Valid
            <br />
            <NiceDate date={deck.lastUpdated} />
          </div>
        </Link>
      ))}
    </div>
  );
}
