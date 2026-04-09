import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) setSubmitted(true);
  };

  return (
    <section className="w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full overflow-hidden bg-foreground p-10 text-center md:p-14"
      >
        {/* Decorative glows */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
          />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30"
          >
            <Mail className="h-7 w-7 text-primary" />
          </motion.div>
          <h2 className="font-heading text-2xl font-bold text-background md:text-3xl">
            Stay Updated with HYVE
          </h2>
          <p className="mt-3 text-background/60 max-w-md mx-auto">
            Get the latest insights, freelance opportunities, and startup tips delivered to your inbox.
          </p>

          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-background/10 bg-background/10 px-5 py-3.5 text-background outline-none placeholder:text-background/35 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:bg-background/15"
              />
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Subscribe <Send className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex items-center justify-center gap-2 text-primary"
            >
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Thanks for subscribing!</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
