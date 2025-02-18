import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  { name: "PHP", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "Python", level: 75 },
  { name: "Java", level: 70 }
];

const frameworks = [
  { name: "Laravel", level: 90 },
  { name: "Node.js", level: 85 },
  { name: ".NET", level: 75 },
  { name: "React.js", level: 90 },
  { name: "Next.js", level: 85 }
];

export default function Skills() {
  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" id="skills">
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
          Technical Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ rotateY: 30, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full backdrop-blur-sm bg-background/50 border-primary/20 
                           hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Languages
                </h3>
                <div className="space-y-8">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ rotateY: -30, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full backdrop-blur-sm bg-background/50 border-primary/20 
                           hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Frameworks & Tools
                </h3>
                <div className="space-y-8">
                  {frameworks.map((framework, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{framework.name}</span>
                        <span className="text-primary">{framework.level}%</span>
                      </div>
                      <div className="relative h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${framework.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}