/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {

  constructor(rows) {
    this.elem = this._fnMakeTable(rows);

    this._makeCloseHandler();
  }

  _fnMakeTable(rows) {
    let oTable = document.createElement('table');
    let sTableHeader = '<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>';
    oTable.insertAdjacentHTML('afterbegin', sTableHeader);
    
    let oTableBody = document.createElement('tbody');

    rows.forEach(el => {
      let sRow = `<tr><td>${el.name}</td><td>${el.age}</td><td>${el.salary}</td><td>${el.city}</td><td><button>X</button></td></tr>`;
      oTableBody.insertAdjacentHTML('beforeend', sRow);
    });
    
    oTable.append(oTableBody);

    return oTable;
  }

  _makeCloseHandler() {
    let oTable = this.elem;
    oTable.addEventListener('click', (event) => 
      // Вообще я бы лучше через IF сделал, но ради эксперемента попробовал так вот :)
      event.target.nodeName === 'BUTTON' && event.target.innerText === 'X' && event.target.closest('tr').remove());
  }
}
