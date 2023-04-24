import { getProductsFromCategoryAndQuery } from './services/api';

// const updateSizeCart = async function updateSizeCart() {
//   const cart = await JSON.parse(localStorage.getItem('cart')) || [];
//   const cartSize = cart.reduce((acc, { quantity }) => {
//     acc += quantity;
//     return acc;
//   }, 0);
//   localStorage.setItem('cartSize', cartSize);
//   this.setState({
//     cartSize,
//   });
// };

const ClickFunctions = {
  clickBtnSearch: async function clickBtnSearch({ target: { name } }) {
    const { results } = await getProductsFromCategoryAndQuery(name);
    this.setState({
      resultSearch: [...results],
    });
  },
  clickBtnQuantity: function clickBtnQuantity({ target }) {
    const productId = target.parentNode.id;
    const { name } = target;
    const { cart } = this.state;
    const productsCard = cart.map((product) => {
      if (product.id === productId) {
        if (name === 'increaseButton') {
          product.quantity += 1;
        } else {
          product.quantity -= 1;
        }
      }
      return product;
    });
    const productsCardString = JSON.stringify(productsCard);
    localStorage.setItem('cart', productsCardString);
    const cartLocal = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSize = cartLocal.reduce((acc, { quantity }) => {
      acc += quantity;
      return acc;
    }, 0);
    localStorage.setItem('cartSize', cartSize);
    this.setState({
      cartSize,
      cart: productsCard,
    });
  },
  clickBtnDelete: function clickBtnDelete({ target }) {
    const arrayCart = JSON.parse(localStorage.getItem('cart'));
    const productId = target.parentNode.id;
    const productsCard = arrayCart.filter(({ id }) => id !== productId);
    const productsCardString = JSON.stringify(productsCard);
    localStorage.setItem('cart', productsCardString);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSize = cart.reduce((acc, { quantity }) => {
      acc += quantity;
      return acc;
    }, 0);
    localStorage.setItem('cartSize', cartSize);
    this.setState({
      cartSize,
      cart: productsCard,
    });
  },
  clickBtnAddToCart: function clickBtnAddToCart(product) {
    const arrayCart = JSON.parse(localStorage.getItem('cart')) || [];
    product.quantity = 1;
    arrayCart.push(product);
    const cartString = JSON.stringify(arrayCart);
    localStorage.setItem('cart', cartString);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSize = cart.reduce((acc, { quantity }) => {
      acc += quantity;
      return acc;
    }, 0);
    localStorage.setItem('cartSize', cartSize);
    this.setState({
      cartSize,
    });
  },
};

export default ClickFunctions;
