export const routes = {
  mainGateway: "/",
  root: "/",
  admin: "/admin",
  auth: {
    root: "/auth",
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  dashboard: {
    root: "/dashboard",
    main: "/dashboard/main",
  },
  profile: {
    root: "/profile",
    main: "/profile/main",
  },
  drivers: {
    root: "/drivers",
    list: "/drivers/list",
    detail: "/drivers/detail",
    add: "/drivers/add",
  },
  location: {
    root: "/location",
    main: "/location/main",
    map: "/location/map",
  },
  commission: {
    root: "/commission",
    main: "/commission/main",
  },
};

export default routes;
