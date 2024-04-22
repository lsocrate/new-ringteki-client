import { ContentBox } from "@/ui/molecules/ContentBox/ContentBox";
import { fetchDeckLists, fetchDetailedDecklist } from "@/data/fetchDecks";
import { DeckList } from "@/ui/molecules/DeckList/DeckList";
import { DoubleColumn } from "@/ui/elements/DoubleColumn/DoubleColumn";
import { DeckView } from "@/ui/molecules/DeckView/DeckView";
import Link from "next/link";
import ButtonLike from "@/ui/atoms/ButtonLike/styles.module.css";
import styles from "./styles.module.css";

export default async function Page({
  searchParams,
}: {
  searchParams: { deckId?: string };
}) {
  const decks = await fetchDeckLists("siri");
  const selectedDeckId = searchParams.deckId ?? decks[0]?.id;
  const selectedDeck = await fetchDetailedDecklist(selectedDeckId);

  return (
    <DoubleColumn
      left={
        <ContentBox title="Your decks">
          <div className={styles.top}>
            <Link href="/decks/new" className={ButtonLike.buttonLike}>
              New Deck
            </Link>
          </div>
          <DeckList decks={decks} activeDeckId={selectedDeckId} />
        </ContentBox>
      }
      right={
        selectedDeck && (
          <ContentBox title={selectedDeck.name}>
            <DeckView deck={selectedDeck} />
          </ContentBox>
        )
      }
    ></DoubleColumn>
  );
}
