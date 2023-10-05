'use client';

import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styles from './TaskItem.module.scss';
import { Button } from '@/components/button/Button';
import { useRouter } from 'next/navigation';

export const TaskItem = ({ item }) => {
  const router = useRouter();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  async function deleteTask(id) {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const deleteItemHandler = (event) => {
    event.stopPropagation();

    deleteTask(item.id);
  };

  const openItemHandler = () => {
    router.push(`tasks/${item.id}`);
  };

  return (
    <li
      className={`${styles.item} ${isDragging && styles.item_active}`}
      ref={setNodeRef}
      style={style}
      onClick={openItemHandler}
      {...attributes}
      {...listeners}
    >
      {item.name}
      <Button onClick={deleteItemHandler}>Удалить</Button>
    </li>
  );
};

TaskItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
