import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { getAuthCookie, setAuthCookie } from '~/auth-cookie';

export default async function generateSessionCookie(
  accessToken: string,
): Promise<RequestCookie> {
  setAuthCookie(accessToken);
  const cookie = getAuthCookie();
  return cookie!;
}
