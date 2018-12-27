import { BigNumber } from 'bignumber.js';

const nodeRsa = require('node-rsa');

const config = {
  rootApi: 'https://tokenest-fund-api.tokenest.io',
  // rootApi: 'https://fund-v11-api.tokenest.io',
  MAX_DECIMAL_DIGITS: 6,
  getLanguage() {
    const language = window.navigator.browserLanguage || window.navigator.language;
    if (language.startsWith('zh')) {
      return 'zh-CN';
    } if (language.startsWith('en')) {
      return 'en-US';
    }
    return 'en-US';
  },
  encrypt: (publicKey, data) => {
    const NodeRSA = nodeRsa;
    const key = new NodeRSA(publicKey, 'pkcs8-public', { b: 4096 });
    const encrypted = key.encrypt(data, 'base64');

    return encrypted;
    // const decrypted = key.decrypt(encrypted, 'utf8'); //解密函数
    // console.log('decrypted: ', decrypted);
  },
  // 超过最大小数位时保留最大位数，其他返回原来值
  // eslint-disable-next-line consistent-return
  getNumericalValue: (value) => {
    const valueBig = new BigNumber(value);
    if (valueBig.isInteger()) {
      return valueBig.toNumber();
    }
    const DECIMAL = value.toString().split('.')[1].length;
    let CURRENT_DECIMAL = DECIMAL;
    // console.log(value, DECIMAL, config.MAX_DECIMAL_DIGITS);
    if (DECIMAL > config.MAX_DECIMAL_DIGITS) {
      CURRENT_DECIMAL = config.MAX_DECIMAL_DIGITS;
    }
    const amount = new BigNumber(valueBig.toFixed(CURRENT_DECIMAL));
    return amount.toNumber();
  },

  getDecimalLength: (value) => {
    const valueBig = new BigNumber(value);
    if (valueBig.isInteger()) {
      return 0;
    }
    const DECIMAL = value.toString().split('.')[1] ? value.toString().split('.')[1].length : 0;
    let CURRENT_DECIMAL = DECIMAL;
    // console.log(value, DECIMAL, config.MAX_DECIMAL_DIGITS);
    if (DECIMAL > config.MAX_DECIMAL_DIGITS) {
      CURRENT_DECIMAL = config.MAX_DECIMAL_DIGITS;
    }
    return CURRENT_DECIMAL;
  },
};

export default config;
