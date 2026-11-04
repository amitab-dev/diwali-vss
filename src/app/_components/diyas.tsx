"use client";

import confetti from "canvas-confetti";
import { useState, type MouseEvent } from "react";

const diyas = [
  { label: "Growth" },
  { label: "Innovation" },
  { label: "Prosperity", special: true },
  { label: "Teamwork" },
  { label: "Success" },
];

function Diya({ label, special }: { label: string; special?: boolean }) {
  const [lit, setLit] = useState(false);

  const toggle = (e: MouseEvent<HTMLDivElement>) => {
    const next = !lit;
    setLit(next);
    if (next) {
      const rect = e.currentTarget.getBoundingClientRect();
      confetti({
        particleCount: 25,
        spread: 40,
        origin: {
          x: rect.left / window.innerWidth + 0.03,
          y: rect.top / window.innerHeight + 0.03,
        },
      });
    }
  };

  return (
    <div className={`diya-wrapper${lit ? " lit" : ""}`} onClick={toggle}>
      <svg
        className="diya-svg"
        viewBox="0 0 100 100"
        style={special ? { transform: "scale(1.15)" } : undefined}
      >
        <g className="flame">
          <path d="M50 10 Q35 35 50 50 Q65 35 50 10 Z" fill="#ffeb3b" />
          <path d="M50 20 Q42 35 50 45 Q58 35 50 20 Z" fill="#ff9100" />
        </g>
        <path d="M20 55 C20 75 80 75 80 55 C70 50 30 50 20 55 Z" fill={special ? "#b71c1c" : "#d87a24"} />
        <path d="M15 55 Q50 85 85 55 Q50 62 15 55 Z" fill={special ? "#ff2a2a" : "#ff9800"} />
        <ellipse cx="50" cy="54" rx="30" ry="5" fill={special ? "#ffcf40" : "#8d6e63"} />
      </svg>
      <span
        className="diya-label"
        style={special ? { color: "var(--gold)", fontWeight: 600 } : undefined}
      >
        {label}
      </span>
    </div>
  );
}

export function DiyaSection() {
  return (
    <section className="diya-section interactive-element">
      <h2>✨ Click each Diya to light up the office ✨</h2>
      <div className="diyas-row">
        {diyas.map((d) => (
          <Diya key={d.label} {...d} />
        ))}
      </div>
    </section>
  );
}
