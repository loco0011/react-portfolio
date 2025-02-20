import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const education = {
  degree: "B.Tech in Computer Science & Engineering",
  university: "Pailan College of Management and Technology",
  duration: "2019 - 2023",
  cgpa: "9.08",
  achievements: [
    "First Class with Distinction",
    "Member of Technical Club",
    "Core Member of the Sports Committee"
  ]
};

export default function Education() {
  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" id="education">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent heading-gradient">
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
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-t from-black via-purple-800 to-primary">
                  {education.degree}
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">{education.university}</span>
                    <span className="text-purple/80">{education.duration}</span>
                  </div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 bg-primary/5 rounded-lg"
                  >
                     <div className="p-2">
                <div className="flex items-center justify-between">
                  <span className="text-foreground-800 font-medium">CGPA</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-400 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r to-purple-800 from-black rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(parseFloat(education.cgpa) / 10) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      />
                    </div>
                    <span className="font-bold text-lg">{education.cgpa}</span>
                  </div>
                </div>
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
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground/90" />
                        <span className="text-foreground/90">{achievement}</span>
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
