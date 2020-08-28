import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth === 0) {
      return;
    }

    if (document.documentElement.clientWidth <= 767) {
      Object.assign(this.elem.style, {
        zIndex: '',
        position: '',
        top: '',
        left: '',
      });
    } else {
      Object.assign(this.elem.style, {
        zIndex: 1000,
        position: 'fixed',
        top: '50px'
      });

      let oFirstContainer = document.querySelector('.container');

      let leftIndent = Math.min(
        document.documentElement.clientWidth - this.elem.offsetWidth - 10,
        oFirstContainer.getBoundingClientRect().right + 20);

      this.elem.style.left = `${leftIndent}px`;
    }
  }
}
