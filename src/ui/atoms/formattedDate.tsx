import { memo } from "react";

export const NiceDate = memo((p: { date: string | Date }) => (
  <span>
    {new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
      p.date instanceof Date ? p.date : new Date(p.date),
    )}
  </span>
));
