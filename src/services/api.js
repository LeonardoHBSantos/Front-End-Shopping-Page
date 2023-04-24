export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(input) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?${input}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
