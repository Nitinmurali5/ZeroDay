# Authentication System Documentation

## Overview
The authentication system has been successfully integrated with your log.html page and MongoDB database. It provides secure user registration, login, and role-based access control for students, staff, and administrators.

## Features
- ✅ **Secure Password Hashing**: Uses bcryptjs with salt rounds of 12
- ✅ **JWT Token Authentication**: Secure token-based authentication
- ✅ **Role-Based Access Control**: Support for student, staff, and admin roles
- ✅ **Password Validation**: Enforces strong password requirements
- ✅ **Unique User Management**: Prevents duplicate usernames
- ✅ **Real-time Dashboard**: Dynamic dashboard based on user role
- ✅ **MongoDB Integration**: Persistent user data storage

## Database Collections

### Users Collection
The system creates a `users` collection in MongoDB with the following schema:

```javascript
{
  username: String (unique, required),
  password: String (hashed, required),
  fullName: String (required),
  role: String (enum: ['student', 'staff', 'admin']),
  email: String (optional),
  roomNumber: String (optional, for students),
  contactNumber: String (optional),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
Register a new user
```json
{
  "fullName": "John Doe",
  "username": "john_student",
  "password": "Student@123",
  "role": "student"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "username": "john_student",
  "password": "Student@123",
  "role": "student"
}
```

#### GET `/api/auth/profile`
Get user profile (requires authentication)
- Headers: `Authorization: Bearer <token>`

#### GET `/api/auth/dashboard-stats`
Get dashboard statistics (requires authentication)
- Headers: `Authorization: Bearer <token>`

#### POST `/api/auth/logout`
Logout user (client-side token removal)

## Password Requirements
All passwords must meet the following criteria:
- ✅ At least 8 characters long
- ✅ One uppercase letter (A-Z)
- ✅ One lowercase letter (a-z)
- ✅ One number (0-9)
- ✅ One special character (@$!%*?&)

## User Roles and Permissions

### Student
- Can register and login
- Access to personal dashboard
- Limited dashboard statistics

### Staff
- Can register and login
- Access to staff dashboard
- Can view student statistics
- Enhanced permissions for campus management

### Admin
- Full system access
- Can view all user statistics
- Access to admin tools and management features
- Complete dashboard with user breakdown

## Test Users
The system comes with pre-seeded test users:

### Admin Account
- **Username**: `admin`
- **Password**: `Admin@123`
- **Role**: Admin

### Student Accounts
- **Username**: `john_student` | **Password**: `Student@123`
- **Username**: `jane_student` | **Password**: `Student@456`
- **Username**: `mike_student` | **Password**: `Student@789`

### Staff Accounts
- **Username**: `prof_wilson` | **Password**: `Staff@789`
- **Username**: `dr_brown` | **Password**: `Staff@321`

## How to Use

### 1. Access the Login Page
Navigate to: `http://localhost:3000/log.html`

### 2. Register New User
1. Click "Sign Up" button
2. Fill in the registration form
3. Select appropriate role (Student/Staff/Admin)
4. Ensure password meets all requirements
5. Click "Sign Up"

### 3. Login Existing User
1. Select the correct role tab
2. Enter username and password
3. Click "Sign In"

### 4. Dashboard Access
After successful login, users are redirected to a role-specific dashboard showing:
- **Students**: Personal information and status
- **Staff**: Student statistics and staff tools
- **Admins**: Complete system overview with user management

## Security Features

### Password Security
- Passwords are hashed using bcryptjs with 12 salt rounds
- Original passwords are never stored in the database
- Password validation enforced on both client and server side

### JWT Token Security
- Tokens expire after 24 hours
- Tokens include user ID, username, and role
- Secure token verification for protected routes

### Role-Based Access
- Each user has a specific role (student/staff/admin)
- Dashboard content changes based on user role
- API endpoints respect role-based permissions

## File Structure
```
ZeroDay/
├── models/
│   └── User.js                 # User model with password hashing
├── routes/
│   └── auth.js                 # Authentication routes
├── js/
│   └── auth.js                 # Frontend authentication logic
├── log.html                    # Login/Registration page
├── seedUsers.js               # User seeding script
├── server.js                  # Updated with auth routes
└── .env                       # JWT secret configuration
```

## NPM Scripts
- `npm run seed:users` - Seed initial test users
- `npm run seed:all` - Seed all data (users, complaints, lost-found)
- `npm start` - Start the server
- `npm run dev` - Start with nodemon for development

## Environment Variables
Add to your `.env` file:
```
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024
```

## Integration with Existing System
The authentication system is fully integrated with your existing MongoDB setup:
- ✅ Uses the same database connection
- ✅ Doesn't affect existing collections (complaints, lost-found items)
- ✅ Maintains all existing functionality
- ✅ Adds new authentication layer without breaking changes

## Next Steps
1. **Test the System**: Use the provided test accounts to verify functionality
2. **Customize Roles**: Modify roles in `User.js` if needed
3. **Enhance Security**: Change JWT_SECRET in production
4. **Add Features**: Extend dashboard functionality based on requirements
5. **User Management**: Add admin features for user management

## Troubleshooting

### Common Issues
1. **"Username already exists"**: Choose a different username
2. **"Password doesn't meet criteria"**: Ensure password follows all requirements
3. **"Invalid credentials"**: Check username, password, and selected role match
4. **Token expired**: Login again to get a new token

### Database Issues
- Ensure MongoDB is running on `mongodb://localhost:27017/campus_hub`
- Run `npm run seed:users` to create test users
- Check `.env` file for correct database configuration

## Success! 🎉
Your log.html page is now fully connected to MongoDB with a complete authentication system supporting unique login details for students, staff, and administrators. The system provides secure, role-based access with persistent user data storage.# Authentication System Documentation

