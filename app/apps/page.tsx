import { Link } from '@/components/link';
import { Container } from '@/components/container';
import apps from '@/data/apps.json';
import { createMetadata } from '@/lib/metadata';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Apps';
const description = 'Things I have built.';

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/apps',
});

const Project: FC<{
  readonly data: (typeof apps)[number];
}> = ({ data }) => (
  <Link
    href={data.link}
    key={data.name}
    className={cn('no-underline relative pl-6', data.caption && 'opacity-50')}
  >
    <div className="bg-zinc-200 dark:bg-zinc-800 absolute -left-2 top-1.5 w-4 h-4 rounded-full ml-[0.5px]" />
    <div className="flex items-center gap-2">
      <p className="m-0 font-medium">{data.name}</p>
      {data.caption ? (
        <Badge variant="secondary" className="rounded-full">
          {data.caption}
        </Badge>
      ) : null}
    </div>
    <p className="font-normal m-0 text-zinc-500 dark:text-zinc-400">
      {data.description}
    </p>
  </Link>
);

const Apps: FC = () => (
  <Container>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 grid gap-8 relative">
      <div className="w-px bottom-9 absolute left-0 top-2 bg-zinc-200 dark:bg-zinc-800" />
      {apps.map((product) => (
        <Project data={product} key={product.name} />
      ))}
    </div>
  </Container>
);

export default Apps;
