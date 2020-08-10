/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {

  // Что-то по-моему какое-то сложное решение получилось :) И замороченное. :) Наверное, можно было решить значительно проще..
  let config = {};
  let index = 0;

  // Вначале решил пробежаться по THead и для каждого столбца с определенным названием создал 
  // функцию, которая будет в будущем вызываться для каждой ячейки этого столбца.
  for (let headCells of table.tHead.rows[0].cells) {

    if (headCells.textContent === 'Status') {
      config[index] = function(elem) {
        if (!elem.hasAttribute('data-available')) {
          this.hidden = true;
          return;
        }

        if (elem.dataset.available === 'true') {
          this.classList.add('available');
        } else {
          this.classList.add('unavailable');
        }
      };
    }

    if (headCells.textContent === 'Gender') {
      config[index] = function(elem) {
        if (elem.textContent === 'm') {
          this.classList.add('male');
        }
        if (elem.textContent === 'f') {
          this.classList.add('female');
        }
      };
    }

    if (headCells.textContent === 'Age') {
      config[index] = function(elem) {
        if (+elem.textContent < 18) {
          this.style = 'text-decoration: line-through';
        }
      };
    }

    if (headCells.textContent === 'Name') {
      config[index] = () => {};
    }

    index++;
  }

  // Метод вызывается для соответствующей ячейки. В качестве this передается строка, которой внутри метода 
  // может быть добавлен соответствующий класс.
  for (let row of table.tBodies[0].rows) {
    for (let i = 0, ln = row.cells.length; i < ln; i++) {
      config[i].call(row, row.cells[i]);
    }
  }
}
