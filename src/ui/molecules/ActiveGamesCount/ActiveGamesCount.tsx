"use client";

import { useEffect, useState } from "react";

export function ActiveGamesCount() {
  const [gameCount, setGameCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setGameCount((prev) => prev + 1), 10e3);
    return () => clearInterval(timer);
  }, []);

  return <span>{gameCount} Games</span>;
}
