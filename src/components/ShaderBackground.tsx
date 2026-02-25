"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    twinkleSpeed: number;
    twinkleOffset: number;
    layer: number; // 0=far, 1=mid, 2=near (parallax)
}

interface Nebula {
    x: number;
    y: number;
    rx: number;
    ry: number;
    hue: number;
    opacity: number;
    drift: number;
}

export default function ShaderBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let t = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 4; // tall enough for full scroll
        };
        resize();
        window.addEventListener("resize", resize);

        // ── Stars ──────────────────────────────────────────────────────────────
        const makeStars = (count: number): Star[] =>
            Array.from({ length: count }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.2,
                opacity: Math.random() * 0.7 + 0.3,
                twinkleSpeed: Math.random() * 0.015 + 0.005,
                twinkleOffset: Math.random() * Math.PI * 2,
                layer: Math.floor(Math.random() * 3),
            }));

        const stars = makeStars(340);

        // A handful of brighter "hero" stars
        const heroStars: Star[] = Array.from({ length: 18 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.8 + 1.2,
            opacity: Math.random() * 0.5 + 0.5,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            twinkleOffset: Math.random() * Math.PI * 2,
            layer: 2,
        }));

        // ── Nebulae ─────────────────────────────────────────────────────────────
        const nebulae: Nebula[] = [
            { x: 0.15, y: 0.08, rx: 0.35, ry: 0.25, hue: 220, opacity: 0.07, drift: 0.00008 },
            { x: 0.75, y: 0.18, rx: 0.30, ry: 0.20, hue: 260, opacity: 0.06, drift: 0.00006 },
            { x: 0.50, y: 0.45, rx: 0.45, ry: 0.28, hue: 195, opacity: 0.055, drift: 0.00005 },
            { x: 0.25, y: 0.70, rx: 0.28, ry: 0.22, hue: 240, opacity: 0.065, drift: 0.00007 },
            { x: 0.80, y: 0.82, rx: 0.32, ry: 0.24, hue: 210, opacity: 0.06, drift: 0.00009 },
        ];

        // ── Draw ────────────────────────────────────────────────────────────────
        const draw = () => {
            t += 0.5;

            // Deep space background
            ctx.fillStyle = "#03030a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const W = canvas.width;
            const H = canvas.height;

            // Draw nebulae
            ctx.globalCompositeOperation = "screen";
            for (const nb of nebulae) {
                const cx = (nb.x + Math.sin(t * nb.drift) * 0.03) * W;
                const cy = nb.y * H;
                const r = Math.max(nb.rx * W, nb.ry * H);

                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                grad.addColorStop(0, `hsla(${nb.hue}, 80%, 65%, ${nb.opacity * 1.4})`);
                grad.addColorStop(0.4, `hsla(${nb.hue + 20}, 70%, 50%, ${nb.opacity * 0.7})`);
                grad.addColorStop(1, `hsla(${nb.hue + 40}, 60%, 40%, 0)`);

                ctx.save();
                ctx.scale(nb.rx / nb.ry, 1);
                ctx.beginPath();
                ctx.arc(cx / (nb.rx / nb.ry), cy, r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.restore();
            }

            // Draw stars
            ctx.globalCompositeOperation = "source-over";
            const allStars = [...stars, ...heroStars];
            for (const s of allStars) {
                const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset);
                const alpha = s.opacity * (0.4 + 0.6 * twinkle);
                const r = s.radius * (0.7 + 0.3 * twinkle);

                // Draw glow for brighter stars
                if (s.radius > 1.5 || s.layer === 2) {
                    const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 5);
                    glow.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.6})`);
                    glow.addColorStop(1, `rgba(200, 220, 255, 0)`);
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, r * 5, 0, Math.PI * 2);
                    ctx.fillStyle = glow;
                    ctx.fill();
                }

                // Star core
                ctx.beginPath();
                ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 235, 255, ${alpha})`;
                ctx.fill();
            }

            // Shooting star — one every ~6 seconds
            if (Math.floor(t / 360) !== Math.floor((t - 0.5) / 360)) {
                const sx = Math.random() * W * 0.7;
                const sy = Math.random() * H * 0.3;
                const len = 80 + Math.random() * 120;
                const trail = ctx.createLinearGradient(sx, sy, sx + len, sy + len * 0.4);
                trail.addColorStop(0, "rgba(255,255,255,0.9)");
                trail.addColorStop(1, "rgba(255,255,255,0)");
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx + len, sy + len * 0.4);
                ctx.strokeStyle = trail;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }

            // Vignette
            const vignette = ctx.createRadialGradient(
                W / 2, H * 0.15, H * 0.1,
                W / 2, H * 0.15, H * 0.75
            );
            vignette.addColorStop(0, "rgba(0,0,0,0)");
            vignette.addColorStop(1, "rgba(0,0,0,0.72)");
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, W, H);

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
