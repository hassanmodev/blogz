import { useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { useGetUserQuery } from '../features/auth/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { RootState } from '../store';
import { QueryStatus } from '@reduxjs/toolkit/query';

export const useUserQuery = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const { data, refetch, status } = useGetUserQuery(token)

  useEffect(() => {
    if (status === QueryStatus.uninitialized || status === QueryStatus.pending) return;
    if (status === QueryStatus.rejected) {
      dispatch(setUser(null));
      return;
    }
    dispatch(setUser(data ?? null));

  }, [data, dispatch, refetch, status]);

}
