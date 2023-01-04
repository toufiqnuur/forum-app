import { ActionType } from "./action";

function threadDetailReducer(threadDetail = [], action = {}) {
  switch (action.type) {
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.TOGGLE_LIKE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter(
              (uid) => uid !== action.payload.userId
            )
          : [action.payload.userId, ...threadDetail.upVotesBy],
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter(
              (uid) => uid !== action.payload.userId
            )
          : threadDetail.downVotesBy,
      };
    case ActionType.TOGGLE_DISLIKE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter(
              (uid) => uid !== action.payload.userId
            )
          : threadDetail.upVotesBy,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter(
              (uid) => uid !== action.payload.userId
            )
          : [action.payload.userId, ...threadDetail.downVotesBy],
      };
    case ActionType.TOGGLE_CLEAR_VOTE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter(
              (uid) => uid !== action.payload.userId
            )
          : threadDetail.upVotesBy,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter(
              (uid) => uid !== action.payload.userId
            )
          : threadDetail.downVotesBy,
      };
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    case ActionType.TOGGLE_LIKE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter(
                    (uid) => uid !== action.payload.userId
                  )
                : [action.payload.userId, ...comment.upVotesBy],
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (uid) => uid !== action.payload.userId
                  )
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    case ActionType.TOGGLE_DISLIKE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter(
                    (uid) => uid !== action.payload.userId
                  )
                : comment.upVotesBy,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (uid) => uid !== action.payload.userId
                  )
                : [action.payload.userId, ...comment.downVotesBy],
            };
          }
          return comment;
        }),
      };
    case ActionType.TOGGLE_CLEAR_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter(
                    (uid) => uid !== action.payload.userId
                  )
                : comment.upVotesBy,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (uid) => uid !== action.payload.userId
                  )
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
