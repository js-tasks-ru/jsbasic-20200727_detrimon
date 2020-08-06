/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {

  // Долго допирал, как сделать без RegExp, но со split :) stackOverflow помог :) Наверное, так..
  let aNums = str.split(',').join(' ').split(' ')
                .filter(elem => parseFloat(elem))
                .map(elem => parseFloat(elem));

  // А это вариант с RegExp ::
  // let aNums = str.match(/-*\d+\.*\d*/g)
  //                 .map(elem => parseFloat(elem));

  return { min: Math.min(...aNums), max: Math.max(...aNums) };
}
