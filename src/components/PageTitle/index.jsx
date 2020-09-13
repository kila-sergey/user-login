import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './PageTitle.module.scss';

const PageTitle = ({ children }) => (
  <h1 className={styles.pageTitle}>
    {children}
  </h1>
);

PageTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

PageTitle.defaultProps = {
  children: null,
};

export default memo(PageTitle);
