import React, {Fragment, useEffect, useState} from "react";
import {MDBBreadcrumb, MDBBreadcrumbItem} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

import images from "core/images";
import {RESULT} from "core/globals";
import toast from "components/MyToast";
import Service from "services/MapService";

import "./MapPage.scss";

export default () => {
  const {t} = useTranslation();
  const {auth: {user}} = useSelector(state => state);

  const [loading, setLoading] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState( {
    lat: 10,
    lng: 76,
  });

  const pageTitle = t("NAVBAR.LOCATION.MAP");

  const loadData = e => {
    setLoading(true);
    Service.drivers({pageSize: 500, userId: user.id})
      .then(res => {
        if (res.result === RESULT.SUCCESS) {
          const items = [];
          let mapPos;
          for (let item of res.data) {
            mapPos = item.map_pos.split(" ");

            mapPos.length === 2 && items.push({
              lat: parseFloat(mapPos[0]),
              lng: parseFloat(mapPos[1]),
            })
          }
          setMarkers(items);
          !!items.length && setCenter(items[0]);
        } else {
          toast.error(res.message);
          setMarkers([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setMarkers([]);
        toast.error(t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"));
        setLoading(false);
      });
  };

  useEffect(e => {
    loadData();
  }, []);

  const payload = () => (
    <Fragment>
      <Helmet>
        <title>{pageTitle} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.LOCATION.ROOT")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{pageTitle}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <LoadScript
        id="map-loader"
        googleMapsApiKey="AIzaSyDrQoryIBTY8vSo7pvc1mI77QpYvXgxnRA"
        libraries={["visualization"]}
      >
        <GoogleMap
          id="map"
          mapContainerClassName="map-container"
          zoom={5}
          center={center}
          onLoad={map => {
            // const bounds = new window.google.maps.LatLngBounds();
            // map.fitBounds(bounds);
          }}
          onUnmount={map => {
            // do your stuff before map is unmounted
          }}
        >
          {markers.map((item, index) => (
            <Marker key={index} position={item} icon={images.icons.car} />
          ))}
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );

  return payload();
}