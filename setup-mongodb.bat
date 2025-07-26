@echo off
echo ========================================
echo    MongoDB Collection Setup Script
echo ========================================
echo.

echo 🔄 Starting MongoDB service...
net start MongoDB
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB service might already be running or needs manual start
    echo    Try running: mongod --dbpath "C:\data\db"
    pause
)

echo.
echo 📦 Installing Node.js dependencies...
npm install

echo.
echo 🌱 Seeding ticket data to MongoDB...
node seedTickets.js

echo.
echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo 1. Open MongoDB Compass
echo 2. Connect to: mongodb://localhost:27017
echo 3. Navigate to 'campus_hub' database
echo 4. View 'busbookings' collection
echo.
echo 🚀 Your ticket collection is ready!
pause