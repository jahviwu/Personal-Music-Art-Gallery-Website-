"use client";

import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navContainer}>
      <Link href="/song-gallery">
        <div className={styles.navButton} role="button">
          <span>songs</span>
        </div>
      </Link>

      <a
        href="https://www.beatstars.com/1jahvi"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.navButton} role="button">
          <span>shop</span>
        </div>
      </a>

      <a
        href="https://www.youtube.com/@1jahvi"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.navButton} role="button">
          <span>youtube</span>
        </div>
      </a>
    </nav>
  );
}