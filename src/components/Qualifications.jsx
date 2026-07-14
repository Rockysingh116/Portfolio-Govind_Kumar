import React from "react";
import { GraduationCap, Languages as LanguagesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SectionHeading from "./SectionHeading.jsx";
import { education, languages } from "../data/portfolio.js";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Qualifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="qualifications"
      className="relative surface py-24"
    >
      <div className="container mx-auto px-4">
        <SectionHeading inView={inView}>Education</SectionHeading>

        <motion.div
          ref={ref}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {education.map((item, index) => (
            <motion.div
              key={index}
              className="card group flex gap-4 rounded-xl p-6"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                <GraduationCap size={22} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                  <h4 className="text-lg font-semibold text-[var(--text)]">
                    {item.title}
                  </h4>
                  <span className="whitespace-nowrap text-sm text-[var(--text-muted)]">
                    {item.year}
                  </span>
                </div>
                <p className="mt-1 font-medium text-[var(--accent)]">
                  {item.institution}
                </p>
                <p className="mt-1 text-[var(--text-muted)]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Languages */}
        {languages?.length > 0 && (
          <motion.div
            className="mx-auto mt-10 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="flex items-center gap-2 text-[var(--text-muted)]">
                <LanguagesIcon size={20} /> Languages:
              </span>
              {languages.map((lang) => (
                <span
                  key={lang.name}
                  className="chip px-4 py-1.5 text-sm"
                >
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-[var(--accent)] dark:text-[var(--accent)]">
                    {" "}
                    · {lang.level}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Qualifications;
