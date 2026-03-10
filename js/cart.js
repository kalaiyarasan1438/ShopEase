/* ============================================
   ShopEase — Cart Page Logic
   Renders cart items, handles quantity & totals
   ============================================ */

// ============================================
// 1. DOM References
// ============================================
const cartItemsContainer = document.getElementById('cartItems');
const cartEmptyState     = document.getElementById('cartEmpty');
const cartContent        = document.getElementById('cartContent');
const subtotalEl         = document.getElementById('subtotal');
const shippingEl         = document.getElementById('shipping');
const taxEl              = document.getElementById('tax');
const totalEl            = document.getElementById('total');
const cartCountEl        = document.getElementById('cartCount');
const clearCartBtn       = document.getElementById('clearCartBtn');
const checkoutBtn        = document.getElementById('checkoutBtn');

// Tax rate and free-shipping threshold
const TAX_RATE = 0.08;           // 8% tax
const FREE_SHIPPING_ABOVE = 50;  // Free shipping over $50
const SHIPPING_COST = 5.99;

// ============================================
// 2. Render Cart Items
// ============================================

/**
 * Build the HTML for a single cart item row.
 * @param {Object} cartItem - { id, quantity }
 * @returns {string} HTML string
 */
function renderCartItem(cartItem) {
  const product = getProductById(cartItem.id);
  if (!product) return '';

  const itemTotal = (product.price * cartItem.quantity).toFixed(2);

  return `
    <div class="cart-item" data-id="${product.id}">
      <div class="cart-item-img">
        <a href="product-details.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}">
        </a>
      </div>
      <div class="cart-item-info">
        <span class="cart-item-category">${product.category}</span>
        <h3><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
        <span class="cart-item-price">$${itemTotal}</span>
        <span class="text-muted" style="font-size:.8rem;">$${product.price.toFixed(2)} each</span>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-selector">
          <button onclick="changeQty(${product.id}, -1)" aria-label="Decrease quantity">−</button>
          <span class="qty-value">${cartItem.quantity}</span>
          <button onclick="changeQty(${product.id}, 1)" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${product.id})">
          🗑 Remove
        </button>
      </div>
    </div>
  `;
}

/**
 * Render the full cart page content.
 */
function renderCart() {
  const cart = getCart();

  // Toggle empty state vs. content
  if (cart.length === 0) {
    if (cartContent)    cartContent.style.display = 'none';
    if (cartEmptyState) cartEmptyState.style.display = 'block';
    return;
  }

  if (cartContent)    cartContent.style.display = 'grid';
  if (cartEmptyState) cartEmptyState.style.display = 'none';

  // Render item rows
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cart.map(renderCartItem).join('');
  }

  // Update totals
  updateTotals(cart);

  // Update item count in header
  if (cartCountEl) {
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    cartCountEl.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
  }
}

// ============================================
// 3. Calculate & Display Totals
// ============================================

/**
 * Recalculate and display subtotal, shipping, tax, and total.
 * @param {Array} cart
 */
function updateTotals(cart) {
  // Subtotal
  const subtotal = cart.reduce((sum, item) => {
    const product = getProductById(item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  // Shipping (free above threshold)
  const shipping = subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_COST;

  // Tax
  const tax = subtotal * TAX_RATE;

  // Grand total
  const total = subtotal + shipping + tax;

  // Update DOM
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  if (taxEl)      taxEl.textContent      = `$${tax.toFixed(2)}`;
  if (totalEl)    totalEl.textContent     = `$${total.toFixed(2)}`;
}

// ============================================
// 4. Cart Actions
// ============================================

/**
 * Change quantity by a delta (+1 or -1).
 * @param {number} productId
 * @param {number} delta
 */
function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    removeItem(productId);
  } else {
    updateCartQuantity(productId, newQty);
    renderCart();
  }
}

/**
 * Remove an item from the cart with confirmation.
 * @param {number} productId
 */
function removeItem(productId) {
  removeFromCart(productId);
  renderCart();
  showToast('Item removed from cart', 'warning');
}

/**
 * Clear all items from the cart.
 */
function clearCart() {
  if (confirm('Are you sure you want to empty your cart?')) {
    localStorage.removeItem('shopease_cart');
    updateCartBadge();
    renderCart();
    showToast('Cart cleared', 'warning');
  }
}

/**
 * Simulated checkout action.
 */
function handleCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  showToast('Order placed successfully! 🎉', 'success');
  localStorage.removeItem('shopease_cart');
  updateCartBadge();
  setTimeout(() => {
    renderCart();
  }, 1000);
}

// ============================================
// 5. Event Listeners & Init
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  // Clear cart button
  clearCartBtn?.addEventListener('click', clearCart);

  // Checkout button
  checkoutBtn?.addEventListener('click', handleCheckout);
});
