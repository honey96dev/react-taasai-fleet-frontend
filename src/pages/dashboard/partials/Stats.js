import React, {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBProgress, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import numeral from "numeral";

import {NUMERAL, RESULT} from "core/globals";
import Loading from "components/Loading";
import Service from "services/ProfileService";

import "./Stats.scss";

export default () => {
  const {t} = useTranslation();
  const {auth: {user}} = useSelector(state => state);

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});

  const loadData = e => {
    setIsLoading(true);
    Service.getStats({id: user.id})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          setStats(res.data);
        } else {
          setStats({});
        }
        setIsLoading(false);
      })
      .catch(err => {
        setStats({});
        setIsLoading(false);
      });
  };

  useEffect(e => {
    loadData();
  }, []);

  const payload = () => (
    <Fragment>
      <MDBCard>
        <MDBCardBody>
          {/*<h4 className="h4-responsive">{t("DASHBOARD.FIELDS.STATS")}</h4>*/}
          {isLoading && <Loading style={{height: 72}}/>}
          {!isLoading && <MDBRow>
            <MDBCol md="4" className="mb-4 mb-lg-0">
              <div className="media align-items-center">
                <MDBIcon icon="directions" className="icon-box text-center text-default mr-4 circle p-3 border border-default bg-info-light25"/>
                <div  className="media-body">
                  <h4  className="weight-400 m-0">{numeral(stats.rides_count || 0).format(NUMERAL.FORMAT.FIXED_0)}</h4>
                  <small  className="text-muted">{t("DASHBOARD.FIELDS.TOTAL_RIDES")}</small></div>
              </div>
              <MDBProgress className="my-2" material value={50} color="default" />
            </MDBCol>
            <MDBCol md="4" className="mb-4 mb-lg-0">
              <div className="media align-items-center">
                <MDBIcon icon="pound-sign" className="icon-box text-center text-danger mr-4 circle p-3 border border-danger bg-danger-light25"/>
                <div  className="media-body">
                  <h4  className="weight-400 m-0">{numeral(stats.total_earning || 0).format(NUMERAL.FORMAT.FIXED_2)}</h4>
                  <small  className="text-muted">{t("DASHBOARD.FIELDS.EARNING")}</small></div>
              </div>
              <MDBProgress className="my-2" material value={50} color="danger" />
            </MDBCol>
            <MDBCol md="4" className="mb-4 mb-lg-0">
              <div className="media align-items-center">
                <MDBIcon icon="car" className="icon-box text-center text-success mr-4 circle p-3 border border-success bg-success-light25"/>
                <div  className="media-body">
                  <h4  className="weight-400 m-0">{numeral(stats.drivers_count || 0).format(NUMERAL.FORMAT.FIXED_0)}</h4>
                  <small  className="text-muted">{t("DASHBOARD.FIELDS.DRIVERS")}</small></div>
              </div>
              <MDBProgress className="my-2" material value={50} color="success" />
            </MDBCol>
          </MDBRow>}
        </MDBCardBody>
      </MDBCard>

    </Fragment>
  );

  return payload();
}