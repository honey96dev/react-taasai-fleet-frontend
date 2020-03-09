import {BREADCRUMB_SET_DATA} from "actions/breadcrumb.type";
import {PROJECT} from "core/globals";

const initialState = {
  breadcrumb: []
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case BREADCRUMB_SET_DATA:
      return {
        ...state,
        breadcrumb: payload,
      };
    default:
      return state
  }
};
