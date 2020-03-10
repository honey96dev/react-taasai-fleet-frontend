import React, {lazy} from "react";
import {Route, Switch} from "react-router-dom";

import routes from "core/routes";
import SignedInRoute from "components/SignedInRoute";
import SignedOutRoute from "components/SignedOutRoute";
import Error404Page from "pages/common/Error404Page";

const AuthPage = lazy(() => import("pages/auth/RootPage"));
const ProfilePage = lazy(() => import("pages/profile/RootPage"));
const DriversPage = lazy(() => import("pages/drivers/RootPage"));
const CommissionPage = lazy(() => import("pages/commission/RootPage"));
const LocationPage = lazy(() => import("pages/location/RootPage"));

export default () => {

  return (
    <Switch>
      <SignedOutRoute path={routes.auth.root} component={AuthPage}/>

      <SignedInRoute path={routes.profile.root} component={ProfilePage}/>
      <SignedInRoute path={routes.drivers.root} component={DriversPage}/>
      <SignedInRoute path={routes.commission.root} component={CommissionPage}/>
      <SignedInRoute path={routes.location.root} component={LocationPage}/>
      {/*<SignedInRoute path={routes.root} component={DriversPage}/>*/}

      <Route component={Error404Page}/>
    </Switch>
  );
};
