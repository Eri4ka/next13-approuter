'use client';

import { Portal } from '@/components/portal/Portal';
import PropTypes from 'prop-types';
import styles from './ModalLayout.module.scss';

export const ModalLayout = ({ children, title, isOpen, onClose }) => {
  const modalContainer = document.querySelector('#modal-root');

  if (!isOpen) {
    return null;
  }

  return (
    <Portal container={modalContainer}>
      <div className={styles.wrapper}>
        <div className={styles.outer} onClick={onClose} />
        <div className={styles.modal}>
          {title && <span className={styles.modal__heading}>{title}</span>}
          <div className={styles.modal__content}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

Portal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
