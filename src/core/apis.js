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
  drivers: {
    list: "drivers/list",
    get: "drivers/get",
    add: "drivers/add",
    delete: "drivers/delete",
  },
  account: {
    avatar: "account/avatar",
    saveAvatar: "account/save-avatar",
    savePersonalInfo: "account/save-personal-info",
    changePassword: "account/change-password",
    changeAccountType: "account/change-account-type",
  },
  profile: {
    avatar: "profile/avatar",
    saveAvatar: "profile/save-avatar",
    save: "profile/save",
    changePassword: "profile/change-password",
  },
};
