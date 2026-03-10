/* ============================================
   ShopEase — Main Script
   Shared utilities, product data & navigation
   ============================================ */

// ============================================
// 1. Sample Product Data (10 items)
// ============================================
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 79.99,
    originalPrice: 129.99,
    image: "images/product-1.jpg",
    rating: 4.5,
    reviews: 2847,
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and ultra-comfortable over-ear design. Features Hi-Res Audio support and seamless multi-device connectivity.",
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Hi-Res Audio certified",
      "Bluetooth 5.2 connectivity",
      "Foldable design with carry case"
    ],
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Smart Watch Pro Max",
    category: "Electronics",
    price: 199.99,
    originalPrice: 299.99,
    image: "images/product-2.jpg",
    rating: 4.7,
    reviews: 1923,
    description: "Advanced smartwatch with AMOLED display, health monitoring suite including ECG, SpO2, and stress tracking. Water resistant to 50m with 5-day battery life.",
    features: [
      "1.4\" AMOLED always-on display",
      "ECG & blood oxygen monitoring",
      "GPS + GLONASS navigation",
      "5-day battery life",
      "100+ workout modes"
    ],
    badge: "New"
  },
  {
    id: 3,
    name: "Men's Premium Casual Jacket",
    category: "Fashion",
    price: 59.99,
    originalPrice: 89.99,
    image: "images/product-3.jpg",
    rating: 4.3,
    reviews: 856,
    description: "Stylish slim-fit casual jacket crafted from premium cotton blend. Water-resistant outer shell with warm fleece lining. Perfect for everyday wear across seasons.",
    features: [
      "Premium cotton-polyester blend",
      "Water-resistant coating",
      "Warm fleece lining",
      "Multiple zip pockets",
      "Machine washable"
    ],
    badge: ""
  },
  {
    id: 4,
    name: "Ultra Boost Running Shoes",
    category: "Sports",
    price: 89.99,
    originalPrice: 139.99,
    image: "images/product-4.jpg",
    rating: 4.6,
    reviews: 3412,
    description: "Engineered for performance with responsive cushioning and adaptive knit upper. Lightweight design with superior energy return for long-distance runs.",
    features: [
      "Responsive Boost midsole",
      "Adaptive Primeknit upper",
      "Continental rubber outsole",
      "Torsion spring system",
      "Weighs only 310g"
    ],
    badge: "Popular"
  },
  {
    id: 5,
    name: "Insulated Stainless Steel Water Bottle",
    category: "Home",
    price: 24.99,
    originalPrice: 34.99,
    image: "images/product-5.jpg",
    rating: 4.8,
    reviews: 5621,
    description: "Double-wall vacuum insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof lid with one-hand operation.",
    features: [
      "24h cold / 12h hot insulation",
      "18/8 food-grade stainless steel",
      "BPA-free & toxin-free",
      "Leak-proof flip lid",
      "750ml capacity"
    ],
    badge: "Top Rated"
  },
  {
    id: 6,
    name: "Premium Non-Slip Yoga Mat",
    category: "Sports",
    price: 34.99,
    originalPrice: 49.99,
    image: "images/product-6.jpg",
    rating: 4.4,
    reviews: 1287,
    description: "Extra-thick 6mm yoga mat with non-slip textured surface on both sides. Made from eco-friendly TPE material, perfect for yoga, pilates, and floor exercises.",
    features: [
      "6mm extra-thick cushioning",
      "Double-sided non-slip texture",
      "Eco-friendly TPE material",
      "Lightweight & portable",
      "Includes carrying strap"
    ],
    badge: ""
  },
  {
    id: 7,
    name: "Travel Laptop Backpack",
    category: "Accessories",
    price: 45.99,
    originalPrice: 69.99,
    image: "images/product-7.jpg",
    rating: 4.5,
    reviews: 2156,
    description: "Anti-theft laptop backpack with USB charging port. Fits 15.6\" laptops with dedicated padded compartment. Water-resistant fabric with multiple organizer pockets.",
    features: [
      "Fits up to 15.6\" laptops",
      "Built-in USB charging port",
      "Anti-theft hidden zipper",
      "Water-resistant polyester",
      "Ergonomic padded straps"
    ],
    badge: "Deal"
  },
  {
    id: 8,
    name: "Fast Wireless Charging Pad",
    category: "Electronics",
    price: 29.99,
    originalPrice: 44.99,
    image: "https://search.brave.com/images?q=Fast+Wireless+Charging+Pad+hd+image&context=W3sic3JjIjoiaHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNDFnaXJUcElJRUwuX0FDLl9TUjE4MCwyMzAuanBnIiwidGV4dCI6IlplYnJvbmljcyAyLWluLTEgV2lyZWxlc3MgQ2hhcmdpbmcgUGFkIHdpdGggMzBXIE91dHB1dCwgRmFzdCBDaGFyZ2luZywgQnVpbHQtaW4gUHJvdGVjdGlvbiwgRm9yZWlnbiBPYmplY3QgRGV0ZWN0aW9uLCAxbSBUeXBlLUMgQ2FibGUsIGZvciBXaXJlbGVzcyBFYXJidWRzICZhbXA7IFNtYXJ0cGhvbmVzLCBUZXh0dXJlIEZpbmlzaCAoV0NQIDIxNSkiLCJwYWdlX3VybCI6Imh0dHBzOi8vd3d3LmFtYXpvbi5pbi9JbmR1Y3Rpb24tQ2hhcmdlcnMvYj9pZT1VVEY4Jm5vZGU9MTM4OTQxMzAzMSJ9XQ%3D%3D&sig=9bdd54a1daeb43bd51db56384a9ccbe0790127aa71f2d7083bf6f39a7b343743&nonce=fdacb57e93063fc60752b5dd099851e2",
    rating: 4.2,
    reviews: 983,
    description: "15W fast wireless charging pad compatible with all Qi-enabled devices. Ultra-slim design with intelligent safety features including temperature control and foreign object detection.",
    features: [
      "15W fast charging",
      "Universal Qi compatibility",
      "Ultra-slim 7mm design",
      "LED indicator light",
      "Multi-layer safety protection"
    ],
    badge: ""
  },
  {
    id: 9,
    name: "12-Cup Programmable Coffee Maker",
    category: "Home",
    price: 129.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 1745,
    description: "Fully programmable drip coffee maker with thermal carafe. Features adjustable brew strength, auto-start timer, and built-in water filtration for the perfect cup every time.",
    features: [
      "12-cup thermal carafe",
      "Programmable 24hr timer",
      "Adjustable brew strength",
      "Built-in water filter",
      "Auto shutoff & keep warm"
    ],
    badge: "Best Value"
  },
  {
    id: 10,
    name: "Polarized UV Protection Sunglasses",
    category: "Fashion",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 1102,
    description: "Classic aviator sunglasses with premium polarized lenses. Provides 100% UV400 protection with lightweight titanium alloy frame for all-day comfort.",
    features: [
      "Polarized TAC lenses",
      "100% UV400 protection",
      "Lightweight titanium frame",
      "Anti-glare coating",
      "Includes hard case & cloth"
    ],
    badge: ""
  }
];

