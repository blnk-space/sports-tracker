/* eslint-disable camelcase */
import io from 'socket.io-client';
import { eventChannel, delay } from 'redux-saga';
import { take, call, put, fork, race, cancelled } from 'redux-saga/effects';
import request from '../../request';

import {
  ADD_TASK,
  START_CHANNEL,
  STOP_CHANNEL,
  CHANNEL_OFF,
  CHANNEL_ON,
  SERVER_OFF,
  SERVER_ON,
  SET_READERS,
} from './constants';

import { requestURL } from '../../config';

// SOCKET.IO event functions
let socket;
export const connect = () => {
  socket = io(requestURL);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

export const disconnect = () => {
  socket = io(requestURL);
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

export const reconnect = () => {
  socket = io(requestURL);
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

export const createSocketChannel = socket => eventChannel((emit) => {
  const handler = (data) => {
    if (data.length === 1) {
      emit(data[0]);
    }
  };
  socket.on('captures', handler);
  return () => {
    socket.off('captures', handler);
  };
});

// connection monitoring sagas
const listenDisconnectSaga = function* () {
  while (true) {
    yield call(disconnect);
    yield put({type: SERVER_OFF});
  }
};

const listenConnectSaga = function* () {
  while (true) {
    yield call(reconnect);
    yield put({type: SERVER_ON});
  }
};

// Saga to switch on channel.
const listenServerSaga = function* () {
  try {
    // Get reader Ids from server
    const readerData = yield call(request, `${requestURL}/readers`);
    yield put({ type: SET_READERS, payload: readerData });
    yield put({ type: CHANNEL_ON });
    const { timeout } = yield race({
      connected: call(connect),
      timeout: delay(2000),
    });
    if (timeout) {
      yield put({ type: SERVER_OFF });
    }
    const socket = yield call(connect);
    const socketChannel = yield call(createSocketChannel, socket);
    yield fork(listenDisconnectSaga);
    yield fork(listenConnectSaga);
    yield put({type: SERVER_ON});

    while (true) {
      const payload = yield take(socketChannel);
      yield put({type: ADD_TASK, payload});
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put({type: CHANNEL_OFF});
    }
  }
};

// saga listens for start and stop actions
export const startStopChannel = function* () {
  while (true) {
    yield take(START_CHANNEL);
    yield race({
      task: call(listenServerSaga),
      cancel: take(STOP_CHANNEL),
    });
  }
};
