import fetch from "apis/fetch";
import {GET, POST} from "apis/constants";
import apis from "../core/apis";

export default {
  changePassword: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.profile.changePassword, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
