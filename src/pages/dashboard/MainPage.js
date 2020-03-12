import React, {Fragment} from "react";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";

import Stats from "./partials/Stats";
import Balance from "./partials/Balance";

import "./MainPage.scss";

export default () => {
  const {t} = useTranslation();

  const pageTitle = t("NAVBAR.DASHBOARD.MAIN");

  const payload = () => (
    <Fragment>
      <Helmet>
        <title>{pageTitle} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem active>{pageTitle}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBContainer>
        <Stats/>
        <Balance/>
      </MDBContainer>
    </Fragment>
  );

  return payload();
}