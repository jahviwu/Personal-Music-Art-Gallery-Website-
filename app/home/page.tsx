"use client";

import { libertinus } from '../../lib/fonts/libertinusserif';
import Navbar from '../components/navbar';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={`${styles.main} ${libertinus.className}`}>
      <video
        className={styles.bgVideo}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/INTENTION-demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Navbar />
    </main>
  );
}