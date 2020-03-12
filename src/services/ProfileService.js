import fetch from "apis/fetch";
import {GET, POST} from "apis/constants";
import apis from "../core/apis";

export default {
  getStats: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.profile.getStats, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  getBalances: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.profile.getBalances, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

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
