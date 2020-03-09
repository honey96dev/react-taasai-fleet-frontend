import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem} from "mdbreact";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import useWindowScrollPosition from "@rehooks/window-scroll-position";

import routes from "core/routes";
import images from "core/images";
import {changeLanguage} from "core/i18n";
import {NAVBAR, PROJECT, SIDE_NAV} from "core/globals";
import authActions from "actions/auth";
import AuthService from "services/AuthService";
import "./Navbar.scss";
// import HireNavbar from "./partial/HireNavbar";
// import WorkNavbar from "./partial/WorkNavbar";

export default ({type, thresholdY}) => {

}
