'use server';

import { cookies } from 'next/headers';
import { IS_AUTH_COOKIE_KEY } from '@/constants';

export async function checkAuth() {
  return Boolean(cookies().get(IS_AUTH_COOKIE_KEY));
}
