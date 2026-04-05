import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";

const FooterCTA = () => {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Ready to Work Smarter?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Join India's first team-based freelancing platform and unlock new possibilities.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://hyvefreelance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 hover:gap-3"
            >
              Join as Freelancer <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://hyvefreelance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-foreground/15 bg-card px-8 py-3.5 font-semibold text-foreground transition-all hover:border-primary hover:shadow-sm"
            >
              <Users className="h-4 w-4" /> Hire a Team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
