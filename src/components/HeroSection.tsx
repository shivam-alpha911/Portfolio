"use client";

import { Cover } from "@/components/ui/cover";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function LeetCodeIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.775-1.045-2.803-1.138l2.588-2.978A1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
    );
}

/* ── Holographic name with mouse-reactive 3-D tilt ── */
function HolographicName() {
    const ref = useRef<HTMLDivElement>(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springCfg = { stiffness: 150, damping: 20 };
    const rotateY = useSpring(useTransform(rawX, [-1, 1], [-18, 18]), springCfg);
    const rotateX = useSpring(useTransform(rawY, [-1, 1], [12, -12]), springCfg);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
        rawY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
    };
    const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

    const name = "Shivam Kumar Roy";
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="inline-block cursor-default select-none"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            <span
                className="holo-text text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight"
                data-text={name}
                style={{ textShadow: "0 0 40px rgba(160,80,255,0.4), 0 0 100px rgba(0,200,255,0.25)" }}
            >
                {name}
            </span>
        </motion.div>
    );
}

const socialLinks = [
    {
        icon: Github,
        label: "GitHub",
        href: "https://github.com/shivam-alpha911",
        color: "hover:border-white/30",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/shivam-kumar-roy-b687a1315/",
        color: "hover:border-blue-500/60",
    },
    {
        icon: Mail,
        label: "Gmail",
        href: "https://mail.google.com/mail/?view=cm&to=shivamroy26oc@gmail.com",
        color: "hover:border-red-400/60",
    },
    {
        icon: LeetCodeIcon,
        label: "LeetCode",
        href: "https://leetcode.com/u/SK_ROY_/",
        color: "hover:border-yellow-400/60",
    },
];

const words = ["Full-Stack Dev", "UI Tinkerer", "Problem Solver"];

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
        >
            {/* Radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.72 0.2 290 / 18%) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

                {/* Main heading with holographic effect */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="font-extrabold tracking-tight mb-4 leading-tight"
                >
                    <span className="block text-3xl md:text-4xl text-foreground/70 mb-2 font-semibold">
                        Hi, I&apos;m
                    </span>
                    <HolographicName />
                </motion.h1>

                {/* Animated role text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-semibold text-muted-foreground mb-6"
                >
                    <span>A passionate</span>
                    <AnimatedWords words={words} />
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    I craft immersive digital experiences with clean code and modern design.
                    Passionate about building things that make a difference on the web.
                </motion.p>

                {/* Social CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    {socialLinks.map(({ icon: Icon, label, href, color }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex items-center gap-2.5 px-6 py-3 glass-card border border-white/10 ${color} text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-white/8`}
                        >
                            <Icon size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                            {label}
                        </a>
                    ))}

                    <a
                        href="#projects"
                        className="glow-btn px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-300 hover:scale-105 hover:opacity-90"
                    >
                        View My Work →
                    </a>
                </motion.div>

            </div>
        </section>
    );
}

function AnimatedWords({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setTimeout(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 1500);
        return () => clearTimeout(id);
    }, [index, words.length]);

    return (
        <div className="relative overflow-hidden h-9 min-w-44 w-fit">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.38, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center text-2xl md:text-3xl font-semibold gradient-text whitespace-nowrap"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
