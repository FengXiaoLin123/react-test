
import { call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import { gotoPath } from 'utils/history';
import { FETCH_MENU } from 'containers/HeaderProvider/constants';
import { getMenu } from 'containers/HeaderProvider/actions';
import { FETCH_TOKEN_LIST } from 'containers/TokenRegisterProvider/constants';
import { getTokenList } from 'containers/TokenRegisterProvider/actions';
import { socketObject, socketGetCurrency, socketGetEth } from 'appRoot/socketActions';
import { gpMenu } from 'Services/common';
import { tokenList } from 'Services/token';
import { store } from './index.js';
import { SOCKET_CONNECT } from './socketConstants';

const io = require('socket.io-client');


export function* fetchMenuData() {
  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(gpMenu);
    // console.log(data, 'menuData');
    yield put(getMenu(data));
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

export function* fetchTokenData() {
  try {
    // const optionsToken = {
    //   page: 1,
    //   limit: 100,
    // };
    const resList = yield call(tokenList);
    if (resList) {
      const list = resList.list;
      yield put(getTokenList(list));
    }
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

export function* socketConnect(action) {
  // console.log(action.token, 'token');
  const url = 'https://api.greatwall.r0.hk/v1';
  const options = {
    transports: ['websocket'],
    query: {
      token: action.token,
    },
  };
  const socket = io(url, options);
  yield put(socketObject(socket));
  // console.log(socket, 'socket');
  socket.on('disconnect', () => {
    console.log('socket disconnect');
  });
  socket.on('error', () => {
    // console.log(data);
  });
  socket.on('connect', () => {
    console.log('connected!');
    // socket.emit('subscribe@token', [ 'okex.BTCUSD' ]);
    // socket.emit('subscribe@token', [ 'okex.ETHUSD' ]);
    // socket.emit('subscribe@token', [ 'huobi.ETHUSDT' ]); // Token
    // socket.emit('subscribe@currency', ['yitian.CNYUSD']); // 法币
    socket.emit('subscribe@token', ['okex.ETHUSD']);
    socket.on('auth_fail', (data) => {
      if (data) {
        sessionStorage.clear();
        message.error(data, 2);
        socket.close();
        gotoPath('/');
      }
      // console.log(data);
    });
    socket.on('auth_success', () => {
      // console.log(data);
    });
    // 接收最新汇率信息
    socket.on('rate@currency', (data) => {
      // console.log(data, 'data');
      const dispatch = store.dispatch;
      const state = store.getState();
      const currencyStr = state.socket.currencyObj.currency;
      // console.log(currencyStr, 'currencyStr');
      const dataRate = data && data.data && data.data.rate;
      const currencyObj = {
        currency: currencyStr,
        currencyRate: dataRate,
      };
      dispatch(socketGetCurrency(currencyObj));
    });
    socket.on('rate@token', (data) => {
      // console.log(data, '000');
      const ETHRate = data && data.data && data.data.close;
      const state = store.getState();
      const currentEth = state.socket.ethRate;
      const dispatch = store.dispatch;
      if (ETHRate !== currentEth) {
        dispatch(socketGetEth(ETHRate));
      }
    });
  });
}

export default function* getMenuSage() {
  yield takeLatest(FETCH_MENU, fetchMenuData);
  yield takeLatest(FETCH_TOKEN_LIST, fetchTokenData);
  yield takeLatest(SOCKET_CONNECT, socketConnect);
}
