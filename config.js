// API Configuration
const API_CONFIG = {
    // Detect environment and set appropriate base URL
    BASE_URL: (() => {
        const hostname = window.location.hostname;
        
        // Local development
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:3001';
        }
        
        // Production - Replace with your actual backend URL
        // For now, return null to force localStorage usage
        return null; // Change this to your deployed backend URL
    })(),
    
    ENDPOINTS: {
        BUS_BOOKING: '/api/bus-booking',
        COMPLAINTS: '/api/complaints',
        LOST_FOUND: '/api/lost-found',
        AUTH: '/api/auth',
        SKILLS: '/api/skills',
        POLLS: '/api/polls',
        TICKETS: '/api/tickets'
    }
};

// Helper function to get full API URL
function getApiUrl(endpoint) {
    if (!API_CONFIG.BASE_URL) {
        console.warn('Backend URL not configured, API calls will fail and fallback to localStorage');
        return null;
    }
    return API_CONFIG.BASE_URL + endpoint;
}

// Helper function to check if API is available
function isApiAvailable() {
    return API_CONFIG.BASE_URL !== null;
}

// Export for use in other files
window.API_CONFIG = API_CONFIG;
window.getApiUrl = getApiUrl;
window.isApiAvailable = isApiAvailable;