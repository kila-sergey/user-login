import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './ExitButton.module.scss';

const ExitButton = ({ name, ...props }) => (
  <button className={styles.button} {...props}>
    {name}
  </button>
);

ExitButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default memo(ExitButton);
