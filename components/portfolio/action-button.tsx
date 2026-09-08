'use client';

import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { actionClassNames, type ActionVariant } from './action-classes';

type ActionButtonProps = Omit<ComponentProps<typeof Button>, 'variant'> & {
  variant?: ActionVariant;
};

export function ActionButton({
  variant = 'primary',
  className,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      {...props}
      variant="ghost"
      className={
        typeof className === 'function'
          ? (state) => actionClassNames(variant, className(state))
          : actionClassNames(variant, className)
      }
    />
  );
}
