import type { ComponentProps } from 'react';
import { actionClassNames, type ActionVariant } from './action-classes';

type ActionLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string;
  external?: boolean;
  variant?: ActionVariant;
};

export function ActionLink({
  href,
  external,
  variant = 'primary',
  className,
  children,
  ...props
}: ActionLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target={external ? '_blank' : props.target}
      rel={external ? 'noopener noreferrer' : props.rel}
      className={actionClassNames(variant, className)}
    >
      {children}
    </a>
  );
}
