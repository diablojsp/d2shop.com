const TAX_RATE = 0.05;
let cart = [];

async function loadItems() {
  try {
    const response = await fetch('data/items.json');
    const items = await response.json();
    const container = document.getElementById('shop-container');

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';

      card.innerHTML = `
        <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
        <h2 class="item-name">${item.name}</h2>
        <p class="item-price">${item.price} gold</p>
        <button class="buy-btn">Buy</button>
      `;

      card.querySelector('.buy-btn').addEventListener('click', () => addToCart(item));
      container.appendChild(card);
    });
  } catch (err) { console.error('Failed to load items:', err); }
}

function addToCart(item) {
  cart.push(item);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price}g`;
    cartItems.appendChild(li);
    total += item.price;
  });

  document.getElementById('cart-count').textContent = cart.length;
  const tax = total * TAX_RATE;
  const grandTotal = total + tax;

  document.getElementById('cart-total').textContent = `Total: ${total.toFixed(0)} gold`;
  document.getElementById('cart-tax').textContent = `Tax (5%): ${tax.toFixed(0)} gold`;
  document.getElementById('cart-grandtotal').textContent = `Grand Total: ${grandTotal.toFixed(0)} gold`;
}

// Cart toggle
const cartToggle = document.getElementById('cart-toggle');
const shoppingCart = document.getElementById('shopping-cart');
cartToggle.addEventListener('click', () => {
  shoppingCart.classList.toggle('closed');
});

// Purchase modal
const checkoutBtn = document.getElementById('checkout-btn');
const modal = document.getElementById('purchase-modal');
const purchaseItems = document.getElementById('purchase-items');
const purchaseTotal = document.getElementById('purchase-total');
const closeModal = document.getElementById('close-modal');

checkoutBtn.addEventListener('click', () => {
  purchaseItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price}g`;
    purchaseItems.appendChild(li);
    total += item.price;
  });
  const tax = total * TAX_RATE;
  purchaseTotal.textContent = `Grand Total: ${(total+tax).toFixed(0)} gold`;
  modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => modal.classList.add('hidden'));

loadItems();