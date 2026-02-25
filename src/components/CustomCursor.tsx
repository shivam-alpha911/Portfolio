"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    const isHovering = useRef(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => {
            isHovering.current = true;
        };
        const handleMouseLeave = () => {
            isHovering.current = false;
        };

        const interactiveEls = document.querySelectorAll("a, button, [data-cursor]");
        interactiveEls.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            interactiveEls.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Dot — instant follow */}
            <motion.div
                className="cursor-dot"
                style={{ x: mouseX, y: mouseY }}
            />
            {/* Ring — spring follow */}
            <motion.div
                className="cursor-ring"
                style={{ x: ringX, y: ringY }}
                animate={{ scale: isHovering.current ? 1.6 : 1 }}
                transition={{ duration: 0.15 }}
            />
        </>
    );
}
