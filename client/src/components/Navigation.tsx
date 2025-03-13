import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, PlayCircle } from "lucide-react";
import { api } from "@/lib/api";
import EasterEggGame from "./EasterEggGame"; // Adjust the path as needed

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
];

export default function Navigation({ logoData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showGameDropdown, setShowGameDropdown] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const simulateKeyPressRef = useRef<() => void | null>(null);

  // Track active section using Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Adjust this threshold as needed
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const toggleGameDropdown = () => {
    setShowGameDropdown(!showGameDropdown);
  };

  const simulateGameKeyPress = () => {
    const keys = ["G", "A", "M", "E"];
    let index = 0;

    const typeNextKey = () => {
      if (index < keys.length) {
        const keyEvent = new KeyboardEvent("keydown", {
          key: keys[index],
          code: `Key${keys[index]}`,
          bubbles: true,
        });
        document.dispatchEvent(keyEvent);
        index++;
        setTimeout(typeNextKey, 100);
      }
    };

    simulateKeyPressRef.current = typeNextKey;
    typeNextKey();
  };

  const startGame = () => {
    setShowGameDropdown(false);
    setGameActive(true);

    if (simulateKeyPressRef.current) {
      simulateKeyPressRef.current();
    } else {
      simulateGameKeyPress();
    }
  };

  const renderLogo = () => {
    if (!logoData?.storage_path) {
      return (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-full blur-md opacity-70 animate-pulse"></div>
          <button
            onClick={toggleGameDropdown}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-black text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
          >
            SM
          </button>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-full blur-md opacity-70 animate-pulse"></div>
        <button
          onClick={toggleGameDropdown}
          className="relative block w-10 h-10 rounded-full border border-primary/50 overflow-hidden"
        >
          <img
            src={api.getLogoUrl(logoData.storage_path)}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </button>
      </motion.div>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b dark:border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            {renderLogo()}

            <AnimatePresence>
              {showGameDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="absolute top-12 left-0 origin-top-left z-50"
                >
                  <div className="w-64 bg-black border border-primary/20 backdrop-blur-xl rounded-lg overflow-hidden shadow-lg shadow-primary/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-50"></div>
                    <div className="absolute inset-0 rounded-lg border border-primary opacity-25 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"></div>
                    <div className="relative p-4">
                      <div className="mb-3 text-center">
                        <motion.div
                          animate={{
                            textShadow: ["0 0 4px #fff, 0 0 10px var(--primary)", "0 0 4px #fff, 0 0 5px var(--primary)"],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          className="text-lg font-bold text-white"
                        >
                          🎮 Bored? Tap & Play! 🚀
                        </motion.div>
                        <p className="text-sm text-gray-300 mt-1">⚡ Quick feet or defeat? 💥</p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        className="w-full py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-purple-600 rounded-md text-white font-medium shadow-lg shadow-primary/25"
                      >
                        <PlayCircle size={18} />
                        <span>Play Game</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="hidden md:flex gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-sm header-text font-medium hover:text-primary transition-colors relative group ${
                  activeSection === item.href.slice(1) ? "text-primary" : ""
                }`}
                onClick={() => scrollToSection(item.href)}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 ${
                    activeSection === item.href.slice(1) ? "scale-x-100" : "group-hover:scale-x-100"
                  } transition-transform`}
                />
              </motion.button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </motion.nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed inset-0 z-40 backdrop-blur-lg pt-16 bg-background/90"
        >
          <div className="flex flex-col items-center gap-6 p-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full py-3 text-center text-lg font-medium hover:text-primary transition-colors"
                onClick={() => scrollToSection(item.href)}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <EasterEggGame />
    </>
  );
}