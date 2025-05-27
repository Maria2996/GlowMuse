export async function fetchData() {
  try {
    const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
    if (!response.ok) throw new Error('Error in the API response');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
