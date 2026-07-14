import React from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SectionHeading from "./SectionHeading.jsx";
import BrandLogo from "./BrandLogo.jsx";
import { certifications } from "../data/portfolio.js";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Certifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!certifications?.length) return null;

  return (
    <section
      id="certifications"
      className="relative surface-subtle py-24"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          inView={inView}
          subtitle="Always leveling up — credentials that back the skills."
        >
          Certifications
        </SectionHeading>

        <motion.div
          ref={ref}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="card group flex items-start gap-4 rounded-xl p-6 shadow-md transition-all hover:-translate-y-1.5 "
              variants={cardVariants}
              whileHover={{ y: -6 }}
            >
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <BrandLogo name={cert.issuer} domain={cert.domain} size={48} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[var(--text)]">
                  {cert.title}
                </h4>
                <p className="text-sm font-medium text-[var(--accent)]">
                  {cert.issuer}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {cert.year}
                </p>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent)] dark:text-[var(--accent)]"
                  >
                    View credential <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
