import { useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { useGetUserQuery } from '../features/auth/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { RootState } from '../store';

export const useUserQuery = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const { data, refetch } = useGetUserQuery(token, { skip: !token })
  
  useEffect(() => {
    if (data) dispatch(setUser(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (isLoading) refetch();
  }, [isLoading, refetch]);

}
