import React from "react";
import { ArrowUpRight } from "lucide-react";

const SIZES = {
  sm: "py-1.5 pl-5 pr-1.5 text-[10px]",
  md: "py-2 pl-6 pr-2 text-[11px]",
  lg: "py-2.5 pl-7 pr-2.5 text-[11px]",
};

const ICON_SIZES = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};

export default function PillButton({
  children,
  onClick,
  variant = "solid",
  size = "md",
  icon: Icon = ArrowUpRight,
  type = "button",
  disabled,
  className = "",
}) {
  const skin =
    variant === "solid"
      ? "bg-nu-accent text-white hover:shadow-nu-glow"
      : "border border-white/20 text-white hover:border-white/50";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group inline-flex items-center justify-between gap-3 rounded-full font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none ${SIZES[size]} ${skin} ${className}`}
    >
      <span>{children}</span>
      <span
        className={`grid shrink-0 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45 ${ICON_SIZES[size]}`}
      >
        <Icon className="h-4 w-4" />
      </span>
    </button>
  );
}