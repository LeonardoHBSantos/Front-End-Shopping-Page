import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.populateCategories();
  }

  populateCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  };

  render() {
    const { categories } = this.state;
    const { onClick } = this.props;
    return (
      <section>
        { categories.map(({ id, name }) => (
          <button
            name={ `category=${id}` }
            key={ id }
            data-testid="category"
            onClick={ onClick }
          >
            {name}
          </button>)) }
      </section>
    );
  }
}

Categories.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Categories;
