"use client";

import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navContainer}>
      <Link href="/song-gallery">
        <div
          className={styles.navButton}
          role="button"
        >
          <span>Song Gallery</span>
        </div>
      </Link>

      <Link href="/about">
        <div
          className={styles.navButton}
          role="button"
        >
          <span>About</span>
        </div>
      </Link>
    </nav>
  );
}
