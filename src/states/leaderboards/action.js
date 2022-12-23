import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  SET_LEADERBOARDS: "SET_LEADERBOARDS",
};

function setLeaderboardsTrigger(leaderboards) {
  return {
    type: ActionType.SET_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncGetLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(setLeaderboardsTrigger(leaderboards));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, setLeaderboardsTrigger, asyncGetLeaderboards };
