import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncGetThreadsAndUsers, receiveThreadsTrigger } from './action';

/**
 * test scenario
 *
 * - asyncGetThreadsAndUsers
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 */

const fakeThreadsResponse = [
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
];

const fakeUsersResponse = [
  {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'users-2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncGetThreadsAndUsers thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getAllThreads = api.getAllThreads;
    api._getAllUsers = api.getAllThreads;
  });
  afterEach(() => {
    // restore original implementation
    api.getAllThreads = api._getAllThreads;
    api.getAllUsers = api._getAllUsers;
    // delete backup
    delete api._getAllThreads;
    delete api._getAllUsers;
  });
  it('should dipatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // action
    await asyncGetThreadsAndUsers()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsTrigger(
        fakeThreadsResponse.map((thread) => {
          return {
            ...thread,
            ownerName: fakeUsersResponse.find((user) => user.id === thread.ownerId).name,
          };
        })
      )
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fething failed', async () => {
    // arrange
    // stub implementation
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();
    // action
    await asyncGetThreadsAndUsers()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
