'use client';

import { useContext } from 'react';

import { AuthContext } from '@/app/auth-provider';
import AddTask from '@/components/add-task/AddTask';
import { Button } from '@/components/button/Button';

import styles from './Navigation.module.scss';

export function Navigation() {
  const { authData, onLogout } = useContext(AuthContext);

  if (authData.auth) {
    return (
      <div className={styles.wrapper}>
        <AddTask />
        <Button onClick={onLogout}>Выйти</Button>
      </div>
    );
  }

  return null;
}
