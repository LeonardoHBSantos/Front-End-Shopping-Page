import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import DetailsPage from './pages/DetailsPage';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route exact path="/product-details/:id" component={ DetailsPage } />
        <Route exact path="/checkout" component={ Checkout } />
      </Switch>
    );
  }
}

export default App;
