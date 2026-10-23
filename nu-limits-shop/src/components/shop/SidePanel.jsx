import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function SidePanel({ open, onClose, title, subtitle, children, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="side-panel"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col border-l border-nu-line bg-nu-ink"
          >
            <header className="flex items-start justify-between border-b border-nu-line px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-nu-accent">{subtitle}</p>
                <h2 className="mt-2 font-nu text-2xl uppercase tracking-tight text-white">{title}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="nu-bar flex-1 overflow-y-auto px-6 py-5">{children}</div>

            {footer && <div className="border-t border-nu-line px-6 py-4">{footer}</div>}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}