"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-300 ${scrolled
                ? "py-3 backdrop-blur-xl border-b border-white/6"
                : "py-5"
                }`}
            style={scrolled ? { background: "oklch(0.06 0.01 265 / 80%)" } : {}}
        >
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="group flex items-center gap-2.5">
                    <span
                        className="text-xl font-bold tracking-tight"
                        style={{
                            fontFamily: "var(--font-space), sans-serif",
                            background: "linear-gradient(135deg, #f5a623 0%, #c2449f 50%, #4a90d9 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        SKROY
                    </span>
                </a>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map(({ label, href }, i) => (
                        <motion.a
                            key={label}
                            href={href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (i + 1), duration: 0.4 }}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                        >
                            {label}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                        </motion.a>
                    ))}

                    <motion.a
                        href="https://mail.google.com/mail/?view=cm&to=shivamroy26oc@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="px-4 py-1.5 text-sm border border-primary/40 text-primary rounded-lg hover:bg-primary/10 transition-all duration-200 font-medium"
                    >
                        Contact Me
                    </motion.a>
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden p-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={open ? "x" : "menu"}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden border-t border-white/6"
                        style={{ background: "oklch(0.06 0.01 265 / 95%)" }}
                    >
                        <div className="px-6 py-5 flex flex-col gap-5">
                            {navItems.map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {label}
                                </a>
                            ))}
                            <a
                                href="https://www.linkedin.com/in/shivam-kumar-roy-b687a1315/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary font-medium"
                                onClick={() => setOpen(false)}
                            >
                                Contact Me →
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
