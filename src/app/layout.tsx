import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/ui/molecules/NavBar/NavBar";
import { HoveredCardDisplay } from "@/ui/molecules/HoveredCardDisplay/HoveredCardDisplay";
import { CardProvider } from "@/context/CardProvider";

export const metadata: Metadata = {
  title: "Jigoku Online - Play Legend of the Five Rings LCG in your browser",
  description: "Play Legend of the Five Rings in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>
          <CardProvider>
            <HoveredCardDisplay />
            {children}
          </CardProvider>
        </main>
      </body>
    </html>
  );
}
