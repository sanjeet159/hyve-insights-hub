import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-foreground p-10 text-center md:p-14"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20">
            <Mail className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-background md:text-3xl">
            Stay Updated with HYVE
          </h2>
          <p className="mt-3 text-background/70">
            Get the latest insights, freelance opportunities, and startup tips delivered to your inbox.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-xl border-0 bg-background/10 px-5 py-3.5 text-background outline-none placeholder:text-background/40 focus:ring-2 focus:ring-primary/50"
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30">
              Subscribe <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
