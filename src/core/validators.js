// import libphonenumber from "google-libphonenumber";
import { isValidPhoneNumber } from "react-phone-number-input";

export default {
  isEmail: (value) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  },
  isUsername: (value) => {
    const re = /^[0-9a-zA-Z_][0-9a-zA-Z_.-]+$/;
    return re.test(String(value).toLowerCase());
  },
  isPhoneNumber: (value) => {
    try {
      return isValidPhoneNumber(value);
    } catch (e) {
      return false;
    }
  },
  isURL: value => {
    return value.startsWith("http://") || value.startsWith("https://");
  },
}
