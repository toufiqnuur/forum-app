import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'threads/add',
  TOGGLE_LIKE: 'threads/like',
  TOGGLE_DISLIKE: 'threads/dislike',
  TOGGLE_CLEAR_VOTE: 'threads/clearVote',
};

function receiveThreadsTrigger(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadTrigger(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleLikeThreadTrigger({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDislikeThreadTrigger({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleClearVoteThreadTrigger({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_CLEAR_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncGetThreadsAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      const threadsWithOwner = threads.map((thread) => {
        return {
          ...thread,
          ownerName: users.find((user) => user.id === thread.ownerId).name,
        };
      });
      dispatch(receiveThreadsTrigger(threadsWithOwner));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddNewThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadTrigger(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleLikeThread(threadId) {
  return async (dispatch, getState) => {
    const { threads, authUser } = getState();
    if (!authUser) return alert('Login untuk memberi vote');

    dispatch(showLoading());
    if (threads.find((thread) => thread.id === threadId).upVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleClearVoteThread({ threadId, userId: authUser.id }));
    } else {
      dispatch(toggleLikeThreadTrigger({ threadId, userId: authUser.id }));
      try {
        await api.toggleLikeThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleLikeThreadTrigger({ threadId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDislikeThread(threadId) {
  return async (dispatch, getState) => {
    const { threads, authUser } = getState();
    if (!authUser) return alert('Login untuk memberi vote');

    dispatch(showLoading());
    if (threads.find((thread) => thread.id === threadId).downVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleClearVoteThread({ threadId, userId: authUser.id }));
    } else {
      dispatch(toggleDislikeThreadTrigger({ threadId, userId: authUser.id }));
      try {
        await api.toggleDislikeThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDislikeThreadTrigger({ threadId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleClearVoteThread({ threadId, userId }) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleClearVoteThreadTrigger({ threadId, userId }));
    try {
      await api.toggleClearVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleClearVoteThreadTrigger({ threadId, userId }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsTrigger,
  asyncGetThreadsAndUsers,
  asyncAddNewThread,
  asyncToggleLikeThread,
  asyncToggleDislikeThread,
};