## Overview
The authentication system has been successfully integrated with your log.html page and MongoDB database. It provides secure user registration, login, and role-based access control for students, staff, and administrators.

## Features
- ✅ **Secure Password Hashing**: Uses bcryptjs with salt rounds of 12
- ✅ **JWT Token Authentication**: Secure token-based authentication
- ✅ **Role-Based Access Control**: Support for student, staff, and admin roles
- ✅ **Password Validation**: Enforces strong password requirements
- ✅ **Unique User Management**: Prevents duplicate usernames
- ✅ **Real-time Dashboard**: Dynamic dashboard based on user role
- ✅ **MongoDB Integration**: Persistent user data storage

## Database Collections

### Users Collection
The system creates a `users` collection in MongoDB with the following schema:

```javascript
{
  username: String (unique, required),
  password: String (hashed, required),
  fullName: String (required),
  role: String (enum: ['student', 'staff', 'admin']),
  email: String (optional),
  roomNumber: String (optional, for students),
  contactNumber: String (optional),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
Register a new user
```json
{
  "fullName": "John Doe",
  "username": "john_student",
  "password": "Student@123",
  "role": "student"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "username": "john_student",
  "password": "Student@123",
  "role": "student"
}
```

#### GET `/api/auth/profile`
Get user profile (requires authentication)
- Headers: `Authorization: Bearer <token>`

#### GET `/api/auth/dashboard-stats`
Get dashboard statistics (requires authentication)
- Headers: `Authorization: Bearer <token>`

#### POST `/api/auth/logout`
Logout user (client-side token removal)

## Password Requirements
All passwords must meet the following criteria:
- ✅ At least 8 characters long
- ✅ One uppercase letter (A-Z)
- ✅ One lowercase letter (a-z)
- ✅ One number (0-9)
- ✅ One special character (@$!%*?&)

## User Roles and Permissions

### Student
- Can register and login
- Access to personal dashboard
- Limited dashboard statistics

### Staff
- Can register and login
- Access to staff dashboard
- Can view student statistics
- Enhanced permissions for campus management

### Admin
- Full system access
- Can view all user statistics
- Access to admin tools and management features
- Complete dashboard with user breakdown

## Test Users
The system comes with pre-seeded test users:

### Admin Account
- **Username**: `admin`
- **Password**: `Admin@123`
- **Role**: Admin

### Student Accounts
- **Username**: `john_student` | **Password**: `Student@123`
- **Username**: `jane_student` | **Password**: `Student@456`
- **Username**: `mike_student` | **Password**: `Student@789`

### Staff Accounts
- **Username**: `prof_wilson` | **Password**: `Staff@789`
- **Username**: `dr_brown` | **Password**: `Staff@321`

## How to Use

### 1. Access the Login Page
Navigate to: `http://localhost:3000/log.html`

### 2. Register New User
1. Click "Sign Up" button
2. Fill in the registration form
3. Select appropriate role (Student/Staff/Admin)
4. Ensure password meets all requirements
5. Click "Sign Up"

### 3. Login Existing User
1. Select the correct role tab
2. Enter username and password
3. Click "Sign In"

### 4. Dashboard Access
After successful login, users are redirected to a role-specific dashboard showing:
- **Students**: Personal information and status
- **Staff**: Student statistics and staff tools
- **Admins**: Complete system overview with user management

## Security Features

### Password Security
- Passwords are hashed using bcryptjs with 12 salt rounds
- Original passwords are never stored in the database
- Password validation enforced on both client and server side

### JWT Token Security
- Tokens expire after 24 hours
- Tokens include user ID, username, and role
- Secure token verification for protected routes

### Role-Based Access
- Each user has a specific role (student/staff/admin)
- Dashboard content changes based on user role
- API endpoints respect role-based permissions

## File Structure
```
ZeroDay/
├── models/
│   └── User.js                 # User model with password hashing
├── routes/
│   └── auth.js                 # Authentication routes
├── js/
│   └── auth.js                 # Frontend authentication logic
├── log.html                    # Login/Registration page
├── seedUsers.js               # User seeding script
├── server.js                  # Updated with auth routes
└── .env                       # JWT secret configuration
```

## NPM Scripts
- `npm run seed:users` - Seed initial test users
- `npm run seed:all` - Seed all data (users, complaints, lost-found)
- `npm start` - Start the server
- `npm run dev` - Start with nodemon for development

## Environment Variables
Add to your `.env` file:
```
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024
```

## Integration with Existing System
The authentication system is fully integrated with your existing MongoDB setup:
- ✅ Uses the same database connection
- ✅ Doesn't affect existing collections (complaints, lost-found items)
- ✅ Maintains all existing functionality
- ✅ Adds new authentication layer without breaking changes

## Next Steps
1. **Test the System**: Use the provided test accounts to verify functionality
2. **Customize Roles**: Modify roles in `User.js` if needed
3. **Enhance Security**: Change JWT_SECRET in production
4. **Add Features**: Extend dashboard functionality based on requirements
5. **User Management**: Add admin features for user management

## Troubleshooting

### Common Issues
1. **"Username already exists"**: Choose a different username
2. **"Password doesn't meet criteria"**: Ensure password follows all requirements
3. **"Invalid credentials"**: Check username, password, and selected role match
4. **Token expired**: Login again to get a new token

### Database Issues
- Ensure MongoDB is running on `mongodb://localhost:27017/campus_hub`
- Run `npm run seed:users` to create test users
- Check `.env` file for correct database configuration

## Success! 🎉
Your log.html page is now fully connected to MongoDB with a complete authentication system supporting unique login details for students, staff, and administrators. The system provides secure, role-based access with persistent user data storage.