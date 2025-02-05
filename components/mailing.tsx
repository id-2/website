'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { parseError } from '@/lib/error';
import { isValidEmail } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { FC, FormEventHandler } from 'react';

const domain = 'app.loops.so';
const formId = 'clmnqcb4e024xma0or3stgrkd';

export const MailingList: FC = () => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const time = new Date();
    const timestamp = time.valueOf();
    const previousTimestamp = localStorage.getItem('loops-form-timestamp');

    if (disabled) {
      return;
    }

    setDisabled(true);

    try {
      if (
        previousTimestamp &&
        Number(previousTimestamp) + 60 * 1000 > timestamp
      ) {
        throw new Error('Too many signups, please try again in a little while');
      }

      localStorage.setItem('loops-form-timestamp', timestamp.toString());

      if (!isValidEmail(email)) {
        throw new Error('Please enter a valid email');
      }

      const formBody = new URLSearchParams({
        email,
      });

      const response = await fetch(
        `https://${domain}/api/newsletter-form/${formId}`,
        {
          method: 'POST',
          body: formBody.toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const data = (await response.json()) as {
        message?: string;
      };

      if (response.status === 429) {
        throw new Error('Too many signups, please try again in a little while');
      }

      if (!response.ok) {
        throw new Error(data.message ?? response.statusText);
      }

      setEmail('');
      toast.success("Thanks! We'll be in touch!");
    } catch (error) {
      const message = parseError(error);

      toast.error(message);
    } finally {
      localStorage.setItem('loops-form-timestamp', '');
      setDisabled(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row sm:items-center gap-2 max-w-sm w-full"
    >
      <Input
        type="text"
        name="email"
        placeholder="you@example.com"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        required
        className="bg-white dark:bg-zinc-800"
      />
      <Button
        type="submit"
        className="shrink-0"
        disabled={disabled || !email.trim() || !isValidEmail(email)}
      >
        {disabled ? 'Loading...' : 'Subscribe'}
      </Button>
    </form>
  );
};
