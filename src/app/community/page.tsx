import Link from "next/link";
import { ContentBox } from "@/ui/molecules/ContentBox/ContentBox";
import { SingleColumn } from "@/ui/elements/SingleColumn/SingleColumn";

export default function Page() {
  return (
    <SingleColumn>
      <ContentBox title="Jigoku Online - Community Information">
        <h3>What is this page?</h3>
        <p>
          This page is a shoutout to other works/resources in the L5R community.
        </p>
        <h3>L5R Discord</h3>
        <p>
          Link:{" "}
          <Link href="https://discord.gg/zPvBePb" target="_blank" prefetch>
            L5R Discord
          </Link>
        </p>
        <p>
          Discord is a text and voice communicaton application. Created by
          members of the L5R subreddit, it's a robust community of LCG/CCG/RPG
          players.
        </p>
        <h3>Emerald DB</h3>
        <p>
          Link:{" "}
          <Link href="https://www.emeralddb.org/" target="_blank" prefetch>
            Emerald DB
          </Link>
        </p>
        <p>
          Card database and deck builder. Contains card rulings as well. Deck
          list are able to be directly imported into the Deckbuilder here.
          Successor to FiveRingsDB.
        </p>
        <h3>Discord League</h3>
        <p>
          Link:{" "}
          <Link href="https://discord-league.herokuapp.com" target="_blank">
            Discord League
          </Link>
        </p>
        <p>
          A competitive league, with a friendly tournament running each month.
          Sign up with your discord account, and also
          <Link href="https://discord.gg/mfpZTqxxah" target="_blank">
            join the discord server where the games are scheduled
          </Link>
          .
        </p>
        <h3>Troll5R</h3>
        <p>
          Link:{" "}
          <Link href="https://www.facebook.com/Troll5R/" target="_blank">
            Troll5R
          </Link>
        </p>
        <p>
          Winners of the podcast wars. A couple of L5R old-timers/playtesters
          who talk at length on just about anything.
        </p>
        <h3>The Lotus Pavilion</h3>
        <p>
          Link:{" "}
          <Link href="https://l5r.tourneygrounds.com" target="_blank">
            The Lotus Pavilion
          </Link>
        </p>
        <p>
          Browser-based tournament software that originated for AGOT 2.0. Has an
          excellent pedigree.
        </p>
        <h3>The Ringteki Dev Discord</h3>
        <p>
          Link:{" "}
          <Link href="https://discord.gg/tMzhyND" target="_blank">
            Ringteki Discord
          </Link>
        </p>
        <p>
          If you're interested in helping develop Ringteki, or you have a bug to
          report, feel free to contact us here.
        </p>
      </ContentBox>
    </SingleColumn>
  );
}
