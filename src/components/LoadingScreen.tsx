"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Module-level guard — prevents StrictMode double-mount re-play
let _started = false;

const BG = "oklch(0.06 0.01 265)";
const GRADIENT = "linear-gradient(135deg, #D7D7D8 0%, #AEB2B8 40%, #848B98 70%, #D7D7D8 100%)";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
    const [phase, setPhase] = useState<"enter" | "hold" | "split">("enter");
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (_started) { onDone(); return; }
        _started = true;

        // enter (1.4s) → hold (1s) → split curtains (0.85s) → done
        const t1 = setTimeout(() => setPhase("hold"), 1400);
        const t2 = setTimeout(() => setPhase("split"), 2400);
        const t3 = setTimeout(() => { onDone(); setVisible(false); }, 3250);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onDone]);

    if (!visible) return null;

    const splitting = phase === "split";
    const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

    return (
        <>
            {/* ── Top curtain ─────────────────────────────────────────── */}
            <motion.div
                key="curtain-top"
                className="fixed left-0 right-0 z-[99999] overflow-hidden"
                style={{ top: 0, height: "50vh", background: BG }}
                animate={splitting ? { y: "-100%" } : { y: 0 }}
                transition={{ duration: 0.85, ease }}
            />

            {/* ── Bottom curtain ──────────────────────────────────────── */}
            <motion.div
                key="curtain-bottom"
                className="fixed left-0 right-0 z-[99999]"
                style={{ top: "50vh", height: "50vh", background: BG }}
                animate={splitting ? { y: "100%" } : { y: 0 }}
                transition={{ duration: 0.85, ease }}
            />

            {/* ── Content (above curtains) ─────────────────────────────── */}
            <motion.div
                key="content"
                className="fixed inset-0 z-[100000] flex flex-col items-center justify-center pointer-events-none"
                animate={splitting ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
            >
                {/* SKROY letters */}
                <div className="flex gap-2 mb-8">
                    {["S", "K", "R", "O", "Y"].map((char, i) => (
                        <motion.span
                            key={char}
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.3 + i * 0.2,
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-6xl md:text-8xl font-bold tracking-tight select-none"
                            style={{
                                fontFamily: "var(--font-space), sans-serif",
                                background: GRADIENT,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>

                {/* Sweep line */}
                <div className="w-32 h-px relative overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.6 }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: "linear-gradient(90deg, transparent, #D7D7D8, #AEB2B8, transparent)" }}
                    />
                </div>

                {/* Name */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.38 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="mt-5 text-xs tracking-[0.3em] uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif", color: "#959BA3" }}
                >
                    Shivam Kumar Roy
                </motion.p>
            </motion.div>
        </>
    );
}
