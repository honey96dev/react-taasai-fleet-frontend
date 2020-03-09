import fetch from "apis/fetch";
import {GET, POST} from "apis/constants";
import apis from "../core/apis";

export default {
  getVehicleTypes: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.core.getVehicleTypes, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  downloadFile: ({url, filename, params}) => {
    return new Promise((resolve, reject) => {
      fetch(GET, url, params, {Accept: "application/pdf"}, {responseType: "blob"})
        .then(res => {
          let url = window.URL.createObjectURL(res);
          const element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute("download", filename);

          element.style.display = "none";
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);

          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
