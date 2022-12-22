import { removeAccessToken } from "../../utils/api";
import { TYPES } from "./action";

function authReducer(authorized = false, action) {
  const { type, payload } = action;

  switch (type) {
    case TYPES.SIGNED_IN:
      return payload.authorized;
    case TYPES.SIGNED_OUT:
      removeAccessToken();
      return payload.authorized;
    default:
      return authorized;
  }
}

export { authReducer };
