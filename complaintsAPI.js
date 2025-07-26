// Complaints API Client
class ComplaintsAPI {
    constructor() {
        this.baseURL = '/api/complaints';
        this.currentUser = null;
    }

    // Set current user for authentication headers
    setCurrentUser(user) {
        this.currentUser = user;
    }

    // Get authentication headers
    getAuthHeaders() {
        if (!this.currentUser) {
            throw new Error('User not authenticated');
        }
        
        return {
            'Content-Type': 'application/json',
            'username': this.currentUser.username,
            'role': this.currentUser.role
        };
    }

    // Handle API responses
    async handleResponse(response) {
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    }

    // Login user
    async login(username, password, role) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, role })
            });

            const result = await this.handleResponse(response);
            
            if (result.success) {
                this.setCurrentUser(result.data);
            }
            
            return result;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Get all complaints (filtered based on user role)
    async getComplaints(filters = {}) {
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
                headers: this.getAuthHeaders()
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error fetching complaints:', error);
            throw error;
        }
    }

    // Get complaint statistics (admin only)
    async getComplaintStats() {
        try {
            const response = await fetch(`${this.baseURL}/stats`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    }

    // Create new complaint (student only)
    async createComplaint(complaintData) {
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(complaintData)
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error creating complaint:', error);
            throw error;
        }
    }

    // Get specific complaint
    async getComplaint(complaintId) {
        try {
            const response = await fetch(`${this.baseURL}/${complaintId}`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error fetching complaint:', error);
            throw error;
        }
    }

    // Update complaint (admin only)
    async updateComplaint(complaintId, updateData) {
        try {
            const response = await fetch(`${this.baseURL}/${complaintId}`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(updateData)
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error updating complaint:', error);
            throw error;
        }
    }

    // Delete complaint (admin only)
    async deleteComplaint(complaintId) {
        try {
            const response = await fetch(`${this.baseURL}/${complaintId}`, {
                method: 'DELETE',
                headers: this.getAuthHeaders()
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Error deleting complaint:', error);
            throw error;
        }
    }

    // Utility method to show loading state
    showLoading(element, show = true) {
        if (show) {
            element.innerHTML = '<div class="loading-spinner">⏳ Loading...</div>';
        }
    }

    // Utility method to format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Utility method to get priority badge HTML
    getPriorityBadge(priority) {
        const colors = {
            low: '#28a745',
            medium: '#ffc107',
            high: '#fd7e14',
            urgent: '#dc3545'
        };
        
        return `<span class="priority-badge" style="background-color: ${colors[priority] || '#6c757d'}">${priority.toUpperCase()}</span>`;
    }

    // Utility method to get status badge HTML
    getStatusBadge(status) {
        const colors = {
            pending: '#ffc107',
            'in-progress': '#17a2b8',
            resolved: '#28a745'
        };
        
        const displayText = status.replace('-', ' ').toUpperCase();
        return `<span class="status-badge" style="background-color: ${colors[status] || '#6c757d'}">${displayText}</span>`;
    }
}

// Export for use in other files
window.ComplaintsAPI = ComplaintsAPI;