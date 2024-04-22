export function cardHumanName(card: { name: string; pack: string }): string {
  return `${card.name} (${card.pack})`;
}
