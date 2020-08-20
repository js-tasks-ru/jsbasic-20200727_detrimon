// import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this._makeProductCardDOM(product);

    this._fnMakePlusEvent();
  }

  // Функция создания DOM элемента компонента ProductCard
  _makeProductCardDOM(product) {
    let oComponent = document.createElement('div');
    oComponent.classList.add('card');

    let sInnerPart = `
      <div class="card__top">
        <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>`;
    
    oComponent.insertAdjacentHTML('afterbegin', sInnerPart);

    return oComponent;
  }

  // Функция создания обработчика события при нажатии на кнопку '+' компонента
  _fnMakePlusEvent() {
    let oElement = this.elem;

    oElement.addEventListener('click', () => {
      let eProductAdd = new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true
      });
      oElement.dispatchEvent(eProductAdd);
      
    });
  }
}
