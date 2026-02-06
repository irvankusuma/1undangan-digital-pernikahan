"use client";

import { useEffect, useState } from "react";

const pad = (value: number) => value.toString().padStart(2, "0");

export default function Countdown({ target }: { target: string }) {
  const [remaining, setRemaining] = useState("00:00:00:00");

  useEffect(() => {
    const targetDate = new Date(target).getTime();
    const update = () => {
      const diff = Math.max(targetDate - Date.now(), 0);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setRemaining(`${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>{remaining}</div>
  );
}
