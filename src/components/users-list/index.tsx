import React, { useEffect } from 'react';
import UserCard from '../user-card';
import { Spinner } from '@alfalab/core-components/spinner';
import { useSelector } from 'react-redux';
import { UserProps } from '../../store/reducers/types';
import { fetchData } from '../../store/actions/thunks/app';
import {
  getAllUsers,
  getFilteredStatus,
  getLoadingStatus,
} from '../../store/selectors/app';
import styles from './style.module.css';
import {useAppDispatch} from "../../store/store";

const UsersList = () => {
  const dispatch = useAppDispatch();

  const users = useSelector(getAllUsers);
  const isLoading = useSelector(getLoadingStatus);
  const isFiltered = useSelector(getFilteredStatus);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div
      className={isLoading ? styles.loader : styles.container}
      data-test-id="users-list"
    >
      {isLoading ? (
        <Spinner visible={true} size="m" data-test-id="loader" />
      ) : (
        users
          .filter((user: UserProps) => (isFiltered ? user.favorite : user))
          .map(
            ({
              login,
              name,
              picture,
              email,
              dob,
              location,
              phone,
            }: UserProps) => (
              <UserCard
                key={login.uuid}
                id={login.uuid}
                firstName={name.first}
                lastName={name.last}
                email={email}
                avatar={picture.large}
                age={dob.age}
                city={location.city}
                phoneNumber={phone}
                username={login.username}
              />
            )
          )
      )}
    </div>
  );
};

export default UsersList;
