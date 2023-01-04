import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authUserReducer from "./authUser/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import threadsReducer from "./threads/reducer";
import isPreloadReducer from "./isPreload/reducer";
import leaderboardsReducer from "./leaderboards/reducer";

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
