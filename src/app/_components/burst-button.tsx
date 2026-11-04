"use client";

import { triggerBurst } from "./fireworks";

export function BurstButton() {
  return (
    <button className="btn" onClick={triggerBurst}>
      🚀 Launch Grand Fireworks
    </button>
  );
}
