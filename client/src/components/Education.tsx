import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const education = {
  degree: "B.Tech in Computer Science & Engineering (CSE)",
  university: "Your University Name",
  duration: "2018 - 2022",
  cgpa: "8.5",
  achievements: [
    "First Class with Distinction",
    "Member of Technical Club",
    "Participated in National Level Hackathons"
  ]
};

export default function Education() {
  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" id="education">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 animate-gradient-xy" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          Education
        </h2>

        <motion.div
          initial={{ rotateY: 30, scale: 0.9 }}
          whileInView={{ rotateY: 0, scale: 1 }}
          whileHover={{ rotateY: 5, scale: 1.02 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <Card className="backdrop-blur-sm bg-background/50 border-primary/20 
                        hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <CardContent className="p-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  {education.degree}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">{education.university}</span>
                    <span className="text-primary">{education.duration}</span>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 bg-primary/5 rounded-lg"
                  >
                    <div className="text-center">
                      <span className="text-sm text-foreground/60">CGPA</span>
                      <div className="text-3xl font-bold text-primary">{education.cgpa}</div>
                    </div>
                  </motion.div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground/80">Achievements</h4>
                    {education.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-foreground/70">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
