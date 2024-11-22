import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

export const EditProtectedRoute = ({ component: Component, ...rest }) => {
  const { userId } = useSelector((state) => state.auth);
  const { creatorId } = useSelector((state) => state.post);

  return (
    <Route
      {...rest}
      element={
        userId === creatorId ? (
          <Component />
        ) : (
          <Navigate to="/" replace />
        )
      }
    />
  );
};

export const ProfileProtectedRoute = ({ component: Component, ...rest }) => {
  const { userName } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      element={
        rest.match.params.userName === userName ? (
          <Component />
        ) : (
          <Navigate to="/" replace />
        )
      }
    />
  );
};