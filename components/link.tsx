import NextLink from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentProps, FC } from 'react';

type LinkProps = {
  readonly href: string;
  readonly children: ComponentProps<'a'>['children'];
  readonly className?: string;
};

export const Link: FC<LinkProps> = ({ href, className, ...props }) => {
  const isExternal = href.startsWith('http');
  const classNames = cn(
    'transition-colors',
    'decoration-zinc-300 hover:decoration-zinc-400',
    'dark:decoration-zinc-700 dark:hover:decoration-zinc-600',
    className
  );

  if (isExternal) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames}
        {...props}
      />
    );
  }

  return <NextLink href={href} className={classNames} {...props} />;
};
