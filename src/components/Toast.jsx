import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

/**
 * Lightweight toast system. Wrap the app in <ToastProvider> and call
 * `useToast()` anywhere to push a toast:
 *   const toast = useToast();
 *   toast.success("Copied!");
 *   toast.error("Something went wrong");
 *   toast.info("Heads up");
 */

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const ACCENT = {
  success: "text-green-500",
  error: "text-red-500",
  info: "text-[var(--accent)]",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "info", duration = 4000) => {
      const id = ++idRef.current;
      setToasts((list) => [...list, { id, message, type }]);
      if (duration > 0) setTimeout(() => remove(id), duration);
      return id;
    },
    [remove]
  );

  const api = useRef({
    push,
    success: (m, d) => push(m, "success", d),
    error: (m, d) => push(m, "error", d),
    info: (m, d) => push(m, "info", d),
  }).current;

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-full max-w-sm flex-col gap-3 px-4 sm:px-0"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence initial={false}>
          {toasts.map(({ id, message, type }) => {
            const Icon = ICONS[type] || Info;
            return (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto flex items-start gap-3 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-md dark:border-white/10 /95"
                role="status"
              >
                <Icon size={20} className={`mt-0.5 shrink-0 ${ACCENT[type]}`} />
                <p className="flex-1 text-sm text-gray-800 dark:text-gray-100">
                  {message}
                </p>
                <button
                  onClick={() => remove(id)}
                  aria-label="Dismiss notification"
                  className="text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Fail-safe no-op so components never crash if used outside the provider.
    return { push() {}, success() {}, error() {}, info() {} };
  }
  return ctx;
}
