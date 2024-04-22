import Image from "next/image";

export function Gravatar(p: { hash: string; size: number }) {
  return (
    <Image
      src={`https://www.gravatar.com/avatar/${p.hash}?d=identicon&amp&s=${p.size}`}
      alt="Gravatar"
      height={p.size}
      width={p.size}
    />
  );
}
