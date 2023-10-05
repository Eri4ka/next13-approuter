import { Navigation } from '@/components/navigation/Navigation';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <span>Task tracker</span>
        <Navigation />
      </div>
    </header>
  );
};
