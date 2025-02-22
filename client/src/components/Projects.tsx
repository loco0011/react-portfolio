import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import { api } from "../lib/api"; // Adjust this import path to match your project structure
import { Loader2 } from "lucide-react"; // For loading state
import { useQuery } from "@tanstack/react-query";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  // Fetch projects data
  const {
    data: projectsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: api.getProjects,
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load projects. Please try again later.
      </div>
    );
  }

  // Handle empty state
  if (!projectsData || projectsData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        No projects found.
      </div>
    );
  }

  // Determine which projects to display
  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 2);

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" id="projects">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent heading-gradient">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id} // Use project.id as the key
              initial={{ opacity: 0, y: 20, rotateY: 30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full backdrop-blur-sm bg-background/50 border-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-foreground/80">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="group relative overflow-hidden"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FiGithub className="relative z-10" />
                        <span className="relative z-10">Code</span>
                        <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="group relative overflow-hidden"
                      asChild
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FiExternalLink className="relative z-10" />
                        <span className="relative z-10">Demo</span>
                        <div className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {!showAll && projectsData.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={() => setShowAll(true)}
              size="lg"
              className="relative group gradient-bg overflow-hidden"
            >
              <span className="relative z-10">Load More Projects</span>
              <div className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}