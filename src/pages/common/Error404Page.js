import React, {Fragment} from "react";
import {MDBContainer} from "mdbreact";
import {useTranslation} from "react-i18next";

import Navbar from "components/Navbar";
import SideNav from "components/SideNav";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";

import "./Error404Page.scss";

export default ({accountType}) => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <SideNav type={accountType}/>
      <div className="content-with-sidenav">
        <MDBContainer className="section">
          <Error404/>
        </MDBContainer>
        {/*<Footer/>*/}
      </div>
      <BackToTop/>
    </Fragment>
  )
};