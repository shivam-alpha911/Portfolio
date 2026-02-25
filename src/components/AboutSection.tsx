"use client";

import { motion } from "framer-motion";

const skills = [
    "React", "Next.js", "TypeScript", "Node.js",
    "Tailwind CSS", "Framer Motion", "Python", "Git",
    "REST APIs", "MongoDB", "PostgreSQL", "Docker",
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutSection() {
    return (
        <section id="about" className="relative py-32 px-6 overflow-hidden">
            {/* Subtle side glow */}
            <div
                className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, oklch(0.72 0.2 290 / 12%) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            <div className="max-w-6xl mx-auto">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-4 mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
                    <div className="flex-1 h-px bg-border max-w-xs" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Text block */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-5"
                    >
                        {[
                            `I'm Shivam — a developer who got hooked on web tech and never really stopped. I build things for the internet, mostly with React and Next.js, and I genuinely enjoy the whole process — even the parts that don't work the first time.`,
                            `I care a lot about how things feel to use. Animations, transitions, the way a page responds to a click — those details matter to me, maybe more than they should.`,
                            `Outside of coding, I grind LeetCode problems (sometimes voluntarily), watch way too much YouTube about things that may or may not relate to my projects, and occasionally touch grass.`,
                            `If you're building something interesting and want an extra pair of hands, hit me up.`,
                        ].map((text, i) => (
                            <motion.p
                                key={i}
                                variants={itemVariants}
                                className="text-muted-foreground leading-relaxed text-base"
                            >
                                {text}
                            </motion.p>
                        ))}
                    </motion.div>

                    {/* Skills grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold mb-6 text-foreground/80">
                            Technologies I work with:
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, i) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.04, duration: 0.35 }}
                                    whileHover={{ scale: 1.08, y: -2 }}
                                    className="px-4 py-2 glass-card text-sm font-mono text-primary border border-primary/20 hover:border-primary/60 transition-all duration-200"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="grid grid-cols-3 gap-4 mt-10"
                        >
                            {[
                                { value: "1+", label: "Years Coding" },
                                { value: "10+", label: "Projects Built" },
                                { value: "∞", label: "Things to Learn" },
                            ].map(({ value, label }) => (
                                <div
                                    key={label}
                                    className="glass-card p-4 text-center border border-white/5 hover:border-primary/30 transition-colors duration-300"
                                >
                                    <div className="text-2xl font-extrabold gradient-text">{value}</div>
                                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
