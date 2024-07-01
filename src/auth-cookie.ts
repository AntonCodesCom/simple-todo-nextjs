import { cookies } from 'next/headers';
import { mode } from './env';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const authCookieName = 'session';

export function getAuthCookie(): RequestCookie | undefined {
  return cookies().get(authCookieName);
}

export function setAuthCookie(accessToken: string): void {
  const { isDev } = mode();
  cookies().set({
    name: authCookieName,
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
  cookies().delete(authCookieName);
}
