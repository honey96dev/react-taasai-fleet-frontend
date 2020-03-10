import fetch from "apis/fetch";
import {GET, POST} from "apis/constants";
import apis from "../core/apis";

export default {
  list: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.commission.list, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
