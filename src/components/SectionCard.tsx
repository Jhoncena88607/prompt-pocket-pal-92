import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const SectionCard = ({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <section className={cn("surface rounded-xl border border-border", className)}>
    {(title || action) && (
      <header className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        {title && <h2 className="text-sm font-semibold text-foreground">{title}</h2>}
        {action}
      </header>
    )}
    <div className="p-5">{children}</div>
  </section>
);
