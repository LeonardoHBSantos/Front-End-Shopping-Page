import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ShoppingCartProduct extends Component {
  render() {
    const { name,
      price,
      image,
      id,
      quantity,
      quantityTotal,
      clickBtnQuantity,
      clickBtnDelete,
    } = this.props;
    return (
      <div id={ id }>
        <button
          type="button"
          data-testid="remove-product"
          onClick={ clickBtnDelete }
        >
          Excluir
        </button>
        <img src={ image } alt={ name } />
        <span
          data-testid="shopping-cart-product-name"
        >
          {name}
        </span>
        <button
          data-testid="product-decrease-quantity"
          name="decreaseButton"
          onClick={ clickBtnQuantity }
          disabled={ quantity === 1 }
        >
          -
        </button>
        <span
          data-testid="shopping-cart-product-quantity"
        >
          {quantity}

        </span>
        <button
          name="increaseButton"
          data-testid="product-increase-quantity"
          onClick={ clickBtnQuantity }
          disabled={ (quantity === quantityTotal) }
        >
          +
        </button>
        <span>{(price * quantity).toFixed(2)}</span>
      </div>
    );
  }
}

ShoppingCartProduct.propTypes = {
  clickBtnDelete: PropTypes.func.isRequired,
  clickBtnQuantity: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  quantityTotal: PropTypes.number.isRequired,
};

export default ShoppingCartProduct;
