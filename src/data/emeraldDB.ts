import { z } from "zod";

const decklistSchema = z.object({
  name: z.string(),
  format: z.enum([
    "obsidian",
    "jade-edict",
    "single-core",
    "standard",
    "skirmish",
    "enlightenment",
    "emerald",
  ]),
  primary_clan: z.enum([
    "crab",
    "crane",
    "dragon",
    "lion",
    "phoenix",
    "scorpion",
    "unicorn",
  ]),
  secondary_clan: z.enum([
    "crab",
    "crane",
    "dragon",
    "lion",
    "phoenix",
    "scorpion",
    "unicorn",
    "",
  ]),
  cards: z.record(z.number()),
});

export type Decklist = z.infer<typeof decklistSchema>;

export async function fetchDecklistFromEmeraldDB(url: string) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => decklistSchema.parseAsync(data));
}
