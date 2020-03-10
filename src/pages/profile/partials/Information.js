import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import {MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";

import "./Information.scss";

export default () => {
  const {t} = useTranslation();
  const {auth: {user}} = useSelector(state => state);

  const payload = () => (
    <Fragment>
      <MDBCard>
        <MDBCardBody>
          <h4 className="h4-responsive">{t("PROFILE.FIELDS.INFORMATION")}</h4>
          <MDBRow className="mt-3">
            <MDBCol md="6">
              <label>{t("PROFILE.FIELDS.EMAIL")}</label>
              <MDBInput outline containerClass="my-0" value={user.email || ""} readOnly/>
            </MDBCol>
            <MDBCol md="6">
              <label>{t("PROFILE.FIELDS.NAME")}</label>
              <MDBInput outline containerClass="my-0" value={user.name || ""} readOnly/>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="6">
              <label>{t("PROFILE.FIELDS.OPERATOR")}</label>
              <MDBInput outline containerClass="my-0" value={user.operator_name || ""} readOnly/>
            </MDBCol>
            <MDBCol md="6">
              <label>{t("PROFILE.FIELDS.DRIVERS")}</label>
              <MDBInput outline containerClass="my-0" value={user.drivers || 0} readOnly/>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </Fragment>
  );

  return payload();
}