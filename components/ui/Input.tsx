import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  readonly label?: string;
  readonly hint?: string;
  readonly error?: string;
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
  readonly inputSize?: "sm" | "md" | "lg";
};

const SIZE_CLASS = {
  sm: "h-control-sm text-sm",
  md: "h-control-md text-sm",
  lg: "h-control-lg text-base",
} as const;

export function Input({
  label,
  hint,
  error,
  leading,
  trailing,
  inputSize = "md",
  className,
  id,
  disabled,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name;

  return (
    <label className="flex w-full flex-col gap-2">
      {label ? (
        <span className="text-sm font-medium text-ink">{label}</span>
      ) : null}
      <span
        className={cn(
          "flex items-center gap-2 rounded-control border bg-surface-elevated px-3 transition-colors duration-motion-fast",
          error ? "border-danger" : "border-border focus-within:border-border-brand",
          disabled && "opacity-50",
          SIZE_CLASS[inputSize],
          className,
        )}
      >
        {leading ? (
          <span className="shrink-0 text-ink-subtle">{leading}</span>
        ) : null}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className="h-full w-full min-w-0 bg-transparent text-ink placeholder:text-ink-subtle focus:outline-none"
          {...rest}
        />
        {trailing ? (
          <span className="shrink-0 text-ink-subtle">{trailing}</span>
        ) : null}
      </span>
      {error ? (
        <span className="text-xs text-danger" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="text-xs text-ink-subtle">{hint}</span>
      ) : null}
    </label>
  );
}
