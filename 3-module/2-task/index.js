/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  // Решение с методом filter (после занятия :)))
  return arr.filter(elem => elem >= a && elem <= b);

  // Решение без метода filter (делал до занятия)
  // let aFiltered = [];

  // for (let elem of arr) {
  //   if (elem >= a && elem <= b) {
  //     aFiltered.push(elem);
  //   }
  // }

  // return aFiltered;
}
