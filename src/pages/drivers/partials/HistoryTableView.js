import React from "react";
import {MDBBadge, MDBBtn, MDBIcon, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Base64} from "js-base64";
import {useHistory} from "react-router-dom";
import dateformat from "dateformat";
import numeral from "numeral";

import {NUMERAL} from "core/globals";

export default ({items, page}) => {
  const {t} = useTranslation();
  const history = useHistory();
  
  const STATUS = {
    colors: ["#e67e22", "#3498db", "#2980b9", "#2ecc71", "#1abc9c", "#d35400", "#e74c3c"],
    labels: ["Waiting", "Driver Assigned", "Driver Arrived", "Started", "Completed", "Driver Unavailable", "Cancelled"],
  };

  const payload = () => (
    <MDBTable responsive striped>
      <MDBTableHead>
        <tr className="">
          <th className="nomer-col">#</th>
          <th>{t("COMMISSION.FIELDS.PASSENGER")}</th>
          <th>{t("COMMISSION.FIELDS.PICKUP_LOCATION")}</th>
          <th>{t("COMMISSION.FIELDS.DROP_LOCATION")}</th>
          <th>{t("COMMISSION.FIELDS.BOOKING_TIME")}</th>
          <th>{t("COMMISSION.FIELDS.DURATION")}</th>
          <th>{t("COMMISSION.FIELDS.FARE")}</th>
          <th>{t("COMMISSION.FIELDS.COMMISSION")}</th>
          <th>{t("COMMISSION.FIELDS.STATUS")}</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {!!items.length && items.map((item, index) => (
          <tr key={index} className="">
            <td>{item.number}</td>
            <td>{item.passenger}</td>
            <td>{item.pickup_location}</td>
            <td>{item.drop_location}</td>
            <td>{dateformat(new Date(item.ride_date_time), "ddd, mmm dS, h:MM TT")}</td>
            <td>{item.duration}</td>
            <td>{item.total_fare}</td>
            <td>{numeral(item.operator_commission + item.fleet_commission).format(NUMERAL.FORMAT.FIXED_2)}</td>
            <td>
              <MDBBadge pill color="none" style={{backgroundColor: STATUS.colors[item.ride_status]}}>{STATUS.labels[item.ride_status]}</MDBBadge>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );

  return payload();
}