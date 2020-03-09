import React, {Fragment, lazy} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";

import routes from "core/routes";
import {ACCOUNT} from "core/globals";
import Navbar from "components/Navbar";
import SideNav from "components/SideNav";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";

import "./RootPage.scss";

const AllDriversPage = lazy(() => import("./AllDriversPage"));
const NewDriverPage = lazy(() => import("./NewDriverPage"));

export default () => {
  const {t} = useTranslation();
  return (
    <Fragment>
      <SideNav/>
      <div className="content-with-sidenav">
        <div className="page-margin-top mx-lg-4 mx-3">
          <Switch>
            <Route path={`${routes.drivers.add}/:params?`} component={NewDriverPage}/>
            <Route path={`${routes.drivers.list}/:page?`} component={AllDriversPage}/>
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
