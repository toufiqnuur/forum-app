import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/apis";
import { setAuthUserTrigger } from "../authUser/action";

const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

function setIsPreloadTrigger(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserTrigger(authUser));
    } catch (error) {
      dispatch(setAuthUserTrigger(null));
    } finally {
      dispatch(setIsPreloadTrigger(false));
    }
    dispatch(hideLoading());
  };
}

export { ActionType, setIsPreloadTrigger, asyncPreloadProcess };
