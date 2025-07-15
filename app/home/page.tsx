"use client";

import Navbar from "../components/navbar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.bgOverlay} />

      <h1 className={styles.title}>jahvi</h1>
      <Navbar />
    </main>
  );
}
