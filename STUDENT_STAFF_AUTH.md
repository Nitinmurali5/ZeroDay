# Student & Staff Authentication System

## Overview
The authentication system has been configured to support **ONLY Student and Staff roles**. Admin and User roles have been removed as requested.

## Supported Roles
- ✅ **Student**: Campus students with personal dashboard access
- ✅ **Staff**: Faculty and staff members with enhanced dashboard features
- ❌ **Admin**: Removed (not available)
- ❌ **User**: Removed (not available)

## Database Schema
```javascript
{
  username: String (unique, required),
  password: String (hashed, required),
  fullName: String (required),
  role: String (enum: ['student', 'staff']), // Only these two roles
  email: String (optional),
  roomNumber: String (optional, for students),
  contactNumber: String (optional),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Test Accounts

### Student Accounts (4 users)
- **Username**: `john_student` | **Password**: `Student@123` | **Room**: A101
- **Username**: `jane_student` | **Password**: `Student@456` | **Room**: B205
- **Username**: `mike_student` | **Password**: `Student@789` | **Room**: C301
- **Username**: `sarah_student` | **Password**: `Student@321` | **Room**: D102

### Staff Accounts (3 users)
- **Username**: `prof_wilson` | **Password**: `Staff@789`
- **Username**: `dr_brown` | **Password**: `Staff@321`
- **Username**: `prof_davis` | **Password**: `Staff@456`

## Dashboard Features

### Student Dashboard
- View total number of students in the system
- Personal role information
- Account status display
- Access to student-specific features

### Staff Dashboard
- View total users (students + staff)
- View total students count
- View total staff members count
- Enhanced access level
- Staff-specific management tools

## How to Use

### 1. Access Login Page
Navigate to: `http://localhost:3000/log.html`

### 2. Role Selection
- Click on **Student** tab for student login
- Click on **Staff** tab for staff login
- No admin option available (removed)

### 3. Login Process
1. Select your role (Student or Staff)
2. Enter your username and password
3. Click "Sign In"
4. Access your role-specific dashboard

### 4. Registration Process
1. Click "Sign Up"
2. Fill in your details
3. Select role (Student or Staff only)
4. Ensure password meets requirements
5. Click "Sign Up"

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new student or staff
- `POST /api/auth/login` - Login for students and staff
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/dashboard-stats` - Get role-specific dashboard data
- `POST /api/auth/logout` - Logout user

### Role Validation
- Only `student` and `staff` roles are accepted
- Any attempt to register/login with other roles will be rejected
- Error message: "Invalid role specified. Only student and staff roles are allowed."

## Security Features
- Password hashing with bcryptjs (12 salt rounds)
- JWT token authentication (24-hour expiry)
- Role-based access control
- Unique username validation
- Strong password requirements

## Password Requirements
- ✅ Minimum 8 characters
- ✅ One uppercase letter (A-Z)
- ✅ One lowercase letter (a-z)
- ✅ One number (0-9)
- ✅ One special character (@$!%*?&)

## File Changes Made
1. **models/User.js** - Updated role enum to only include 'student' and 'staff'
2. **routes/auth.js** - Updated role validation and dashboard stats
3. **js/auth.js** - Removed admin references, updated dashboard display
4. **log.html** - Removed admin role buttons from both forms
5. **seedUsers.js** - Updated with student and staff users only

## Quick Test
1. **Student Login**: Use `john_student` / `Student@123`
2. **Staff Login**: Use `prof_wilson` / `Staff@789`
3. **Registration**: Create new accounts with Student or Staff roles only

## Success! 🎉
Your authentication system now supports **ONLY Student and Staff roles** as requested. The system maintains all security features while providing role-specific dashboards and access controls for these two user types.

## Server Status
- ✅ Server running on: `http://localhost:3000`
- ✅ Login page: `http://localhost:3000/log.html`
- ✅ Database: Connected to MongoDB
- ✅ Test users: 7 users created (4 students, 3 staff)