import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api"; // Adjust this import path to match your project structure
import { Loader2 } from "lucide-react"; // For loading state

export default function Education() {
  // Fetch education data
  const {
    data: educationData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["education"],
    queryFn: api.getEducation,
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load education data. Please try again later.
      </div>
    );
  }

  // Handle empty state
  if (!educationData || educationData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        No education data found.
      </div>
    );
  }

  // Use the first education entry (assuming it's the most recent/relevant)
  const education = educationData[0];

  // Calculate CGPA progress (assuming CGPA is out of 10)
  const cgpaProgress = (parseFloat(education.cgpa) / 10) * 100;

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
          <Card className="backdrop-blur-sm bg-background/50 border-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
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
                              whileInView={{ width: `${cgpaProgress}%` }}
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