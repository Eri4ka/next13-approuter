'use client';

import { useState } from 'react';
import { Input } from '@/components/input/Input';
import { ModalLayout } from '@/components/modal/modal-layout/ModalLayout';
import { Button } from '@/components/button/Button';
import styles from './AddTaskModal.module.scss';
import { isEmptyStringField } from '@/utils/helpers/isEmptyStringField';

const AddTaskModal = ({ isOpen, onClose }) => {
  const [nameField, setNameField] = useState('');

  const isDisabled = isEmptyStringField(nameField);

  async function createTask(data) {
    const request = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await request.json();
    return responseData;
  }

  const setNameFieldHandler = (event) => {
    setNameField(event.target.value);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const requestData = { name: nameField };
    const data = await createTask(requestData);

    if (data.status === 'success') {
      onClose();
    }
  };

  return (
    <ModalLayout title="Создать новую задачу" isOpen={isOpen} onClose={onClose}>
      <form className={styles.form} onSubmit={submitFormHandler}>
        <Input
          label="Имя задачи"
          name="name"
          value={nameField}
          onChange={setNameFieldHandler}
        />
        <Button type="submit" disabled={isDisabled}>
          Создать
        </Button>
      </form>
    </ModalLayout>
  );
};

export default AddTaskModal;
