import { motion } from "framer-motion";
import { ArrowRight, Users, Zap } from "lucide-react";

const FooterCTA = () => {
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-24">
      {/* Subtle mesh */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(220 20% 10%) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10"
          >
            <Zap className="h-6 w-6 text-primary" />
          </motion.div>

          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Ready to Work Smarter?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-lg">
            Join India's first team-based freelancing platform and unlock new possibilities.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://hyvefreelance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:gap-3"
            >
              Join as Freelancer <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://hyvefreelance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-8 py-4 font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:shadow-sm"
            >
              <Users className="h-4 w-4" /> Hire a Team
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
