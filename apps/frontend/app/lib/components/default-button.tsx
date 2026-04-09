"use client";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge"; // Use isso para mesclar classes sem conflito

type ButtonProps = ComponentProps<"button"> & {
  label?: string;
};

export function DefaultButton({ label, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        // Classes base (incluindo a borda que faltava)
        "h-12 w-full mt-2 rounded-xl bg-indigo-600 text-white font-semibold text-base",
        "border border-indigo-500", // <-- A BORDA AGORA EXISTE
        "hover:bg-indigo-500 transition-all shadow-md active:scale-[0.98]",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900",
        className, // Mescla com o que vier de fora
      )}
    >
      {label}
    </button>
  );
}
