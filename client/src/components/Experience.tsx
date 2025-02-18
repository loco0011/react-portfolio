import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  achievements: string[];
}

const experiences: Experience[] = [
  {
    year: "2023",
    title: "Software Development Engineer",
    company: "Current Company",
    description: "Leading fintech solutions development",
    tech: ["Node.js", "React", "TypeScript", "AWS"],
    achievements: [
      "Implemented scalable payment processing system",
      "Reduced API response time by 40%",
      "Led team of 5 developers"
    ]
  },
  {
    year: "2022",
    title: "Associate Software Engineer",
    company: "Previous Company",
    description: "Full-stack development with modern technologies",
    tech: ["Python", "Django", "PostgreSQL", "Docker"],
    achievements: [
      "Built real-time analytics dashboard",
      "Optimized database queries improving performance by 50%",
      "Mentored junior developers"
    ]
  }
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden min-h-screen" id="experience">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          Journey So Far
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary via-primary to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="mb-20"
            >
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Year marker */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-20"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer"
                       onClick={() => setActiveIndex(index === activeIndex ? null : index)}>
                    <div className="w-4 h-4 rounded-full bg-background" />
                  </div>
                </motion.div>

                {/* Content card */}
                <motion.div
                  className={`md:col-span-2 perspective-1000`}
                  animate={{ 
                    rotateX: activeIndex === index ? 0 : 15,
                    scale: activeIndex === index ? 1.02 : 1
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <Card className="glass-effect overflow-hidden">
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <motion.h3 
                            className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
                          >
                            {exp.title}
                          </motion.h3>
                          <p className="text-lg mb-4 text-white/80">{exp.company}</p>
                          <p className="text-white/60 mb-6">{exp.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {exp.tech.map((tech, i) => (
                              <span key={i} className="px-3 py-1 rounded-full text-sm bg-primary/20 text-white/90">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: activeIndex === index ? 1 : 0.7, x: 0 }}
                          className="space-y-4"
                        >
                          <h4 className="font-semibold text-lg mb-4 text-white/90">Key Achievements</h4>
                          {exp.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <p className="text-white/70">{achievement}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
