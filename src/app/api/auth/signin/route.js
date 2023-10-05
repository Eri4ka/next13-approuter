import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { IS_AUTH_COOKIE_KEY } from '@/constants';
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(process.cwd(), 'src/app/api/data/usersList.json');

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const users = fs.readFileSync(filePath, 'utf-8');
    const parsedUsers = JSON.parse(users);

    const user = parsedUsers.find((item) => item.email === email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid email or password' },
        { status: 400 }
      );
    }

    cookies().set(IS_AUTH_COOKIE_KEY, 'true');

    return NextResponse.json({
      status: 'success',
      data: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e) {
    return NextResponse.json(
      { status: 'error', message: 'Something wrong' },
      { status: 500 }
    );
  }
}
