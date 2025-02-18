import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Send, MessageSquare } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon."
    });
    form.reset();
  };

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-gradient-start/50 to-bg-gradient-end/50" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Let's Connect</h2>
          <p className="text-text-secondary text-lg">Have a question or want to work together?</p>
        </motion.div>

        <Card className="backdrop-blur-sm bg-background/5 border-primary/20">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div>
                  <div className="relative">
                    <Input
                      placeholder="Your Name"
                      {...form.register("name")}
                      className="bg-background/10 border-primary/20 focus:border-primary transition-colors"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      {...form.register("email")}
                      className="bg-background/10 border-primary/20 focus:border-primary transition-colors"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <Textarea
                    placeholder="Your Message"
                    {...form.register("message")}
                    className="min-h-[150px] bg-background/10 border-primary/20 focus:border-primary transition-colors"
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-end"
              >
                <Button
                  type="submit"
                  className="group relative overflow-hidden px-6 py-3 bg-background/10 hover:bg-background/20 transition-colors"
                  size="lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Send Message</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-primary/20"
                    whileHover={{ scale: [null, 1.2, 1] }}
                    transition={{
                      duration: 0.3
                    }}
                  />
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center justify-center gap-2 text-text-secondary"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Average response time: 24 hours</span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}