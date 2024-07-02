'use server';
import { redirect } from 'next/navigation';
import AuthLoggedInSchema, {
  authLoggedInSchema,
} from '~/Auth/types/LoggedInSchema';
import { setAuthCookie } from '~/auth-cookie';
import env from '~/env';

// exception
class ConflictException extends Error {}

// utility
async function fetchSignup(
  username: string,
  password: string,
  apiBaseUrl: string,
): Promise<AuthLoggedInSchema> {
  const body = JSON.stringify({ username, password });
  const url = new URL('auth/signup', apiBaseUrl);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  if (!res.ok) {
    if (res.status === 409) {
      throw new ConflictException();
    }
    throw new Error('HTTP error occurred while fetching `POST /auth/login`.');
  }
  const data = await res.json();
  return authLoggedInSchema.parse(data);
}

// server action
export async function signup(
  username: string,
  password: string,
): Promise<boolean | never> {
  const { apiBaseUrl } = env();
  try {
    const { accessToken, username: fetchedUsername } = await fetchSignup(
      username,
      password,
      apiBaseUrl,
    );
    // TODO: username via a "me" cookie
    setAuthCookie(accessToken);
    return redirect('/');
  } catch (err) {
    if (err instanceof ConflictException) {
      return false;
    }
    throw err;
  }
}
