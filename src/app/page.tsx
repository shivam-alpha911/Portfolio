"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ShaderBackground from "@/components/ShaderBackground";
import LoadingScreen from "@/components/LoadingScreen";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <main
        className="min-h-screen bg-background"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(12px)",
          transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
        }}
      >
        <ShaderBackground />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <Footer />
      </main>
    </>
  );
}

