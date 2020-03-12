const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
const origin = isDev ? "http://localhost:3000" : "https://fleet.taasai.com";

export const PROJECT = {
  IS_DEV: isDev,
  PERSIST_KEY: "taasai-fleet",
};

export const ALERT = {
  SUCCESS: "success",
  DANGER: "danger",
  LIFETIME: 5000,
};

export const AUTH = {
  CURRENT_USER: "CURRENT_USER",
  TOKEN: "TOKEN",
  USERNAME_MAX_LENGTH: 20,
  PASSWORD_MIN_LENGTH: 6,
};

export const AVATAR = {
  SIZE: {
    WIDTH: 200,
    HEIGHT: 200,
  },
};

export const DATE_FORMAT = {
  ISO: "YYYY-M-D",
  ISO2: "YYYY-MM-DD",
};

export const DELAY = {
  DELAY1: 500,
  DELAY2: 1000,
  DELAY3: 1500,
};

export const DEFAULT = {
  USER: {
    EMAIL: "honey96dev@gmail.com",
    USERNAME: "honey96dev",
    PASSWORD: "123456",
    FIRST_NAME: "Zhenlong",
    FATHER_NAME: "Xuanming",
    LAST_NAME: "Jin",
    PHONE: "571623415",
    WEBSITE: "",
    NATIONALITY: "SA",
    COUNTRY: "SA",
    CITY: "Riyadh",
    BIRTHDAY: "1994-01-22",
    GENDER: "M",
  },
};

export const EFFECT = {
  TRANSITION_TIME: 500,
  TRANSITION_TIME5: 5000,
};

export const ERROR = {
  UNKNOWN_SERVER_ERROR: "UNKNOWN_SERVER_ERROR"
};

export const FILE_UPLOAD = {
  MAXSIZE1: "5M",
  MAXSIZE2: "10M",
};

export const GENDER = {
  MALE: "M",
  FEMALE: "F",
};

export const INPUT = {
  DESCRIPTION_LENGTH_BREAKPOINT: 400,
  TEXTAREA_ROWS1: 10,
  TEXTAREA_ROWS2: 18,
  TEXTAREA_MAX_LENGTH: 4096,
};

export const MODAL = {
  TYPE: {
    DELETE: "DELETE",
    EDIT: "EDIT",
    ACTIVATE: "ACTIVATE",
  },
};

export const NAVBAR = {
  SCROLLING_OFFSET: 40,
  AVATAR: {
    HEIGHT: 35,
  },
};

export const NUMERAL = {
  FORMAT: {
    FIXED_0: "0,0",
    FIXED_2: "0,0.00",
  },
};

export const PAGINATION = {
  WIDTH: 10,
  WIDTH_MOBILE: 6,
};

export const RESULT = {
  SUCCESS: "success",
  ERROR: "danger",
};

export const SCOPE = {
  ALL: "ALL",
  CURRENT: "CURRENT",
};

export const SIDE_NAV = {
  WIDTH: 260,
  BREAKPOINT: 1200,
};

export const STATUS = {
  UNKNOWN: "unknown",
};

export const VALIDATION = {
  REQUIRED: "REQUIRED",
  INVALID: "INVALID",
  MAX_LENGTH: "MAX_LENGTH",
  MIN_LENGTH: "MIN_LENGTH",
  MISMATCH: "MISMATCH",
};

export default {
  PROJECT,
  ALERT,
  AUTH,
  DATE_FORMAT,
  DEFAULT,
  EFFECT,
  ERROR,
  FILE_UPLOAD,
  GENDER,
  INPUT,
  NAVBAR,
  NUMERAL,
  PAGINATION,
  RESULT,
  SCOPE,
  SIDE_NAV,
  VALIDATION,
};
