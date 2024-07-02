'use server';
import { UnauthorizedException } from '~/Auth/exceptions';
import { getAuthCookie } from '~/auth-cookie';
import env from '~/env';

// utility
interface Params {
  id: string;
  accessToken: string;
  apiBaseUrl: string;
  label?: string;
  done?: boolean;
}
async function updateTodo({
  id,
  accessToken,
  label,
  done,
  apiBaseUrl,
}: Params): Promise<void> {
  const url = new URL(`todo/${id}`, apiBaseUrl);
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ label, done }),
  });
  if (!res.ok) {
    throw new Error(
      'Unexpected error occurred while requesting PATCH /todo/:id.',
    );
  }
}

// server action
export async function toggleTodo(id: string, done: boolean) {
  const { apiBaseUrl } = env();
  const authCookie = getAuthCookie();
  if (!authCookie) {
    throw new UnauthorizedException();
  }
  const accessToken = authCookie.value;
  await updateTodo({ id, accessToken, done, apiBaseUrl });
}

// server action
export async function editTodo(id: string, label: string) {
  const { apiBaseUrl } = env();
  const authCookie = getAuthCookie();
  if (!authCookie) {
    throw new UnauthorizedException();
  }
  const accessToken = authCookie.value;
  await updateTodo({ id, accessToken, label, apiBaseUrl });
}
