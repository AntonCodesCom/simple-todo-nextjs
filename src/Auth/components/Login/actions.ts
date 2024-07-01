'use server';
import { redirect } from 'next/navigation';
import { UnauthorizedException } from '~/Auth/exceptions';
import AuthLoggedInSchema, {
  authLoggedInSchema,
} from '~/Auth/types/LoggedInSchema';
import { setAuthCookie } from '~/auth-cookie';
import env from '~/env';

// utility
async function fetchLogin(
  username: string,
  password: string,
  apiBaseUrl: string,
): Promise<AuthLoggedInSchema> {
  const body = JSON.stringify({ username, password });
  const url = new URL('auth/login', apiBaseUrl);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new UnauthorizedException();
    }
    throw new Error('HTTP error occurred while fetching `POST /auth/login`.');
  }
  const data = await res.json();
  return authLoggedInSchema.parse(data);
}

// server action
export async function login(
  username: string,
  password: string,
): Promise<boolean | never> {
  const { apiBaseUrl } = env();
  try {
    const { accessToken, username: fetchedUsername } = await fetchLogin(
      username,
      password,
      apiBaseUrl,
    );
    setAuthCookie(accessToken);
    return redirect('/');
  } catch (err) {
    if (err instanceof UnauthorizedException) {
      return false;
    }
    throw err;
  }
}
