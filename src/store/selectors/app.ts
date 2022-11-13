import { RootState } from '../store';

export const getAllUsers = (store: RootState) => store.app.data;

export const getLoadingStatus = (store: RootState) => store.app.loading;

export const getFilteredStatus = (store: RootState) => store.app.filtered;
