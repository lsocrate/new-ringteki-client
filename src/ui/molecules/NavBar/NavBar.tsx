import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { ActiveGamesCount } from "../ActiveGamesCount/ActiveGamesCount";
import { NavBarAuthControl } from "../NavBarAuthControl/NavBarAuthControl";

export function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarInner}>
        <Link href="/" className={styles.logoArea}>
          Jigoku Online
        </Link>

        <ul className={styles.linksArea}>
          <li>
            <Link href="/decks" prefetch>
              Decks
            </Link>
          </li>
          <li>
            <Link href="/play" prefetch>
              Play
            </Link>
          </li>
          <li className={styles.dropdownActivator}>
            Help
            <ul className={styles.dropdown}>
              <li>
                <Link href="/how-to-play">How To Play</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/community">Community</Link>
              </li>
              <li>
                <Link href="/formats">Formats</Link>
              </li>
            </ul>
          </li>
        </ul>

        <div className={styles.gameCountArea}>
          <ActiveGamesCount />
        </div>
        <div className={styles.authArea}>
          <NavBarAuthControl />
        </div>
      </div>
    </nav>
  );
}
