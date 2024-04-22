"use client";

import { createContext, useContext, useState } from "react";

type Prompt = {
  title: string;
  children: React.ReactNode;
};

const PromptOverlayContext = createContext<{
  open: (prompt: Prompt) => void;
  close: () => void;
}>({ open: () => {}, close: () => {} });

export function usePrompt() {
  return useContext(PromptOverlayContext);
}

export function PromptOverlayProvider(p: { children: React.ReactNode }) {
  const [prompt, setPrompt] = useState<Prompt>();
  const open = (prompt: Prompt) => setPrompt(prompt);
  const close = () => setPrompt(undefined);

  return (
    <PromptOverlayContext.Provider value={{ open, close }}>
      <div>{prompt && prompt.children}</div>
      {p.children}
    </PromptOverlayContext.Provider>
  );
}
