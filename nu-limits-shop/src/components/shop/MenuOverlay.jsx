import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

export default function MenuOverlay({ open, onClose, links = [] }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-nu-void backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between px-6 py-5 md:px-12">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Nu Limits</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-6 pb-16 md:px-16">
            {links.map((link, index) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * index + 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  onClose();
                  link.onClick?.();
                }}
                className="group flex items-baseline justify-between gap-6 border-b border-white/10 py-5 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-[10px] tracking-[0.3em] text-white/30">0{index + 1}</span>
                  <span className="font-nu text-[8vw] font-medium uppercase leading-[0.9] text-white/90 transition-colors group-hover:text-nu-accent md:text-[4vw]">
                    {link.label}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  {link.meta && (
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/35">{link.meta}</span>
                  )}
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition group-hover:text-nu-accent" />
                </span>
              </motion.button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}