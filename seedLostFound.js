// Seed script for Lost & Found database
const mongoose = require('mongoose');
require('dotenv').config();

const LostFoundItem = require('./models/LostFoundItem');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected for Lost & Found seeding');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const sampleLostFoundItems = [
  {
    itemName: 'Black Leather Wallet',
    category: 'accessories',
    description: 'Black leather wallet with student ID, driver license, and some cash. Has a small tear on the corner.',
    location: 'Main Cafeteria - Table near window',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    contact: 'security@campus.edu',
    status: 'found',
    reportedBy: 'Security Team',
    images: []
  },
  {
    itemName: 'iPhone 13 Pro - Blue',
    category: 'electronics',
    description: 'Blue iPhone 13 Pro with cracked screen protector. Has a clear case with stickers on the back.',
    location: 'Library - 2nd Floor Study Area',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    contact: 'john.doe@student.edu',
    status: 'lost',
    reportedBy: 'John Doe',
    images: []
  },
  {
    itemName: 'Red Nike Backpack',
    category: 'accessories',
    description: 'Red Nike backpack with laptop compartment. Contains textbooks and notebooks for Computer Science courses.',
    location: 'Engineering Building - Room 205',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    contact: 'sarah.wilson@student.edu',
    status: 'lost',
    reportedBy: 'Sarah Wilson',
    images: []
  },
  {
    itemName: 'Silver MacBook Air',
    category: 'electronics',
    description: 'Silver MacBook Air 13-inch with multiple programming stickers. Left in charging state.',
    location: 'Computer Lab - Building A',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    contact: 'techsupport@campus.edu',
    status: 'found',
    reportedBy: 'IT Support',
    images: []
  },
  {
    itemName: 'Car Keys with Honda Keychain',
    category: 'keys',
    description: 'Set of car keys with Honda keychain and a small flashlight attached. Has 3 keys total.',
    location: 'Parking Lot B - Near entrance',
    date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    contact: '555-0123',
    status: 'found',
    reportedBy: 'Campus Security',
    images: []
  },
  {
    itemName: 'Chemistry Textbook',
    category: 'books',
    description: 'Organic Chemistry textbook by Wade, 9th edition. Has highlighting and notes throughout.',
    location: 'Science Building - Lab 301',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    contact: 'mike.chen@student.edu',
    status: 'lost',
    reportedBy: 'Mike Chen',
    images: []
  },
  {
    itemName: 'Blue Denim Jacket',
    category: 'clothing',
    description: 'Light blue denim jacket, size Medium. Has a small pin collection on the left chest.',
    location: 'Student Union - Food Court',
    date: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    contact: 'emma.davis@student.edu',
    status: 'lost',
    reportedBy: 'Emma Davis',
    images: []
  },
  {
    itemName: 'Wireless Earbuds (AirPods)',
    category: 'electronics',
    description: 'Apple AirPods Pro with charging case. Case has a small scratch on the lid.',
    location: 'Gym - Locker Room',
    date: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    contact: 'gym@campus.edu',
    status: 'found',
    reportedBy: 'Gym Staff',
    images: []
  },
  {
    itemName: 'Student ID Card',
    category: 'documents',
    description: 'Student ID card for Alex Johnson, Computer Science major, Class of 2025.',
    location: 'Library - Main Entrance',
    date: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    contact: 'library@campus.edu',
    status: 'found',
    reportedBy: 'Library Staff',
    images: []
  },
  {
    itemName: 'Tennis Racket',
    category: 'sports',
    description: 'Wilson tennis racket with blue grip tape. Slightly worn strings.',
    location: 'Tennis Courts - Court 3',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    contact: 'sports@campus.edu',
    status: 'found',
    reportedBy: 'Sports Center',
    images: []
  }
];

const seedLostFoundDatabase = async () => {
  try {
    console.log('🌱 Starting Lost & Found database seeding...');

    // Clear existing lost & found data
    await LostFoundItem.deleteMany({});
    console.log('🗑️ Cleared existing Lost & Found data');

    // Insert sample lost & found items
    await LostFoundItem.insertMany(sampleLostFoundItems);
    console.log('📦 Sample Lost & Found items created');

    console.log('✅ Lost & Found database seeding completed successfully!');
    console.log('\n📊 Seeded Data Summary:');
    console.log(`- Lost & Found Items: ${sampleLostFoundItems.length}`);
    
    // Count by status
    const lostCount = sampleLostFoundItems.filter(item => item.status === 'lost').length;
    const foundCount = sampleLostFoundItems.filter(item => item.status === 'found').length;
    
    console.log(`  - Lost Items: ${lostCount}`);
    console.log(`  - Found Items: ${foundCount}`);
    
    // Count by category
    const categories = {};
    sampleLostFoundItems.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });
    
    console.log('\n📂 Items by Category:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count}`);
    });

  } catch (error) {
    console.error('❌ Error seeding Lost & Found database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding
connectDB().then(() => {
  seedLostFoundDatabase();
});