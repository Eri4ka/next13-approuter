'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/button/Button';
import { useState, useEffect } from 'react';

const AddTaskModal = dynamic(() =>
  import('@/components/modal/add-task-modal/AddTaskModal')
);

const AddTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => setIsModalOpen(true);

  const closeModalHandler = () => setIsModalOpen(false);

  return (
    <>
      <Button onClick={openModalHandler}>Создать</Button>
      {isModalOpen && (
        <AddTaskModal isOpen={isModalOpen} onClose={closeModalHandler} />
      )}
    </>
  );
};

export default AddTask;
