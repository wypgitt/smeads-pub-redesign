"use client";

import { AskSmeadsProvider } from "@/components/providers/ask-smeads-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AskSmeadsProvider>{children}</AskSmeadsProvider>;
}
