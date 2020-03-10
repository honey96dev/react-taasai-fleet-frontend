import React, {Fragment, useEffect, useMemo, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import {animateScroll as scroll} from "react-scroll";
import {CSSTransition} from "react-transition-group";

import {EFFECT, RESULT} from "core/globals";
import routes from "core/routes";
import toast from "components/MyToast";
import Loading from "components/Loading";
import ErrorNoData from "components/ErrorNoData";
import Pagination from "components/Pagination";
import Service from "services/CommissionService";
import TableView from "./partials/TableView";

import "./MainPage.scss";

export default () => {
  const {page} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth: {user}} = useSelector(state => state);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);

  const currentPage = page ? parseInt(page) : 1;
  const pageTitle = t("NAVBAR.COMMISSION.MAIN");

  const loadData = () => {
    setLoading(true);
    setAlert({});
    Service.list({page, pageSize: 10, userId: user.id})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          setPageCount(res.pageCount);
          setItems(res.data);
        } else {
          toast.error(res.message);
        }
        setLoading(false);
      })
      .catch(err => {
        toast.error(t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"));
        setLoading(false);
      });
  };

  const handlePageChange = page => {
    history.push(`${routes.commission.main}/${page}`);
  };

  useEffect(e => {
    scroll.scrollToTop({
      duration: EFFECT.TRANSITION_TIME,
    });
  }, []);

  useMemo(e => {
    loadData();
  }, [page, t]);

  useMemo(e => {
    scroll.scrollToTop({
      duration: EFFECT.TRANSITION_TIME,
    });
  }, [page]);

  const payload = () => (
    <Fragment>
      <Helmet>
        <title>{pageTitle} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem active>{pageTitle}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBRow>
        {alert.show && <MDBCol md="12">
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={EFFECT.TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>}
        <MDBCol md="12">
          {!!loading && <Loading/>}
          {!loading && !items.length && <ErrorNoData/>}
          {!loading && !!items.length && <Fragment>
            <div className="my-4 text-center">
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
            </div>
            <TableView items={items} page={page}/>
            {/*<ListView items={items} page={page} newLink={addUrl} detailLabel={t("COMMON.BUTTON.EDIT")} detailLink={detailLink} deleteLabel={t("COMMON.BUTTON.DELETE")} onDelete={handleDeleteItem} questionsLink={questionsUrl} questionsLabel={t("HIRE.WORKPLACE.QUESTIONNAIRE.QUESTIONS.QUESTIONS")} />*/}
            <div className="mt-4 text-center">
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
            </div>
          </Fragment>}
        </MDBCol>
      </MDBRow>
    </Fragment>
  );

  return payload();
}