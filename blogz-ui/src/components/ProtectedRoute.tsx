import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { toast } from "react-toastify";
import { Navigate } from "react-router";

const ProtectedRoute = (props: { children: React.ReactNode }) => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (user === null && !isLoading) {
      toast.error("You must be logged in to view this page");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user === null && !isLoading) {
    return <Navigate to="/" replace={true} />;
  }
  return <>{props.children}</>;
}

export default ProtectedRoute;
