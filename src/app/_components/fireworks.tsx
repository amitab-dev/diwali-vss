"use client";

import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

const colors = ["#ffcf40", "#ff9100", "#00bcd4", "#26a69a", "#ff4081", "#ffffff"];

class Particle {
  x: number;
  y: number;
  color: string;
  radius = Math.random() * 2.5 + 1;
  vx: number;
  vy: number;
  alpha = 1;
  decay = Math.random() * 0.02 + 0.01;
  gravity = 0.08;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= this.decay;
  }
}

// Shared across the page so buttons and diyas can launch fireworks on the one canvas.
let particles: Particle[] = [];

export function createFirework(x: number, y: number) {
  for (let i = 0; i < 60; i++) {
    particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
  }
}

export function triggerBurst() {
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#ffcf40", "#ff9100", "#00bcd4", "#26a69a", "#ffffff"],
  });
  const width = window.innerWidth;
  const height = window.innerHeight;
  for (let i = 0; i < 5; i++) {
    setTimeout(
      () =>
        createFirework(
          Math.random() * width * 0.8 + width * 0.1,
          Math.random() * height * 0.5 + height * 0.1,
        ),
      i * 200,
    );
  }
}

export function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onClick = (e: MouseEvent) => createFirework(e.clientX, e.clientY);

    const animate = () => {
      ctx.fillStyle = "rgba(10, 5, 27, 0.2)";
      ctx.fillRect(0, 0, width, height);
      particles = particles.filter((p) => p.alpha > 0);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      if (Math.random() < 0.03) createFirework(Math.random() * width, Math.random() * (height * 0.6));
      frame = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", onResize);
    window.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas id="fwCanvas" ref={canvasRef} />;
}
