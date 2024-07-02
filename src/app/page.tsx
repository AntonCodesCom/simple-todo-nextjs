import { redirect } from 'next/navigation';
import { UnauthorizedException } from '~/Auth/exceptions';
import fetchMe from '~/Auth/utils/fetchMe';
import CommonLayout from '~/Common/components/Layout';
import TodoMain from '~/Todo/components/Main';
import TodoItem, { todoItemSchema } from '~/Todo/types/Item';
import { getAuthCookie } from '~/auth-cookie';
import env from '~/env';

// server action
async function me() {
  const { apiBaseUrl } = env();
  const authCookie = getAuthCookie();
  if (!authCookie) {
    return redirect('/login');
  }
  const accessToken = authCookie.value;
  try {
    const { username } = await fetchMe(accessToken, apiBaseUrl);
    return username;
  } catch (err) {
    if (err instanceof UnauthorizedException) {
      return redirect('/login');
    }
    throw err;
  }
}

// utility
async function fetchTodos(
  accessToken: string,
  apiBaseUrl: string,
): Promise<TodoItem[]> {
  const url = new URL('todo', apiBaseUrl);
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ['todos'] },
  });
  if (!res.ok) {
    throw new Error('Unexpected error occurred while fetching todos.');
  }
  const data = await res.json();
  return todoItemSchema
    .array()
    .parse(data)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

// server action
async function getTodos(): Promise<TodoItem[]> {
  const { apiBaseUrl } = env();
  const authCookie = getAuthCookie();
  if (!authCookie) {
    throw new UnauthorizedException();
  }
  return await fetchTodos(authCookie.value, apiBaseUrl);
}

/**
 * Index route component.
 */
export default async function RouteIndex() {
  const username = await me();
  const todos = await getTodos();
  return (
    <CommonLayout username={username}>
      <TodoMain todos={todos} />
    </CommonLayout>
  );
}
