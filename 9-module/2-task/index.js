import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let oCarousel = new Carousel(slides);
    let oCarouselHolder = document.querySelector('[data-carousel-holder]');
    oCarouselHolder.append(oCarousel.elem);

    let oRibbonMenu = new RibbonMenu(categories);
    let oRibbonHolder = document.querySelector('[data-ribbon-holder]');
    oRibbonHolder.append(oRibbonMenu.elem);

    let oStepSlider = new StepSlider({steps: 5, value: 3});
    let oSliderHolder = document.querySelector('[data-slider-holder]');
    oSliderHolder.append(oStepSlider.elem);

    oStepSlider._countSteps();
    oStepSlider._findClosestMark(oStepSlider._aStepsX[oStepSlider.value]);
    oStepSlider._offsetSlider();

    let oCartIcon = new CartIcon();
    let oCartIconHolder = document.querySelector('[data-cart-icon-holder]');
    oCartIconHolder.append(oCartIcon.elem);

    let oCart = new Cart(oCartIcon);

    let response = await fetch('products.json')
    let aProducts = await response.json();
    this.products = aProducts;

    let oProductsGrid = new ProductsGrid(this.products);

    let oProductsGridHolder = document.querySelector('[data-products-grid-holder]');
    oProductsGridHolder.firstElementChild.remove();
    oProductsGridHolder.append(oProductsGrid.elem);

    oProductsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: oStepSlider.value,
      category: oRibbonMenu.value.id
    });

    let oBody = document.body;
    // this.oBody = document.querySelector('body');
    // this.oBody.addEventListener('product-add', productAdd.bind(this));
    // function productAdd(event) {
    oBody.addEventListener('product-add', (event) => {
      let productId = event.detail;
      let oProduct;
      for (let product of this.products) {
        if (product.id === productId) {
          oProduct = product;
          break;
        }
      }
    });
  }

}
