import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
const fs = require('fs');
const path = require('path');
import tasksList from '../data/tasksList.json';

const filePath = path.resolve(process.cwd(), 'src/app/api/data/tasksList.json');

export async function GET() {
  function sleep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  await sleep();

  return NextResponse.json(tasksList);
}

export async function POST(request) {
  try {
    const requestData = await request.json();
    const highestId = Math.max(...tasksList.map((item) => item.id));
    const newTask = { id: highestId + 1, ...requestData };
    tasksList.push(newTask);

    fs.writeFileSync(filePath, JSON.stringify(tasksList));
    revalidateTag('task');
    return NextResponse.json({ status: 'success', data: newTask });
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const requestData = await request.json();

    fs.writeFileSync(filePath, JSON.stringify(requestData));
    revalidateTag('task');
    return NextResponse.json({ status: 'success', data: requestData });
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
