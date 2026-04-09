import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge"; // Recomendado instalar: pnpm add tailwind-merge

type InputProps = ComponentProps<"input"> & {
  label?: string;
  errorMessage?: string;
  variant?: "primary" | "secondary";
};

export function InputField({
  label,
  errorMessage,
  variant = "primary",
  className, // Extraímos o className das props
  ...props
}: InputProps) {
  // Definimos a borda baseada na variante ou estado de erro
  const variantClasses =
    variant === "primary" ? "border-indigo-700" : "border-zinc-300";
  const errorClasses = errorMessage ? "border-red-500" : variantClasses;

  return (
    <div className="flex flex-col w-full gap-x-2 gap-y-5  items-center">
      {label && (
        // biome-ignore lint/a11y/noLabelWithoutControl: ignore this
        <label className="text-sm font-medium text-white">{label}</label>
      )}

      <input
        className={twMerge(
          "border-2 border-indigo-700 w-full rounded-lg py-1.5 px-1.5 text-indigo-700 outline-none",
          errorClasses,
          className,
        )}
        {...props} 
      />

      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
}
