import { ActionType } from './action';
import threadsReducer from './reducer';

/**
 * test scenario for threadReducer
 *
 * - threadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by 'RECEIVE_THREADS' action
 *  - should return the new thread when given by 'ADD_THREAD' action
 *  - should return the threads with the toggled like thread when given by 'TOGGLE_LIKE' action
 *  - should return the threads with the toggled dislike thread when given by 'TOGGLE_DISLIKE' action
 *  - should return the threads with neutral vote thread when given by 'TOGGLE_CLEAR_VOTE' action
 *
 */

describe('task threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the threads when given by 'RECEIVE_THREADS' action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it("should return the new thread when given by 'ADD_THREAD' action", () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it("should return the threads with the toggled like thread when given by 'TOGGLE_LIKE' action", () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_LIKE,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };
    // action like thread
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([{ ...initialState[0], upVotesBy: [action.payload.userId] }]);
    // action clear like thread
    const nextState2 = threadsReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it("should return the threads with the toggled dislike thread when given by 'TOGGLE_DISLIKE' action", () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_DISLIKE,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };
    // action dislike thread
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([{ ...initialState[0], downVotesBy: [action.payload.userId] }]);
    // action clear dislike thread
    const nextState2 = threadsReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it("should return the threads with neutral vote thread when given by 'TOGGLE_CLEAR_VOTE' action", () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['user-1'],
        downVotesBy: ['user-1'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_CLEAR_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([{ ...initialState[0], upVotesBy: [], downVotesBy: [] }]);
  });
});
