import React, {Fragment, useMemo, useState} from "react";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCol,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBTabContent,
  MDBTabPane
} from "mdbreact";
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
import HistoryTableView from "./partials/HistoryTableView";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import ErrorNoData from "../../components/ErrorNoData";

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
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const pageTitle = t("NAVBAR.DRIVERS.DETAILS");
  let backUrl = `${routes.drivers.list}/${urlParams.page || 1}`;
  const currentPage = page || 1;

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
          const vehicle_image = res.data["vehicle_image"].split("/");
          if (!!vehicle_image.length) {
            vehicle_image.splice(0, 1);
            res.data["vehicle_image"] = `${apis.assetsBaseUrl}${vehicle_image.join("/")}`;
          }
          const driver_image = res.data["driver_image"].split("/");
          if (!!driver_image.length) {
            driver_image.splice(0, 1);
            res.data["driver_image"] = `${apis.assetsBaseUrl}${driver_image.join("/")}`;
          }
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
  };

  const loadHistory = e => {
    setLoading2(true);
    Service.history({id: urlParams.id, userId: user.id, page})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          setPageCount(res.pageCount);
          setItems(res.data);
        } else {
          toast.error(res.message);
          setPageCount(0);
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

  const handlePageChange = page => {
    // const params = Base64.encode(JSON.stringify({
    //   id: urlParams.id,
    //   page: page,
    // }));
    // history.push(`${routes.drivers.detail}/${params}/history`);
    setPage(page);
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

  useMemo(e => {
    !!urlParams.id && loadHistory();
  }, [urlParams.id, page]);

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
            {!!loading2 && <Loading/>}
            {!loading2 && !items.length && <ErrorNoData/>}
            {!loading2 && !!items.length && <Fragment>
              <div className="my-4 text-center">
                <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
              </div>
              <HistoryTableView items={items}/>
              <div className="my-4 text-center">
                <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
              </div>
            </Fragment>}
          </MDBTabPane>
        </MDBTabContent>
      </div>
    </Fragment>
  );

  return payload();
}