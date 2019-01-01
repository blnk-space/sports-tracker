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
  channelStatus: 'untouched',
  serverStatus: 'dormant',
  baseReaderId: false,
  endReaderId: false,
  dirty: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_READERS: {
      const start = action.payload.find(reader => reader.position === 0);
      const end = action.payload.find(reader => reader.position === 1000);
      return { ...state, baseReaderId: start.id, endReaderId: end.id };
    }
    case CHANNEL_ON: {
      const now = new Date().toISOString();
      const { captures, runnerSet, channelStatus, dirty } = state;
      const runnerStateChanges = {};
      const capturesStateChanges = {};
      if (dirty && channelStatus === 'off') {
        const mutableClone = new Set(runnerSet);
        mutableClone.add(now);
        runnerStateChanges.runnerSet = mutableClone;
        capturesStateChanges.captures = {
          ...captures,
          [now]: {
            type: 'gap',
            event: 'connected',
            end: now,
          },
        };
      }
      return {
        ...state,
        channelStatus: 'on',
        ...capturesStateChanges,
        ...runnerStateChanges,
      };
    }
    case CHANNEL_OFF: {
      const now = new Date().toISOString();
      const { captures, runnerSet, channelStatus, dirty } = state;
      const runnerStateChanges = {};
      const capturesStateChanges = {};
      if (dirty && channelStatus === 'on') {
        const mutableClone = new Set(runnerSet);
        mutableClone.add(now);
        runnerStateChanges.runnerSet = mutableClone;
        capturesStateChanges.captures = {
          ...captures,
          [now]: {
            type: 'gap',
            event: 'disconnected',
            time: now,
          },
        };
      }
      return {
        ...state,
        channelStatus: 'off',
        serverStatus: 'dormant',
        ...capturesStateChanges,
        ...runnerStateChanges,
      };
    }
    case SERVER_OFF:
      return {...state, serverStatus: 'off'};
    case SERVER_ON:
      return {...state, serverStatus: 'on'};
    case ADD_TASK: {
      const { captures, runnerSet, dirty } = state;
      const { payload: { athlete: { id } } } = action;
      let dirtyFlag = dirty;
      if (!dirty) {
        dirtyFlag = true;
      }
      const mutableClone = new Set(runnerSet);
      /*
        NOTE: choosing this method of using Sets to order players instead of sorting array of captured data by 'captured' key
        because WebSocket data is using TCP. We can fairly assume the data isn't coming out of order due to that.
        If there was a chance of data being out of order, I would use a sortByCaptured function defined in ./selectors.js
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
      return { ...state, captures: updatedCaptures, runnerSet: mutableClone, dirty: dirtyFlag };
    }
    default:
      return state;
  }
};
