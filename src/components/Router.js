import React, {lazy} from "react";
import {Route, Switch} from "react-router-dom";

import routes from "core/routes";
import SignedInRoute from "components/SignedInRoute";
import SignedOutRoute from "components/SignedOutRoute";
import Error404Page from "pages/common/Error404Page";

const AuthPage = lazy(() => import("pages/auth/RootPage"));

export default () => {

  return (
    <Switch>
      <SignedOutRoute path={routes.auth.root} component={AuthPage}/>

      {/*<Route path={routes.admin} exact render={() => (window.location.href = `${routes.admin}/`)}/>*/}
      <Route component={Error404Page}/>
    </Switch>
  );
};
