import fetch from "apis/fetch";
import {GET, POST} from "apis/constants";
import apis from "../core/apis";

export default {
  drivers: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.map.drivers, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
