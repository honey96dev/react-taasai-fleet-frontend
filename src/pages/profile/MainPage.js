import React, {Fragment} from "react";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";

import Information from "./partials/Information";
import Balance from "./partials/Balance";
import Password from "./partials/Password";

import "./MainPage.scss";

export default () => {
  const {t} = useTranslation();

  const pageTitle = t("NAVBAR.PROFILE.MAIN");

  const payload = () => (
    <Fragment>
      <Helmet>
        <title>{pageTitle} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem active>{pageTitle}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBContainer>
        <Information/>
        <Balance/>
        <Password/>
      </MDBContainer>
    </Fragment>
  );

  return payload();
}