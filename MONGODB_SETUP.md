# MongoDB Setup Guide for Campus Hub Lost & Found

## Prerequisites
- MongoDB Compass (already installed ✅)
- Node.js (required for the backend server)

## Step 1: Start MongoDB Service

### Option A: Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. The connection will automatically start the MongoDB service

### Option B: Using Command Line
1. Open Command Prompt as Administrator
2. Run: `net start MongoDB`
3. If that doesn't work, try: `mongod --dbpath "C:\data\db"`

## Step 2: Verify MongoDB Connection
1. In MongoDB Compass, you should see the connection established
2. The database `campus_hub_lost_found` will be created automatically when you first submit an item

## Step 3: Start the Application
1. Double-click `start-server.bat` OR
2. Open terminal in project folder and run: `npm start`
3. Open your browser and go to: `http://localhost:3000`

## Database Structure
The application will create:
- **Database**: `campus_hub_lost_found`
- **Collection**: `lostfounditems`

## Features
- ✅ **Dual Storage**: Data is saved to both MongoDB and localStorage
- ✅ **Offline Support**: Works offline using localStorage
- ✅ **Auto Sync**: Syncs offline data when back online
- ✅ **Real-time**: Updates are reflected immediately
- ✅ **Search & Filter**: Advanced filtering capabilities
- ✅ **Image Support**: Upload and store images with items

## Troubleshooting

### MongoDB Connection Issues
1. Make sure MongoDB service is running
2. Check if port 27017 is available
3. Try restarting MongoDB Compass

### Server Won't Start
1. Make sure Node.js is installed
2. Run `npm install` in the project folder
3. Check if port 3000 is available

### Data Not Syncing
1. Check browser console for errors
2. Verify MongoDB connection in Compass
3. Check network connectivity

## API Endpoints
- `GET /api/lost-found` - Get all items
- `POST /api/lost-found` - Create new item
- `PUT /api/lost-found/:id` - Update item
- `DELETE /api/lost-found/:id` - Delete item
- `GET /api/health` - Check server status

## MongoDB Collections View
You can view your data in MongoDB Compass:
1. Connect to `mongodb://localhost:27017`
2. Navigate to `campus_hub_lost_found` database
3. View `lostfounditems` collection