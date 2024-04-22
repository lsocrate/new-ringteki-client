import Image from "next/image";
import Link from "next/link";
import { ContentBox } from "@/ui/molecules/ContentBox/ContentBox";
import { SingleColumn } from "@/ui/elements/SingleColumn/SingleColumn";
import { fetchNews } from "@/data/news";
import { NiceDate } from "@/ui/atoms/formattedDate";
import styles from "./styles.module.css";
import EmeraldLegacyLogo from "./emerald-legacy-logo.png";
import EventDiscordIcon from "./event_discord_icon.webp";
import CommunityDiscordIcon from "./community_discord_icon.gif";

export default async function Home() {
  const news = await fetchNews();

  return (
    <SingleColumn>
      <h1 style={{ textAlign: "center" }}>Legend of the Five Rings LCG</h1>

      <ContentBox title="Getting Started">
        <p>
          This site allows you to play the Legend of the Five Rings LCG in your
          browser.
        </p>
        <p>
          If you're new, head on over to the{" "}
          <Link href="/how-to-play">How To Play guide</Link> for a thorough
          explanation on how to use the site!
        </p>
      </ContentBox>

      <ContentBox title="Latest site news">
        {news.map((item) => (
          <div key={item.id} className={styles.newsEntry}>
            <strong>
              <NiceDate date={item.datePublished} />
            </strong>{" "}
            {item.text}
          </div>
        ))}
      </ContentBox>

      <ContentBox title="Community Information">
        <div className={styles.info}>
          <div className={styles.infoTop}>
            <h3>
              <Image
                src={CommunityDiscordIcon}
                alt=""
                width={24}
                height={24}
                unoptimized
              />
              L5R Community Discord Server
            </h3>
            <p>
              <Link href="https://discord.gg/zPvBePb" target="_blank">
                Invite Link
              </Link>
            </p>
            <p>
              Are you interested in the L5R LCG? Come and chat on our Discard
              server!
            </p>
            <p>
              The server was created by members of the L5R community, and is
              maintained by the community, so come and talk any thing L5R
              related.
            </p>
          </div>
          <div className={styles.infoTop}>
            <h3>
              <Image src={EventDiscordIcon} alt="" height={24} width={24} />
              L5R Event Discord Server
            </h3>
            <p>
              <Link href="https://discord.gg/mfpZTqxxah" target="_blank">
                Invite Link
              </Link>
            </p>
            <p>
              This discord server is used by the community to coordinate
              community run events.
            </p>
            <p>
              Whether you want to play in a sanctioned Emerald Legacy
              tournament, join the monthly Discord League, or find fellow
              beginners in the Beginner's League, this server has something for
              everyone, not just competitive players.
            </p>
          </div>
          <div className={styles.infoBottom}>
            <Image
              className="emerald-legacy-logo"
              src={EmeraldLegacyLogo}
              alt="Emerald Legacy"
              width={320}
              height={83}
              priority
            />
            <h3>
              <Link href="https://emeraldlegacy.org/" target="_blank">
                Emerald Legacy
              </Link>
            </h3>
            <p>
              The Emerald Legacy project is a fan-run nonprofit volunteer
              collective. Its mission is to provide a living and thriving
              continuation of the LCG after the end of official support for the
              game. Emerald Legacy is responsible for creating and releasing new
              cards, organizing tournaments, and maintaining the rules and
              balance of the game.
            </p>
            <p>
              Emerald Legacy provides the{" "}
              <Link href="https://www.emeralddb.org/" target="_blank">
                EmeraldDB
              </Link>{" "}
              service, which is an online collection of all cards and rules for
              the LCG. EmeraldDB includes a deck builder for the LCG, as well as
              lists that have been made public by other players. Deck lists that
              you create are able to be directly imported into the Deckbuilder
              here!
            </p>
          </div>
        </div>
      </ContentBox>
    </SingleColumn>
  );
}
