import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this._makeRibbonMenu();

    this._makeScrollEventHandler(this.elem);
    this._makeChoseEventHandler(this.elem);
  }

  _makeRibbonMenu() {
    let oRibbonElement = document.createElement('div');
    oRibbonElement.classList.add('ribbon');

    let sLeftArrow = `<button class="ribbon__arrow ribbon__arrow_left"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>`;
    let sRightArrow = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>`;

    oRibbonElement.insertAdjacentHTML('afterbegin', sLeftArrow);

    let oRibbonNav = document.createElement('nav');
    oRibbonNav.classList.add('ribbon__inner');

    this.categories.forEach(elem => {
      let sInnerElem = `<a href="#" class="ribbon__item" data-id=${elem.id}>${elem.name}</a>`;
      oRibbonNav.insertAdjacentHTML('beforeend', sInnerElem);
    });

    oRibbonElement.append(oRibbonNav);
    oRibbonElement.insertAdjacentHTML('beforeend', sRightArrow);

    return oRibbonElement;
  }

  _makeScrollEventHandler(elem) {
    // Общие переменные и первичная инициализация
    let oRibbonInner = elem.querySelector('.ribbon__inner');
    let oLeftArrow = elem.querySelector('.ribbon__arrow_left');
    let oRightArrow = elem.querySelector('.ribbon__arrow_right');

    // Вешаем обработчики событий
    oRightArrow.addEventListener('click', doMove);
    oLeftArrow.addEventListener('click', doMove);
    oRibbonInner.addEventListener('scroll', hideArrow);
   
    // Описание обработчика событий doMove
    function doMove(event) {
      let isLeft = event.currentTarget === oLeftArrow;
      oRibbonInner.scrollBy(isLeft ? -350 : 350, 0);
    }

    function hideArrow() {
      let nScrollWidth = oRibbonInner.scrollWidth;
      let nScrollLeft = oRibbonInner.scrollLeft;
      let nClientWidth = oRibbonInner.clientWidth;

      if (nScrollLeft < 1) {
        oLeftArrow.classList.remove('ribbon__arrow_visible');
      } else {
        oLeftArrow.classList.add('ribbon__arrow_visible');
      }
      if (nScrollWidth - nScrollLeft - nClientWidth < 1) {
        oRightArrow.classList.remove('ribbon__arrow_visible');
      } else {
        oRightArrow.classList.add('ribbon__arrow_visible');
      }
    }
  }

  _makeChoseEventHandler(elem) {
    let sCurrentItem;
    elem.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.classList.contains('ribbon__item')) {
        event.target.classList.add('ribbon__item_active');

        if (sCurrentItem) {
          let beforeItem = elem.querySelector(`[data-id=${sCurrentItem}]`);
          beforeItem.classList.remove('ribbon__item_active');
        }
        sCurrentItem = event.target.dataset.id;

        let eRibbonChosen = new CustomEvent('ribbon-select', {
          detail: sCurrentItem,
          bubbles: true
        });
        elem.dispatchEvent(eRibbonChosen);
      }
    });
  }
}
