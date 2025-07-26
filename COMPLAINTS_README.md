# Hostel Complaints Management System

A comprehensive MongoDB-integrated complaints management system for hostel administration.

## Features

### For Students
- **Submit Complaints**: Report hostel issues with detailed descriptions
- **Track Status**: Monitor complaint progress (Pending → In Progress → Resolved)
- **View History**: Access all previously submitted complaints
- **Filter & Sort**: Organize complaints by status, category, or date
- **Real-time Updates**: Get instant feedback on complaint status changes

### For Administrators
- **Dashboard Overview**: View complaint statistics and metrics
- **Manage All Complaints**: Access and update all student complaints
- **Status Management**: Update complaint status and add admin notes
- **Advanced Filtering**: Filter by status, category, priority, and more
- **Bulk Operations**: Efficiently manage multiple complaints

## Database Schema

### Complaint Model
```javascript
{
  complaintId: String (unique, auto-generated),
  title: String (5-100 characters),
  category: Enum ['water', 'electricity', 'cleaning', 'maintenance', 'security', 'other'],
  description: String (10-500 characters),
  priority: Enum ['low', 'medium', 'high', 'urgent'],
  status: Enum ['pending', 'in-progress', 'resolved'],
  roomNumber: String (uppercase, 1-10 characters),
  contactNumber: String (10 digits),
  studentUsername: String,
  submittedAt: Date,
  updatedAt: Date,
  adminNotes: String (optional),
  resolvedAt: Date (optional),
  assignedTo: String (optional)
}
```

### User Model
```javascript
{
  username: String (unique, 3-20 characters),
  password: String (6+ characters),
  role: Enum ['student', 'admin'],
  email: String (optional),
  fullName: String (optional),
  roomNumber: String (optional),
  contactNumber: String (10 digits),
  isActive: Boolean,
  lastLogin: Date
}
```

## API Endpoints

### Authentication
- `POST /api/complaints/auth/login` - User login

### Complaints
- `GET /api/complaints` - Get complaints (filtered by user role)
- `POST /api/complaints` - Create new complaint (students only)
- `GET /api/complaints/:id` - Get specific complaint
- `PUT /api/complaints/:id` - Update complaint (admin only)
- `DELETE /api/complaints/:id` - Delete complaint (admin only)
- `GET /api/complaints/stats` - Get complaint statistics (admin only)

## Setup Instructions

### 1. MongoDB Setup
Ensure MongoDB is running on your system:
```bash
# Start MongoDB service
mongod
```

### 2. Environment Configuration
The `.env` file should contain:
```env
MONGODB_URI=mongodb://localhost:27017/campus_hub
DB_NAME=campus_hub
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Seed Sample Data
```bash
npm run seed
```

### 5. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Test Credentials

After running the seed script, you can use these credentials:

### Student Account
- **Username**: `john_doe`
- **Password**: `password123`
- **Role**: Student

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: Administrator

## Usage Guide

### For Students

1. **Login**: Access the complaints system at `/complaints.html`
2. **Submit Complaint**: 
   - Fill in all required fields
   - Choose appropriate category and priority
   - Provide detailed description
3. **Track Progress**: Switch to "My Complaints" tab to monitor status
4. **View Details**: Click "View Details" for complete complaint information

### For Administrators

1. **Login**: Use admin credentials to access admin dashboard
2. **View Statistics**: Monitor complaint metrics on the dashboard
3. **Manage Complaints**: 
   - Filter complaints by status, category, or priority
   - Update complaint status using dropdown menus
   - Add admin notes for communication
4. **Bulk Operations**: Use filters to manage multiple complaints efficiently

## Validation Rules

### Complaint Submission
- **Title**: 5-100 characters, required
- **Description**: 10-500 characters, required
- **Room Number**: 1-10 characters, letters/numbers/hyphens only
- **Contact Number**: Exactly 10 digits
- **Category**: Must select from predefined options
- **Priority**: Must select from predefined options

### User Authentication
- **Username**: 3-20 characters, letters/numbers/underscore only
- **Password**: Minimum 6 characters
- **Role**: Must be either 'student' or 'admin'

## Security Features

- **Role-based Access**: Students can only view/create their own complaints
- **Input Validation**: All inputs are validated on both client and server
- **SQL Injection Prevention**: Using MongoDB with Mongoose ODM
- **XSS Protection**: Input sanitization and proper encoding

## Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexes
- **Lazy Loading**: Complaints loaded on demand
- **Caching**: Local caching of user session data
- **Pagination**: Large datasets handled efficiently

## Error Handling

- **Client-side Validation**: Real-time form validation
- **Server-side Validation**: Comprehensive API validation
- **User Feedback**: Clear error messages and success notifications
- **Graceful Degradation**: Fallback mechanisms for network issues

## Future Enhancements

- **Email Notifications**: Automated status update emails
- **File Attachments**: Image uploads for complaint evidence
- **Mobile App**: React Native mobile application
- **Analytics Dashboard**: Advanced reporting and analytics
- **Multi-language Support**: Internationalization features

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB service is running
   - Check connection string in `.env` file

2. **Login Issues**
   - Verify credentials are correct
   - Run seed script to create test accounts

3. **Complaints Not Loading**
   - Check browser console for errors
   - Verify API endpoints are accessible

4. **Permission Denied**
   - Ensure user has correct role permissions
   - Check authentication headers

## Support

For technical support or feature requests, please contact the development team or create an issue in the project repository.