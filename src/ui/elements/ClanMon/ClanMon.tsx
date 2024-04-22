import Image from "next/image";
import crabMon from "../../../../public/mons/crab.svg";
import craneMon from "../../../../public/mons/crane.svg";
import dragonMon from "../../../../public/mons/dragon.svg";
import lionMon from "../../../../public/mons/lion.svg";
import phoenixMon from "../../../../public/mons/phoenix.svg";
import scorpionMon from "../../../../public/mons/scorpion.svg";
import unicornMon from "../../../../public/mons/unicorn.svg";
import neutralMon from "../../../../public/mons/neutral.svg";

/**
 * For generating filters
 * @see https://codepen.io/sosuke/pen/Pjoqqp
 */
function monForClan(clan: string) {
  switch (clan) {
    case "crab":
      return {
        name: "Crab Clan",
        color: "#294056",
        filter:
          "invert(23%) sepia(22%) saturate(938%) hue-rotate(168deg) brightness(91%) contrast(94%)",
        mon: crabMon,
      };
    case "crane":
      return {
        name: "Crane Clan",
        color: "#73A0CA",
        filter:
          "invert(82%) sepia(28%) saturate(4250%) hue-rotate(179deg) brightness(89%) contrast(75%)",
        mon: craneMon,
      };
    case "dragon":
      return {
        name: "Dragon Clan",
        color: "#426C44",
        filter:
          "invert(36%) sepia(48%) saturate(363%) hue-rotate(73deg) brightness(91%) contrast(90%)",
        mon: dragonMon,
      };
    case "lion":
      return {
        name: "Lion Clan",
        color: "#C3AA71",
        filter:
          "invert(78%) sepia(23%) saturate(580%) hue-rotate(4deg) brightness(84%) contrast(91%)",
        mon: lionMon,
      };
    case "phoenix":
      return {
        name: "Phoenix Clan",
        color: "#BC510A",
        filter:
          "invert(35%) sepia(36%) saturate(2115%) hue-rotate(355deg) brightness(95%) contrast(98%)",
        mon: phoenixMon,
      };
    case "scorpion":
      return {
        name: "Scorpion Clan",
        color: "#742425",
        filter:
          "invert(9%) sepia(53%) saturate(5513%) hue-rotate(347deg) brightness(91%) contrast(80%)",
        mon: scorpionMon,
      };
    case "unicorn":
      return {
        name: "Unicorn Clan",
        color: "#4E2E6A",
        filter:
          "invert(19%) sepia(24%) saturate(2891%) hue-rotate(241deg) brightness(89%) contrast(88%)",
        mon: unicornMon,
      };
    default:
      return {
        name: "",
        color: "#494848",
        filter:
          "invert(27%) sepia(21%) saturate(0%) hue-rotate(288deg) brightness(109%) contrast(110%)",
        mon: neutralMon,
      };
  }
}

export function ClanMon(p: {
  clan: string;
  color: "black" | "white" | "colored";
  size: number;
}) {
  const option = monForClan(p.clan);
  const style =
    p.color === "colored"
      ? { filter: option.filter }
      : p.color === "white"
        ? { filter: "invert(100%) sepia(0%) saturate(25%) hue-rotate(70deg) brightness(108%) contrast(108%)" }
        : {};
  return (
    <Image
      src={option.mon}
      alt={option.name}
      height={p.size}
      width={p.size}
      priority
      style={style}
    />
  );
}
