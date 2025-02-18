import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useParticles } from "@/lib/particles";

export default function Hero() {
  useParticles();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden" id="hero">
      <div id="particles-js" className="absolute inset-0" />
      
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hi, I'm Sambit Maity 👋
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          I build scalable fintech solutions & modern web applications
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button size="lg" className="hover:scale-105 transition-transform">
            View My Work
          </Button>
          <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          className="flex gap-6 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition-colors">
            <FiGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition-colors">
            <FiLinkedin />
          </a>
          <a href="mailto:contact@example.com" className="text-2xl hover:text-primary transition-colors">
            <FiMail />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
