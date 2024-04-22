import { fetchCardList } from "@/data/fetchDecks";

export const dynamic = "force-static";

export async function GET() {
  const cardList = await fetchCardList();
  return Response.json(cardList);
}
