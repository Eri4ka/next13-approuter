import styles from './ErrorText.module.scss';

const ErrorText = ({ children }) => {
  return <span className={styles.text}>{children}</span>;
};

export default ErrorText;
