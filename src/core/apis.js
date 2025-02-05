import {PROJECT} from "core/globals";

export default {
  baseUrl: PROJECT.IS_DEV ? "http://192.168.40.131:7080/api/" : "/api/",
  assetsBaseUrl: PROJECT.IS_DEV ? "http://192.168.40.131:7080/assets/" : "/assets/",
  assets: {
    flags: "images/flags",
  },
  core: {
    getVehicleTypes: "core/get-vehicle-types",
  },
  auth: {
    signIn: "auth/sign-in",
    sendForgotPasswordMail: "auth/send-forgot-password-mail",
    validateToken: "auth/validate-token",
    resetPassword: "auth/reset-password",
  },
  profile: {
    avatar: "profile/avatar",
    saveAvatar: "profile/save-avatar",
    save: "profile/save",
    getStats: "profile/get-stats",
    getBalances: "profile/get-balances",
    changePassword: "profile/change-password",
  },
  drivers: {
    list: "drivers/list",
    get: "drivers/get",
    history: "drivers/history",
    add: "drivers/add",
    delete: "drivers/delete",
    activate: "drivers/activate",
  },
  map: {
    drivers: "map/drivers",
  },
  commission: {
    list: "commission/list",
  },
  account: {
    avatar: "account/avatar",
    saveAvatar: "account/save-avatar",
    savePersonalInfo: "account/save-personal-info",
    changePassword: "account/change-password",
    changeAccountType: "account/change-account-type",
  },
};
