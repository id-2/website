import getStatus from '@/lib/status';
import { cn } from '@/lib/utils';
import type { ReactElement } from 'react';

if (!process.env.BETTERSTACK_URL) {
  throw new Error('Missing BETTERSTACK_URL environment variable');
}

const Status = async (): Promise<ReactElement> => {
  const status = await getStatus();

  let statusColor = 'bg-green-500';
  let statusLabel = 'All systems nominal';

  if (status === 0) {
    statusColor = 'bg-red-500';
    statusLabel = 'Degraded performance';
  } else if (status < 1) {
    statusColor = 'bg-yellow-500';
    statusLabel = 'Partial outage';
  }

  return (
    <a
      className="flex items-center gap-2.5 text-sm font-medium p-2"
      target="_blank"
      rel="noreferrer"
      href={process.env.BETTERSTACK_URL}
    >
      <span className="flex items-center justify-center w-5 h-5">
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              statusColor
            )}
          />
          <span
            className={cn(
              'relative inline-flex h-2 w-2 rounded-full',
              statusColor
            )}
          />
        </span>
      </span>
      <span className="text-zinc-500 dark:text-zinc-400">{statusLabel}</span>
    </a>
  );
};

export default Status;
