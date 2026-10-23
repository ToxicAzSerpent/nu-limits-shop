import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatPrice } from "@/lib/shop";

export default function InventoryTile({ item, currency, onSelect, index = 0 }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(item)}
      className="group relative aspect-square overflow-hidden rounded-[22px] border border-white/10 bg-white/5 text-left"
    >
      <Image
        src={item.image_url}
        alt={item.name}
        className="h-full w-full transition-transform duration-700 group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
      <span className="absolute inset-x-3 bottom-2.5 block">
        <span className="block truncate text-[10px] font-medium uppercase tracking-[0.16em] text-white">
          {item.name}
        </span>
        <span className="mt-0.5 block text-[10px] text-nu-accent">
          {formatPrice(item.price, currency)}
        </span>
      </span>
      <span className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition group-hover:bg-nu-accent group-hover:opacity-100">
        <Plus className="h-3.5 w-3.5" />
      </span>
    </motion.button>
  );
}