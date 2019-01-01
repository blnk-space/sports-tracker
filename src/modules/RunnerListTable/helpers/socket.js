import io from 'socket.io-client';

import { requestURL } from '../../../config';

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

// This is how channel is created
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