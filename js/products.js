/* ============================================
   ShopEase — Products Page Logic
   Rendering, filtering, sorting, and search
   ============================================ */

// ============================================
// 1. DOM References
// ============================================
const productsGrid     = document.getElementById('productsGrid');
const sortSelect       = document.getElementById('sortSelect');
const resultsCount     = document.getElementById('resultsCount');
const searchInput      = document.getElementById('searchInput');
const categoryCheckboxes = document.querySelectorAll('.filter-category');
const priceMinInput    = document.getElementById('priceMin');
const priceMaxInput    = document.getElementById('priceMax');
const priceApplyBtn    = document.getElementById('priceApplyBtn');
const filterToggle     = document.getElementById('filterToggle');
const filtersSidebar   = document.getElementById('filtersSidebar');

// Current filter state
let currentFilters = {
  categories: [],
  priceMin: 0,
  priceMax: Infinity,
  search: '',
  sort: 'featured'
};

// ============================================
// 2. Render Product Cards
// ============================================

/**
 * Generate a single product card HTML.
 * @param {Object} product
 * @returns {string} HTML string
 */
function createProductCard(product) {
  const discount = getDiscount(product.originalPrice, product.price);
  const badgeHTML = product.badge
    ? `<span class="badge">${product.badge}</span>`
    : '';

  return `
    <div class="product-card animate-fade-in" data-id="${product.id}">
      ${badgeHTML}
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-actions">
          <button onclick="addToCart(${product.id})" title="Add to Cart">🛒</button>
          <button onclick="viewProduct(${product.id})" title="Quick View">👁</button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          <span class="price-original">$${product.originalPrice.toFixed(2)}</span>
          <span class="price-discount">${discount}% off</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render the filtered & sorted product list.
 */
function renderProducts() {
  let filtered = [...products];

  // --- Apply Category Filter ---
  if (currentFilters.categories.length > 0) {
    filtered = filtered.filter(p =>
      currentFilters.categories.includes(p.category)
    );
  }

  // --- Apply Price Range Filter ---
  filtered = filtered.filter(p =>
    p.price >= currentFilters.priceMin && p.price <= currentFilters.priceMax
  );

  // --- Apply Search Filter ---
  if (currentFilters.search) {
    const q = currentFilters.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // --- Apply Sorting ---
  switch (currentFilters.sort) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'name-az':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-za':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default: // 'featured' — keep original order
      break;
  }

  // --- Update results count ---
  if (resultsCount) {
    resultsCount.textContent = `Showing ${filtered.length} of ${products.length} products`;
  }

  // --- Render cards or empty state ---
  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="cart-empty" style="grid-column: 1 / -1;">
        <div class="empty-icon">🔍</div>
        <h2>No products found</h2>
        <p>Try adjusting your filters or search terms.</p>
        <button class="btn btn-primary" onclick="resetFilters()">Clear All Filters</button>
      </div>
    `;
  } else {
    productsGrid.innerHTML = filtered.map(createProductCard).join('');
  }
}

// ============================================
// 3. Quick View — Navigate to detail page
// ============================================
function viewProduct(id) {
  window.location.href = `product-details.html?id=${id}`;
}

// ============================================
// 4. Filter Handlers
// ============================================

/** Update category filters from checkboxes. */
function handleCategoryFilter() {
  currentFilters.categories = [];
  categoryCheckboxes.forEach(cb => {
    if (cb.checked) currentFilters.categories.push(cb.value);
  });
  renderProducts();
}

/** Apply price range filter. */
function handlePriceFilter() {
  const min = parseFloat(priceMinInput?.value) || 0;
  const max = parseFloat(priceMaxInput?.value) || Infinity;
  currentFilters.priceMin = min;
  currentFilters.priceMax = max;
  renderProducts();
}

/** Reset all filters to default. */
function resetFilters() {
  currentFilters = {
    categories: [],
    priceMin: 0,
    priceMax: Infinity,
    search: '',
    sort: 'featured'
  };

  // Reset UI elements
  categoryCheckboxes.forEach(cb => (cb.checked = false));
  if (priceMinInput) priceMinInput.value = '';
  if (priceMaxInput) priceMaxInput.value = '';
  if (sortSelect) sortSelect.value = 'featured';
  if (searchInput) searchInput.value = '';

  renderProducts();
}

// ============================================
// 5. Event Listeners
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  renderProducts();

  // Sort change
  sortSelect?.addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    renderProducts();
  });

  // Category checkboxes
  categoryCheckboxes.forEach(cb => {
    cb.addEventListener('change', handleCategoryFilter);
  });

  // Price filter button
  priceApplyBtn?.addEventListener('click', handlePriceFilter);

  // Inline search on products page
  searchInput?.addEventListener('input', (e) => {
    currentFilters.search = e.target.value.trim();
    renderProducts();
  });

  // Read search query from URL (from navbar search)
  const urlParams = new URLSearchParams(window.location.search);
  const urlSearch = urlParams.get('search');
  if (urlSearch) {
    currentFilters.search = urlSearch;
    if (searchInput) searchInput.value = urlSearch;
    renderProducts();
  }

  // Mobile filter toggle
  filterToggle?.addEventListener('click', () => {
    filtersSidebar?.classList.toggle('active');
  });
});
