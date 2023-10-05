'use server';

import { cookies } from 'next/headers';
import { IS_AUTH_COOKIE_KEY } from '@/constants';

export async function logout() {
  cookies().delete(IS_AUTH_COOKIE_KEY);
}
