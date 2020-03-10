import React, {Fragment} from "react";
import {MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";

import "./DriverInformation.scss";

export default ({data}) => {
  const {t} = useTranslation();

  let mobile_number = "";
  if (!!data.dial_code) {
    mobile_number = `+${data.dial_code}`;
  }
  if (!!data.mobile_number) {
    mobile_number = `${mobile_number} ${data.mobile_number}`;
  }

  const payload = () => (
    <Fragment>
      <h4 className="h4-responsive mt-3">{t("DRIVERS.DETAILS.INFORMATION.HEADING")}</h4>
      <MDBRow className="mt-3">
        <MDBCol md="6">
          <label>{t("DRIVERS.FIELDS.NAME")}</label>
          <MDBInput outline containerClass="my-0" value={data.name || ""} readOnly/>
        </MDBCol>
        <MDBCol md="6">
          <label>{t("DRIVERS.FIELDS.MOBILE")}</label>
          <MDBInput outline containerClass="my-0" value={mobile_number} readOnly/>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6">
          <label>{t("DRIVERS.FIELDS.LICENSE_NUMBER")}</label>
          <MDBInput outline containerClass="my-0" value={data.license_number || ""} readOnly/>
        </MDBCol>
        <MDBCol md="6">
          <label>{t("DRIVERS.FIELDS.VEHICLE_NAME")}</label>
          <MDBInput outline containerClass="my-0" value={data.vehicle_name || ""} readOnly/>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6">
          <label>{t("DRIVERS.FIELDS.VEHICLE_TYPE")}</label>
          <MDBInput outline containerClass="my-0" value={data.vehicle_type || ""} readOnly/>
        </MDBCol>
        <MDBCol md="6">
          <label>{t("DRIVERS.FIELDS.VEHICLE_BRAND")}</label>
          <MDBInput outline containerClass="my-0" value={data.vehicle_brand || ""} readOnly/>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6">
          <label>{t("DRIVERS.FIELDS.VEHICLE_MODEL")}</label>
          <MDBInput outline containerClass="my-0" value={data.vehicle_model || ""} readOnly/>
        </MDBCol>
        <MDBCol md="6">
          <label>{t("DRIVERS.FIELDS.VEHICLE_COLOR")}</label>
          <MDBInput outline containerClass="my-0" value={data.vehicle_color || ""} readOnly/>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6">
          <label>{t("DRIVERS.FIELDS.VEHICLE_MODEL")}</label>
          <MDBInput outline containerClass="my-0" value={data.vehicle_number || ""} readOnly/>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6">
          <label>{t("DRIVERS.FIELDS.VEHICLE_MODEL")}</label>
          <div className="driver-image-wrapper text-center">
            <img className="z-depth-1" src={data.vehicle_image}/>
          </div>
        </MDBCol>
        <MDBCol md="6" className="mt-3 mt-md-0">
          <label>{t("DRIVERS.FIELDS.VEHICLE_MODEL")}</label>
          <div className="driver-image-wrapper text-center">
            <img className="z-depth-1" src={data.driver_image}/>
          </div>
        </MDBCol>
      </MDBRow>
    </Fragment>
  );

  return payload();
}