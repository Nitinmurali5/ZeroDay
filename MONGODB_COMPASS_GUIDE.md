# MongoDB Compass Collection Setup Guide

## 🎯 Overview
This guide will help you create and view the ticket details collection in MongoDB Compass.

## 📋 Prerequisites
- MongoDB installed and running on your system
- MongoDB Compass installed
- Node.js and npm installed

## 🚀 Step-by-Step Setup

### 1. Start MongoDB Service
```bash
# Windows (Run as Administrator)
net start MongoDB

# Or start MongoDB manually
mongod --dbpath "C:\data\db"
```

### 2. Connect to MongoDB Compass
1. Open MongoDB Compass
2. Use connection string: `mongodb://localhost:27017`
3. Click "Connect"

### 3. Create Database and Collection
1. Click "Create Database"
2. Database Name: `campus_hub`
3. Collection Name: `busbookings`
4. Click "Create Database"

### 4. Seed Sample Data
Run the seeder script to populate with sample tickets:

```bash
# Navigate to project directory
cd c:\Users\nitin\OneDrive\Attachments\ZeroDayOrg\ZeroDay

# Install dependencies (if not already done)
npm install

# Run the ticket seeder
node seedTickets.js
```

### 5. View Collection in Compass
1. In MongoDB Compass, navigate to `campus_hub` database
2. Click on `busbookings` collection
3. You should see the sample ticket data

## 📊 Collection Schema

### BusBooking Document Structure:
```json
{
  "_id": "ObjectId",
  "bookingId": "BUS1703123456001",
  "passengerName": "Rahul Kumar",
  "phone": "9876543210",
  "travelDate": "2024-12-25T00:00:00.000Z",
  "passengers": 2,
  "route": {
    "id": 1,
    "name": "Chennai Central",
    "distance": "45 km",
    "fare": 120,
    "time": "2 hours"
  },
  "totalFare": 240,
  "paymentStatus": "Paid",
  "paymentMethod": "UPI",
  "paymentDate": "2024-12-21T10:30:00.000Z",
  "status": "Confirmed",
  "bookingDate": "2024-12-21T10:30:00.000Z",
  "createdAt": "2024-12-21T10:30:00.000Z",
  "updatedAt": "2024-12-21T10:30:00.000Z"
}
```

## 🔍 Useful MongoDB Compass Features

### 1. Filter Documents
Use the filter bar to search tickets:
```json
{ "paymentStatus": "Paid" }
{ "route.name": "Chennai Central" }
{ "travelDate": { "$gte": "2024-12-25" } }
```

### 2. Sort Documents
Click column headers to sort by:
- Booking Date
- Travel Date
- Total Fare
- Payment Status

### 3. Export Data
- Click "Export Collection"
- Choose format (JSON, CSV)
- Download your ticket data

### 4. Create Indexes
For better performance, create indexes on:
- `bookingId` (unique)
- `phone`
- `travelDate`
- `paymentStatus`

## 🛠️ Common Operations

### Add New Ticket Manually
1. Click "Insert Document"
2. Use the schema structure above
3. Fill in the required fields
4. Click "Insert"

### Update Ticket Status
1. Find the ticket document
2. Click the edit icon
3. Modify `paymentStatus` or `status`
4. Click "Update"

### Delete Tickets
1. Select document(s)
2. Click delete icon
3. Confirm deletion

## 🔧 Troubleshooting

### Connection Issues
- Ensure MongoDB service is running
- Check if port 27017 is available
- Verify connection string

### Collection Not Showing
- Refresh the database view
- Check if seeder script ran successfully
- Verify database name is `campus_hub`

### Data Not Loading
- Check console for errors
- Verify .env file has correct MONGODB_URI
- Ensure all required fields are present

## 📈 Next Steps
1. Integrate with your web application
2. Set up data validation rules
3. Create backup strategies
4. Monitor collection performance
5. Set up user authentication for data access

## 🎉 Success!
Your MongoDB collection for ticket details is now ready! You can view, edit, and manage all bus booking tickets through MongoDB Compass.