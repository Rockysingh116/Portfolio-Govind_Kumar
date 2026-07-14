import React from "react";
import { ArrowUpRight, Clock, PenLine, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SectionHeading from "./SectionHeading.jsx";
import Carousel from "./Carousel.jsx";
import ArticleCover from "./ArticleCover.jsx";
import { articles } from "../data/portfolio.js";

const ArticleCard = ({ article }) => {
  const isLive = !article.draft && article.link;
  const CardTag = isLive ? motion.a : motion.div;
  const linkProps = isLive
    ? { href: article.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <CardTag
      {...linkProps}
      className={`group flex h-full flex-col overflow-hidden card rounded-2xl shadow-md transition-all hover:shadow-xl dark:border-white/10  ${
        isLive ? "cursor-pointer" : ""
      }`}
      whileHover={{ y: -6 }}
    >
      {/* Cover image */}
      <div className="relative h-44 shrink-0 overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <ArticleCover
            image={article.image}
            cover={article.cover}
            title={article.title}
          />
        </div>
        {article.draft ? (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 shadow-sm dark:bg-amber-950/70 dark:text-amber-300">
            <PenLine size={12} /> Draft
          </span>
        ) : (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--accent)] shadow-sm transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
            <ArrowUpRight size={16} />
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="chip px-2.5 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-2 text-lg font-semibold leading-snug text-[var(--text)]">
          {article.title}
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-[var(--text-muted)]">
          {article.summary}
        </p>

        {article.excerpt && (
          <p className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]">
            {article.excerpt}
          </p>
        )}

        {article.points?.length > 0 && (
          <ul className="mb-5 space-y-1.5">
            {article.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
              >
                <Check size={15} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                {p}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-white/10 dark:text-gray-400">
          <span>{article.date}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {article.readTime}
          </span>
        </div>
      </div>
    </CardTag>
  );
};

const Articles = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!articles?.length) return null;

  return (
    <section
      id="articles"
      className="relative surface-subtle py-24"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          inView={inView}
          subtitle="Thoughts on engineering, AI, and the craft of building software. Swipe through what's on the way."
        >
          Articles & Writing
        </SectionHeading>

        <div ref={ref} className="mx-auto max-w-6xl">
          <Carousel
            items={articles}
            getKey={(a) => a.title}
            perView={{ base: 1, md: 2, lg: 3 }}
            autoPlay
            interval={6000}
            ariaLabel="Articles carousel"
            renderItem={(article) => <ArticleCard article={article} />}
          />
        </div>

        <motion.p
          className="mt-10 text-center text-sm text-[var(--text-muted)]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          ✍️ These posts are in the works — follow along and they’ll go live soon.
        </motion.p>
      </div>
    </section>
  );
};

export default Articles;
