// API Service for Lost & Found Application
class LostFoundAPI {
    constructor() {
        this.baseURL = window.location.origin + '/api/lost-found';
        this.isOnline = navigator.onLine;
        
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('🌐 Back online - syncing with server...');
            this.syncOfflineData();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('📱 Offline mode - using localStorage');
        });
    }

    // Check if server is reachable
    async checkServerHealth() {
        try {
            const response = await fetch('/api/health');
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Generic API request handler
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Get all items with filters
    async getItems(filters = {}) {
        try {
            // Try server first if online
            if (this.isOnline && await this.checkServerHealth()) {
                const queryParams = new URLSearchParams();
                
                Object.keys(filters).forEach(key => {
                    if (filters[key] && filters[key] !== '') {
                        queryParams.append(key, filters[key]);
                    }
                });

                const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : '';
                const response = await this.makeRequest(endpoint);
                
                // Cache the data locally
                this.cacheItems(response.data);
                
                return response.data;
            }
        } catch (error) {
            console.warn('Server request failed, falling back to localStorage:', error);
        }

        // Fallback to localStorage
        return this.getItemsFromLocalStorage(filters);
    }

    // Create new item
    async createItem(itemData) {
        const item = {
            ...itemData,
            id: itemData.id || this.generateId(itemData.status),
            timestamp: new Date().toISOString()
        };

        try {
            // Try server first if online
            if (this.isOnline && await this.checkServerHealth()) {
                const response = await this.makeRequest('', {
                    method: 'POST',
                    body: JSON.stringify(item)
                });
                
                // Also save to localStorage as backup
                this.saveItemToLocalStorage(response.data);
                
                return response.data;
            }
        } catch (error) {
            console.warn('Server request failed, saving to localStorage:', error);
        }

        // Fallback to localStorage
        this.saveItemToLocalStorage(item);
        
        // Mark for sync when online
        this.markForSync(item);
        
        return item;
    }

    // Update item
    async updateItem(id, updateData) {
        try {
            // Try server first if online
            if (this.isOnline && await this.checkServerHealth()) {
                const response = await this.makeRequest(`/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updateData)
                });
                
                // Update localStorage
                this.updateItemInLocalStorage(id, response.data);
                
                return response.data;
            }
        } catch (error) {
            console.warn('Server request failed, updating localStorage:', error);
        }

        // Fallback to localStorage
        const updatedItem = this.updateItemInLocalStorage(id, updateData);
        this.markForSync(updatedItem);
        
        return updatedItem;
    }

    // Delete item
    async deleteItem(id) {
        try {
            // Try server first if online
            if (this.isOnline && await this.checkServerHealth()) {
                await this.makeRequest(`/${id}`, {
                    method: 'DELETE'
                });
                
                // Remove from localStorage
                this.removeItemFromLocalStorage(id);
                
                return true;
            }
        } catch (error) {
            console.warn('Server request failed, removing from localStorage:', error);
        }

        // Fallback to localStorage
        this.removeItemFromLocalStorage(id);
        return true;
    }

    // Get statistics
    async getStats() {
        try {
            if (this.isOnline && await this.checkServerHealth()) {
                const response = await this.makeRequest('/stats/summary');
                return response.data;
            }
        } catch (error) {
            console.warn('Server stats request failed, calculating from localStorage:', error);
        }

        // Calculate from localStorage
        return this.calculateStatsFromLocalStorage();
    }

    // LocalStorage methods
    getItemsFromLocalStorage(filters = {}) {
        const items = JSON.parse(localStorage.getItem('lostFoundItems') || '[]');
        return this.applyFilters(items, filters);
    }

    saveItemToLocalStorage(item) {
        const items = JSON.parse(localStorage.getItem('lostFoundItems') || '[]');
        
        // Check if item already exists (update) or add new
        const existingIndex = items.findIndex(i => i.id === item.id || i._id === item._id);
        if (existingIndex >= 0) {
            items[existingIndex] = item;
        } else {
            items.push(item);
        }
        
        localStorage.setItem('lostFoundItems', JSON.stringify(items));
    }

    updateItemInLocalStorage(id, updateData) {
        const items = JSON.parse(localStorage.getItem('lostFoundItems') || '[]');
        const index = items.findIndex(item => item.id === id || item._id === id);
        
        if (index >= 0) {
            items[index] = { ...items[index], ...updateData };
            localStorage.setItem('lostFoundItems', JSON.stringify(items));
            return items[index];
        }
        
        return null;
    }

    removeItemFromLocalStorage(id) {
        const items = JSON.parse(localStorage.getItem('lostFoundItems') || '[]');
        const filteredItems = items.filter(item => item.id !== id && item._id !== id);
        localStorage.setItem('lostFoundItems', JSON.stringify(filteredItems));
    }

    cacheItems(items) {
        localStorage.setItem('lostFoundItems', JSON.stringify(items));
    }

    // Sync offline data when back online
    async syncOfflineData() {
        const pendingSync = JSON.parse(localStorage.getItem('pendingSyncItems') || '[]');
        
        if (pendingSync.length === 0) return;

        console.log(`🔄 Syncing ${pendingSync.length} offline items...`);

        for (const item of pendingSync) {
            try {
                await this.makeRequest('', {
                    method: 'POST',
                    body: JSON.stringify(item)
                });
                console.log(`✅ Synced item: ${item.itemName}`);
            } catch (error) {
                console.error(`❌ Failed to sync item: ${item.itemName}`, error);
            }
        }

        // Clear pending sync items
        localStorage.removeItem('pendingSyncItems');
        console.log('🎉 Offline sync completed');
    }

    markForSync(item) {
        const pendingSync = JSON.parse(localStorage.getItem('pendingSyncItems') || '[]');
        pendingSync.push(item);
        localStorage.setItem('pendingSyncItems', JSON.stringify(pendingSync));
    }

    // Utility methods
    generateId(status) {
        return `${status}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    applyFilters(items, filters) {
        return items.filter(item => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch = 
                    item.itemName.toLowerCase().includes(searchLower) ||
                    item.description.toLowerCase().includes(searchLower) ||
                    item.location.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }

            // Category filter
            if (filters.category && item.category !== filters.category) {
                return false;
            }

            // Status filter
            if (filters.status && item.status !== filters.status) {
                return false;
            }

            // Date range filter
            if (filters.dateRange) {
                const itemDate = new Date(item.date);
                const today = new Date();
                
                switch (filters.dateRange) {
                    case 'today':
                        if (itemDate.toDateString() !== today.toDateString()) return false;
                        break;
                    case 'week':
                        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                        if (itemDate < weekAgo) return false;
                        break;
                    case 'month':
                        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                        if (itemDate < monthAgo) return false;
                        break;
                }
            }

            return true;
        });
    }

    calculateStatsFromLocalStorage() {
        const items = JSON.parse(localStorage.getItem('lostFoundItems') || '[]');
        
        const stats = {
            totalItems: items.length,
            lostItems: items.filter(item => item.status === 'lost').length,
            foundItems: items.filter(item => item.status === 'found').length,
            resolvedItems: items.filter(item => item.isResolved).length,
            unresolvedItems: items.filter(item => !item.isResolved).length
        };

        const categoryBreakdown = {};
        items.forEach(item => {
            categoryBreakdown[item.category] = (categoryBreakdown[item.category] || 0) + 1;
        });

        return {
            summary: stats,
            categoryBreakdown: Object.entries(categoryBreakdown).map(([category, count]) => ({
                _id: category,
                count
            }))
        };
    }
}

// Create global API instance
window.lostFoundAPI = new LostFoundAPI();