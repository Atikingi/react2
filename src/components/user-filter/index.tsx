import { Switch } from '@alfalab/core-components/switch';
import { Button } from '@alfalab/core-components/button';
import { Typography } from '@alfalab/core-components/typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearData, filteredData } from '../../store/actions/creators/app';
import { fetchData } from '../../store/actions/thunks/app';
import styles from './style.module.css';

const UserFilter = () => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    dispatch(filteredData());
  };

  const showMoreUsers = () => {
    dispatch(clearData());
    dispatch(fetchData() as any);
  };

  return (
    <div className={styles.wrapper}>
      <Button view="primary" onClick={showMoreUsers} data-test-id='refresh-button'>
        Refresh
      </Button>
      <Switch
        checked={checked}
        onChange={handleChange}
        reversed={true}
        data-test-id='switch-favorite'
        label={
          <Typography.Title tag="div" view="xsmall" color="accent">
            {checked ? 'Show all' : 'Show favorite'}
          </Typography.Title>
        }
      />
    </div>
  );
};

export default UserFilter;
