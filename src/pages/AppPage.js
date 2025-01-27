import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import {BrowserRouter} from "react-router-dom";
import {useSelector} from "react-redux";

import Router from "components/Router";
import apis from "core/apis";
import {setBaseUrl, setHeader} from "apis/fetch";
import i18n from "core/i18n";
import {EFFECT, PROJECT} from "core/globals";
import {ToastContainer} from "mdbreact";
import {Fade} from "../components/MyToast";

setBaseUrl(apis.baseUrl);
setHeader({lang: i18n.language});

export default () => {
  const {t} = useTranslation();
  const {auth} = useSelector(state => state);

  sessionStorage.setItem(PROJECT.PERSIST_KEY, JSON.stringify({
    signedIn: auth.signedIn,
    user: auth.user,
    token: auth.token,
  }));

  setHeader({Authorization: `Bearer ${auth.token}`});
  const direction = t("DIRECTION");

  return (
    <Fragment>
      <BrowserRouter>
        <div dir={direction} className={direction === "rtl" ? "rtl-content" : ""}>
          <Router/>
        </div>
      </BrowserRouter>
      <ToastContainer
        className="text-left"
        position={t("DIRECTION") === "ltr" ? "top-right" : "top-left"}
        dir={t("DIRECTION")}
        hideProgressBar={true}
        // newestOnTop={true}
        // autoClose={0}
        autoClose={EFFECT.TRANSITION_TIME5}
        closeButton={false}
        transition={Fade}/>
    </Fragment>
  );
};

