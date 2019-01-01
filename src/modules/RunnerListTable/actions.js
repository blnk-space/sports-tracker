import {
  START_CHANNEL,
  STOP_CHANNEL,
} from './constants';

export const startChannel = () => ({ type: START_CHANNEL });
export const stopChannel = () => ({ type: STOP_CHANNEL });
