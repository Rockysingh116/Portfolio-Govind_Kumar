import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SectionHeading from "./SectionHeading.jsx";
import { useToast } from "./Toast.jsx";
import { personal } from "../data/portfolio.js";

// ------------------------------------------------------------------
//  Web3Forms — free, no-backend contact form.
//  1. Go to https://web3forms.com, enter your email, get an access key.
//  2. Put it in a .env file at the project root as:
//        VITE_WEB3FORMS_KEY=your-access-key-here
//     (or paste it directly into FALLBACK_KEY below for a quick start).
//  Submissions are then emailed straight to you — nothing else to host.
// ------------------------------------------------------------------
const FALLBACK_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // EDIT ME (or use .env)
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || FALLBACK_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const contactInfo = [
  { Icon: Mail, text: personal.email, href: `mailto:${personal.email}`, copy: true },
  { Icon: Phone, text: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}` },
  { Icon: MapPin, text: personal.location, href: null },
];

const Contact = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending
  const [copied, setCopied] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const toast = useToast();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((s) => ({ ...s, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!formState.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      next.email = "Please enter a valid email address.";
    if (formState.message.trim().length < 10)
      next.message = "Your message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please copy it manually.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      toast.error(
        "Contact form isn't configured yet. Add your Web3Forms key to enable it."
      );
      return;
    }

    // Honeypot: bots fill hidden fields; humans don't.
    if (e.target.botcheck?.value) return;

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio message from ${formState.name}`,
          from_name: "Portfolio Contact Form",
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent! I'll get back to you soon. 🎉");
        setFormState({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Request failed");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Something went wrong. Please email me directly.");
    } finally {
      setStatus("idle");
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border bg-[var(--bg)] px-4 py-2.5 text-[var(--text)] transition-colors focus:outline-none focus:ring-1 ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
        : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]"
    }`;

  return (
    <section
      id="contact"
      className="relative surface-subtle py-24"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          inView={inView}
          subtitle="Got an idea, a role, or just want to say hi? Let's turn it into something real — my inbox is always open."
        >
          Let&apos;s Build Together
        </SectionHeading>

        <motion.div
          ref={ref}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Contact info */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 text-2xl font-semibold text-[var(--text)]">
              Contact Information
            </h3>
            <div className="space-y-4">
              {contactInfo.map(({ Icon, text, href, copy }) => {
                const content = (
                  <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ x: 8 }}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={20} />
                    </span>
                    <span className="text-[var(--text-muted)]">
                      {text}
                    </span>
                    {copy && (
                      <button
                        type="button"
                        onClick={(ev) => {
                          ev.preventDefault();
                          copyEmail();
                        }}
                        aria-label="Copy email address"
                        className="ml-1 text-gray-400 transition-colors hover:text-[var(--accent)] dark:hover:text-[var(--accent)]"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    )}
                  </motion.div>
                );
                return href ? (
                  <a key={text} href={href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={text}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot — hidden from humans, catches bots */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="mb-2 block text-[var(--text)]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-[var(--text)]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-[var(--text)]">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className={inputClass("message")}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full items-center justify-center gap-2 btn-primary py-3  disabled:cursor-not-allowed disabled:opacity-70"
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
