"use client";

/**
 * chat-ui-kit — minimal inlined UI primitives.
 *
 * The original CourseBloom components imported these from shadcn/ui
 * (`@/components/ui/*`) and `cn` from `@/lib/utils`. To keep chat-ui-kit
 * copy-paste portable (works in Vite/CRA/Next with just Tailwind), we inline
 * tiny, dependency-free versions here.
 *
 * Already have shadcn/ui in your project? You can delete this file and change
 * the imports in the chat components back to your own `@/components/ui/*`
 * primitives + `@/lib/utils` `cn` — the prop APIs match 1:1.
 */
import React from "react";

/** Join truthy class names. (A minimal `clsx`/`tailwind-merge` stand-in.) */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------- Avatar -------------------------------- */

export function Avatar({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function AvatarImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  return <img src={src} alt={alt} className="aspect-square h-full w-full object-cover" />;
}

export function AvatarFallback({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------- Alert -------------------------------- */

export function Alert({
  variant = "default",
  className,
  children,
}: {
  variant?: "default" | "destructive";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "relative flex w-full items-center gap-2 rounded-lg border px-4 py-3 text-sm",
        variant === "destructive"
          ? "border-destructive/50 text-destructive [&>svg]:text-destructive"
          : "bg-background text-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AlertDescription({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={cn("text-sm leading-relaxed", className)}>{children}</div>;
}

/* -------------------------------- Badge -------------------------------- */

export function Badge({
  variant = "default",
  className,
  children,
}: {
  variant?: "default" | "outline" | "destructive";
  className?: string;
  children?: React.ReactNode;
}) {
  const variants: Record<string, string> = {
    default: "border-transparent bg-primary text-primary-foreground",
    outline: "text-foreground",
    destructive: "border-transparent bg-destructive text-destructive-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------- Button ------------------------------- */

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: "default" | "icon";
  }
>(function Button({ className, size = "default", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground",
        "transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50",
        size === "icon" ? "h-10 w-10" : "h-10 px-4 py-2 text-sm font-medium",
        className
      )}
      {...props}
    />
  );
});

/* ------------------------------- Textarea ------------------------------ */

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
