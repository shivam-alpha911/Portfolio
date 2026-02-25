"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

function LeetCodeIcon({ size = 17 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.775-1.045-2.803-1.138l2.588-2.978A1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
    );
}

const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/shivam-alpha911" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/shivam-kumar-roy-b687a1315/" },
    { icon: Mail, label: "Gmail", href: "https://mail.google.com/mail/?view=cm&to=shivamroy26oc@gmail.com" },
    { icon: LeetCodeIcon, label: "LeetCode", href: "https://leetcode.com/u/SK_ROY_/" },
];

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/6 py-14 px-6 overflow-hidden">
            {/* Glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-40 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 100% at 50% 100%, oklch(0.72 0.2 290 / 8%) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center md:text-left"
                    >
                        <p className="text-xl font-bold gradient-text mb-1">Shivam Kumar Roy</p>
                        <p className="text-xs text-muted-foreground">Developer · Creator · Builder</p>
                    </motion.div>

                    {/* Nav links */}
                    <motion.nav
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex gap-6"
                    >
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
                            >
                                {label}
                            </a>
                        ))}
                    </motion.nav>

                    {/* Social icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-3"
                    >
                        {socialLinks.map(({ icon: Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-10 h-10 glass-card border border-white/8 flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all duration-250"
                            >
                                <Icon size={17} />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-px bg-white/6 my-8 origin-left"
                />

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1.5"
                >
                    <span>© {currentYear} Shivam Kumar Roy. Made with</span>
                    <Heart size={14} className="text-red-400 fill-red-400" />
                    <span>and lots of coffee.</span>
                </motion.div>
            </div>
        </footer>
    );
}
