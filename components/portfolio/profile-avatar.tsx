'use client';
import { useLanguage, usePortfolio } from './language-provider';

import Image from 'next/image';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ActionButton } from './action-button';

export function ProfileAvatar() {
  const { t } = useLanguage();
  const { profile } = usePortfolio();

  if (!profile.avatarUrl) {
    return (
      <span className="brand-mark" aria-hidden="true">
        VW
      </span>
    );
  }

  return (
    <Dialog>
      <DialogTrigger
        className="avatar-trigger"
        aria-label={`${t('Ampliar fotografía de')} ${profile.name}`}
      >
        <Image
          className="brand-avatar"
          src={profile.avatarUrl}
          alt=""
          width={42}
          height={42}
          priority
        />
      </DialogTrigger>
      <DialogContent
        className="avatar-dialog"
        showCloseButton={false}
        aria-describedby="avatar-description"
      >
        <DialogTitle className="sr-only">
          {t('Fotografía de')} {profile.name}
        </DialogTitle>
        <DialogDescription id="avatar-description" className="sr-only">
          {t('Retrato profesional de')} {profile.name}, frontend developer.
        </DialogDescription>
        <Image
          className="avatar-full"
          src={profile.avatarUrl}
          alt={`${t('Retrato de')} ${profile.name}`}
          width={1000}
          height={1000}
          sizes="(max-width: 720px) calc(100vw - 2rem), 680px"
        />
        <div className="avatar-caption">
          <div>
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
          </div>
          <DialogClose
            render={
              <ActionButton
                variant="outline"
                className="action-icon"
                aria-label={t('Cerrar fotografía')}
              />
            }
          >
            <X aria-hidden="true" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
