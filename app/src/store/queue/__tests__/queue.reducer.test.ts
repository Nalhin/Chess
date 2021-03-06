import queueReducer, { QUEUE_INITIAL_STATE } from '../queue.reducer';
import produce from 'immer';
import { queueGameFound, queueJoined, queueLeft } from '../queue.actions';
import { fakeUser } from '../../../../test/fixtures/user/fakeUser';

describe('Queue reducer', () => {
  it('should handle QUEUE_JOINED action type', () => {
    const timeJoined = '1';
    const initialState = { ...QUEUE_INITIAL_STATE };
    const expectedState = produce(QUEUE_INITIAL_STATE, draft => {
      draft.timeJoined = timeJoined;
    });

    const action = queueJoined(timeJoined);
    const reducer = queueReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle QUEUE_GAME_FOUND action type', () => {
    const initialState = produce(QUEUE_INITIAL_STATE, draft => {
      draft.timeJoined = '1';
    });
    const expectedState = { ...QUEUE_INITIAL_STATE };

    const action = queueGameFound('12');
    const reducer = queueReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle QUEUE_LEFT action type', () => {
    const initialState = produce(QUEUE_INITIAL_STATE, draft => {
      draft.timeJoined = '1';
    });
    const expectedState = { ...QUEUE_INITIAL_STATE };

    const action = queueLeft(fakeUser.login);
    const reducer = queueReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
