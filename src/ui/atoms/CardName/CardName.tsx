"use client";

import styles from "./styles.module.css";
import { useCards } from "@/context/CardProvider";

export function CardName(p: { cardId: string }) {
  const cards = useCards();
  const cardName = cards.get(p.cardId)?.name;

  return (
    <span data-card-id={p.cardId} className={styles.cardName}>
      {cardName || p.cardId}
    </span>
  );
}
