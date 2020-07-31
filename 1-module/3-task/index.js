/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  // Либо можно вначале проверить на наличие строки. И если строка пустая, то сразу вернуть эту строку,
  // Так лишнюю операцию по сплиту делать не придется.
  // if (!str) {
  //   return str;
  // }

  let aStr = str.split('');

  if (aStr[0]) {
    aStr[0] = aStr[0].toUpperCase();  
    return aStr.join('');
  }

  return str;  
}
