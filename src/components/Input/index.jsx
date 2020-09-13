import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Input.module.scss';

const Input = ({
  id, label, error, ...props
}) => (
  <div className={styles.container}>
    {label && <label htmlFor={id} className={styles.label}>{label}</label>}
    <input id={id} {...props} className={cn(styles.input, { [styles.errored]: error })} />
    {
        error && <span className={styles.error}>{error}</span>
      }
  </div>
);

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
};

Input.defaultProps = {
  id: '',
  label: '',
  error: '',
};

export default memo(Input);
