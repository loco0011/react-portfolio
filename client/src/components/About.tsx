import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const timelineItems = [
  {
    year: "2023",
    title: "Software Development Engineer",
    company: "Current Company",
    description: "Working on fintech solutions and web applications"
  },
  {
    year: "2022",
    title: "Associate Software Engineer",
    company: "Previous Company",
    description: "Developed full-stack applications using modern technologies"
  }
];

export default function About() {
  return (
    <section className="py-20 px-4 md:px-8" id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
        
        <Card className="mb-12">
          <CardContent className="p-6">
            <p className="text-lg text-muted-foreground">
              I'm a passionate Software Development Engineer specializing in building scalable web applications
              and fintech solutions. With expertise in modern technologies and a keen eye for detail,
              I strive to create impactful digital experiences.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex gap-4"
            >
              <div className="w-24 flex-shrink-0 text-primary font-bold">
                {item.year}
              </div>
              <Card className="flex-grow">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
