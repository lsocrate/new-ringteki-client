import { ContentBox } from "@/ui/molecules/ContentBox/ContentBox";
import { DoubleColumn } from "@/ui/elements/DoubleColumn/DoubleColumn";
import { DeckEditorForm } from "@/ui/molecules/DeckEditorForm/DeckEditorForm";
import { DeckEditing } from "@/context/DeckEditing";
import { DynamicDeckView } from "./DynamicDeckView";
import { DeckImportPrompt } from "@/ui/molecules/DeckEditorForm/DeckImportPrompt";

export default async function Page() {
  return (
    <DeckEditing>
      <DeckImportPrompt open />

      <DoubleColumn
        left={
          <ContentBox title="Deck Editor">
            <DeckEditorForm />
          </ContentBox>
        }
        right={<DynamicDeckView />}
      />
    </DeckEditing>
  );
}
