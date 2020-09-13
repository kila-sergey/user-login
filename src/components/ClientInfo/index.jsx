import React from 'react';
import PropTypes from 'prop-types';

import styles from './UserInfo.module.scss';

const UserInfo = ({ info }) => {
  const keysArray = Object.keys(info);
  return (
    <div className={styles.container}>
      {keysArray.map((item) => (
        <div key={item} className={styles.item}>
          <span className={styles.itemTitle}>
            {item}
            :
          </span>
          <span className={styles.itemDescription}>{info[item]}</span>
        </div>
      ))}
    </div>
  );
};

UserInfo.propTypes = {
  info: PropTypes.object.isRequired,
};

export default UserInfo;
