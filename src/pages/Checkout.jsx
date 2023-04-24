import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';

class Checkout extends Component {
  render() {
    const { location: { state: { cart } } } = this.props;
    return (
      <div>
        <div>
          <h3>Revise seus produtos</h3>
          { cart.map((product) => (
            <div key={ product.title }>
              <img src={ product.thumbnail } alt={ product.title } key={ product.name } />
              <span>{product.title}</span>
              <span>{product.price}</span>
              <span>{`Quantidade: ${product.quantity}`}</span>
              <span>{`Total: ${product.price * product.quantity}`}</span>
            </div>
          )) }
          <h4>
            Total: R$
            {cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}
          </h4>
        </div>
        <Form />
      </div>
    );
  }
}

Checkout.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      cart: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Checkout;
