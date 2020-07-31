/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {

  // Без использования RegExp
  str = str.toLowerCase();
  return !(str.indexOf('1xbet') === -1) || !(str.indexOf('xxx') === -1);

  // С использованием RegExp::
  // let regStr = /1xbet|xxx/i;
  // return regStr.test(str) || false;
}
