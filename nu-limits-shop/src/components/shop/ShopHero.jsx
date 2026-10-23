import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import PillButton from "./PillButton";
import { formatPrice } from "@/lib/shop";

export default function ShopHero({ featured, settings, onBrowse, onSelect, loading }) {
  const words = (settings.store_name || "NU LIMITS").split(" ");

  return (
    <section className="relative flex min-h-[72vh] flex-col items-center justify-center py-6 lg:min-h-[84vh] lg:py-0">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="nu-outline select-none text-center font-nu text-[30vw] font-bold uppercase leading-[0.72] tracking-tighter lg:text-[12.5vw]"
        >
          {words.map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto h-[52vh] w-full max-w-[320px] overflow-hidden rounded-[150px_150px_30px_30px] border border-white/10 shadow-nu-soft sm:max-w-[390px] lg:h-[68vh] lg:max-w-[440px]"
      >
        {featured?.image_url && (
          <Image
            src={featured.image_url}
            alt={featured.name}
            className="h-full w-full"
            focalPointX={0.5}
            focalPointY={0.35}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 animate-nu-scan bg-gradient-to-b from-fuchsia-500/25 via-fuchsia-500/5 to-transparent" />
        {loading && <div className="absolute inset-0 animate-pulse bg-white/5" />}
      </motion.div>

      {featured && (
        <motion.button
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelect(featured)}
          className="nu-glass absolute bottom-[22%] right-0 z-20 hidden rounded-2xl px-4 py-3 text-left transition hover:border-white/25 lg:block"
        >
          <p className="text-[9px] uppercase tracking-[0.3em] text-nu-accent">Featured</p>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-white">{featured.name}</p>
          <p className="mt-1 text-[11px] text-white/45">{formatPrice(featured.price, settings.currency)}</p>
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="nu-glass relative z-20 mt-8 w-full max-w-[340px] rounded-[26px] p-5 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0"
      >
        <p className="text-[10px] uppercase tracking-[0.34em] text-nu-accent">{settings.hero_kicker}</p>
        <p className="mt-3 text-[13px] leading-relaxed text-white/60">{settings.hero_caption}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <PillButton onClick={onBrowse}>Discover</PillButton>
          {featured && (
            <button
              onClick={() => onSelect(featured)}
              aria-label={featured.name}
              className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/15 transition hover:border-white/40"
            >
              <Image src={featured.image_url} alt={featured.name} className="h-full w-full" />
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}