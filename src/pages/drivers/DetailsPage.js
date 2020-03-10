import React, {Fragment, useMemo, useState} from "react";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Link, useHistory, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import {Base64} from "js-base64";

import {RESULT} from "core/globals";
import routes from "core/routes";
import apis from "core/apis";
import toast from "components/MyToast";
import Service from "services/DriverService";
import DriverInformation from "./partials/DriverInformation";

import "./DetailsPage.scss";

export default () => {
  let {params, tab} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth: {user}} = useSelector(state => state);

  const [urlParams, setUrlParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);

  const pageTitle = t("NAVBAR.DRIVERS.DETAILS");
  let backUrl = `${routes.drivers.list}/${urlParams.page || 1}`;

  const TABS = {
    INFORMATION: "Information",
    HISTORY: "History",
  };

  tab = tab || TABS.INFORMATION;
  let CURRENT_TAB;
  switch (tab) {
    case TABS.INFORMATION:
      CURRENT_TAB = t("DRIVERS.DETAILS.INFORMATION.HEADING");
      break;
    case TABS.HISTORY:
      CURRENT_TAB = t("DRIVERS.DETAILS.HISTORY.HEADING");
      break;
  }


  const loadData = e => {
    setLoading(true);
    Service.get({id: urlParams.id, userId: user.id})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          res.data["vehicle_image"] = `${apis.assetsBaseUrl}${res.data["vehicle_image"]}`;
          res.data["driver_image"] = `${apis.assetsBaseUrl}${res.data["driver_image"]}`;
          setData(res.data);
        } else {
          toast.error(res.message);
          setData({});
        }
        setLoading(false);
      })
      .catch(err => {
        setData({});
        toast.error(t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"));
        setLoading(false);
      });

    setLoading2(true);
    Service.history({id: urlParams.id, userId: user.id})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          setItems(res.data);
        } else {
          toast.error(res.message);
          setItems([]);
        }
        setLoading2(false);
      })
      .catch(err => {
        setItems([]);
        // toast.error(t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"));
        setLoading2(false);
      });
  };

  const handleChangeTab = tab => {
    const pathname = `${routes.drivers.detail}/${params}/${tab}`;
    history.push(pathname);
  };

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

      <div className="classic-tabs mb-5">
        <MDBNav classicTabs color='mdb-color'>
          <MDBNavItem>
            <MDBNavLink to={`${routes.drivers.detail}/${params}/${TABS.INFORMATION}`} link={routes.drivers.detail} active={tab === TABS.INFORMATION} role="tab" onClick={e => handleChangeTab(TABS.INFORMATION)} >
              {t("DRIVERS.DETAILS.INFORMATION.HEADING")}
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={`${routes.drivers.detail}/${params}/${TABS.HISTORY}`} link={routes.drivers.detail} active={tab === TABS.HISTORY} role="tab" onClick={e => handleChangeTab(TABS.HISTORY)} >
              {t("DRIVERS.DETAILS.HISTORY.HEADING")}
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent
          className="card"
          activeItem={tab}
        >
          <MDBTabPane tabId={TABS.INFORMATION} role="tabpanel">
            <DriverInformation data={data}/>
          </MDBTabPane>
          <MDBTabPane tabId={TABS.HISTORY} role="tabpanel">
            {/*<DriverHistory data={data}/>*/}
          </MDBTabPane>
        </MDBTabContent>
      </div>
    </Fragment>
  );

  return payload();
}