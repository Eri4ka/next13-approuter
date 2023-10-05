import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { IS_AUTH_COOKIE_KEY } from '@/constants';
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(process.cwd(), 'src/app/api/data/usersList.json');

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    const users = fs.readFileSync(filePath, 'utf-8');
    const parsedUsers = JSON.parse(users);

    const user = parsedUsers.find((item) => item.email === email);

    if (user) {
      return NextResponse.json(
        { status: 'error', message: 'User already exists' },
        { status: 400 }
      );
    }

    let highestId = 0;

    if (parsedUsers.length !== 0) {
      highestId = Math.max(...parsedUsers.map((item) => item.id));
    }

    const newUser = { id: highestId + 1, name, email, password };
    const newUsersData = [...parsedUsers, newUser];

    fs.writeFileSync(filePath, JSON.stringify(newUsersData));

    cookies().set(IS_AUTH_COOKIE_KEY, 'true');

    return NextResponse.json({
      status: 'success',
      data: newUser,
    });
  } catch (e) {
    return NextResponse.json(
      { status: 'error', message: 'Something wrong' },
      { status: 500 }
    );
  }
}
