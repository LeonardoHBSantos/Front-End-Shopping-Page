const ChangeFuntions = {
  changeIptSearch: function changeIptSearch({ target }) {
    const { value } = target;
    this.setState({
      searchInput: value,
    });
  },
};

export default ChangeFuntions;
