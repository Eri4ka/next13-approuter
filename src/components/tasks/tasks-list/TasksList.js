'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import styles from './TasksList.module.scss';
import { TaskItem } from '../task-item/TaskItem';

const TasksList = ({ data }) => {
  const [optimisticData, setOptimisticData] = useState(data);
  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  async function updateTask(data) {
    const request = await fetch('http://localhost:3000/api/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await request.json();
    return responseData;
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = optimisticData.findIndex(
        (item) => active.id === item.id
      );
      const newIndex = optimisticData.findIndex((item) => over.id === item.id);

      const newData = arrayMove(optimisticData, oldIndex, newIndex);
      setOptimisticData(newData);
      updateTask(newData);
    }
  };

  useEffect(() => {
    setOptimisticData(data);
  }, [data]);

  return (
    <DndContext
      id={'unique-id'}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={optimisticData}
        strategy={verticalListSortingStrategy}
      >
        <section className={styles.wrapper}>
          <ul className={styles.list}>
            {optimisticData?.map((task) => (
              <TaskItem key={task.id} item={task} />
            ))}
          </ul>
        </section>
      </SortableContext>
    </DndContext>
  );
};

TasksList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

export default TasksList;
