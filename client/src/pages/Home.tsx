import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <ThemeToggle />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
      </motion.div>
    </div>
  );
}