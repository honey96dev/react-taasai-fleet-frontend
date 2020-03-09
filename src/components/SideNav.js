import React, {Fragment, useEffect, useState} from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBNavbar,
  MDBNavbarNav, MDBNavItem, MDBNavLink,
  MDBSideNav,
  MDBSideNavCat,
  MDBSideNavLink,
  MDBSideNavNav
} from "mdbreact";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

import {SIDE_NAV} from "core/globals"
import images from "core/images";
import routes from "core/routes";
import authActions from "actions/auth";
import AuthService from "services/AuthService";

import "./SideNav.scss";
import useDebounce from "../helpers/useDebounce";

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const pathname = history.location.pathname;

  const [windowWidth, setWindowWidth] = useState(0);

  const navStyle = {
    paddingLeft: windowWidth > SIDE_NAV.BREAKPOINT ? "210px" : "16px"
  };

  const mainStyle = {
    margin: "0 6%",
    paddingTop: "5.5rem",
    paddingLeft:
      windowWidth > SIDE_NAV.BREAKPOINT ? "240px" : "0"
  };

  const specialCaseNavbarStyles = {
    WebkitBoxOrient: "horizontal",
    flexDirection: "row"
  };

  const handleResize = e => {
    setWindowWidth(window.innerWidth);
  };

  const handleSignOut = e => {
    AuthService.signOut();
    dispatch(authActions.signOut());
  };

  useEffect(e => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return (e => {
      window.removeEventListener("resize", handleResize);
    });
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const linkClassName = (path) => {
    return pathname === path ? `sidenav-active` : ``;
  };

  const payload = () => (
    <Fragment>
      <div className="fixed-sn black-skin">
      <MDBSideNav
        logo={images.logo.logo100}
        href={routes.root}
        fixed
        triggerOpening={isOpen}
        breakWidth={SIDE_NAV.BREAKPOINT}
      >
        <MDBSideNavNav>
          <MDBSideNavCat
            name={t("NAVBAR.DRIVERS.ROOT")}
            id={t("NAVBAR.DRIVERS.ROOT")}
            isOpen={pathname.startsWith(routes.drivers.root)}
            icon="car-alt"
          >
            <MDBSideNavLink to={routes.drivers.list}>
              {t("NAVBAR.DRIVERS.LIST")}
            </MDBSideNavLink>
            <MDBSideNavLink to={routes.drivers.add}>
              {t("NAVBAR.DRIVERS.ADD")}
            </MDBSideNavLink>
          </MDBSideNavCat>
          <MDBSideNavCat
            name={t("NAVBAR.LOCATION.ROOT")}
            id={t("NAVBAR.LOCATION.ROOT")}
            isOpen={pathname.startsWith(routes.location.root)}
            icon="map-marker-alt"
          >
            <MDBSideNavLink to={routes.location.main}>{t("NAVBAR.LOCATION.MAIN")}</MDBSideNavLink>
            <MDBSideNavLink to={routes.location.map}>{t("NAVBAR.LOCATION.MAP")}</MDBSideNavLink>
          </MDBSideNavCat>
          <MDBSideNavCat
            name={t("NAVBAR.COMMISSION.ROOT")}
            id={t("NAVBAR.COMMISSION.ROOT")}
            isOpen={pathname.startsWith(routes.commission.root)}
            icon="money-bill"
          >
            <MDBSideNavLink to={routes.commission.main}>{t("NAVBAR.COMMISSION.MAIN")}</MDBSideNavLink>
          </MDBSideNavCat>
        </MDBSideNavNav>
      </MDBSideNav>
        {/*<MDBBtn tag="a" floating size="sm" color="mdb-color" className="side-nav-toggle" onClick={e => setIsOpen(!isOpen)}><MDBIcon icon="bars" /></MDBBtn>*/}
        <MDBNavbar style={navStyle} double expand="md" fixed="top" scrolling>
          <MDBNavbarNav left>
            <MDBNavItem>
              <div
                onClick={e => setIsOpen(!isOpen)}
                key="sideNavToggleA"
                style={{
                  lineHeight: "32px",
                  marginRight: "1em",
                  verticalAlign: "middle"
                }}
              >
                <MDBIcon icon="bars" color="white" />
              </div>
            </MDBNavItem>
            <MDBNavItem className="d-none d-md-inline" style={{ paddingTop: 5 }}>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right style={specialCaseNavbarStyles}>
            <MDBNavItem>
              <MDBNavLink to="#!" onClick={handleSignOut}>
                <MDBIcon far icon="sign-out-alt" className="d-inline-inline" />
                <div className="d-none d-md-inline">{t("COMMON.AUTH.SIGN_OUT")}</div>
              </MDBNavLink>
              {/*<MDBBtn color="danger" size="sm" rounded flat className="my-0">*/}
              {/*  <MDBIcon icon="sign-out-alt"/>*/}
              {/*  {t("COMMON.AUTH.SIGN_OUT")}*/}
              {/*</MDBBtn>*/}
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>
      </div>
    </Fragment>
  );

  return payload();
}