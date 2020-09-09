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

    oSliderHolder.addEventListener('load', () => {
      oStepSlider._countSteps();
      oStepSlider._findClosestMark(oStepSlider._aStepsX[oStepSlider.value]);
      oStepSlider._offsetSlider();
    });

    let oCartIcon = new CartIcon();
    let oCartIconHolder = document.querySelector('[data-cart-icon-holder]');
    oCartIconHolder.append(oCartIcon.elem);

    let oCart = new Cart(oCartIcon);

    let response = await fetch('products.json');
    let aProducts = await response.json();

    let oProductsGrid = new ProductsGrid(aProducts);

    let oProductsGridHolder = document.querySelector('[data-products-grid-holder]');
    oProductsGridHolder.firstElementChild.remove();
    oProductsGridHolder.append(oProductsGrid.elem);

    oProductsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: oStepSlider.value,
      category: oRibbonMenu.value.id
    });

    document.body.addEventListener('product-add', (event) => {
      let productId = event.detail;

      let oProduct;
      let allProducts = [...aProducts, ...slides];
      for (let product of allProducts) {
        if (product.id === productId) {
          oProduct = product;
          break;
        }
      }
      oCart.addProduct(oProduct);
    });

    oStepSlider.elem.addEventListener('slider-change', (event) => {
      oProductsGrid.updateFilter({maxSpiciness: event.detail});
    });

    oRibbonMenu.elem.addEventListener('ribbon-select', (event) => {
      oProductsGrid.updateFilter({category: event.detail});
    });

    let oNoNuts = document.querySelector('#nuts-checkbox');
    let oVegeterianCheckbox = document.querySelector('#vegeterian-checkbox');

    oNoNuts.addEventListener('change', (event) => {
      return oNoNuts.checked ? oProductsGrid.updateFilter({noNuts: true}) : oProductsGrid.updateFilter({noNuts: false});      
    });

    oVegeterianCheckbox.addEventListener('change', (event) => {
      return oVegeterianCheckbox.checked ? oProductsGrid.updateFilter({vegeterianOnly: true}) : oProductsGrid.updateFilter({vegeterianOnly: false});
    });
  }

}
