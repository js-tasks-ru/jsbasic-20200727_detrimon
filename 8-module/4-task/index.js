import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let isNewProduct = true;
    let cartItem;
    
    for (let item of this.cartItems) {
      if (product.id === item.product.id) {
        item.count++;
        isNewProduct = false;
        cartItem = item;
        break;
      }
    }

    if (isNewProduct) {
      cartItem = { product: product, count: 1};
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem;
    let index;
    for (let i = 0, ln = this.cartItems.length; i < ln; i++) {
      if (this.cartItems[i].product.id === productId) {
        cartItem = this.cartItems[i];
        index = i;
        break;
      }
    }

    if (!cartItem) {
      return;
    }

    cartItem.count += amount;
    if (cartItem.count <= 0) {
      this.cartItems.splice(index, 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    for (let item of this.cartItems) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // Подготавливаем BODY для модального окна
    let div = document.createElement('div');
    this.cartItems.forEach(elem => {
      div.append(this.renderProduct(elem.product, elem.count));
    });

    div.append(this.renderOrderForm());

    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modal.setBody(div);

    this.modal.open();

    // let cartCounterElem = document.querySelector('.cart-counter');
    let cartCounterElem = document.querySelector('.modal__body');
    cartCounterElem.addEventListener('click', event => {
      let cartProduct = event.target.closest('.cart-product');
      let productId = cartProduct && cartProduct.dataset.productId;

      if (event.target.closest('.cart-counter__button_minus')) {
        this.updateProductCount(productId, -1);
      }

      if (event.target.closest('.cart-counter__button_plus')) {
        this.updateProductCount(productId, 1);
      }
    });

    let cartForm = document.querySelector('.cart-form');
    cartForm.addEventListener('submit', (event) => {
      this.onSubmit(event);
    });

  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }

    let id = cartItem.product.id;
    let modal = document.querySelector('.modal');
    let updProduct = modal.querySelector(`[data-product-id=${id}]`);
    // <- сюда
    let cartCounter = updProduct.querySelector('.cart-counter__count');
    let cartProductPrice = updProduct.querySelector('.cart-product__price');
    let cartTotalPrice = modal.querySelector('.cart-buttons__info-price');

    cartCounter.textContent = cartItem.count;
    cartProductPrice.textContent = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;

    cartTotalPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;

    // Учитывая, что окно мы закроем и не увидим отрисовки, я хотел добавить IF'ы, которые ниже в место,
    // отмеченное чуть выше, как // <-- сюда, но проверка такое не пропустила :) Говорит, все равно рисуй то
    // что не увидят уже :)
    if (this.cartItems.length === 0) {
      this.modal.close();
      return;
    }

    if (cartItem.count <= 0) {
      updProduct.remove();
      return;
    }
  }

  onSubmit(event) {
    event.preventDefault();

    let button = event.target.querySelector('[type=submit]');
    let form = event.target;

    button.classList.add('is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    }).then((response) => {
      if (response.status === 200) {
        this.modal.setTitle('Success!');
        this.cartItems.splice(0);

        let successDiv = document.createElement('div');
        successDiv.className = 'modal__body-inner';

        let sInnerElem = `<p>
                            Order successful! Your order is being cooked :) <br>
                            We’ll notify you about delivery time shortly.<br>
                            <img src="/assets/images/delivery.gif">
                          </p>`;
        
        successDiv.insertAdjacentHTML('afterbegin', sInnerElem);
        this.modal.setBody(successDiv);
      }
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

