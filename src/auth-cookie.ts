import { cookies } from 'next/headers';
import { mode } from './env';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const name = 'session';

export function getAuthCookie(): RequestCookie | undefined {
  return cookies().get(name);
}

export function setAuthCookie(accessToken: string): void {
  const { isDev } = mode();
  cookies().set({
    name,
    value: accessToken,
    httpOnly: true,
    secure: false, // TODO: true for non-development, env var
    path: '/',
    sameSite: isDev ? 'strict' : 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  // TODO: sign cookie
}

export function deleteAuthCookie(): void {
  cookies().delete(name);
}
