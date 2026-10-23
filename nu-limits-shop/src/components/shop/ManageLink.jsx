import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function ManageLink() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const link = `${origin}/`;
  const embed = `<iframe src="${link}" style="width:100%;height:100vh;border:0" title="Nu Limits shop" allowfullscreen></iframe>`;
  const [copied, setCopied] = useState("");

  const copy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(""), 1600);
    } catch (e) {
      console.error(e);
    }
  };

  const blocks = [
    { key: "link", label: "Link to open the shop", value: link },
    { key: "embed", label: "Embed inside your HTML page", value: embed },
  ];

  return (
    <section>
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Link from your site</p>
      <p className="mt-2 text-xs leading-relaxed text-white/40">
        Publish the app, open this page on the live address, then copy the link or embed code here.
      </p>

      <div className="mt-3 space-y-3">
        {blocks.map((block) => (
          <div key={block.key} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{block.label}</p>
              <button
                type="button"
                onClick={() => copy(block.value, block.key)}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/60 transition hover:border-white/40 hover:text-white"
              >
                {copied === block.key ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied === block.key ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="nu-bar mt-2 overflow-x-auto whitespace-nowrap font-mono text-[11px] text-nu-accent">
              {block.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}