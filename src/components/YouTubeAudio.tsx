"use client";

import { useEffect, useRef, useState } from "react";

type Track = {
  id: string;
  title: string;
  youtubeUrl: string;
};

const extractVideoId = (url: string) => {
  const match = url.match(/(?:v=|youtu.be\/|embed\/)([\w-]{6,})/i);
  return match?.[1] ?? "";
};

export default function YouTubeAudio({ tracks }: { tracks: Track[] }) {
  const playerRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const scriptId = "youtube-iframe-api";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      const videoId = extractVideoId(tracks[0]?.youtubeUrl ?? "");
      playerRef.current = new (window as any).YT.Player("yt-audio", {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
        },
        events: {
          onReady: () => setIsReady(true),
        },
      });
    };
  }, [tracks]);

  const handlePlayPause = () => {
    if (!isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleChangeTrack = (index: number) => {
    if (!isReady) return;
    const videoId = extractVideoId(tracks[index]?.youtubeUrl ?? "");
    playerRef.current.loadVideoById(videoId);
    setActiveIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="card" style={{ position: "relative" }}>
      <h3>Musik Undangan</h3>
      <p style={{ color: "var(--muted)" }}>Putar musik favorit Anda.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="button" onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        {tracks.map((track, index) => (
          <button
            key={track.id}
            className="button button-secondary"
            onClick={() => handleChangeTrack(index)}
            aria-pressed={activeIndex === index}
          >
            {track.title}
          </button>
        ))}
      </div>
      <div
        id="yt-audio"
        style={{
          width: 1,
          height: 1,
          overflow: "hidden",
          position: "absolute",
          left: -9999,
        }}
      />
    </div>
  );
}