// ============================================
// 2. Cart Utility Functions (LocalStorage)
// ============================================

/**
 * Retrieve the cart array from LocalStorage.
 * @returns {Array} cart items
 */
function getCart() {
  return JSON.parse(localStorage.getItem('shopease_cart')) || [];
}

/**
 * Save the cart array to LocalStorage.
 * @param {Array} cart
 */
function saveCart(cart) {
  localStorage.setItem('shopease_cart', JSON.stringify(cart));
  updateCartBadge();
}

/**
 * Add a product to the cart (or increment its quantity).
 * @param {number} productId
 * @param {number} qty - quantity to add (default 1)
 */
function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id: productId, quantity: qty });
  }

  saveCart(cart);
  showToast('Product added to cart!', 'success');
}

/**
 * Remove a product from the cart entirely.
 * @param {number} productId
 */
function removeFromCart(productId) {
  let cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

/**
 * Update the quantity of a product in the cart.
 * @param {number} productId
 * @param {number} newQty
 */
function updateCartQuantity(productId, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQty;
      saveCart(cart);
    }
  }
}

/**
 * Get total number of items in cart.
 * @returns {number}
 */
function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Update the cart badge count in the navbar.
 */
function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ============================================
// 3. Toast Notification System
// ============================================

/**
 * Show a toast notification.
 * @param {string} message - text to display
 * @param {string} type - 'success' | 'error' | 'warning'
 */
function showToast(message, type = 'success') {
  // Create container if it doesn't exist
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Build toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '✅', error: '❌', warning: '⚠️' };
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.success}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================
// 4. Star Rating Helper
// ============================================

/**
 * Generate star rating HTML from a numeric rating.
 * @param {number} rating - value between 0 and 5
 * @returns {string} HTML string of stars
 */
function renderStars(rating) {
  let html = '';
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  for (let i = 0; i < full; i++)  html += '★';
  for (let i = 0; i < half; i++)  html += '★';   // half uses full star for simplicity
  for (let i = 0; i < empty; i++) html += '☆';

  return html;
}

// ============================================
// 5. Product Lookup
// ============================================

/**
 * Find a product by its ID.
 * @param {number} id
 * @returns {Object|undefined}
 */
function getProductById(id) {
  return products.find(p => p.id === id);
}

/**
 * Calculate discount percentage.
 * @param {number} original
 * @param {number} current
 * @returns {number}
 */
function getDiscount(original, current) {
  return Math.round(((original - current) / original) * 100);
}

// ============================================
// 6. Mobile Navigation Toggle
// ============================================

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('active');
      // Animate hamburger to X
      toggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }
}

// ============================================
// 7. Search Handler
// ============================================

function initSearch() {
  const form = document.querySelector('.nav-search');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const query = input.value.trim();
    if (query) {
      // Navigate to products page with search query
      window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
  });
}

// ============================================
// 8. Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initMobileNav();
  initSearch();
});
