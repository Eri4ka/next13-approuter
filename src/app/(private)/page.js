import TasksList from '@/components/tasks/tasks-list/TasksList';

async function getTasksList() {
  const response = await fetch('http://localhost:3000/api/tasks', {
    next: { tags: ['task'] },
  });

  return response.json();
}

export default async function Home() {
  const data = await getTasksList();
  return <TasksList data={data} />;
}
