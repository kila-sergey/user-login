import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ name, ...props }) => (
  <button {...props} className={styles.button}>{name}</button>
);

Button.propTypes = {
  name: PropTypes.string.isRequired,
};

export default memo(Button);
