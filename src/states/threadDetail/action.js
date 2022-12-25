import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  CLEAR_THREAD_DETAIL: "threadDetail/clear",
  RECEIVE_THREAD_DETAIL: "threadDetail/receive",
  TOGGLE_LIKE_THREAD: "threadDetail/likeThread",
  TOGGLE_DISLIKE_THREAD: "threadDetail/dislikeThread",
  TOGGLE_CLEAR_VOTE_THREAD: "threadDetail/clearVoteThread",
  ADD_COMMENT: "threadDetail/addComment",
  TOGGLE_LIKE_COMMENT: "threadDetail/likeComment",
  TOGGLE_DISLIKE_COMMENT: "threadDetail/dislikeComment",
  TOGGLE_CLEAR_VOTE_COMMENT: "threadDetail/clearVoteComment",
};

function clearThreadDetailTrigger() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function receiveThreadDetailTrigger(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function toggleLikeThreadTrigger(userId) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleDislikeThreadTrigger(userId) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleClearVoteThreadTrigger(userId) {
  return {
    type: ActionType.TOGGLE_CLEAR_VOTE_THREAD,
    payload: {
      userId,
    },
  };
}

function addCommentTrigger(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleLikeCommentTrigger({ userId, commentId }) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function toggleDislikeCommentTrigger({ userId, commentId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function toggleClearVoteCommentTrigger({ userId, commentId }) {
  return {
    type: ActionType.TOGGLE_CLEAR_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailTrigger());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailTrigger(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThread() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) return alert("Login untuk memberi vote");

    if (threadDetail.upVotesBy.includes(authUser.id)) {
      dispatch(
        asyncToggleClearVoteThread({
          threadId: threadDetail.id,
          userId: authUser.id,
        })
      );
    } else {
      dispatch(showLoading());
      dispatch(toggleLikeThreadTrigger(authUser.id));
      try {
        await api.toggleLikeThread(threadDetail.id);
      } catch (error) {
        alert(error.message);
        dispatch(toggleLikeThreadTrigger(authUser.id));
      }
      dispatch(hideLoading());
    }
  };
}

function asyncToggleDislikeThread() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) return alert("Login untuk memberi vote");

    if (threadDetail.downVotesBy.includes(authUser.id)) {
      dispatch(
        asyncToggleClearVoteThread({
          threadId: threadDetail.id,
          userId: authUser.id,
        })
      );
    } else {
      dispatch(showLoading());
      dispatch(toggleDislikeThreadTrigger(authUser.id));
      try {
        await api.toggleDislikeThread(threadDetail.id);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDislikeThreadTrigger(authUser.id));
      }
      dispatch(hideLoading());
    }
  };
}

function asyncToggleClearVoteThread({ userId, threadId }) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleClearVoteThreadTrigger(userId));
    try {
      await api.toggleClearVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleClearVoteThreadTrigger(userId));
    }
    dispatch(hideLoading());
  };
}

function asyncAddNewComment({ threadId, content }) {
  console.log(content);
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { comment } = await api.createComment({ threadId, content });
      dispatch(addCommentTrigger(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeComment(commentId) {
  return async (dispatch, getState) => {
    const {
      authUser,
      threadDetail: { comments, id: threadId },
    } = getState();
    if (!authUser) return alert("Login untuk memberi vote");

    dispatch(showLoading());
    if (
      comments
        .find((comment) => comment.id === commentId)
        .upVotesBy.includes(authUser.id)
    ) {
      dispatch(
        asyncToggleClearVoteComment({
          userId: authUser.id,
          threadId,
          commentId,
        })
      );
    } else {
      dispatch(toggleLikeCommentTrigger({ userId: authUser.id, commentId }));
      try {
        await api.toggleLikeComment({ threadId, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleLikeCommentTrigger({ userId: authUser.id, commentId }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDislikeComment(commentId) {
  return async (dispatch, getState) => {
    const {
      authUser,
      threadDetail: { comments, id: threadId },
    } = getState();
    if (!authUser) return alert("Login untuk memberi vote");

    dispatch(showLoading());
    if (
      comments
        .find((comment) => comment.id === commentId)
        .downVotesBy.includes(authUser.id)
    ) {
      dispatch(
        asyncToggleClearVoteComment({
          userId: authUser.id,
          threadId,
          commentId,
        })
      );
    } else {
      dispatch(
        toggleDislikeCommentTrigger({
          userId: authUser.id,
          commentId,
        })
      );
      try {
        await api.toggleDislikeComment({ threadId, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          toggleDislikeCommentTrigger({ userId: authUser.id, commentId })
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleClearVoteComment({ userId, threadId, commentId }) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleClearVoteCommentTrigger({ userId, commentId }));
    try {
      await api.toggleClearVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleClearVoteCommentTrigger({ userId, commentId }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  asyncReceiveThreadDetail,
  asyncAddNewComment,
  asyncToggleLikeThread,
  asyncToggleDislikeThread,
  asyncToggleLikeComment,
  asyncToggleDislikeComment,
};
