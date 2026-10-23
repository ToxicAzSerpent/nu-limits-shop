import React from "react";

export default function ShopBackground({ variant = "noir" }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-nu-void">
      <div className="nu-grid absolute inset-0" />

      {variant === "noir" && (
        <>
          <div className="nu-blob absolute left-[8%] top-[6%] h-[38vh] w-[38vh] rounded-full bg-fuchsia-600/20" />
          <div className="nu-blob absolute bottom-[-10%] right-[6%] h-[42vh] w-[42vh] rounded-full bg-indigo-700/20" />
        </>
      )}

      {variant === "aurora" && (
        <>
          <div className="nu-blob absolute -left-24 top-[-8%] h-[48vh] w-[48vh] animate-nu-drift rounded-full bg-fuchsia-500/35" />
          <div className="nu-blob absolute right-[-8%] top-[18%] h-[54vh] w-[54vh] animate-nu-drift rounded-full bg-indigo-500/30 [animation-delay:-6s]" />
          <div className="nu-blob absolute bottom-[-16%] left-[28%] h-[42vh] w-[42vh] animate-nu-drift rounded-full bg-purple-400/25 [animation-delay:-11s]" />
        </>
      )}

      {variant === "grid" && (
        <>
          <div className="nu-grid absolute inset-0 opacity-100 [background-size:46px_46px]" />
          <div className="nu-blob absolute bottom-[-20%] left-1/2 h-[40vh] w-[70vw] -translate-x-1/2 rounded-full bg-fuchsia-600/20" />
        </>
      )}

      {variant === "ember" && (
        <>
          <div className="nu-blob absolute bottom-[-24%] left-1/2 h-[58vh] w-[80vw] -translate-x-1/2 rounded-full bg-orange-600/25" />
          <div className="nu-blob absolute right-[8%] top-[-10%] h-[34vh] w-[34vh] rounded-full bg-fuchsia-600/20" />
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black/85 to-transparent" />
      <div className="nu-vignette absolute inset-0" />
    </div>
  );
}