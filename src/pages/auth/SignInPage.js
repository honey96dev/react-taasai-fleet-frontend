import React, {Fragment, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useHistory} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBInput, MDBRow, ToastContainer} from "mdbreact";
import {useDispatch, useSelector} from "react-redux";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {Formik} from "formik";
import * as Yup from "yup";

import auth from "actions/auth";
import {AUTH, DEFAULT, EFFECT, ERROR, PROJECT, RESULT,} from "core/globals";
import routes from "core/routes";
import images from "core/images";
import toast, {Fade} from "components/MyToast";
import WithTranslateFormErrors from "components/WithTranslationFormErrors";
import Service from "services/AuthService";

import "./SignInPage.scss";

export default (props) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: PROJECT.IS_DEV ? DEFAULT.EMAIL : "",
    password: PROJECT.IS_DEV ? DEFAULT.PASSWORD : "",
    rememberMe: PROJECT.IS_DEV,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("COMMON.FIELDS.USER.EMAIL")}))
      .email(t("COMMON.VALIDATION.INVALID", {field: t("COMMON.FIELDS.USER.EMAIL")})),
    password: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("COMMON.FIELDS.USER.PASSWORD")}))
      .min(6, t("COMMON.VALIDATION.MIN_LENGTH", {
        field: t("COMMON.FIELDS.USER.PASSWORD"),
        length: t(`COMMON.CARDINALS.${AUTH.PASSWORD_MIN_LENGTH}`)
      })),
  });

  const handleSubmit = ({email, password, rememberMe}, {setSubmitting}) => {
    const params = {email, password, rememberMe};
    dispatch(auth.requestSignIn({user: params}));
    setLoading(true);
    setSubmitting(true);
    Service.signIn(params)
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          dispatch(auth.successSignIn(res.data));
          const params = new URLSearchParams(props.location.search);
          const redirect = params.get("redirect");
          history.push(redirect || routes.root);
        } else {
          dispatch(auth.failureSignIn(res.message));
          toast.error(res.message);
        }
        setLoading(false);
        setSubmitting(false);
      })
      .catch(err => {
        dispatch(auth.failureSignIn(ERROR.UNKNOWN_SERVER_ERROR));
        toast.error(t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"));
        setLoading(false);
        setSubmitting(false);
      });
  };

  useEffect(() => {
    scroll.scrollToTop({
      duration: EFFECT.TRANSITION_TIME,
    });
  }, [props]);

  useMemo(() => {

  }, [t]);

  const payload =() => (
    <Fragment>
      <Helmet>
        <title>{t("COMMON.AUTH.SIGN_IN")} - {t("SITE_NAME")}</title>
      </Helmet>
      <div className="admin-nav text-right">
        {/*<MDBBtn href={routes.admin2} size="sm" rounded color="indigo">{t("COMMON.BUTTON.ADMIN_PAGE")}</MDBBtn>*/}
      </div>
      <div className="text-center">
        <img className="logo-img mt-3 mb-5" src={images.logo.logo100}/>
      </div>
      <MDBCard className="auth-bg">
        <MDBCardBody className="mx-lg-4 mx-md-1">
          {/*<MDBRow className="text-center">*/}
          {/*  <MDBCol className="col-6 col-lg-4 underlined white-border">*/}
          {/*    <p className="text-white h5">{t("COMMON.AUTH.SIGN_IN")}</p>*/}
          {/*  </MDBCol>*/}
          {/*  <MDBCol className="col-6 col-lg-4">*/}
          {/*    <Link to={routes.auth.signUp}><p className="text-white h5">{t("COMMON.AUTH.SIGN_UP")}</p></Link>*/}
          {/*  </MDBCol>*/}
          {/*</MDBRow>*/}
          <MDBRow>
            <MDBCol md="12" className="mt-lg-5">
              <Formik
                initialValues={initialValues}
                // validate={validate}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldTouched}) => (
                  <WithTranslateFormErrors errors={errors} touched={touched} setFieldTouched={setFieldTouched}>
                    <form onSubmit={handleSubmit}>
                      <div className="mt-2 mt-lg-3">
                        <div className="text-left">
                          <label>{t("COMMON.FIELDS.USER.EMAIL")}</label>
                          <MDBInput id="email" name="email" type="email" outline containerClass="my-0"
                                    value={values.email} onChange={handleChange} onBlur={handleBlur}>
                            {!!touched.email && !!errors.email && <div className="text-left invalid-field">{errors.email}</div>}
                          </MDBInput>
                        </div>
                        <div className="text-left">
                          <label>{t("COMMON.FIELDS.USER.PASSWORD")}</label>
                          <MDBInput id="password" name="password" type="password" outline containerClass="my-0"
                                    value={values.password} onChange={handleChange} onBlur={handleBlur}>
                            {!!touched.password && !!errors.password && <div className="text-left invalid-field">{errors.password}</div>}
                          </MDBInput>
                        </div>
                        <div className="text-left">
                          <MDBInput onChange={handleChange} checked={values.rememberMe || false}
                                    label={t("COMMON.FIELDS.USER.REMEMBER_ME")} type="checkbox" filled id="rememberMe"
                                    containerClass="mt-4"/>
                        </div>
                      </div>
                      <div className="text-center mt-4 mb-3 mx-5">
                        <MDBBtn type="submit" color="primary" rounded className="full-width z-depth-1a mx-0"
                                disabled={!!loading || isSubmitting}>
                          {!isSubmitting && <MDBIcon size="lg" icon={"sign-in-alt"}/>}
                          {!!isSubmitting && <div className="spinner-grow spinner-grow-sm" role="status"/>}
                          {!isSubmitting && t("COMMON.AUTH.SIGN_IN")}
                        </MDBBtn>
                      </div>
                      {/*<p className="font-small white-text d-flex justify-content-end">*/}
                      {/*  <Link className="ml-1 white-text" to={routes.auth.forgotPassword}>{t("COMMON.AUTH.FORGOT_PASSWORD")}</Link>*/}
                      {/*</p>*/}
                    </form>
                  </WithTranslateFormErrors>
                )}
              </Formik>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      {/*<ToastContainer*/}
      {/*  className="text-left"*/}
      {/*  position={t("DIRECTION") === "ltr" ? "top-right" : "top-left"}*/}
      {/*  dir={t("DIRECTION")}*/}
      {/*  hideProgressBar={true}*/}
      {/*  // newestOnTop={true}*/}
      {/*  // autoClose={0}*/}
      {/*  autoClose={EFFECT.TRANSITION_TIME5}*/}
      {/*  closeButton={false}*/}
      {/*  transition={Fade}/>*/}

    </Fragment>
  );

  return payload();
};
