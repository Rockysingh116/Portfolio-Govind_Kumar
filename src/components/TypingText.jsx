import React, { useEffect, useState } from "react";

/**
 * Cycles through `words`, typing and deleting each one with a blinking cursor.
 */
const TypingText = ({ words, className = "" }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const atFullWord = text === current;
    const atEmpty = text === "";

    let delay = deleting ? 60 : 110;
    if (atFullWord && !deleting) delay = 1400; // pause on full word
    if (atEmpty && deleting) delay = 300; // pause before next word

    const timeout = setTimeout(() => {
      if (!deleting && atFullWord) {
        setDeleting(true);
      } else if (deleting && atEmpty) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-0.5 animate-blink bg-[var(--accent)] align-middle">
        &nbsp;
      </span>
    </span>
  );
};

export default TypingText;
