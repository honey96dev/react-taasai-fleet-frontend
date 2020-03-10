import React, {Fragment} from "react";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";

import {AUTH, RESULT} from "core/globals";
import toast from "components/MyToast";
import Service from "services/ProfileService";

import "./Password.scss";

export default () => {
  const {t} = useTranslation();
  const {auth: {user}} = useSelector(state => state);

  let formikProps;

  const initialValues = {
    password0: "",
    password: "",
    password2: "",
  };

  const validationSchema = Yup.object().shape({
    password0: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("PROFILE.FIELDS.CURRENT_PASSWORD")}))
      .min(6, t("COMMON.VALIDATION.MIN_LENGTH", {
        field: t("PROFILE.FIELDS.CURRENT_PASSWORD"),
        length: t(`COMMON.CARDINALS.${AUTH.PASSWORD_MIN_LENGTH}`)
      })),
    password: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("PROFILE.FIELDS.NEW_PASSWORD")}))
      .min(6, t("COMMON.VALIDATION.MIN_LENGTH", {
        field: t("PROFILE.FIELDS.NEW_PASSWORD"),
        length: t(`COMMON.CARDINALS.${AUTH.PASSWORD_MIN_LENGTH}`)
      })),
    password2: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("PROFILE.FIELDS.CONFIRM")}))
      // .min(6, t("COMMON.VALIDATION.MIN_LENGTH", {
      //   field: t("PROFILE.FIELDS.CONFIRM"),
      //   length: t(`COMMON.CARDINALS.${AUTH.PASSWORD_MIN_LENGTH}`)
      // }))
      .oneOf([Yup.ref("password"), null], t("COMMON.VALIDATION.MISMATCH", {field: t("PROFILE.FIELDS.NEW_PASSWORD")})),
  });

  const handleSubmit = (params, {setSubmitting}) => {
    setSubmitting(true);
    Service.changePassword({...params, id: user.id})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        setSubmitting(false);
        toast.error(t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"));
      })
  };

  formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const {values, touched, errors, setValues, setTouched, setErrors, setFieldValue, handleChange, handleBlur, isSubmitting} = formikProps;

  const payload = () => (
    <Fragment>
      <MDBCard className="mt-3 mt-lg-4">
        <MDBCardBody>
          <h4 className="h4-responsive">{t("PROFILE.FIELDS.PASSWORD")}</h4>
          <form onSubmit={formikProps.handleSubmit}>
            <MDBRow className="mt-3">
              <MDBCol md="6">
                <label>{t("PROFILE.FIELDS.CURRENT_PASSWORD")}</label>
                <MDBInput id="password0" name="password0" type="password" outline containerClass="my-0"
                          value={values.password0} onChange={handleChange} onBlur={handleBlur}>
                  {!!touched.password0 && !!errors.password0 && <div className="text-left invalid-field">{errors.password0}</div>}
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <label>{t("PROFILE.FIELDS.NEW_PASSWORD")}</label>
                <MDBInput id="password" name="password" type="password" outline containerClass="my-0"
                          value={values.password} onChange={handleChange} onBlur={handleBlur}>
                  {!!touched.password && !!errors.password && <div className="text-left invalid-field">{errors.password}</div>}
                </MDBInput>
              </MDBCol>
              <MDBCol md="6">
                <label>{t("PROFILE.FIELDS.CONFIRM")}</label>
                <MDBInput id="password2" name="password2" type="password" outline containerClass="my-0"
                          value={values.password2} onChange={handleChange} onBlur={handleBlur}>
                  {!!touched.password2 && !!errors.password2 && <div className="text-left invalid-field">{errors.password2}</div>}
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <div className="text-left">
              <MDBBtn type="submit" color="primary" size="md" rounded disabled={isSubmitting}>
                {t("COMMON.BUTTON.CHANGE")}
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>

    </Fragment>
  );

  return payload();
}