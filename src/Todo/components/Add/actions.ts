'use server';
import { revalidateTag } from 'next/cache';
import { UnauthorizedException } from '~/Auth/exceptions';
import { getAuthCookie } from '~/auth-cookie';
import env from '~/env';

// utility
async function fetchAddTodo(
  label: string,
  accessToken: string,
  apiBaseUrl: string,
): Promise<void> {
  const url = new URL('todo', apiBaseUrl);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ label }),
  });
  if (!res.ok) {
    throw new Error('Unexpected error occurred while requesting POST /todo.');
  }
}

export async function addTodo(label: string): Promise<void> {
  const { apiBaseUrl } = env();
  const authCookie = getAuthCookie();
  if (!authCookie) {
    throw new UnauthorizedException();
  }
  const accessToken = authCookie.value;
  await fetchAddTodo(label, accessToken, apiBaseUrl);
  revalidateTag('todos');
}
