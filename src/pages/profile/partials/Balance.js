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
      <MDBCard className="mt-3 mt-lg-4">
        <MDBCardBody>
          <h4 className="h4-responsive">{t("PROFILE.FIELDS.BALANCE")}</h4>
          <MDBRow className="mt-3">
            <MDBCol md="6">
              <label>{t("PROFILE.FIELDS.LIVE_BALANCE")}</label>
              <MDBInput outline containerClass="my-0" value={user.balance || 0} readOnly/>
            </MDBCol>
            <MDBCol md="6">
              <label>{t("PROFILE.FIELDS.INCOME_PENDING")}</label>
              <MDBInput outline containerClass="my-0" value={user.income_pending || 0} readOnly/>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </Fragment>
  );

  return payload();
}