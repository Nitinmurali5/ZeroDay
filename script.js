// Application state
let currentUser = null;
let currentCalendarDate = new Date(2025, 0, 1); // January 2025 (month is 0-indexed)
let selectedDate = null;
let announcements = [
    {
        id: 1,
        title: "Mid-Semester Examinations Schedule",
        content: "Mid-semester examinations will be conducted from March 15-22, 2024. Please check your individual timetables on the student portal.",
        category: "exams",
        priority: "high",
        date: new Date("2024-03-15"),
        scheduledDate: new Date("2024-03-15"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 2,
        title: "Annual Cultural Festival - Techfest 2024",
        content: "Join us for the biggest cultural event of the year! Techfest 2024 will be held from April 5-7, 2024. Registration is now open for all events.",
        category: "events",
        priority: "normal",
        date: new Date("2024-04-05"),
        scheduledDate: new Date("2024-04-05"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 3,
        title: "Gandhi Jayanti",
        content: "National holiday celebrating the birth anniversary of Mahatma Gandhi. Campus will be closed. Special programs will be organized to honor his legacy.",
        category: "holidays",
        priority: "normal",
        date: new Date("2024-10-02"),
        scheduledDate: new Date("2024-10-02"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 4,
        title: "Library Extended Hours During Exams",
        content: "The library will be open 24/7 during the examination period (March 15-22) to support student studies.",
        category: "academic",
        priority: "normal",
        date: new Date("2024-03-10"),
        scheduledDate: new Date("2024-03-10"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 5,
        title: "Diwali Celebration",
        content: "Join us for the campus Diwali celebration with cultural programs, traditional food, and fireworks display.",
        category: "events",
        priority: "normal",
        date: new Date("2024-11-01"),
        scheduledDate: new Date("2024-11-01"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 6,
        title: "Independence Day Celebration",
        content: "Flag hoisting ceremony followed by cultural programs and patriotic activities. All students and staff are invited.",
        category: "events",
        priority: "high",
        date: new Date("2024-08-15"),
        scheduledDate: new Date("2024-08-15"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 7,
        title: "Christmas Holiday",
        content: "Campus will be closed for Christmas celebration. Classes will resume after the holiday break.",
        category: "holidays",
        priority: "normal",
        date: new Date("2024-12-25"),
        scheduledDate: new Date("2024-12-25"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 8,
        title: "New Year Celebration",
        content: "Welcome the New Year with special events and celebrations on campus. Join us for music, dance, and festivities.",
        category: "events",
        priority: "normal",
        date: new Date("2025-01-01"),
        scheduledDate: new Date("2025-01-01"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 9,
        title: "Republic Day Parade",
        content: "Participate in the Republic Day parade and flag hoisting ceremony. Cultural programs will follow the main event.",
        category: "events",
        priority: "high",
        date: new Date("2024-01-26"),
        scheduledDate: new Date("2024-01-26"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 10,
        title: "Holi Festival",
        content: "Celebrate the festival of colors with traditional Holi celebrations on campus. Colors and refreshments will be provided.",
        category: "events",
        priority: "normal",
        date: new Date("2024-03-25"),
        scheduledDate: new Date("2024-03-25"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 11,
        title: "Final Semester Results",
        content: "Final semester examination results will be published today. Students can check their results on the student portal.",
        category: "academic",
        priority: "high",
        date: new Date("2024-10-15"),
        scheduledDate: new Date("2024-10-15"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 12,
        title: "Campus Maintenance Notice",
        content: "Scheduled maintenance of campus facilities including WiFi and power systems. Some services may be temporarily unavailable.",
        category: "general",
        priority: "normal",
        date: new Date("2024-10-20"),
        scheduledDate: new Date("2024-10-20"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 13,
        title: "Scholarship Application Deadline",
        content: "Last date to submit scholarship applications for the next academic year. Submit all required documents before 5 PM.",
        category: "academic",
        priority: "urgent",
        date: new Date("2024-10-25"),
        scheduledDate: new Date("2024-10-25"),
        showInCalendar: true,
        author: "admin"
    },
    // 2025 Events
    {
        id: 14,
        title: "Spring Semester Registration",
        content: "Registration opens for Spring 2025 semester. Students can register for courses through the online portal.",
        category: "academic",
        priority: "high",
        date: new Date("2025-01-15"),
        scheduledDate: new Date("2025-01-15"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 15,
        title: "Republic Day Celebration 2025",
        content: "Join us for the Republic Day celebration with flag hoisting, cultural programs, and patriotic activities.",
        category: "events",
        priority: "high",
        date: new Date("2025-01-26"),
        scheduledDate: new Date("2025-01-26"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 16,
        title: "Valentine's Day Special Event",
        content: "Celebrate love and friendship with special Valentine's Day activities, music, and refreshments on campus.",
        category: "events",
        priority: "normal",
        date: new Date("2025-02-14"),
        scheduledDate: new Date("2025-02-14"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 17,
        title: "Holi Festival 2025",
        content: "Celebrate the festival of colors with traditional Holi celebrations. Colors, music, and traditional sweets will be provided.",
        category: "events",
        priority: "normal",
        date: new Date("2025-03-14"),
        scheduledDate: new Date("2025-03-14"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 18,
        title: "Mid-Semester Exams Spring 2025",
        content: "Mid-semester examinations for Spring 2025 will be conducted. Check your exam schedule on the student portal.",
        category: "exams",
        priority: "high",
        date: new Date("2025-03-20"),
        scheduledDate: new Date("2025-03-20"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 19,
        title: "Annual Sports Day 2025",
        content: "Participate in various sports competitions and activities. Registration is open for all students and staff.",
        category: "events",
        priority: "normal",
        date: new Date("2025-04-10"),
        scheduledDate: new Date("2025-04-10"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 20,
        title: "Summer Internship Fair",
        content: "Meet with top companies and organizations for summer internship opportunities. Bring your resumes!",
        category: "academic",
        priority: "high",
        date: new Date("2025-04-25"),
        scheduledDate: new Date("2025-04-25"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 21,
        title: "Mother's Day Celebration",
        content: "Special event to honor mothers with cultural programs, gifts, and appreciation activities.",
        category: "events",
        priority: "normal",
        date: new Date("2025-05-11"),
        scheduledDate: new Date("2025-05-11"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 22,
        title: "Final Semester Exams",
        content: "Final semester examinations for Spring 2025. Exam schedules will be published two weeks prior.",
        category: "exams",
        priority: "urgent",
        date: new Date("2025-05-20"),
        scheduledDate: new Date("2025-05-20"),
        showInCalendar: true,
        author: "admin"
    },
    {
        id: 23,
        title: "Graduation Ceremony 2025",
        content: "Congratulations to all graduates! Join us for the commencement ceremony and celebration.",
        category: "events",
        priority: "high",
        date: new Date("2025-06-15"),
        scheduledDate: new Date("2025-06-15"),
        showInCalendar: true,
        author: "admin"
    }
];

// User credentials
const users = {
    "kabil": { password: "ka1234", role: "student", name: "Kabil" },
    "admin": { password: "ad1234", role: "admin", name: "Administrator" }
};

// DOM elements
const loginSection = document.getElementById('loginSection');
const adminDashboard = document.getElementById('adminDashboard');
const studentDashboard = document.getElementById('studentDashboard');
const loginForm = document.getElementById('loginForm');
const announcementForm = document.getElementById('announcementForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupLoginFeatures();
    showLoginSection();
});

function setupLoginFeatures() {
    // Password toggle functionality
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggle.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                passwordToggle.textContent = '👁️';
            }
        });
    }

    // Forgot password functionality
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Password reset functionality would be implemented here.\n\nFor demo purposes:\n- Any username (3-20 chars)\n- Any password (6+ chars)');
        });
    }

    // Load remembered credentials
    loadRememberedCredentials();
}

function loadRememberedCredentials() {
    if (localStorage.getItem('rememberMe') === 'true') {
        document.getElementById('username').value = localStorage.getItem('rememberedUsername') || '';
        document.getElementById('userRole').value = localStorage.getItem('rememberedRole') || '';
        document.getElementById('rememberMe').checked = true;
    }
}

function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout buttons
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('studentLogoutBtn').addEventListener('click', logout);
    
    // Admin announcement form
    announcementForm.addEventListener('submit', handleAnnouncementSubmission);
    
    // Student filters
    document.getElementById('categoryFilter').addEventListener('change', filterAnnouncements);
    document.getElementById('monthFilter').addEventListener('change', filterAnnouncements);
    document.getElementById('sortBy').addEventListener('change', filterAnnouncements);
    
    // View toggle buttons
    document.getElementById('listViewBtn').addEventListener('click', () => switchView('list'));
    document.getElementById('calendarViewBtn').addEventListener('click', () => switchView('calendar'));
    
    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', () => navigateMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => navigateMonth(1));
    
    // Calendar category filter
    document.getElementById('calendarCategoryFilter').addEventListener('change', renderCalendar);
}

function handleLogin(e) {
    e.preventDefault();
    
    const selectedRole = document.getElementById('userRole').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const loginButton = document.getElementById('loginButton');

    // Show loading state
    loginButton.disabled = true;
    document.querySelector('.login-text').style.display = 'none';
    document.querySelector('.login-spinner').style.display = 'inline';
    
    // Validate that role is selected
    if (!selectedRole) {
        showLoginError('Please select your role (Student or Administrator)');
        return;
    }
    
    // Check if user exists and password is correct
    if (!users[username] || users[username].password !== password) {
        showLoginError('Invalid username or password!');
        return;
    }
    
    // Check if selected role matches user's actual role
    if (users[username].role !== selectedRole) {
        showLoginError(`Invalid role selection. This account is registered as ${users[username].role === 'admin' ? 'Administrator' : 'Student'}.`);
        return;
    }
    
    // Simulate login process
    setTimeout(() => {
        // Handle remember me
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('rememberedUsername', username);
            localStorage.setItem('rememberedRole', selectedRole);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('rememberedUsername');
            localStorage.removeItem('rememberedRole');
        }

        // Successful login
        currentUser = {
            username: username,
            role: users[username].role,
            name: users[username].name
        };
        
        // Reset loading state
        loginButton.disabled = false;
        document.querySelector('.login-text').style.display = 'inline';
        document.querySelector('.login-spinner').style.display = 'none';
        
        // Show success message briefly before redirecting
        showLoginSuccess(`Welcome ${currentUser.name}!`);
        
        setTimeout(() => {
            if (currentUser.role === 'admin') {
                showAdminDashboard();
            } else {
                showStudentDashboard();
            }
            
            // Clear login form
            loginForm.reset();
            clearLoginMessages();
        }, 1000);
    }, 1500);
}

function logout() {
    currentUser = null;
    selectedDate = null;
    currentCalendarDate = new Date();
    showLoginSection();
    
    // Reset login button state
    const loginButton = document.getElementById('loginButton');
    loginButton.disabled = false;
    document.querySelector('.login-text').style.display = 'inline';
    document.querySelector('.login-spinner').style.display = 'none';
    
    // Load remembered credentials again
    loadRememberedCredentials();
}

function showLoginError(message) {
    clearLoginMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'login-message error-message';
    errorDiv.innerHTML = `<i>⚠️</i> ${message}`;
    
    const form = document.getElementById('loginForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function showLoginSuccess(message) {
    clearLoginMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'login-message success-message';
    successDiv.innerHTML = `<i>✅</i> ${message}`;
    
    const form = document.getElementById('loginForm');
    form.insertBefore(successDiv, form.firstChild);
}

function clearLoginMessages() {
    const existingMessages = document.querySelectorAll('.login-message');
    existingMessages.forEach(msg => msg.remove());
}

function showLoginSection() {
    loginSection.style.display = 'block';
    adminDashboard.style.display = 'none';
    studentDashboard.style.display = 'none';
}

function showAdminDashboard() {
    loginSection.style.display = 'none';
    adminDashboard.style.display = 'block';
    studentDashboard.style.display = 'none';
    
    // Set default date to current date or January 1, 2025 if current date is before 2025
    const today = new Date();
    const defaultDate = today.getFullYear() >= 2025 ? today : new Date(2025, 0, 1);
    document.getElementById('scheduledDate').value = defaultDate.toISOString().split('T')[0];
    
    loadAdminAnnouncements();
}

function showStudentDashboard() {
    loginSection.style.display = 'none';
    adminDashboard.style.display = 'none';
    studentDashboard.style.display = 'block';
    
    document.getElementById('studentName').textContent = currentUser.name;
    loadStudentAnnouncements();
    
    // Initialize calendar view to ensure all events are loaded
    console.log('Initializing student dashboard with calendar...');
    console.log(`Total events available: ${announcements.length}`);
    
    // Set default view to list, but prepare calendar
    switchView('list');
}

function handleAnnouncementSubmission(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;
    const priority = document.getElementById('priority').value;
    const scheduledDate = document.getElementById('scheduledDate').value;
    const showInCalendar = document.getElementById('showInCalendar').checked;
    
    // Validate scheduled date
    if (!scheduledDate) {
        alert('Please select a scheduled date for the announcement.');
        return;
    }
    
    const selectedDate = new Date(scheduledDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison
    
    if (selectedDate < today) {
        if (!confirm('The selected date is in the past. Do you want to continue?')) {
            return;
        }
    }
    
    const newAnnouncement = {
        id: Date.now(),
        title: title,
        content: content,
        category: category,
        priority: priority,
        date: new Date(), // Creation date
        scheduledDate: selectedDate, // When it should appear
        showInCalendar: showInCalendar,
        author: currentUser.username
    };
    
    announcements.unshift(newAnnouncement);
    
    // Show success message
    const dateStr = selectedDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    showSuccessMessage(`Announcement scheduled for ${dateStr} and posted successfully!`);
    
    // Reset form
    announcementForm.reset();
    
    // Reset checkbox to checked (default state)
    document.getElementById('showInCalendar').checked = true;
    
    // Reload announcements
    loadAdminAnnouncements();
}

function showSuccessMessage(message) {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.post-announcement');
    form.insertBefore(successDiv, form.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function loadAdminAnnouncements() {
    const container = document.getElementById('adminAnnouncementsList');
    
    if (announcements.length === 0) {
        container.innerHTML = '<div class="empty-state"><h4>No announcements yet</h4><p>Create your first announcement using the form above.</p></div>';
        return;
    }
    
    const sortedAnnouncements = [...announcements].sort((a, b) => b.date - a.date);
    
    container.innerHTML = sortedAnnouncements.map(announcement => {
        const scheduledDate = announcement.scheduledDate || announcement.date;
        const calendarStatus = announcement.showInCalendar ? 
            '<span class="calendar-status enabled">📅 Visible in Calendar</span>' : 
            '<span class="calendar-status disabled">📅 Hidden from Calendar</span>';
        
        return `
        <div class="announcement-card priority-${announcement.priority}">
            <div class="announcement-header">
                <h4 class="announcement-title">${announcement.title}</h4>
                <div class="announcement-meta">
                    <span class="category-badge category-${announcement.category}">${announcement.category}</span>
                    <span class="priority-badge priority-${announcement.priority}">${announcement.priority}</span>
                    <div class="announcement-date">Created: ${formatDate(announcement.date)}</div>
                    <div class="announcement-scheduled">Scheduled: ${formatDate(scheduledDate)}</div>
                </div>
            </div>
            <div class="announcement-content">${announcement.content}</div>
            <div class="announcement-status">
                ${calendarStatus}
            </div>
            <div class="admin-actions">
                <button class="edit-btn" onclick="editAnnouncement(${announcement.id})">Edit</button>
                <button class="delete-btn" onclick="deleteAnnouncement(${announcement.id})">Delete</button>
            </div>
        </div>
    `;
    }).join('');
}

function loadStudentAnnouncements() {
    filterAnnouncements();
}

function filterAnnouncements() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const monthFilter = document.getElementById('monthFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    const container = document.getElementById('studentAnnouncementsList');
    
    let filteredAnnouncements = [...announcements];
    
    // Filter by category
    if (categoryFilter) {
        filteredAnnouncements = filteredAnnouncements.filter(a => a.category === categoryFilter);
    }
    
    // Filter by month
    if (monthFilter !== '') {
        const selectedMonth = parseInt(monthFilter);
        filteredAnnouncements = filteredAnnouncements.filter(a => a.date.getMonth() === selectedMonth);
    }
    
    // Sort announcements
    switch (sortBy) {
        case 'date-desc':
            filteredAnnouncements.sort((a, b) => b.date - a.date);
            break;
        case 'date-asc':
            filteredAnnouncements.sort((a, b) => a.date - b.date);
            break;
        case 'priority':
            const priorityOrder = { 'urgent': 3, 'high': 2, 'normal': 1 };
            filteredAnnouncements.sort((a, b) => {
                const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
                return priorityDiff !== 0 ? priorityDiff : b.date - a.date;
            });
            break;
    }
    
    if (filteredAnnouncements.length === 0) {
        container.innerHTML = '<div class="empty-state"><h4>No announcements found</h4><p>Try adjusting your filters or check back later.</p></div>';
        return;
    }
    
    container.innerHTML = filteredAnnouncements.map(announcement => `
        <div class="announcement-card priority-${announcement.priority}">
            <div class="announcement-header">
                <h4 class="announcement-title">${announcement.title}</h4>
                <div class="announcement-meta">
                    <span class="category-badge category-${announcement.category}">${announcement.category}</span>
                    <span class="priority-badge priority-${announcement.priority}">${announcement.priority}</span>
                    <div class="announcement-date">${formatDate(announcement.date)}</div>
                </div>
            </div>
            <div class="announcement-content">${announcement.content}</div>
        </div>
    `).join('');
}

function editAnnouncement(id) {
    const announcement = announcements.find(a => a.id === id);
    if (!announcement) return;
    
    // Fill the form with existing data
    document.getElementById('title').value = announcement.title;
    document.getElementById('category').value = announcement.category;
    document.getElementById('content').value = announcement.content;
    document.getElementById('priority').value = announcement.priority;
    
    // Set scheduled date
    const scheduledDate = announcement.scheduledDate || announcement.date;
    const dateString = scheduledDate.toISOString().split('T')[0];
    document.getElementById('scheduledDate').value = dateString;
    
    // Set calendar visibility
    document.getElementById('showInCalendar').checked = announcement.showInCalendar !== false;
    
    // Remove the old announcement
    deleteAnnouncement(id);
    
    // Scroll to form
    document.querySelector('.post-announcement').scrollIntoView({ behavior: 'smooth' });
}

function deleteAnnouncement(id) {
    if (confirm('Are you sure you want to delete this announcement?')) {
        announcements = announcements.filter(a => a.id !== id);
        loadAdminAnnouncements();
    }
}

function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// View switching functionality
function switchView(viewType) {
    const listView = document.getElementById('listView');
    const calendarView = document.getElementById('calendarView');
    const listBtn = document.getElementById('listViewBtn');
    const calendarBtn = document.getElementById('calendarViewBtn');
    
    if (viewType === 'list') {
        listView.style.display = 'block';
        calendarView.style.display = 'none';
        listBtn.classList.add('active');
        calendarBtn.classList.remove('active');
        filterAnnouncements();
    } else {
        listView.style.display = 'none';
        calendarView.style.display = 'block';
        listBtn.classList.remove('active');
        calendarBtn.classList.add('active');
        
        // Ensure calendar is properly initialized and shows all events
        console.log(`Total announcements: ${announcements.length}`);
        console.log('Rendering calendar with all events...');
        renderCalendar();
        
        // Show events for current date if no date is selected
        if (!selectedDate) {
            const today = new Date();
            showEventsForDate(today);
        }
    }
}

// Calendar functionality
function navigateMonth(direction) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
    renderCalendar();
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    const categoryFilter = document.getElementById('calendarCategoryFilter').value;
    
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    currentMonthElement.textContent = new Intl.DateTimeFormat('en-US', { 
        month: 'long', 
        year: 'numeric' 
    }).format(currentCalendarDate);
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Get previous month's last days
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    let calendarHTML = '';
    
    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        calendarHTML += `<div class="calendar-day-header">${day}</div>`;
    });
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        calendarHTML += `<div class="calendar-day other-month">
            <div class="day-number">${day}</div>
        </div>`;
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const today = new Date();
        const isToday = currentDate.toDateString() === today.toDateString();
        const isSelected = selectedDate && currentDate.toDateString() === selectedDate.toDateString();
        
        // Get events for this day
        const dayEvents = getEventsForDate(currentDate, categoryFilter);
        const eventIndicators = dayEvents.map(event => 
            `<span class="event-indicator ${event.category}"></span>`
        ).join('');
        
        // Get event titles for display in calendar cell
        const eventTitles = dayEvents.slice(0, 2).map(event => {
            const shortTitle = event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title;
            return `<div class="calendar-event-title-small ${event.category}">${shortTitle}</div>`;
        }).join('');
        
        const moreEventsText = dayEvents.length > 2 ? `<div class="more-events">+${dayEvents.length - 2} more</div>` : '';
        
        let dayClass = 'calendar-day';
        if (isToday) dayClass += ' today';
        if (isSelected) dayClass += ' selected';
        if (dayEvents.length > 0) dayClass += ' has-events';
        
        calendarHTML += `<div class="${dayClass}" onclick="selectDate(new Date(${year}, ${month}, ${day}))">
            <div class="day-number">${day}</div>
            <div class="event-indicators">${eventIndicators}</div>
            <div class="calendar-events-preview">
                ${eventTitles}
                ${moreEventsText}
            </div>
        </div>`;
    }
    
    // Next month's leading days
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (startingDayOfWeek + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        calendarHTML += `<div class="calendar-day other-month">
            <div class="day-number">${day}</div>
        </div>`;
    }
    
    calendar.innerHTML = calendarHTML;
    
    // Show events for selected date or today
    if (selectedDate) {
        showEventsForDate(selectedDate);
    } else {
        showEventsForDate(new Date());
    }
}

function selectDate(date) {
    selectedDate = date;
    renderCalendar();
    showEventsForDate(date);
}

function getEventsForDate(date, categoryFilter = '') {
    const filteredEvents = announcements.filter(announcement => {
        // Use scheduledDate for calendar display if available, otherwise use date
        const displayDate = announcement.scheduledDate || announcement.date;
        const announcementDate = new Date(displayDate);
        const sameDate = announcementDate.toDateString() === date.toDateString();
        const categoryMatch = !categoryFilter || announcement.category === categoryFilter;
        // Show all announcements in calendar by default (showInCalendar defaults to true)
        const shouldShowInCalendar = announcement.showInCalendar !== false;
        
        // Debug: Log events for specific dates
        if (sameDate && shouldShowInCalendar) {
            console.log(`Event found for ${date.toDateString()}: ${announcement.title}`);
        }
        
        return sameDate && categoryMatch && shouldShowInCalendar;
    });
    
    return filteredEvents;
}

function showEventsForDate(date) {
    const container = document.getElementById('selectedDateEvents');
    const categoryFilter = document.getElementById('calendarCategoryFilter').value;
    const events = getEventsForDate(date, categoryFilter);
    
    const dateString = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    if (events.length === 0) {
        container.innerHTML = `
            <h4>📅 Announcements for ${dateString}</h4>
            <div class="empty-state">
                <p>No announcements scheduled for this date.</p>
                <small>Check other dates or adjust category filters to see more announcements.</small>
            </div>
        `;
        return;
    }
    
    // Sort events by priority (urgent > high > normal)
    const priorityOrder = { 'urgent': 3, 'high': 2, 'normal': 1 };
    const sortedEvents = events.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    
    const eventsHTML = sortedEvents.map(event => `
        <div class="calendar-event-item priority-${event.priority}">
            <div class="calendar-event-title">${event.title}</div>
            <div class="calendar-event-content">${event.content}</div>
            <div class="calendar-event-meta">
                <span class="category-badge category-${event.category}">${event.category}</span>
                <span class="priority-badge priority-${event.priority}">${event.priority}</span>
                <span class="event-author">By: ${event.author}</span>
            </div>
        </div>
    `).join('');
    
    const eventCount = events.length;
    const eventText = eventCount === 1 ? 'announcement' : 'announcements';
    
    container.innerHTML = `
        <h4>📅 ${eventCount} ${eventText} for ${dateString}</h4>
        ${eventsHTML}
    `;
}

// Add some sample data on load for demonstration
function addSampleData() {
    // This function can be called to add more sample announcements
    const sampleAnnouncements = [
        {
            id: Date.now() + 1,
            title: "New Course Registration Opens",
            content: "Registration for summer courses will begin on April 15, 2024. Students can register through the online portal.",
            category: "academic",
            priority: "normal",
            date: new Date(),
            author: "admin"
        }
    ];
    
    announcements.push(...sampleAnnouncements);
}

// Enhanced Form Validation
function setupFormValidation() {
    // Username validation
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', (e) => {
            // Remove invalid characters
            e.target.value = e.target.value.replace(/[^A-Za-z0-9_]/g, '');
            validateUsername(e.target);
        });
    }

    // Password validation
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            validatePassword(e.target);
        });
    }
}

function validateUsername(input) {
    const value = input.value;
    const isValid = /^[A-Za-z0-9_]{3,20}$/.test(value);
    
    if (value.length === 0) {
        setInputValidation(input, null, '');
    } else if (value.length < 3) {
        setInputValidation(input, false, `Enter ${3 - value.length} more characters`);
    } else if (isValid) {
        setInputValidation(input, true, 'Valid username');
    } else {
        setInputValidation(input, false, 'Invalid username format');
    }
}

function validatePassword(input) {
    const value = input.value;
    
    if (value.length === 0) {
        setInputValidation(input, null, '');
    } else if (value.length < 6) {
        setInputValidation(input, false, `Enter ${6 - value.length} more characters`);
    } else {
        setInputValidation(input, true, 'Valid password');
    }
}

function setInputValidation(input, isValid, message) {
    // Remove existing validation message
    const existingMsg = input.parentNode.querySelector('.validation-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    if (message) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `validation-message ${isValid === true ? 'valid' : isValid === false ? 'invalid' : 'neutral'}`;
        msgDiv.textContent = message;
        msgDiv.style.fontSize = '0.75rem';
        msgDiv.style.marginTop = '2px';
        msgDiv.style.color = isValid === true ? '#28a745' : isValid === false ? '#dc3545' : '#666';
        
        input.parentNode.appendChild(msgDiv);
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const userRole = document.getElementById('userRole').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Validation
    if (!userRole) {
        showMessage('Please select your role.', 'error');
        return;
    }

    if (!username) {
        showMessage('Please enter your username.', 'error');
        return;
    }

    if (username.length < 3 || username.length > 20) {
        showMessage('Username must be between 3-20 characters.', 'error');
        return;
    }

    if (!/^[A-Za-z0-9_]+$/.test(username)) {
        showMessage('Username can only contain letters, numbers, and underscores.', 'error');
        return;
    }

    if (!password) {
        showMessage('Please enter your password.', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long.', 'error');
        return;
    }

    // Simple authentication (in real app, this would be server-side)
    currentUser = {
        username: username,
        role: userRole,
        loginTime: new Date()
    };

    if (userRole === 'admin') {
        showAdminDashboard();
    } else {
        showStudentDashboard();
    }
    
    showMessage(`Welcome ${username}! You have successfully logged in.`, 'success');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.padding = '15px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.marginBottom = '20px';
    messageDiv.style.fontWeight = 'bold';

    if (type === 'success') {
        messageDiv.style.background = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        messageDiv.style.background = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }

    // Insert at the top of the active section
    const activeSection = document.querySelector('.dashboard[style*="block"]') || document.querySelector('.login-section');
    if (activeSection) {
        activeSection.insertBefore(messageDiv, activeSection.firstChild);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    
    // Bind login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Bind logout buttons
    const logoutBtn = document.getElementById('logoutBtn');
    const studentLogoutBtn = document.getElementById('studentLogoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    if (studentLogoutBtn) {
        studentLogoutBtn.addEventListener('click', logout);
    }
});

function logout() {
    currentUser = null;
    showLoginSection();
    document.getElementById('loginForm').reset();
    
    // Clear validation messages
    const validationMsgs = document.querySelectorAll('.validation-message');
    validationMsgs.forEach(msg => msg.remove());
}

function showLoginSection() {
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('studentDashboard').style.display = 'none';
}