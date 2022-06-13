import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../state/actions/auth';
import { RootState } from '../state';

const PrivateRoute = () => {
  const data: AuthState = useSelector((state: RootState) => state.auth);
  const {isAuthenticated, loading} = data;
  console.log("isAuthenticated: ",isAuthenticated)
  return (isAuthenticated && !loading) && <Outlet />;

}

export default PrivateRoute;