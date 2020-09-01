import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};    

    this.elem = document.createElement('div');
    this.elem.className = 'products-grid';

    this._makeProductGrid(this.products);
  }

  _makeProductGrid(products) {
    let oGridInner = document.createElement('div');
    oGridInner.className = 'products-grid__inner';
    this.elem.append(oGridInner);

    for (let product of products) {
      let oProduct = new ProductCard(product);
      oGridInner.append(oProduct.elem);
    }

    return this.elem;
  }

  updateFilter(filters) {
    // Формируем актуальный фильтр
    for (let filter in filters) {
      this.filters[filter] = filters[filter];
    }

    // Если фильтры не заданы или не должны применяться по определенным условиям, то прорисовываем все продукты
    let isFilter = (this.filters.hasOwnProperty('maxSpiciness') && this.filters.maxSpiciness < 4) ||
                   (this.filters.hasOwnProperty('noNuts') && this.filters.noNuts === true) ||
                   (this.filters.hasOwnProperty('category') && this.filters.category.length > 0) ||
                   (this.filters.hasOwnProperty('vegeterianOnly') && this.filters.vegeterianOnly === true);

    if (!isFilter) {
      return this.redraw(this.products);
    }

    let aProducts = [];
    for (let product of this.products) {
      let isShow = true;
      for (let filter in this.filters) {
        isShow = (this[filter])(product);
        if (!isShow) {
          break;
        }
      }
      if (isShow) {
        aProducts.push(product);
      }
    }
    this.isFiltered = true;
    return this.redraw(aProducts);
  }

  redraw(products) {
    document.querySelector('.products-grid__inner').remove();
    this._makeProductGrid(products);
  }

  maxSpiciness(product) {
    return product.hasOwnProperty('spiciness') && product.spiciness <= this.filters.maxSpiciness;
  }

  vegeterianOnly(product) {
    return (product.hasOwnProperty('vegeterian') && product.vegeterian === true && this.filters.vegeterianOnly === true) ||
            this.filters.vegeterianOnly === false;
  }

  noNuts(product) {
    return (!product.hasOwnProperty('nuts')) || 
           (product.hasOwnProperty('nuts') && product.nuts === false && this.filters.noNuts === true) ||
           (this.filters.noNuts === false);
  }

  category(product) {
    return (product.hasOwnProperty('category') && product.category === this.filters.category) ||
            (this.filters.category === '');
  }
}
