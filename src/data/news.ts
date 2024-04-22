import { db } from "./db";

export async function fetchNews() {
  const news = [] as Array<{ id: string; text: string; datePublished: Date }>;
  const cursor = db
    .collection<{ poster: string; text: string; datePublished: Date }>("news")
    .find(
      {},
      {
        sort: { datePublished: -1 },
        limit: 3,
        projection: { text: 1, datePublished: 1 },
      },
    );
  for await (const item of cursor) {
    news.push({
      id: item._id.toString(),
      text: item.text,
      datePublished: item.datePublished,
    });
  }
  return news;
}
