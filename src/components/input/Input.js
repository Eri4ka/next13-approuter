import PropTypes from 'prop-types';
import styles from './Input.module.scss';

export const Input = ({ label, type = 'text', name, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <input
        id={name}
        type={type}
        className={styles.input}
        placeholder=" "
        {...props}
      />
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
