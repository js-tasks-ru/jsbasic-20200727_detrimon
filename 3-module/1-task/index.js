/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
  return users.map(elem => elem.name);

  // Либо без Map ::

  // let aNames = [];

  // for (let elem of users) {
  //   aNames.push(elem.name);
  // }

  // return aNames;
}
