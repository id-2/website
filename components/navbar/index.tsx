import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';
import Status from '@/components/status';
import { Navigation } from './navigation';
import { Profile } from './profile';
import type { FC } from 'react';

export const Navbar: FC = () => (
  <div
    className={cn(
      'fixed left-0 top-0 bottom-0 w-60 flex flex-col py-2 border-r overflow-y-auto',
      'bg-white dark:bg-zinc-800',
      'border-zinc-200 dark:border-zinc-800'
    )}
  >
    <Profile />
    <Navigation />
    <section className="p-4">
      <p className="mx-2 mb-2 text-xs font-semibold tracking-wide uppercase text-zinc-600 dark:text-zinc-400">
        Other
      </p>
      <div className="flex flex-col gap-0.5">
        <ModeToggle />
        <Status />
      </div>
    </section>
  </div>
);