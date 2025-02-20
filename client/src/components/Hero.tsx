"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"

const roles = [
  "console.log('Software Development Engineer');",
  "function() { return 'Full Stack Developer'; }",
  "while(true) { solve('Problems'); }",
  "import { success } from 'tech-enthusiasm';",
]

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    if (currentRoleIndex >= roles.length) {
      setCurrentRoleIndex(0)
      return
    }

    const currentRole = roles[currentRoleIndex]

    if (displayedText.length < currentRole.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1))
      }, 50) // Adjust typing speed here
      return () => clearTimeout(timeoutId)
    } else {
      setIsTypingComplete(true)
      const timeoutId = setTimeout(() => {
        setIsTypingComplete(false)
        setDisplayedText("")
        setCurrentRoleIndex((prevIndex) => prevIndex + 1)
      }, 2000) // Wait time before moving to next role
      return () => clearTimeout(timeoutId)
    }
  }, [currentRoleIndex, displayedText])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden" id="hero">
      {/* Background gradient */}
      <div className="absolute blink inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Animated blob */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-[500px] h-[500px] rounded-full bg-primary/20 filter blur-3xl"
        />
      </div>

      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-8 bg-clip-text title-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hi, I'm Sambit
        </motion.h1>

        <div className="h-20 mb-12 flex items-center justify-center">
          <motion.div
            key={currentRoleIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative font-mono dark:text-white text-xl"
          >
            {displayedText}
            <motion.span
              animate={{ opacity: isTypingComplete ? [0, 1] : 0 }}
              transition={{
                duration: 0.5,
                repeat: isTypingComplete ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
              }}
              className="absolute"
            >
              |
            </motion.span>
          </motion.div>
        </div>

        <motion.div
          className="flex gap-8 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4"
            whileHover={{ scale: 1.1 }}
          >
            <FiGithub className="text-3xl group-hover:text-primary transition-colors z-10 relative" />
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform" />
          </motion.a>

          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4"
            whileHover={{ scale: 1.1 }}
          >
            <FiLinkedin className="text-3xl group-hover:text-primary transition-colors z-10 relative" />
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform" />
          </motion.a>

          <motion.a href="mailto:contact@example.com" className="group relative p-4" whileHover={{ scale: 1.1 }}>
            <FiMail className="text-3xl group-hover:text-primary transition-colors z-10 relative" />
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}

