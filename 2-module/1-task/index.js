/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  // ваш код...
  let sum = 0;

  for (let elem in salaries) {
    if (isFinite(salaries[elem])) { // или можно использовать typeof salaries[elem] === 'number'. А что предпочтительнее использовать?
      sum += salaries[elem];
    }
  }

  return sum;
}