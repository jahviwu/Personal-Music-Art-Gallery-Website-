"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import type { Song } from "../types";

export default function SongGallery() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const playlistId = "20yqdwq0UFxxldbFo495FN";

  useEffect(() => {
    async function fetchPlaylist() {
      setError(null);
      try {
        const res = await fetch(`/api/playlist?id=${playlistId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch playlist");
        }

        const data = await res.json();

        const mappedSongs: Song[] = data.tracks.items.map((item: any) => ({
          id: item.track.id,
          title: item.track.name,
          artist: item.track.artists.map((a: any) => a.name).join(", "),
          coverArt: item.track.album.images[0]?.url || "/placeholder-image.png",
          description: item.track.album.name,
          spotifyUrl: item.track.external_urls.spotify,
          releaseDate: item.track.album.release_date || "Unknown",
        }));

        setSongs(mappedSongs);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchPlaylist();
  }, [playlistId]);

  // Format release date as "Month Day, Year"
  function formatDate(dateString: string) {
    if (dateString === "Unknown") return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.lightLeaks}>
        <div />
        <div />
        <div />
        <div />
      </div>

      <div className={styles.headerRow}>
        <h1 className={styles.heading}>Produced by jahvi</h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by title or artist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            aria-label="Search songs"
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className={styles.card}
            onClick={() => setSelectedSong(song)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedSong(song);
              }
            }}
          >
            <div className={styles.cardImageWrapper}>
              <img
                src={song.coverArt}
                alt={`${song.title} cover art`}
                className={styles.cardImage}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder-image.png";
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {selectedSong && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedSong(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setSelectedSong(null)}
              aria-label="Close"
            >
              &times;
            </button>

            <img
              src={selectedSong.coverArt}
              alt={`${selectedSong.title} cover art`}
              className={styles.modalImage}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.png";
              }}
            />

            <h2 className={styles.songTitle} id="modal-title">
              {selectedSong.title}
            </h2>

            <p className={styles.songArtist}>
              Performed by
              <br />
              {selectedSong.artist}
            </p>

            <p className={styles.songDescription}>
              Released
              <br />
              {formatDate(selectedSong.releaseDate)}
            </p>

            <a
              href={selectedSong.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.spotifyLink}
            >
              Listen on Spotify
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
