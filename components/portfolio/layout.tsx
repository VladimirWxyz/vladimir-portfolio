import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
export function Surface({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('surface', className)} {...props} />;
}
export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}
export function Section({
  id,
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="section container"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`}>{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
