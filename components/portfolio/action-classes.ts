import { cn } from '@/lib/utils';

export type ActionVariant = 'primary' | 'outline' | 'ghost';

export function actionClassNames(variant: ActionVariant, className?: string) {
  return cn('action', `action-${variant}`, className);
}
