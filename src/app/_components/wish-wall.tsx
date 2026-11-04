"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { triggerBurst } from "./fireworks";

export function WishWall() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const { data: wishes = [] } = useQuery(trpc.comment.list.queryOptions());
  const create = useMutation(
    trpc.comment.create.mutationOptions({
      onSuccess: () => queryClient.invalidateQueries(trpc.comment.list.queryFilter()),
      onError: (err) => alert(`Could not post your wish: ${err.message}`),
    }),
  );

  const addWish = () => {
    const msg = message.trim();
    if (!msg) {
      alert("Please write a message before posting!");
      return;
    }
    create.mutate({ name: name.trim() || "VSS Team Member", comment: msg });
    setMessage("");
    triggerBurst();
  };

  return (
    <section className="wish-wall-section interactive-element">
      <h2>🪔 VSS Pune Team Wish Wall</h2>
      <div className="wish-form">
        <input
          type="text"
          className="wish-input"
          placeholder="Your Name"
          style={{ maxWidth: 160 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="wish-input"
          placeholder="Share your festive message with the team..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn" onClick={addWish} style={{ padding: "10px 20px" }}>
          Post
        </button>
      </div>
      <div className="wishes-container">
        {wishes.map((w) => (
          <div className="wish-card" key={w.id}>
            <strong>{w.name}</strong>
            {w.comment}
          </div>
        ))}
        <div className="wish-card">
          <strong>Girish Sahane (Managing Director)</strong>
          Wishing our phenomenal VSS team a sparkling, prosperous, and joyful Diwali! Let&apos;s
          keep raising the benchmark together.
        </div>
        <div className="wish-card">
          <strong>Pune Operations Team</strong>
          Wishing everyone at VSS a shining and prosperous Diwali filled with happiness!
        </div>
      </div>
    </section>
  );
}
