/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ul = document.createElement('ul');

  for (let elem of friends) {
    let str = `${elem.firstName} ${elem.lastName}`;
    let li = document.createElement('li');
    li.textContent = str;
    ul.append(li);
  }

  // Либо так, с использованием свойства innerHTML ::
  // let liSum = '';
  // for (let elem of friends) {
  //   liSum += `<li>${elem.firstName} ${elem.lastName}</li>`;
  // }
  // ul.innerHTML = liSum;

  return ul;
}
