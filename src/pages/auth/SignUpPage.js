import React, {Fragment, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Link, useHistory} from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
  ToastContainer,
} from "mdbreact";
import {useDispatch} from "react-redux";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {Formik} from "formik";
import * as Yup from "yup";

import toast, {Fade} from "components/MyToast";
import {AUTH, DEFAULT, EFFECT, ERROR, PROJECT, RESULT,} from "core/globals";
import routes from "core/routes";
import validators from "core/validators";
import images from "core/images";
import helpers from "core/helpers";
import Service from "services/AuthService";
import auth from "actions/auth";

import "./SignUpPage.scss";

export default (props) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const pageTitle = `${t("COMMON.AUTH.SIGN_UP")} - ${t("SITE_NAME")}`;

  const initialValues = {
    name: PROJECT.IS_DEV ? DEFAULT.USER.NAME : "",
    phone: PROJECT.IS_DEV ? DEFAULT.USER.PHONE : "",
    firstName: PROJECT.IS_DEV ? DEFAULT.USER.FIRST_NAME : "",
    fatherName: PROJECT.IS_DEV ? DEFAULT.USER.FATHER_NAME : "",
    lastName: PROJECT.IS_DEV ? DEFAULT.USER.LAST_NAME : "",
    email: PROJECT.IS_DEV ? DEFAULT.USER.EMAIL : "",
    password: PROJECT.IS_DEV ? DEFAULT.USER.PASSWORD : "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("HIRE.ACCOUNT.FIELDS.COMPANY.NAME")})),
    phone: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("COMMON.FIELDS.USER.PHONE")})),
    firstName: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("COMMON.FIELDS.USER.FIRST_NAME")})),
    fatherName: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("COMMON.FIELDS.USER.FATHER_NAME")})),
    lastName: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("COMMON.FIELDS.USER.LAST_NAME")})),
    email: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("COMMON.FIELDS.USER.EMAIL")}))
      .email(t("COMMON.VALIDATION.INVALID", {field: t("COMMON.FIELDS.USER.EMAIL")})),
    password: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("COMMON.FIELDS.USER.PASSWORD")}))
      .min(AUTH.PASSWORD_MIN_LENGTH, t("COMMON.VALIDATION.MIN_LENGTH", {
        field: t("COMMON.FIELDS.USER.PASSWORD"),
        length: t(`COMMON.CARDINALS.${AUTH.PASSWORD_MIN_LENGTH}`)
      })),
  });

  const handleSubmit = (params, {setSubmitting}) => {
    setSubmitting(true);
    dispatch(auth.requestSignUp(params));
    Service.signUp(params)
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          dispatch(auth.successSignUp(res.data));
          toast.success(res.message);
        } else {
          dispatch(auth.failureSignUp(res.message));
          toast.error(res.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        dispatch(auth.failureSignUp(ERROR.UNKNOWN_SERVER_ERROR));
        toast.error(t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"));
        setSubmitting(false);
      });
  };

  useEffect(() => {
    scroll.scrollToTop({
      duration: EFFECT.TRANSITION_TIME,
    });
  }, [props]);

  const payload = () => (
    <Fragment>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="admin-nav text-right">
        {/*<MDBBtn href={routes.admin2} size="sm" rounded color="indigo">{t("COMMON.BUTTON.ADMIN_PAGE")}</MDBBtn>*/}
      </div>
      <div className="text-center">
        <img className="logo-img mt-3 mb-5" src={images.logo.logo100}/>
      </div>
      <MDBCard className="auth-bg">
        <MDBCardBody className="mx-md-4 mx-sm-1 mb-lg-5">
          <MDBRow className="text-center">
            <MDBCol className="col-6 col-lg-4">
              <Link to={routes.auth.signIn}><p className="text-white h5">{t("COMMON.AUTH.SIGN_IN")}</p></Link>
            </MDBCol>
            <MDBCol className="col-6 col-lg-4 underlined white-border">
              <p className="text-white h5">{t("COMMON.AUTH.SIGN_UP")}</p>
            </MDBCol>
          </MDBRow>
          <div className="mt-lg-5">
            <Formik
              initialValues={initialValues}
              // validate={validate}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting}) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <input hidden id="location" name="location" onChange={handleChange} onBlur={handleBlur}/>
                    <input hidden id="size" name="size" onChange={handleChange} onBlur={handleBlur}/>
                    <input hidden id="type" name="type" onChange={handleChange} onBlur={handleBlur}/>
                    <input hidden id="countryCode" name="countryCode" onChange={handleChange} onBlur={handleBlur}/>
                    <div className="white-text">
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput id="name" name="name" label={t("HIRE.ACCOUNT.FIELDS.COMPANY.NAME")} background
                                    containerClass="mb-0" value={values.name} onChange={handleChange} onBlur={handleBlur}>
                            {!!touched.name && !!errors.name && <div className="text-left invalid-field2">{errors.name}</div>}
                          </MDBInput>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput id="phone" name="phone" type="text" label={t("COMMON.FIELDS.USER.PHONE")} background
                                    containerClass="mt-3 mb-0" value={values.phone} onChange={handleChange}
                                    onBlur={handleBlur}>
                            {!!errors.phone && <div className="text-left invalid-field2">{errors.phone}</div>}
                          </MDBInput>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput id="firstName" name="firstName" type="text" label={t("COMMON.FIELDS.USER.FIRST_NAME")} background
                                    containerClass="mt-3 mb-0" value={values.firstName} onChange={handleChange}
                                    onBlur={handleBlur}>
                            {!!touched.firstName && !!errors.firstName && <div className="text-left invalid-field2">{errors.firstName}</div>}
                          </MDBInput>
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput id="fatherName" name="fatherName" type="text" label={t("COMMON.FIELDS.USER.FATHER_NAME")} background
                                    containerClass="mt-3 mb-0" value={values.fatherName} onChange={handleChange}
                                    onBlur={handleBlur}>
                            {!!touched.fatherName && !!errors.fatherName && <div className="text-left invalid-field2">{errors.fatherName}</div>}
                          </MDBInput>
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput id="lastName" name="lastName" type="text" label={t("COMMON.FIELDS.USER.LAST_NAME")} background
                                    containerClass="mt-3 mb-0" value={values.lastName} onChange={handleChange}
                                    onBlur={handleBlur}>
                            {!!touched.lastName && !!errors.lastName && <div className="text-left invalid-field2">{errors.lastName}</div>}
                          </MDBInput>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput id="email" name="email" type="email" label={t("COMMON.FIELDS.USER.EMAIL")} background
                                    containerClass="mt-3" value={values.email} onChange={handleChange} onBlur={handleBlur}>
                            {!!touched.email && !!errors.email && <div className="text-left invalid-field2">{errors.email}</div>}
                          </MDBInput>
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput id="password" name="password" label={t("COMMON.FIELDS.USER.PASSWORD")} type="password" background
                                    containerClass="mt-3" value={values.password} onChange={handleChange}
                                    onBlur={handleBlur}>
                            {!!touched.password && !!errors.password && <div className="text-left invalid-field2">{errors.password}</div>}
                          </MDBInput>
                        </MDBCol>
                      </MDBRow>
                    </div>
                    <div className="text-center mt-4 mb-3 button-wrapper">
                      <MDBBtn type="submit" color="white" rounded className="full-width z-depth-1a blue-grey-text"
                              disabled={!!isSubmitting}>
                        {!isSubmitting && <MDBIcon size="lg" icon={"user-plus"}/>}
                        {!!isSubmitting && <div className="spinner-grow spinner-grow-sm" role="status"/>}
                        {!isSubmitting && t("COMMON.AUTH.SIGN_UP")}
                      </MDBBtn>
                    </div>
                  </form>
                )
              }}
            </Formik>
          </div>
        </MDBCardBody>
      </MDBCard>
      <ToastContainer
        className="text-left"
        position={t("DIRECTION") === "ltr" ? "top-right" : "top-left"}
        dir={t("DIRECTION")}
        hideProgressBar={true}
        // newestOnTop={true}
        // autoClose={0}
        autoClose={EFFECT.TRANSITION_TIME5}
        closeButton={false}
        transition={Fade}/>
    </Fragment>
  );

  return payload();
};
