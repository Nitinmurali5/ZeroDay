const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️ Cleared existing users');

    // Create sample users (Students and Staff only)
    const users = [
      {
        username: 'john_student',
        password: 'Student@123',
        fullName: 'John Doe',
        role: 'student',
        email: 'john.doe@student.campus.edu',
        roomNumber: 'A101',
        contactNumber: '9876543210',
        isActive: true
      },
      {
        username: 'jane_student',
        password: 'Student@456',
        fullName: 'Jane Smith',
        role: 'student',
        email: 'jane.smith@student.campus.edu',
        roomNumber: 'B205',
        contactNumber: '9876543211',
        isActive: true
      },
      {
        username: 'mike_student',
        password: 'Student@789',
        fullName: 'Mike Johnson',
        role: 'student',
        email: 'mike.johnson@student.campus.edu',
        roomNumber: 'C301',
        contactNumber: '9876543214',
        isActive: true
      },
      {
        username: 'sarah_student',
        password: 'Student@321',
        fullName: 'Sarah Wilson',
        role: 'student',
        email: 'sarah.wilson@student.campus.edu',
        roomNumber: 'D102',
        contactNumber: '9876543215',
        isActive: true
      },
      {
        username: 'prof_wilson',
        password: 'Staff@789',
        fullName: 'Professor Wilson',
        role: 'staff',
        email: 'wilson@staff.campus.edu',
        contactNumber: '9876543212',
        isActive: true
      },
      {
        username: 'dr_brown',
        password: 'Staff@321',
        fullName: 'Dr. Sarah Brown',
        role: 'staff',
        email: 'sarah.brown@staff.campus.edu',
        contactNumber: '9876543213',
        isActive: true
      },
      {
        username: 'prof_davis',
        password: 'Staff@456',
        fullName: 'Professor Davis',
        role: 'staff',
        email: 'davis@staff.campus.edu',
        contactNumber: '9876543216',
        isActive: true
      }
    ];

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users successfully!`);

    // Display created users
    console.log('\n📋 Created Users:');
    console.log('==================');
    createdUsers.forEach(user => {
      console.log(`👤 ${user.fullName}`);
      console.log(`   Username: ${user.username}`);
      console.log(`   Role: ${user.role.toUpperCase()}`);
      console.log(`   Email: ${user.email || 'Not provided'}`);
      if (user.roomNumber) console.log(`   Room: ${user.roomNumber}`);
      console.log('   ---');
    });

    console.log('\n🔐 Login Credentials for Testing:');
    console.log('==================================');
    console.log('STUDENTS:');
    console.log('  Username: john_student | Password: Student@123');
    console.log('  Username: jane_student | Password: Student@456');
    console.log('  Username: mike_student | Password: Student@789');
    console.log('  Username: sarah_student | Password: Student@321');
    console.log('\nSTAFF:');
    console.log('  Username: prof_wilson | Password: Staff@789');
    console.log('  Username: dr_brown | Password: Staff@321');
    console.log('  Username: prof_davis | Password: Staff@456');

    console.log('\n🎯 All passwords meet the security requirements:');
    console.log('   - At least 8 characters');
    console.log('   - One uppercase letter');
    console.log('   - One lowercase letter');
    console.log('   - One number');
    console.log('   - One special character');

  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
};

// Run the seed function
seedUsers();