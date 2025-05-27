import { fetchData } from '../js/api.js';

const container = document.getElementById('cont');

console.log('Starting data fetch...');

const maxProducts = 10;

function getRandomItems(array, n) {
  const result = [];
  const usedIndices = new Set();
  while (result.length < n && result.length < array.length) {
    const index = Math.floor(Math.random() * array.length);
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      result.push(array[index]);
    }
  }
  return result;
}

function displayProducts(products) {
  container.innerHTML = ''; // Clear container

  products.forEach(product => {
    if (!product.image_link || product.image_link.trim() === '') return; // Skip if no image

    const description = (product.description && product.description.trim() !== '') 
                        ? product.description 
                        : 'Description not available';

    const div = document.createElement('div');
    div.classList.add('flip-card');
    div.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="${product.image_link}" alt="${product.name}" />
          <h3>${product.name}</h3>
        </div>
        <div class="flip-card-back">
        <div class="text-container">
          <p>${description}</p>
        </div>
      </div>
    `;


    container.appendChild(div);
  });
}

async function main() {
  try {
    let savedProducts = localStorage.getItem('selectedProducts');
    let productsToShow;

    if (savedProducts) {
      // Use saved products if available
      productsToShow = JSON.parse(savedProducts);
      console.log('Loading products from localStorage');
    } else {
     
      productsToShow = selection
  .filter(p => p.image_link && p.image_link.trim() !== '')
  .slice(0, maxProducts);


      localStorage.setItem('selectedProducts', JSON.stringify(productsToShow));
      console.log('Products saved to localStorage');
    }

    displayProducts(productsToShow);
    applyProductClasses(); // Apply styles after displaying products
  } catch (error) {
    console.error('Error:', error);
  }
}

function applyProductClasses() {
  const products = document.querySelectorAll('#cont > div');

  products.forEach(card => {
    card.classList.add('product-card');

    const img = card.querySelector('img');
    if (img) img.classList.add('product-img');

    const h3 = card.querySelector('h3');
    if (h3) h3.classList.add('product-name');

    const p = card.querySelector('p');
    if (p) p.classList.add('product-description');
  });

  if (container) {
    container.classList.add('cont-flex');
  }
}

main();
