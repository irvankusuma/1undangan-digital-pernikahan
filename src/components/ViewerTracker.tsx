"use client";

import { useEffect } from "react";

const detectDevice = () => (window.innerWidth < 768 ? "mobile" : "desktop");

export default function ViewerTracker({ invitationId }: { invitationId: string }) {
  useEffect(() => {
    const track = async () => {
      await fetch("/api/viewers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId, device: detectDevice() }),
      });
    };
    track();
  }, [invitationId]);

  return null;
}
