import React, {Fragment, useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useHistory, useParams} from "react-router-dom";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  ToastContainer
} from "mdbreact";
import {useTranslation} from "react-i18next";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";
import {Base64} from "js-base64";

import {EFFECT, RESULT} from "core/globals";
import routes from "core/routes";
import breadcrumbActions from "actions/breadcrumb";
import Loading from "components/Loading";
import ErrorNoData from "components/ErrorNoData";
import Pagination from "components/Pagination";
import toast, {Fade} from "components/MyToast";
import Service from "services/DriverService";
// import ListView from "./partial/ListView";
import TableView from "./partials/TableView";

import "./AllDriversPage.scss";

export default () => {
  const {page} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth: {user}} = useSelector(state => state);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);

  const currentPage = page ? parseInt(page) : 1;
  const pageTitle = t("NAVBAR.DRIVERS.LIST");
  const addUrl = `${routes.drivers.add}/${Base64.encode(JSON.stringify({
    page,
  }))}`;
  const detailLink = routes.drivers.add;

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
        // setAlert({
        //   show: true,
        //   color: ALERT.DANGER,
        //   message: t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"),
        // });
        toast.error(t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"));
        setLoading(false);
      });
  };

  const toggleModal = e => {
    setModal(Object.assign({}, modal, {show: !modal.show}));
  };

  const deleteItem = ({id}) => {
    toggleModal();
    setLoading(true);
    Service.delete({page, pageSize: 10, id: modal.itemId, userId: user.id})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          setPageCount(res.pageCount);
          setItems(res.data);
          // toast.success(res.message);
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

  const activateItem = ({id}) => {
    toggleModal();
    setLoading(true);
    Service.activate({page, pageSize: 10, userId: user.id, data: modal.data})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          setPageCount(res.pageCount);
          setItems(res.data);
          // toast.success(res.message);
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
    history.push(`${routes.drivers.list}/${page}`);
  };

  const handleDeleteItem = ({id, item}) => {
    setModal(Object.assign({}, modal, {show: true, title: t(`COMMON.BUTTON.${item.is_active ? "DEACTIVATE" : "ACTIVATE"}`), message:  t(`COMMON.QUESTION.${item.is_active ? "DEACTIVATE" : "ACTIVATE"}`, {item: item.name}), itemId: item.id}));
  };

  const handleActivateItem = ({id, item}) => {
    const buttonText = t(`COMMON.BUTTON.${item.is_active ? "DEACTIVATE" : "ACTIVATE"}`);
    setModal(Object.assign({}, modal, {
      show: true,
      title: t(`COMMON.BUTTON.${item.is_active ? "DEACTIVATE" : "ACTIVATE"}`),
      message: t(`COMMON.QUESTION.${item.is_active ? "DEACTIVATE" : "ACTIVATE"}`, {item: item.name}),
      data: {
        id: item.id,
        is_active: !item.is_active,
      },
      primaryButton: {
        color: item.is_active ? "danger" : "success",
        text: buttonText,
      },
    }));
  };

  useEffect(e => {
    scroll.scrollToTop({
      duration: EFFECT.TRANSITION_TIME,
    });

    // breadcrumbActions.setBreadcrumb([
    //   {
    //     text: t("NAVBAR.DRIVERS.ROOT"),
    //     link: undefined,
    //   }, {
    //     text: pageTitle,
    //     link: undefined,
    //   }
    // ]);
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
        <MDBBreadcrumbItem>{t("NAVBAR.DRIVERS.ROOT")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{pageTitle}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBRow className="my-0">
        <MDBCol md="12" className="order-1 order-md-0">
          <div className="full-width text-left">
            <Link to={addUrl}>
              <MDBBtn color="primary" size="sm" rounded disabled={!!loading}>
                {t("COMMON.BUTTON.NEW")}
              </MDBBtn>
            </Link>
          </div>
        </MDBCol>
      </MDBRow>
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
            <TableView items={items} page={page} detailLink={routes.drivers.detail} editLink={routes.drivers.add} onActivate={handleActivateItem}/>
            {/*<ListView items={items} page={page} newLink={addUrl} detailLabel={t("COMMON.BUTTON.EDIT")} detailLink={detailLink} deleteLabel={t("COMMON.BUTTON.DELETE")} onDelete={handleDeleteItem} questionsLink={questionsUrl} questionsLabel={t("HIRE.WORKPLACE.QUESTIONNAIRE.QUESTIONS.QUESTIONS")} />*/}
            <div className="mt-4 text-center">
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
            </div>
          </Fragment>}
        </MDBCol>
      </MDBRow>
      <MDBModal isOpen={!!modal.show} toggle={toggleModal} centered backdropClassName="modal-backdrop">
        <MDBModalHeader toggle={toggleModal}>{modal.title}</MDBModalHeader>
        <MDBModalBody className="text-left">{modal.message}</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn type="button" color={!!modal.primaryButton && modal.primaryButton.color} size="sm" rounded onClick={activateItem}>{!!modal.primaryButton && modal.primaryButton.text}</MDBBtn>
          <MDBBtn type="button" color="secondary" size="sm" rounded onClick={toggleModal}>{t("COMMON.BUTTON.CANCEL")}</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </Fragment>
  );

  return payload();
};
