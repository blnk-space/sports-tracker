import {
  ADD_TASK,
  CHANNEL_OFF,
  CHANNEL_ON,
  SERVER_OFF,
  SERVER_ON,
  SET_READERS,
} from './constants';

const initialState = {
  captures: [],
  runnerSet: new Set(),
  channelStatus: 'off',
  serverStatus: 'dormant',
  baseReaderId: false,
  endReaderId: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_READERS: {
      const start = action.payload.find(reader => reader.position === 0);
      const end = action.payload.find(reader => reader.position === 1000);
      return {...state, baseReaderId: start.id, endReaderId: end.id };
    }
    case CHANNEL_ON:
      return {...state, channelStatus: 'on'};
    case CHANNEL_OFF:
      return {...state, channelStatus: 'off', serverStatus: 'dormant'};
    case SERVER_OFF:
      return {...state, serverStatus: 'off'};
    case SERVER_ON:
      return {...state, serverStatus: 'on'};
    case ADD_TASK: {
      const { captures, runnerSet } = state;
      const { payload: { athlete: { id } } } = action;
      const mutableClone = new Set(runnerSet);
      /*
        NOTE: choosing this method of using Sets to order players instead of sorting array of captured data by 'captured' key
        or 'timestamp as WebSocket data is by TCP and we can fairly assume the data isn't coming out of order.
        If there was a chance of data being out of order, I would use a sortByCaptured defined in selectors.js
        and sort the array of captured events in a redux selector.
       */
      if (runnerSet.has(id)) {
        mutableClone.delete(id);
      }
      mutableClone.add(id);
      const updatedCaptures = {
        ...captures,
        [id]: action.payload,
      };
      return {...state, captures: updatedCaptures, runnerSet: mutableClone };
    }
    default:
      return state;
  }
};
