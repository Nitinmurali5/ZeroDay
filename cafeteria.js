// Cafeteria Menu JavaScript

let currentUser = null;
let menuItems = [];

// User credentials - same as other pages
const users = {
    "kabil": { password: "ka1234", role: "student", name: "Kabil" },
    "admin": { password: "ad1234", role: "admin", name: "Administrator" }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadMenuItems();
    setupEventListeners();
});

function setupEventListeners() {
    // Admin login form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Logout buttons
    const logoutBtn = document.getElementById('logoutBtn');
    const studentLogoutBtn = document.getElementById('studentLogoutBtn');
    
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (studentLogoutBtn) studentLogoutBtn.addEventListener('click', goBackToRoleSelection);
    
    // Admin form
    const addMenuForm = document.getElementById('addMenuForm');
    if (addMenuForm) addMenuForm.addEventListener('submit', addMenuItem);
    
    // Filters
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const searchFilter = document.getElementById('searchFilter');
    
    if (categoryFilter) categoryFilter.addEventListener('change', filterMenu);
    if (dateFilter) dateFilter.addEventListener('change', filterMenu);
    if (searchFilter) searchFilter.addEventListener('input', filterMenu);
}

function selectRole(role) {
    if (role === 'student') {
        currentUser = { role: 'student', name: 'Student' };
        document.getElementById('roleSection').style.display = 'none';
        document.getElementById('studentDashboard').style.display = 'block';
        loadStudentMenu();
    } else if (role === 'admin') {
        document.getElementById('roleSection').style.display = 'none';
        document.getElementById('adminLoginSection').style.display = 'block';
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    
    if (!users[username] || users[username].password !== password || users[username].role !== 'admin') {
        alert('Invalid admin credentials!');
        return;
    }
    
    currentUser = {
        username: username,
        role: 'admin',
        name: users[username].name
    };
    

    document.getElementById('adminLoginSection').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadAdminMenu();
}

function goBackToRoleSelection() {
    document.getElementById('adminLoginSection').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('studentDashboard').style.display = 'none';
    document.getElementById('roleSection').style.display = 'block';
    currentUser = null;
}

function logout() {
    currentUser = null;
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('roleSection').style.display = 'block';
    document.getElementById('adminLoginForm').reset();
}

function addMenuItem(e) {
    e.preventDefault();
    
    const name = document.getElementById('itemName').value.trim();
    const category = document.getElementById('itemCategory').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const description = document.getElementById('itemDescription').value.trim();
    const date = document.getElementById('itemDate').value;
    const imageFile = document.getElementById('itemImage').files[0];
    
    const menuItem = {
        id: Date.now(),
        name,
        category,
        price,
        description,
        date: new Date(date),
        createdBy: currentUser.username,
        createdAt: new Date(),
        image: null
    };
    
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            menuItem.image = e.target.result;
            menuItems.unshift(menuItem);
            saveMenuItems();
            loadAdminMenu();
            alert(`✅ Menu item "${name}" added successfully!`);
        };
        reader.readAsDataURL(imageFile);
    } else {
        menuItems.unshift(menuItem);
        saveMenuItems();
        loadAdminMenu();
        alert(`✅ Menu item "${name}" added successfully!`);
    }
    
    document.getElementById('addMenuForm').reset();
}

function loadMenuItems() {
    const savedItems = localStorage.getItem('cafeteriaMenu');
    if (savedItems) {
        menuItems = JSON.parse(savedItems);
        menuItems.forEach(item => {
            item.date = new Date(item.date);
            item.createdAt = new Date(item.createdAt);
        });
    } else {
        // Sample menu items
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        menuItems = [
            {
                id: 1,
                name: "Masala Dosa",
                category: "breakfast",
                price: 45,
                description: "Crispy dosa with spiced potato filling",
                date: today,
                createdBy: "admin",
                createdAt: new Date(),
                image: null
            },
            {
                id: 2,
                name: "Chicken Biryani",
                category: "lunch",
                price: 120,
                description: "Aromatic basmati rice with tender chicken",
                date: today,
                createdBy: "admin",
                createdAt: new Date(),
                image: null
            },
            {
                id: 3,
                name: "Samosa",
                category: "snacks",
                price: 15,
                description: "Crispy pastry with spiced potato filling",
                date: today,
                createdBy: "admin",
                createdAt: new Date(),
                image: null
            },
            {
                id: 4,
                name: "Masala Chai",
                category: "beverages",
                price: 10,
                description: "Traditional Indian spiced tea",
                date: today,
                createdBy: "admin",
                createdAt: new Date(),
                image: null
            }
        ];
        saveMenuItems();
    }
}

function saveMenuItems() {
    localStorage.setItem('cafeteriaMenu', JSON.stringify(menuItems));
}

function loadAdminMenu() {
    const container = document.getElementById('adminMenuList');
    
    if (menuItems.length === 0) {
        container.innerHTML = '<p>No menu items added yet.</p>';
        return;
    }
    
    container.innerHTML = menuItems.map(item => createAdminMenuCard(item)).join('');
}

function loadStudentMenu() {
    const container = document.getElementById('studentMenuList');
    
    if (menuItems.length === 0) {
        container.innerHTML = '<p>No menu items available.</p>';
        return;
    }
    
    container.innerHTML = menuItems.map(item => createStudentMenuCard(item)).join('');
}

