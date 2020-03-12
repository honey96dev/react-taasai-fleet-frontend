import React, {Fragment, lazy} from "react";
import {Route, Switch} from "react-router-dom";
import {useTranslation} from "react-i18next";

import routes from "core/routes";
import SideNav from "components/SideNav";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";

import "./RootPage.scss";

const MainPage = lazy(() => import("./MainPage"));

export default () => {
  const {t} = useTranslation();
  return (
    <Fragment>
      <SideNav/>
      <div className="content-with-sidenav">
        <div className="page-margin-top mx-lg-4 mx-3">
          <Switch>
            <Route path={`${routes.dashboard.main}`} component={MainPage}/>
            <Route component={Error404}/>
          </Switch>
        </div>
        {/*<MDBContainer className="page-margin-top">*/}
        {/*  <Switch>*/}
        {/*    <Route path={`${routes.drivers.list}/:page?`} component={AllDriversPage}/>*/}
        {/*    <Route component={Error404}/>*/}
        {/*  </Switch>*/}
        {/*</MDBContainer>*/}
      </div>
      {/*<Footer/>*/}
      <BackToTop/>
    </Fragment>
  );
}
