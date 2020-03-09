import React from "react";
import {MDBBadge, MDBBtn, MDBIcon, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Base64} from "js-base64";
import {useHistory} from "react-router-dom";

export default ({items, page, detailLink, editLink, onDelete}) => {
  const {t} = useTranslation();
  const history = useHistory();

  const handleDetail = (id) => {
    const params = Base64.encode(JSON.stringify({
      page,
      id,
    }));
    history.push(`${detailLink}/${params}`);
  };

  const handleEdit = (id) => {
    const params = Base64.encode(JSON.stringify({
      page,
      id,
    }));
    history.push(`${editLink}/${params}`);
  };

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
          <th className="edit-col-3">{t("DRIVERS.FIELDS.ACTION")}</th>
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
            <td className="edit-col">
              <MDBBtn tag="a" floating color="primary" size="sm" onClick={e => !!handleDetail && handleDetail(item.id)}>
                <MDBIcon icon="eye"/>
              </MDBBtn>
              <MDBBtn tag="a" floating color="secondary" size="sm" className="mx-2" onClick={e => !!handleEdit && handleEdit(item.id)}>
                <MDBIcon icon="edit"/>
              </MDBBtn>
              <MDBBtn tag="a" floating color="danger" size="sm" onClick={e => !!onDelete && onDelete({item, index})}>
                <MDBIcon icon="trash"/>
              </MDBBtn>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );

  return payload();
}