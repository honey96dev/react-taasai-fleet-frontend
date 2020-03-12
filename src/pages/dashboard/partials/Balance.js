import React, {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import numeral from "numeral";

import {NUMERAL, RESULT} from "core/globals";
import Loading from "components/Loading";
import Service from "services/ProfileService";

import "./Balance.scss";

export default () => {
  const {t} = useTranslation();
  const {auth: {user}} = useSelector(state => state);

  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState({});

  const loadData = e => {
    setIsLoading(true);
    Service.getBalances({id: user.id})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          setBalance(res.data);
        } else {
          setBalance({});
        }
        setIsLoading(false);
      })
      .catch(err => {
        setBalance({});
        setIsLoading(false);
      });
  };

  useEffect(e => {
    loadData();
  }, []);

  const payload = () => (
    <Fragment>
      <MDBCard className="mt-3 mt-lg-4">
        <MDBCardBody>
          {/*<h4 className="h4-responsive">{t("DASHBOARD.FIELDS.BALANCE")}</h4>*/}
          {isLoading && <Loading style={{height: 70}}/>}
          {!isLoading && <MDBRow>
            <MDBCol md="6">
              <label>{t("DASHBOARD.FIELDS.LIVE_BALANCE")}</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    <i className="fa fa-pound-sign prefix"></i>
                  </span>
                </div>
                <input type="text" className="form-control" value={numeral(balance.balance || 0).format(NUMERAL.FORMAT.FIXED_2)} readOnly aria-label={t("DASHBOARD.FIELDS.LIVE_BALANCE")}
                       aria-describedby="basic-addon"/>
              </div>
              {/*<MDBInput outline containerClass="my-0" value={user.balance || 0} readOnly/>*/}
            </MDBCol>
            <MDBCol md="6">
              <label>{t("DASHBOARD.FIELDS.INCOME_PENDING")}</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    <i className="fa fa-pound-sign prefix"></i>
                  </span>
                </div>
                <input type="text" className="form-control" value={numeral(balance.income_pending || 0).format(NUMERAL.FORMAT.FIXED_2)} readOnly aria-label={t("DASHBOARD.FIELDS.INCOME_PENDING")}
                       aria-describedby="basic-addon"/>
              </div>
              {/*<MDBInput outline containerClass="my-0" value={user.income_pending || 0} readOnly/>*/}
            </MDBCol>
          </MDBRow>}
        </MDBCardBody>
      </MDBCard>

    </Fragment>
  );

  return payload();
}