// Lost & Found API Client
class LostFoundAPI {
    constructor() {
        this.baseURL = '/api/lost-found';
    }

    // Handle API responses
    async handleResponse(response) {
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    }

    // Get all lost & found items with optional filters
    async getItems(filters = {}) {
        try {
            const queryParams = new URLSearchParams();
            
            Object.keys(filters).forEach(key => {
                if (filters[key]) {
                    queryParams.append(key, filters[key]);
                }
            });

            const url = queryParams.toString() ? 
                `${this.baseURL}?${queryParams.toString()}` : 
                this.baseURL;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    }

    // Create new lost/found item
    async createItem(itemData) {
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData)
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    }

    // Get specific item by ID
    async getItem(itemId) {
        try {
            const response = await fetch(`${this.baseURL}/${itemId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error fetching item:', error);
            throw error;
        }
    }

    // Update item (mark as resolved, etc.)
    async updateItem(itemId, updateData) {
        try {
            const response = await fetch(`${this.baseURL}/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    }

    // Delete item
    async deleteItem(itemId) {
        try {
            const response = await fetch(`${this.baseURL}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    }

    // Get statistics
    async getStats() {
        try {
            const response = await fetch(`${this.baseURL}/stats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    }

    // Utility method to format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Utility method to format relative time
    formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            return 'Today';
        } else if (diffDays === 2) {
            return 'Yesterday';
        } else if (diffDays <= 7) {
            return `${diffDays - 1} days ago`;
        } else {
            return this.formatDate(dateString);
        }
    }

    // Utility method to get status badge HTML
    getStatusBadge(status) {
        const colors = {
            lost: '#dc3545',
            found: '#28a745'
        };
        
        return `<span class="status-badge" style="background-color: ${colors[status] || '#6c757d'}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase;">${status}</span>`;
    }

    // Utility method to get category icon
    getCategoryIcon(category) {
        const icons = {
            electronics: '📱',
            clothing: '👕',
            accessories: '👜',
            books: '📚',
            keys: '🔑',
            documents: '📄',
            sports: '⚽',
            other: '📦'
        };
        
        return icons[category] || '📦';
    }

    // Utility method to show loading state
    showLoading(element, show = true) {
        if (show) {
            element.innerHTML = '<div class="loading-spinner" style="text-align: center; padding: 40px; color: #666;">⏳ Loading...</div>';
        }
    }

    // Utility method to show error state
    showError(element, message) {
        element.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 20px; color: #dc3545; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px 0;">
                ❌ ${message}
            </div>
        `;
    }

    // Utility method to show empty state
    showEmpty(element, message = 'No items found') {
        element.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 40px; color: #666; font-style: italic; background: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                📭 ${message}
            </div>
        `;
    }

    // Utility method to show success message
    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.api-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = `api-message api-message-${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            max-width: 400px;
            word-wrap: break-word;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        messageDiv.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(messageDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Export for use in other files
window.LostFoundAPI = LostFoundAPI;