/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  return users.filter(elem => elem.age <= age)
              .map(elem => `${elem.name}, ${elem.balance}`)
              .join('\n');
}
