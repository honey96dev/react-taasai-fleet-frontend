import React, {Fragment, useEffect, useMemo, useRef, useState} from "react";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions
} from "mdbreact";
import MDBFileupload from "mdb-react-fileupload";
import {Link, useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Base64} from "js-base64";
import {useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import PhoneInput from "react-phone-number-input";
import {useFormik} from "formik";
import * as Yup from "yup";
import CSSTransition from "react-transition-group/CSSTransition";
import {parsePhoneNumber} from "react-phone-number-input";

import routes from "core/routes";
import {AVATAR, EFFECT, FILE_UPLOAD, PROJECT, RESULT} from "core/globals";
import helpers from "core/helpers";
import validators from "core/validators";
import goToBack from "helpers/goToBack";
import toast from "components/MyToast";
import Loading from "components/Loading";
import Service from "services/DriverService";
import CoreService from "services/CoreService";

import "react-phone-number-input/style.css";
import "./NewDriverPage.scss";
import apis from "../../core/apis";

export default () => {
  const {params} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth: {user}} = useSelector(state => state);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  const [itemId, setItemId] = useState();
  const [urlParams, setUrlParams] = useState({});
  const [vehicleTypes, setVehicleTypes] = useState([]);
  // const [attachment, setAttachment] = useState("");
  // const [attachmentName, setAttachmentName] = useState("");
  const [vehicleImage, setVehicleImage] = useState();
  const [driverImage, setDriverImage] = useState();

  const vehicleImageRef = useRef(null);
  const driverImageRef = useRef(null);

  const extensions = ["jpg", "jpeg", "png"];

  const pageTitle = t(`NAVBAR.DRIVERS.${!!urlParams.id ? "EDIT" : "ADD"}`);
  let backUrl = `${routes.drivers.list}/${urlParams.page || 1}`;
  const addUrl = `${routes.drivers.add}/${Base64.encode(JSON.stringify({
    page: urlParams.page,
  }))}`;

  let formikProps;

  let initialValues = {
    operator_id: user.operator_id,
    operator: user.operator_name,
    name: !PROJECT.IS_DEV ? "" : "Test",
    mobile_number: !PROJECT.IS_DEV ? "" : "+66642112451",
    license_number: !PROJECT.IS_DEV ? "" : "TH33817",
    vehicle_name: !PROJECT.IS_DEV ? "" : "Wagon",
    vehicle_type_id: !PROJECT.IS_DEV ? "" : "1",
    vehicle_brand: !PROJECT.IS_DEV ? "" : "Benz",
    vehicle_model: !PROJECT.IS_DEV ? "" : "400",
    vehicle_color: !PROJECT.IS_DEV ? "" : "Black",
    vehicle_number: !PROJECT.IS_DEV ? "" : "ZA 113",
    vehicle_image: "",
    driver_image: "",
  };

  const validationSchema = Yup.object().shape({
    operator_id: Yup.number()
      .min(1, t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.OPERATOR")})),
    name: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.NAME")})),
    mobile_number: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.MOBILE")}))
      .test("mobile_number.valid", t("COMMON.VALIDATION.INVALID", {field: t("DRIVERS.FIELDS.MOBILE")}), validators.isPhoneNumber),
    license_number: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.LICENSE_NUMBER")})),
    vehicle_name: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.VEHICLE_NAME")})),
    vehicle_type_id: Yup.number()
      .min(1, t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.VEHICLE_TYPE")})),
    vehicle_brand: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.VEHICLE_BRAND")})),
    vehicle_model: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.VEHICLE_MODEL")})),
    vehicle_color: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.VEHICLE_COLOR")})),
    vehicle_number: Yup.string()
      .required(t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.VEHICLE_NUMBER")})),
    driver_image: Yup.string()
      .test("vehicle_image.required", t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.VEHICLE_IMAGE")}), function(value) {
        console.log(value, !!value && !!value.length);
        return (!!value && !!value.length) || !!vehicleImage;
      }),
    vehicle_image: Yup.string()
      .test("vehicle_image.required", t("COMMON.VALIDATION.REQUIRED", {field: t("DRIVERS.FIELDS.VEHICLE_IMAGE")}), function(value) {
        return (!!value && !!value.length) || !!driverImage;
      }),
  });

  const loadData = () => {
    setLoading(true);
    Service.get({id: urlParams.id, userId: user.id})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          const {data} = res;
          data.mobile_number = `+${data.dial_code}${data.mobile_number}`;

          const vehicle_image = data.vehicle_image.split("/");
          if (!!vehicle_image.length) {
            vehicle_image.splice(0, 1);
            data.vehicle_image = `${apis.assetsBaseUrl}${vehicle_image.join("/")}`;
          }

          const driver_image = data.driver_image.split("/");
          if (!!driver_image.length) {
            driver_image.splice(0, 1);
            data.driver_image = `${apis.assetsBaseUrl}${driver_image.join("/")}`;
          }
          formikProps.setValues(data);
          setItemId(data.id);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const handleSubmit = (values, {setSubmitting}) => {
    const mobile = parsePhoneNumber(values.mobile_number);
    const params = new FormData();
    !!itemId && params.append("id", itemId);
    params.append("fleet_id", user.id);
    params.append("operator_id", values.operator_id);
    params.append("name", values.name);
    params.append("dial_code", mobile.countryCallingCode);
    params.append("mobile_number", mobile.nationalNumber);
    params.append("license_number", values.license_number);
    params.append("vehicle_name", values.vehicle_name);
    params.append("vehicle_type_id", values.vehicle_type_id);
    params.append("vehicle_brand", values.vehicle_brand);
    params.append("vehicle_model", values.vehicle_model);
    params.append("vehicle_color", values.vehicle_color);
    params.append("vehicle_number", values.vehicle_number);
    !!vehicleImage && params.append("vehicleImage", vehicleImage);
    !!driverImage && params.append("driverImage", driverImage);

    setSubmitting(true);
    Service.add(params)
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          toast.success(res.message);
          !itemId && setItemId(res.data.id);
        } else {
          toast.error(res.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        toast.error(t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"));
        setSubmitting(false);
      });
  };

  const handleReset = ({setValues, setTouched, setErrors}) => {
    setValues(initialValues);
    setVehicleImage(null);
    !!vehicleImageRef.current && vehicleImageRef.current.resetPreview();
    setDriverImage(null);
    !!driverImageRef.current && driverImageRef.current.resetPreview();
    setTouched({});
    setErrors({});

    setAlert({});
    setItemId(undefined);

    history.location.pathname !== addUrl && history.push(addUrl);
  };

  useEffect(e => {
    CoreService.getVehicleTypes()
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          setVehicleTypes(res.data);
        } else {
          setVehicleTypes([]);
        }
      })
      .catch(err => {
        setVehicleTypes([]);
      });
  }, []);

  useMemo(e => {
    if (!!params) {
      try {
        const raw = Base64.decode(params);
        const json = JSON.parse(raw);
        setUrlParams(json);
      } catch (e) {

      }
    }
  }, [params, t]);

  useMemo(e => {
    !!urlParams.id && loadData();
  }, [urlParams.id]);

  formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const {values, touched, errors, setValues, setTouched, setErrors, setFieldValue, handleChange, handleBlur, isSubmitting} = formikProps;

  const payload = () => (
    <Fragment>
      <Helmet>
        <title>{pageTitle} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.DRIVERS.ROOT")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={backUrl}>{t("NAVBAR.DRIVERS.LIST")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{pageTitle}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBRow>
        {alert.show && <MDBCol md="12">
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={EFFECT.TRANSITION_TIME} unmountOnExit
                         appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>}
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
              {!!loading && <Loading/>}
              {!loading && <Fragment>
                <form className="mx-md-4 mx-sm-1 text-left" onSubmit={formikProps.handleSubmit}>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput id="operator" name="operator" label={t("DRIVERS.FIELDS.OPERATOR")} outline readOnly={true}
                                containerClass="mb-0" value={values.operator} onChange={handleChange} onBlur={handleBlur}>
                        {!!touched.operator && !!errors.operator &&
                        <div className="text-left invalid-field">{errors.operator}</div>}
                      </MDBInput>
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput id="name" name="name" label={t("DRIVERS.FIELDS.NAME")} outline
                                containerClass="mb-0" value={values.name} onChange={handleChange} onBlur={handleBlur}>
                        {!!touched.name && !!errors.name &&
                        <div className="text-left invalid-field">{errors.name}</div>}
                      </MDBInput>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <input hidden id="mobile_number" name="mobile_number" onChange={handleChange} onBlur={handleBlur}/>
                      <PhoneInput
                        className="md-form md-outline mt-3 mb-0"
                        placeholder={t("DRIVERS.FIELDS.MOBILE")}
                        flagUrl={`${apis.assetsBaseUrl}${apis.assets.flags}/{XX}.png`}
                        value={values.mobile_number}
                        onChange={value => helpers.triggerChangeEvent("mobile_number", value)}/>
                      {!!touched.mobile_number && !!errors.mobile_number &&
                      <div className="text-left invalid-field">{errors.mobile_number}</div>}
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput id="license_number" name="license_number" label={t("DRIVERS.FIELDS.LICENSE_NUMBER")} outline
                                containerClass="mt-3 mb-0" value={values.license_number} onChange={handleChange} onBlur={handleBlur}>
                        {!!touched.license_number && !!errors.license_number &&
                        <div className="text-left invalid-field">{errors.license_number}</div>}
                      </MDBInput>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput id="vehicle_name" name="vehicle_name" label={t("DRIVERS.FIELDS.VEHICLE_NAME")} outline
                                containerClass="mt-3 mb-0" value={values.vehicle_name} onChange={handleChange} onBlur={handleBlur}>
                        {!!touched.vehicle_name && !!errors.vehicle_name &&
                        <div className="text-left invalid-field">{errors.vehicle_name}</div>}
                      </MDBInput>
                    </MDBCol>
                    <MDBCol md="6">
                      <input hidden id="vehicle_type_id" name="vehicle_type_id" onChange={handleChange} onBlur={handleBlur}/>
                      <MDBSelect label={t("DRIVERS.FIELDS.VEHICLE_TYPE")} outline className="mt-3 mb-0"
                                 selected={values.vehicle_type_id} getValue={val => {
                        helpers.triggerChangeEvent("vehicle_type_id", val[0])
                      }}>
                        <MDBSelectInput/>
                        {vehicleTypes.length > 0 && <MDBSelectOptions>
                          {vehicleTypes.map((item, index) => (
                            <MDBSelectOption key={index} value={item.id} checked={item.id == values.vehicle_type_id}>{item.name}</MDBSelectOption>
                          ))}
                        </MDBSelectOptions>}
                      </MDBSelect>
                      {!!touched.vehicle_type_id && !!errors.vehicle_type_id &&
                      <div className="text-left invalid-field">{errors.vehicle_type_id}</div>}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput id="vehicle_brand" name="vehicle_brand" label={t("DRIVERS.FIELDS.VEHICLE_BRAND")} outline
                                containerClass="mt-3 mb-0" value={values.vehicle_brand} onChange={handleChange} onBlur={handleBlur}>
                        {!!touched.vehicle_brand && !!errors.vehicle_brand &&
                        <div className="text-left invalid-field">{errors.vehicle_brand}</div>}
                      </MDBInput>
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput id="vehicle_model" name="vehicle_model" label={t("DRIVERS.FIELDS.VEHICLE_MODEL")} outline
                                containerClass="mt-3 mb-0" value={values.vehicle_model} onChange={handleChange} onBlur={handleBlur}>
                        {!!touched.vehicle_model && !!errors.vehicle_model &&
                        <div className="text-left invalid-field">{errors.vehicle_model}</div>}
                      </MDBInput>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput id="vehicle_color" name="vehicle_color" label={t("DRIVERS.FIELDS.VEHICLE_COLOR")} outline
                                containerClass="mt-3 mb-0" value={values.vehicle_color} onChange={handleChange} onBlur={handleBlur}>
                        {!!touched.vehicle_color && !!errors.vehicle_color &&
                        <div className="text-left invalid-field">{errors.vehicle_color}</div>}
                      </MDBInput>
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput id="vehicle_number" name="vehicle_number" label={t("DRIVERS.FIELDS.VEHICLE_NUMBER")} outline
                                containerClass="mt-3 mb-0" value={values.vehicle_number} onChange={handleChange} onBlur={handleBlur}>
                        {!!touched.vehicle_number && !!errors.vehicle_number &&
                        <div className="text-left invalid-field">{errors.vehicle_number}</div>}
                      </MDBInput>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6" className="text-left mt-4">
                      <div className="grey-text">{t("DRIVERS.FIELDS.VEHICLE_IMAGE")}</div>
                      <div id="file" className="mx-auto">
                        {!loading && <MDBFileupload
                          ref={vehicleImageRef}
                          defaultFileSrc={values.vehicle_image}
                          getValue={setVehicleImage}
                          showRemove={false}
                          maxFileSize={FILE_UPLOAD.MAXSIZE1}
                          maxFileSizePreview={FILE_UPLOAD.MAXSIZE1}
                          containerHeight={AVATAR.SIZE.HEIGHT + 50}
                          allowedFileExtensions={extensions}
                          messageDefault={t("COMMON.FILE_UPLOAD.DEFAULT")}
                          messageReplace={t("COMMON.FILE_UPLOAD.REPLACE")}
                          messageRemove={t("COMMON.FILE_UPLOAD.REMOVE")}
                          messageError={t("COMMON.FILE_UPLOAD.ERROR")}
                          errorFileSize={t("COMMON.FILE_UPLOAD.ERROR_FILESIZE", {max: FILE_UPLOAD.MAXSIZE1})}
                          // errorFileExtension={t("COMMON.FILE_UPLOAD.ERROR_FILEEXTENSION", {extensions: extensions.join(", ")})}
                        />}
                        {!!touched.vehicle_image && !!errors.vehicle_image &&
                        <div className="text-left invalid-field">{errors.vehicle_image}</div>}
                      </div>
                    </MDBCol>
                    <MDBCol md="6" className="text-left mt-4">
                      <div className="grey-text">{t("DRIVERS.FIELDS.DRIVER_IMAGE")}</div>
                      <div id="file" className="mx-auto">
                        {!loading && <MDBFileupload
                          ref={driverImageRef}
                          defaultFileSrc={values.driver_image}
                          getValue={setDriverImage}
                          showRemove={false}
                          maxFileSize={FILE_UPLOAD.MAXSIZE1}
                          maxFileSizePreview={FILE_UPLOAD.MAXSIZE1}
                          containerHeight={AVATAR.SIZE.HEIGHT + 50}
                          allowedFileExtensions={extensions}
                          messageDefault={t("COMMON.FILE_UPLOAD.DEFAULT")}
                          messageReplace={t("COMMON.FILE_UPLOAD.REPLACE")}
                          messageRemove={t("COMMON.FILE_UPLOAD.REMOVE")}
                          messageError={t("COMMON.FILE_UPLOAD.ERROR")}
                          errorFileSize={t("COMMON.FILE_UPLOAD.ERROR_FILESIZE", {max: FILE_UPLOAD.MAXSIZE1})}
                          // errorFileExtension={t("COMMON.FILE_UPLOAD.ERROR_FILEEXTENSION", {extensions: extensions.join(", ")})}
                        />}
                        {!!touched.driver_image && !!errors.driver_image &&
                        <div className="text-left invalid-field">{errors.driver_image}</div>}
                      </div>
                    </MDBCol>
                  </MDBRow>
                  {/*<div className="fixed-bottom white px-md-3 py-md-3">*/}
                  <div className="mt-4 mb-3">
                    <MDBBtn type="submit" color="primary" size="sm" rounded
                            disabled={!!loading || !!isSubmitting}>{t(`COMMON.BUTTON.${!!itemId ? "EDIT" : "ADD"}`)}</MDBBtn>
                    <MDBBtn type="button" color="indigo" size="sm" rounded onClick={e => handleReset({
                      setValues,
                      setTouched,
                      setErrors
                    })}>{t(`COMMON.BUTTON.NEW`)}</MDBBtn>
                    <MDBBtn type="button" color="warning" size="sm" rounded
                            onClick={goToBack}>{t(`COMMON.BUTTON.BACK`)}</MDBBtn>
                  </div>
                </form>
              </Fragment>}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </Fragment>
  );

  return payload();
}