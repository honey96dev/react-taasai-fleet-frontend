import React from "react";
import {MDBBadge, MDBBtn, MDBIcon, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Base64} from "js-base64";
import {useHistory} from "react-router-dom";

export default ({items, page}) => {
  const {t} = useTranslation();
  const history = useHistory();

  const payload = () => (
    <MDBTable responsive striped>
      <MDBTableHead>
        <tr className="">
          <th className="nomer-col">#</th>
          <th>{t("DRIVERS.FIELDS.NAME")}</th>
          <th>{t("DRIVERS.FIELDS.MOBILE")}</th>
          <th>{t("DRIVERS.FIELDS.VEHICLE")}</th>
          {/*<th>{t("DRIVERS.FIELDS.LOCATION")}</th>*/}
          <th>{t("DRIVERS.FIELDS.DOCUMENTS")}</th>
          <th>{t("DRIVERS.FIELDS.BALANCE")}</th>
          <th>{t("DRIVERS.FIELDS.PENDING")}</th>
          <th>{t("DRIVERS.FIELDS.STATUS")}</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {!!items.length && items.map((item, index) => (
          <tr key={index} className="">
            <td>{item.number}</td>
            <td>{item.name}</td>
            <td>+{item.dial_code} {item.mobile_number}</td>
            <td>{item.vehicle_name} - {item.vehicle_number}</td>
            {/*<td>{item.location}</td>*/}
            <td>{t(`COMMON.STATUS.${item.is_active ? "SUBMITTED" : "NOT_SUBMITTED"}`)}</td>
            <td>{item.balance}</td>
            <td>{item.pending || 0}</td>
            <td>
              <MDBBadge pill color={item.is_active ? "success" : "danger"}>{t(`COMMON.STATUS.${item.is_active ? "ENABLED" : "DISABLED"}`)}</MDBBadge>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );

  return payload();
}