import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  ...props
}) => {
  if (condition === false) {
    return (
      <Redirect
        to={{
          from: props.location,
          pathname: redirectRoute,
        }}
      />
    );
  }
  return <Route exact path={path} component={Component} {...props} />;
};

export default PrivateRoute;
