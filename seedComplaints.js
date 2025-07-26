// Seed script for complaints database
const mongoose = require('mongoose');
require('dotenv').config();

const Complaint = require('./models/Complaint');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const sampleComplaints = [
  {
    complaintId: 'CMP0001',
    title: 'Water leakage in bathroom',
    category: 'water',
    description: 'There is continuous water leakage from the bathroom ceiling. The water is dripping constantly and has created a puddle on the floor.',
    priority: 'high',
    status: 'pending',
    roomNumber: 'A-101',
    contactNumber: '9876543210',
    studentUsername: 'john_doe',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    complaintId: 'CMP0002',
    title: 'Electricity fluctuation',
    category: 'electricity',
    description: 'Frequent power cuts and voltage fluctuations in the room. The lights keep flickering and electronic devices are getting affected.',
    priority: 'medium',
    status: 'in-progress',
    roomNumber: 'B-205',
    contactNumber: '9876543211',
    studentUsername: 'jane_smith',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    adminNotes: 'Electrician has been contacted. Will be fixed by tomorrow.'
  },
  {
    complaintId: 'CMP0003',
    title: 'Broken window latch',
    category: 'maintenance',
    description: 'The window latch in my room is broken and the window cannot be properly closed. This is causing security concerns.',
    priority: 'medium',
    status: 'resolved',
    roomNumber: 'C-301',
    contactNumber: '9876543212',
    studentUsername: 'mike_wilson',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    adminNotes: 'Window latch has been replaced. Issue resolved.'
  },
  {
    complaintId: 'CMP0004',
    title: 'Cleaning not done properly',
    category: 'cleaning',
    description: 'The common area cleaning has not been done properly for the past week. Garbage is accumulating and the area smells bad.',
    priority: 'low',
    status: 'pending',
    roomNumber: 'D-102',
    contactNumber: '9876543213',
    studentUsername: 'sarah_jones',
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
  },
  {
    complaintId: 'CMP0005',
    title: 'Security gate not working',
    category: 'security',
    description: 'The main security gate is not closing properly and anyone can enter the hostel premises without proper verification.',
    priority: 'urgent',
    status: 'in-progress',
    roomNumber: 'A-205',
    contactNumber: '9876543214',
    studentUsername: 'alex_brown',
    submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    adminNotes: 'Security team has been notified. Temporary guard posted.'
  }
];

const sampleUsers = [
  {
    username: 'john_doe',
    password: 'password123',
    role: 'student',
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    roomNumber: 'A-101',
    contactNumber: '9876543210'
  },
  {
    username: 'jane_smith',
    password: 'password123',
    role: 'student',
    email: 'jane.smith@example.com',
    fullName: 'Jane Smith',
    roomNumber: 'B-205',
    contactNumber: '9876543211'
  },
  {
    username: 'mike_wilson',
    password: 'password123',
    role: 'student',
    email: 'mike.wilson@example.com',
    fullName: 'Mike Wilson',
    roomNumber: 'C-301',
    contactNumber: '9876543212'
  },
  {
    username: 'sarah_jones',
    password: 'password123',
    role: 'student',
    email: 'sarah.jones@example.com',
    fullName: 'Sarah Jones',
    roomNumber: 'D-102',
    contactNumber: '9876543213'
  },
  {
    username: 'alex_brown',
    password: 'password123',
    role: 'student',
    email: 'alex.brown@example.com',
    fullName: 'Alex Brown',
    roomNumber: 'A-205',
    contactNumber: '9876543214'
  },
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    email: 'admin@hostel.com',
    fullName: 'Hostel Administrator',
    contactNumber: '9876543200'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Complaint.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert sample users
    await User.insertMany(sampleUsers);
    console.log('👥 Sample users created');

    // Insert sample complaints
    await Complaint.insertMany(sampleComplaints);
    console.log('📝 Sample complaints created');

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Seeded Data Summary:');
    console.log(`- Users: ${sampleUsers.length}`);
    console.log(`- Complaints: ${sampleComplaints.length}`);
    console.log('\n🔐 Test Credentials:');
    console.log('Student: username="john_doe", password="password123"');
    console.log('Admin: username="admin", password="admin123"');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding
connectDB().then(() => {
  seedDatabase();
});