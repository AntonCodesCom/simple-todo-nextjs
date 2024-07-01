import { authCookieName } from '~/auth-cookie';

export default async function generateSessionCookie(
  accessToken: string,
): Promise<{ name: string; value: string }> {
  return {
    name: authCookieName,
    value: accessToken, // TODO: sign
  };
}
