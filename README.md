# ZeroDay
# 🎓 Eshwarites Management System

A comprehensive web-based Eshwarites management system with multiple interconnected modules for student and administrative use.

## 🌟 Features

### 📢 Eshwarites Announcements Feed (`index.html`)
- **Student Features:**
  - View Eshwarites announcements with filtering options
  - Calendar view for events and important dates
  - Category-based filtering (events, exams, holidays, academic, general)
  - Priority-based sorting and display

- **Admin Features:**
  - Post new announcements with scheduling
  - Manage existing announcements
  - Set priority levels and categories
  - Calendar integration for events

### 🏠 Hostel Complaint Registration (`complaints.html`)
- **Student Features:**
  - Submit complaints for water, electricity, cleaning, maintenance, security issues
  - Track complaint status (pending, in-progress, resolved)
  - View complaint history with filtering and sorting
  - Real-time status updates and admin comments

- **Admin Features:**
  - View all complaints with comprehensive filtering
  - Update complaint status with comments
  - Statistics dashboard showing pending/resolved counts
  - Communication system with students

### 🏠 Home Portal (`home.html`)
- Central navigation hub for all Eshwarites services
- Quick access to all available modules
- System status indicators
- Recent activity overview
- Welcome interface for new users

## 🔧 Technical Features

### Enhanced Form Validation
- **Real-time validation** with visual feedback
- **Phone number validation** (exactly 10 digits)
- **Username validation** (3-20 characters, alphanumeric + underscore)
- **Password validation** (minimum 6 characters)
- **Character counters** for text fields
- **Input sanitization** and format enforcement

### Navigation System
- **Consistent navigation** across all pages
- **Active page highlighting**
- **Responsive design** for mobile devices
- **Breadcrumb navigation** where applicable

### Data Persistence
- **Local storage** for data persistence
- **Cross-page data sharing**
- **Session management**
- **Data validation** and error handling

## 📁 File Structure

```
ZeroDay/
├── home.html              # Main landing page
├── index.html             # Eshwarites Announcements Feed
├── complaints.html        # Hostel Complaint Registration
├── styles.css             # Main stylesheet
├── complaints.css         # Complaint-specific styles
├── navigation.css         # Navigation and common UI styles
├── script.js              # Announcements functionality
├── complaints.js          # Complaints functionality
├── home.js                # Home page functionality
└── README.md              # This documentation
```

## 🚀 Getting Started

1. **Open the system:**
   - Start with `home.html` for the main portal
   - Or directly access specific modules:
     - `index.html` for announcements
     - `complaints.html` for hostel complaints

2. **Login credentials:**
   - **Students:** Any username (3-20 chars) + password (6+ chars)
   - **Admins:** Any username (3-20 chars) + password (6+ chars)
   - Select appropriate role during login

3. **Navigation:**
   - Use the navigation bar to switch between modules
   - All data is preserved across sessions using localStorage

## 🎯 User Roles

### 👨‍🎓 Students
- View announcements and events
- Submit and track hostel complaints
- Filter and sort content
- Access calendar views

### 👨‍💼 Administrators
- Manage announcements and events
- Handle complaint resolution
- Update system content
- Monitor system statistics

## 🔒 Validation Rules

### Login Fields
- **Username:** 3-20 characters (letters, numbers, underscore only)
- **Password:** Minimum 6 characters

### Complaint Form
- **Title:** 5-100 characters
- **Description:** 10-500 characters
- **Room Number:** Letters, numbers, hyphens (max 10 chars)
- **Phone:** Exactly 10 digits
- **Category:** Required selection
- **Priority:** Required selection

### Announcement Form
- **Title:** Required, reasonable length
- **Content:** Required, detailed description
- **Category:** Required selection
- **Date:** Valid future date
- **Priority:** Optional selection

## 🎨 Design Features

- **Responsive design** for all screen sizes
- **Modern UI** with gradient backgrounds
- **Smooth animations** and transitions
- **Color-coded status indicators**
- **Professional form styling**
- **Accessible navigation**

## 🔄 Data Flow

1. **User Authentication:** Login validation across all modules
2. **Data Storage:** localStorage for persistence
3. **Cross-Module Communication:** Shared data structures
4. **Real-time Updates:** Dynamic content updates
5. **Status Tracking:** Complaint and announcement status management

## 🌐 Browser Compatibility

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile responsive** design
- **JavaScript enabled** required
- **localStorage support** required

## 🚧 Future Enhancements

- Academic Portal integration
- Library Management System
- Fee Management module
- Transport Service booking
- Real-time notifications
- Email integration
- Mobile app version

## 📞 Support

For technical support or feature requests, contact the development team through the Eshwarites IT department.

---

**Version:** 1.0  
**Last Updated:** 2024  
**Developed for:** Eshwarites Management System
