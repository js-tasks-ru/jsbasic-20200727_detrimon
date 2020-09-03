export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    } else {
      this.onProductUpdate(cartItem);
    }
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

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

