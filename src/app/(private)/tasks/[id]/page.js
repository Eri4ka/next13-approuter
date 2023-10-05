import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getTask(id) {
  const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    notFound();
  }

  return response.json();
}

export default async function TaskPage({ params }) {
  const task = await getTask(params.id);

  return (
    <div>
      <h1>Task {task.data.name}</h1>
      <Link href="/">go to main</Link>
    </div>
  );
}
