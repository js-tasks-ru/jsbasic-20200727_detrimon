/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  // Решение с RegExp ::
  return str.replace(/(\w*)(-\w)*/ig,
    function(full, s1 = '', s2 = '') {
      return `${s1}${s2.toUpperCase()}`;
    }).split('-').join('');

  // Решение без RegExp ::
  // return str.split('-').map((sElem, index) => {
  //   if (index === 0) {
  //     return sElem;
  //   }

  //   let aElem;
  //   aElem = sElem.split('');
  //   aElem[0] = aElem[0].toUpperCase();
  //   sElem = aElem.join('');

  //   return sElem;
  // }).join('');
}
