import React from "react";
import {Redirect, Route, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import routes from "core/routes";

export default ({component, type, ...props}) => {
  const {auth} = useSelector(state => state);
  const history = useHistory();

  const pathname = history.location.pathname;
  const signInPath = routes.auth.signIn;

  if (pathname === routes.root) {
    return (
      <Redirect to={routes.profile.main}/>
    )
  }

  return (
    !auth.signedIn && pathname !== signInPath ? <Redirect to={`${signInPath}?redirect=${encodeURI(pathname)}`}/> : <Route component={component} {...props}/>
  );
}