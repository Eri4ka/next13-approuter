import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
const fs = require('fs');
const path = require('path');
import tasksList from '../../data/tasksList.json';

const filePath = path.resolve(process.cwd(), 'src/app/api/data/tasksList.json');

export async function GET(request, { params }) {
  const id = +params.id;
  const task = tasksList.filter((task) => task.id === id)[0];

  if (!task) {
    return NextResponse.json({ status: 'error' }, { status: 404 });
  }

  return NextResponse.json({ status: 'success', data: task }, { status: 200 });
}

export async function DELETE(request, { params }) {
  try {
    const id = +params.id;
    const newTasksList = tasksList.filter((item) => item.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(newTasksList));
    revalidateTag('task');
    return NextResponse.json({ status: 'success', data: id });
  } catch (e) {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
