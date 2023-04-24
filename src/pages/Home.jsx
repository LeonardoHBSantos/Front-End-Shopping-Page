import React from 'react';
import { Link } from 'react-router-dom';
import ChangeFuntions from '../ChangeFuntions';
import ClickFunctions from '../ClickFunctions';
import ProductPreview from '../components/ProductPreview';
import Categories from '../components/Categories';

class Home extends React.Component {
  state = {
    searchInput: '',
    resultSearch: '',
  };

  changeIptSearch = ChangeFuntions.changeIptSearch.bind(this);

  clickBtnSearch = ClickFunctions.clickBtnSearch.bind(this);

  clickBtnAddToCart = ClickFunctions.clickBtnAddToCart.bind(this);

  componentDidMount() {
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

  render() {
    const { searchInput, resultSearch, cartSize } = this.state;
    return (
      <section>
        <input
          data-testid="query-input"
          type="text"
          value={ searchInput }
          placeholder="O Que Você Deseja Hoje?"
          onChange={ this.changeIptSearch }
        />
        <button
          data-testid="query-button"
          name={ `q=${searchInput}` }
          type="button"
          onClick={ this.clickBtnSearch }
        >
          Pesquisar
        </button>
        <div>
          <Categories onClick={ this.clickBtnSearch } />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <button>
            <Link to="/shoppingcart" data-testid="shopping-cart-button">Carrinho</Link>
          </button>
          <span data-testid="shopping-cart-size">{cartSize}</span>
        </div>
        <div>
          {resultSearch !== '' && (
            resultSearch.length === 0
              ? (<p>Nenhum produto foi encontrado</p>)
              : (resultSearch.map((result) => (
                <ProductPreview
                  clickBtnAddToCart={ this.clickBtnAddToCart }
                  product={ result }
                  key={ result.id }
                />
              )))
          )}
        </div>
      </section>
    );
  }
}

export default Home;
