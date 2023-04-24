import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import ClickFunctions from '../ClickFunctions';

class DetailsPage extends Component {
  state = {
    productInfo: '',
    rating: '',
    text: '',
    email: '',
    invalid: false,
  };

  clickBtnAddToCart = ClickFunctions.clickBtnAddToCart.bind(this);

  componentDidMount() {
    this.retrieveProduct();
    this.updateSizeCart();
  }

  updateSizeCart = function updateSizeCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSize = cart.reduce((acc, { quantity }) => {
      acc += quantity;
      return acc;
    }, 0);
    localStorage.setItem('cartSize', cartSize);
    this.setState({
      cartSize,
    });
  };

  retrieveProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      productInfo: product,
    });
  };

  onChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    const { rating, text, email } = this.state;
    event.preventDefault();
    const validateEmailRegex = /^\S+@\S+\.\S+$/;
    if (!rating || validateEmailRegex.test(email) === false) {
      this.setState({
        invalid: true,
      });
    } else if (rating && validateEmailRegex.test(email) === true) {
      const { match: { params: { id } } } = this.props;
      const ratingObj = { email, text, rating };
      const ratingArr = JSON.parse(localStorage.getItem(id)) || [];
      ratingArr.push(ratingObj);
      const ratingString = JSON.stringify(ratingArr);
      localStorage.setItem(id, ratingString);
      this.setState({ text: '', email: '', rating: '' });
      this.setState({ invalid: false });
    }
  };

  render() {
    const { match: { params: { id } } } = this.props;
    const ratings = JSON.parse(localStorage.getItem(id));
    const { productInfo, email, text, invalid, cartSize,
      productInfo: { title, price, thumbnail, attributes, shipping } } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{title}</h2>
        <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        {shipping?.free_shipping && (
          <p
            data-testid="free-shipping"
          >
            Frete Gratis
          </p>
        )}
        <h3 data-testid="product-detail-price">{ price }</h3>
        <ul>
          Especificações:
          { productInfo !== '' && attributes
            .map((att, index) => (
              <li
                key={ index }
              >
                {`${att.name}: ${att.value_name}`}
              </li>)) }
        </ul>
        <button>
          <Link to="/shoppingcart" data-testid="shopping-cart-button">Carrinho</Link>
        </button>
        <span data-testid="shopping-cart-size">{cartSize}</span>
        <button
          onClick={ () => this.clickBtnAddToCart(productInfo) }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <form>
          <input
            type="email"
            name="email"
            onChange={ this.onChange }
            value={ email }
            data-testid="product-detail-email"
          />
          <textarea
            required
            name="text"
            cols="10"
            rows="2"
            onChange={ this.onChange }
            value={ text }
            data-testid="product-detail-evaluation"
          />
          <label htmlFor="">
            <input
              type="radio"
              name="rating"
              value="1"
              onChange={ this.onChange }
              data-testid="1-rating"
            />
            1
            <input
              type="radio"
              name="rating"
              value="2"
              onChange={ this.onChange }
              data-testid="2-rating"
            />
            2
            <input
              type="radio"
              name="rating"
              value="3"
              onChange={ this.onChange }
              data-testid="3-rating"
            />
            3
            <input
              type="radio"
              name="rating"
              value="4"
              onChange={ this.onChange }
              data-testid="4-rating"
            />
            4
            <input
              type="radio"
              name="rating"
              value="5"
              onChange={ this.onChange }
              data-testid="5-rating"
            />
            5
          </label>
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.onSubmit }
          >
            Enviar
          </button>
        </form>
        { invalid && <p data-testid="error-msg">Campos inválidos</p> }

        { ratings ? ratings.map((el, index) => (
          <div key={ index }>

            <label htmlFor="">
              Email:
              <h3 data-testid="review-card-email">{el.email}</h3>
            </label>
            <label htmlFor="">
              Comentário:
              <h3 data-testid="review-card-evaluation">{el.text}</h3>
            </label>
            <label htmlFor="">
              Avaliação:
              <h3 data-testid="review-card-rating">{el.rating}</h3>
            </label>
          </div>
        )) : null }
      </div>
    );
  }
}

DetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default DetailsPage;
