import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncGetLeaderboards, receiveLeaderboardsTrigger } from './action';

/**
 * test scenario
 *
 * - asnycGetLeaderboards
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 */

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 5,
  },
];

const fakeErrorResponse = new Error('Ups, someting went wrong');

describe('asyncGetLeaderboards thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getLeaderboards = api.getLeaderboards;
  });
  afterEach(() => {
    // restore originial implementation
    api.getLeaderboards = api._getLeaderboards;
    // delete backup
    delete api._getLeaderboards;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // action
    await asyncGetLeaderboards()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsTrigger(fakeLeaderboardsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();
    // action
    await asyncGetLeaderboards()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
