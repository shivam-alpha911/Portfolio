"use client";

import { motion } from "framer-motion";
import { Rocket, Star } from "lucide-react";

const projects = [
    {
        title: "Project Alpha",
        description: "Something exciting is being built here. Details will be revealed soon.",
        tags: ["Coming Soon"],
        status: "Under Progress",
    },
    {
        title: "Project Beta",
        description: "This project is actively under development. Stay tuned for the big reveal.",
        tags: ["Coming Soon"],
        status: "Under Progress",
    },
    {
        title: "Project Gamma",
        description: "Work in progress — check back later to see what's cooking.",
        tags: ["Coming Soon"],
        status: "Under Progress",
    },
    {
        title: "Project Delta",
        description: "Currently being crafted with care. More info dropping soon.",
        tags: ["Coming Soon"],
        status: "Under Progress",
    },
    {
        title: "Project Epsilon",
        description: "An idea turning into reality. The full details are on their way.",
        tags: ["Coming Soon"],
        status: "Under Progress",
    },
    {
        title: "Project Zeta",
        description: "Under active construction — the best things take time.",
        tags: ["Coming Soon"],
        status: "Under Progress",
    },
];

export default function ProjectsSection() {
    return (
        <section id="projects" className="relative py-32 px-6 overflow-hidden">
            {/* Background glow */}
            <div
                className="absolute top-1/3 right-0 w-96 h-96 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, oklch(0.65 0.22 200 / 10%) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            <div className="max-w-6xl mx-auto">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-4 mb-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
                    <div className="flex-1 h-px bg-border max-w-xs" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-muted-foreground mb-16 ml-10"
                >
                    Projects are currently under progress — details coming soon.
                </motion.p>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-4">More projects coming soon…</p>
                    <a
                        href="https://github.com/shivam-alpha911"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-white/10 hover:border-primary/40 text-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                        <Star size={16} />
                        Follow on GitHub to stay updated
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

function ProjectCard({
    project,
    index,
}: {
    project: (typeof projects)[0];
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative glass-card border border-white/6 hover:border-primary/30 p-6 flex flex-col gap-4 transition-all duration-300 overflow-hidden"
        >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />

            {/* Status badge */}
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
                    <Rocket size={18} className="text-primary" />
                </div>
                <span className="flex items-center gap-1.5 text-xs text-amber-400/80 glass-card px-3 py-1 border border-amber-400/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                    </span>
                    {project.status}
                </span>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-all duration-300">
                    {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/5">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs font-mono text-primary/70 px-2 py-0.5 rounded bg-primary/8"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
