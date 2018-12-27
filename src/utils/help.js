import BigNumber from 'bignumber.js';

const helper = {
  urlEncode(param, key, encode) {
    if (param == null) return '';
    let paramStr = '';
    const t = typeof (param);
    // console.log(t, 111)
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += `&${key}=${(encode == null || encode) ? encodeURIComponent(param) : param}`;
    } else {
      for (const i in param) {
        const k = key == null ? i : key + (param instanceof Array ? `[${i}]` : `.${i}`);
        paramStr += this.urlEncode(param[i], k, encode);
      }
    }

    // console.log(paramStr, 'paramStr')
    return paramStr;
  },
  getQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) { return unescape(r[2]); }
    return null;
  },
  getHashString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    let r = window.location.href.split('?');
    r = r[1].match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  biggestNumberDecimal() {
    return new BigNumber(10).pow(30).toString(10);
  },
};

export default helper;
