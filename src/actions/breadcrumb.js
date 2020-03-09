import {BREADCRUMB_SET_DATA} from "./breadcrumb.type";

const setBreadcrumb = (payload) => {
  return {type: BREADCRUMB_SET_DATA, payload}
};

export default {
  setBreadcrumb,
};
