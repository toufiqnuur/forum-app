import { ActionType } from './action';
import threadDetailReducer from './reducer';

/**
 * test scenario for threadReducer
 *
 * - threadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return null when given by 'CLEAR_THREAD_DETAIL' action
 *  - should return the threadDetail when given by 'RECEIVE_THREAD_DETAIL' action
 *  - should return the threadDetail with the toggled like thread when given by 'TOGGLE_LIKE_THREAD' action
 *  - should return the threadDetail with the toggled dislike thread when given by 'TOGGLE_DISLIKE_THREAD' action
 *  - should return the threadDetail with neutral vote thread when given by 'TOGGLE_CLEAR_VOTE_THREAD' action
 *  - should return the threadDetail with the new comment when given by 'ADD_COMMENT' action
 *  - should return the threadDetail with the toggled like comment when given by 'TOGGLE_LIKE_COMMENT' action
 *  - should return the threadDetail with the toggled dislike comment when given by 'TOGGLE_DISLIKE_COMMENT' action
 *  - should return the threadDetail with neutral vote comment when given by 'TOGGLE_CLEAR_VOTE' action
 *
 */

describe('task threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return null when given by 'CLEAR_THREAD_DETAIL' action", () => {
    // arrange
    const initialState = null;
    const action = { type: 'CLEAR_THREAD_DETAIL' };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(null);
  });

  it("should return the threadDetail when given by 'RECEIVE_THREAD_DETAIL' action", () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it("should return the threadDetail with the toggled like thread when given by 'TOGGLE_LIKE_THREAD' action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.TOGGLE_LIKE_THREAD,
      payload: {
        userId: 'user-1',
      },
    };
    // action like thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({ ...initialState, upVotesBy: [action.payload.userId] });
    // action clear like thread
    const nextState2 = threadDetailReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it("should return the threadDetail with the toggled dislike thread when given by 'TOGGLE_DISLIKE_THREAD' action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.TOGGLE_DISLIKE_THREAD,
      payload: {
        userId: 'user-1',
      },
    };
    // action dislike thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({ ...initialState, downVotesBy: [action.payload.userId] });
    // action clear dislike thread
    const nextState2 = threadDetailReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it("should return the threadDetail with neutral vote thread when given by 'TOGGLE_CLEAR_VOTE_THREAD' action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['user-1'],
      downVotesBy: ['user-1'],
      comments: [],
    };
    const action = {
      type: ActionType.TOGGLE_CLEAR_VOTE_THREAD,
      payload: {
        userId: 'user-1',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({ ...initialState, downVotesBy: [], upVotesBy: [] });
  });

  it("should return the threadDetail with the new comment when given by 'ADD_COMMENT' action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({ ...initialState, comments: [action.payload.comment] });
  });

  it("should return the threadDetail with the toggled like comment when given by 'TOGGLE_LIKE_COMMENT' action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_LIKE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action like comment
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{ ...initialState.comments[0], upVotesBy: [action.payload.userId] }],
    });
    // action clear like comment
    const nextState2 = threadDetailReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it("should return the threadDetail with the toggled dislike comment when given by 'TOGGLE_DISLIKE_COMMENT' action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_DISLIKE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action dislike comment
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{ ...initialState.comments[0], downVotesBy: [action.payload.userId] }],
    });
    // action clear dislike comment
    const nextState2 = threadDetailReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it("should return the threadDetail with neutral vote comment when given by 'TOGGLE_CLEAR_VOTE' action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['user-1'],
          downVotesBy: ['user-1'],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_LIKE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{ ...initialState.comments[0], upVotesBy: [], downVotesBy: [] }],
    });
  });
});