function createAdminMenuCard(item) {
    const imageHtml = item.image ? 
        `<img src="${item.image}" alt="${item.name}" class="menu-image">` : 
        `<div class="no-image">🍽️</div>`;
    
    return `
        <div class="announcement-item menu-item">
            <button onclick="deleteMenuItem(${item.id})" class="delete-icon" title="Delete item">🗑️</button>
            ${imageHtml}
            <div class="menu-content">
                <div class="menu-text">
                    <div class="announcement-header">
                        <h4>${item.name}</h4>
                        <span class="category ${item.category}">${item.category}</span>
                    </div>
                    <div class="announcement-content">
                        <p>${item.description || 'No description'}</p>
                        <div class="announcement-meta">
                            <span class="menu-price">₹${item.price}</span>
                            <span>Date: ${item.date.toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createStudentMenuCard(item) {
    const isToday = item.date.toDateString() === new Date().toDateString();
    const imageHtml = item.image ? 
        `<img src="${item.image}" alt="${item.name}" class="menu-image">` : 
        `<div class="no-image">🍽️</div>`;
    
    return `
        <div class="announcement-item menu-item ${isToday ? 'special-item' : ''}">
            ${imageHtml}
            <div class="menu-content">
                <div class="menu-text">
                    <div class="menu-header">
                        <div>
                            <h4 class="menu-title">${item.name}${isToday ? '<span class="special-badge">Today</span>' : ''}</h4>
                            <span class="menu-category category-${item.category}">${item.category}</span>
                        </div>
                        <div class="menu-price">₹${item.price}</div>
                    </div>
                    <div class="menu-description">${item.description || 'Delicious food item'}</div>
                    <div class="menu-meta">
                        <span class="menu-date">Available: ${item.date.toLocaleDateString()}</span>
                    </div>

                </div>
            </div>
        </div>
    `;
}

function deleteMenuItem(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
        menuItems = menuItems.filter(item => item.id !== itemId);
        saveMenuItems();
        loadAdminMenu();
        alert(`🗑️ Menu item "${item.name}" deleted successfully!`);
    }
}

function openOrderModal(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const imageHtml = item.image ? 
        `<img src="${item.image}" alt="${item.name}" class="menu-image" style="height: 150px; border-radius: 8px; margin-bottom: 15px;">` : 
        `<div class="no-image" style="height: 150px; border-radius: 8px; margin-bottom: 15px;">🍽️</div>`;
    
    document.getElementById('orderModalTitle').textContent = `Order ${item.name}`;
    document.getElementById('orderModalContent').innerHTML = `
        <div class="order-form">
            <div class="menu-item">
                ${imageHtml}
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <div class="menu-price">₹${item.price} per item</div>
            </div>
            
            <div class="quantity-selector">
                <button type="button" class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                <span class="quantity-display" id="quantity">1</span>
                <button type="button" class="quantity-btn" onclick="changeQuantity(1)">+</button>
            </div>
            
            <div class="total-price" id="totalPrice">Total: ₹${item.price}</div>
            
            <div class="form-actions">
                <button onclick="placeOrder(${item.id})" class="btn btn-primary">Place Order</button>
                <button onclick="closeOrderModal()" class="btn btn-secondary">Cancel</button>
            </div>
        </div>
    `;
    
    document.getElementById('orderModal').style.display = 'block';
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function changeQuantity(change) {
    const quantityElement = document.getElementById('quantity');
    const totalPriceElement = document.getElementById('totalPrice');
    let quantity = parseInt(quantityElement.textContent);
    
    quantity = Math.max(1, quantity + change);
    quantityElement.textContent = quantity;
    
    // Get item price from the modal
    const priceText = document.querySelector('.menu-price').textContent;
    const price = parseFloat(priceText.match(/₹(\d+)/)[1]);
    const total = price * quantity;
    
    totalPriceElement.textContent = `Total: ₹${total}`;
}

function placeOrder(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const quantity = parseInt(document.getElementById('quantity').textContent);
    const total = item.price * quantity;
    
    alert(`Order placed successfully!\n\nItem: ${item.name}\nQuantity: ${quantity}\nTotal: ₹${total}\n\nYour order will be ready in 15-20 minutes.`);
    closeOrderModal();
}

function filterMenu() {
    const category = document.getElementById('categoryFilter')?.value || '';
    const dateFilter = document.getElementById('dateFilter')?.value || '';
    const search = document.getElementById('searchFilter')?.value.toLowerCase() || '';
    
    let filteredItems = menuItems;
    
    if (category) {
        filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    if (dateFilter) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        filteredItems = filteredItems.filter(item => {
            if (dateFilter === 'today') {
                return item.date.toDateString() === today.toDateString();
            } else if (dateFilter === 'tomorrow') {
                return item.date.toDateString() === tomorrow.toDateString();
            }
            return true;
        });
    }
    
    if (search) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(search) ||
            (item.description && item.description.toLowerCase().includes(search))
        );
    }
    
    const container = document.getElementById('studentMenuList');
    if (container) {
        if (filteredItems.length === 0) {
            container.innerHTML = '<p>No menu items match your filters.</p>';
        } else {
            container.innerHTML = filteredItems.map(item => createStudentMenuCard(item)).join('');
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    if (event.target === orderModal) {
        closeOrderModal();
    }
}