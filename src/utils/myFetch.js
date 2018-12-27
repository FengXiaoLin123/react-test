import request from 'superagent';
import { message } from 'antd';
import { gotoPath } from './history';

function errTip(e, url) {
  if (e.response && e.response.body && e.response.body.msg && typeof e.response.body.msg === 'string') {
    if (url.includes('/gp/login')) {
      message.error(e.response && e.response.body && e.response.body.msg, 2);
    } else if (sessionStorage.getItem('token')) {
      message.error(e.response && e.response.body && e.response.body.msg, 2);
    }
  } else if (e.response && e.response.body && e.response.body.msg && typeof e.response.body.msg === 'object') {
    let result = '';
    e.response.body.msg.map((val) => {
      result += `${val.message} \n`;
    });
    if (url.includes('/gp/login')) {
      message.error(result, 2);
    } else if (sessionStorage.getItem('token')) {
      message.error(result, 2);
    }
  }
  if (e.response && e.response.body && e.response.body.message) {
    if (url.includes('/gp/login')) {
      message.error(e.response && e.response.body && e.response.body.message, 1.5);
    } else if (sessionStorage.getItem('token')) {
      message.error(e.response && e.response.body && e.response.body.message, 1.5);
    }
  }
}

const myFetch = async (url, parmas = {}, type = 'GET') => {
  try {
    // console.log(storeAll, 222)
    const headers = {};
    headers['Content-Type'] = 'application/json';
    let res;
    let promise = {};
    switch (type) {
      case 'GET':
        res = await request
          .get(url)
          .set(headers)
          .withCredentials()
          .query(parmas);
        break;
      case 'POST':
        res = await request
          .post(url)
          .set(headers)
          .withCredentials()
          .send(parmas);
        break;
      case 'PUT':
        res = await request
          .put(url)
          .set(headers)
          .withCredentials()
          .send(parmas);
        break;
      case 'DELETE':
        res = await request
          .delete(url)
          .set(headers)
          .withCredentials()
          .send(parmas);
        break;
      case 'HEAD':
        res = await request
          .get(url)
          .set(headers)
          .withCredentials()
          .query(parmas);
        break;
      default:
        res = await request
          .get(url)
          .set(headers)
          .withCredentials()
          .query(parmas);
    }
    if (res) {
      if (res.ok && res.statusCode === 200) {
        promise = Object.assign({}, res.body);
        // console.log(promise, 'promise');
        return promise;
      }
      if (res.statusCode === 401) {
        sessionStorage.clear();
        gotoPath('/');
      }
      return false;
    }
  } catch (e) {
    message.destroy();
    // console.log(e.response, 555)
    // console.log(e.response.body, 'e')
    if (e.status === 401) {
      if (e.response && e.response.body) {
        sessionStorage.clear();
        message.error(e.response.body.msg, 2, () => {
          gotoPath('/');
        });
      }
      // if (url.includes('/gp/login')) {
      //   if (e.response && e.response.body) {
      //     sessionStorage.clear();
      //     message.error(e.response.body.msg, 2, () => {
      //       gotoPath('/');
      //     });
      //   }
      // } else if (sessionStorage.getItem('token')) {
      //   if (e.response && e.response.body) {
      //     sessionStorage.clear();
      //     message.error(e.response.body.msg, 2, () => {
      //       gotoPath('/');
      //     });
      //   }
      // }
    } else {
      // console.log(e.response.body, 'e.response.body.msg')
      errTip(e, url);
    }
    return false;
    // else {
    //   message.error(e.response && e.response.body && e.response.body.msg, 2);
    // }
  }
  // console.log(555);
  return false;
};

export default myFetch;
