import fetch from "apis/fetch";
import {GET, POST} from "apis/constants";
import apis from "../core/apis";

export default {
  list: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.drivers.list, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  get: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.drivers.get, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  add: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.drivers.add, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  delete: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.drivers.delete, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
