"use client";

export function Pill({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
}) {
  const styles = {
    default: "border-white/20 bg-white/5",
    success: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
    warning: "border-amber-500/50 bg-amber-500/10 text-amber-300",
    error: "border-red-500/50 bg-red-500/10 text-red-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
