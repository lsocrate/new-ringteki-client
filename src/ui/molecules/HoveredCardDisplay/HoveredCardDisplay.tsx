"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useCards } from "@/context/CardProvider";
import Image from "next/image";

export function HoveredCardDisplay() {
  const cards = useCards();
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    const callback = (e: MouseEvent) => {
      const cardId = (e.target as HTMLElement)?.dataset.cardId;
      setSrc(cards.get(cardId!)?.image);
    };

    window.addEventListener("mouseover", callback);
    return () => window.removeEventListener("mouseover", callback);
  }, [cards]);

  if (!src) {
    return null;
  }

  return (
    <div className={styles.display}>
      <Image src={src} alt="" width={300} height={419} />
    </div>
  );
}
