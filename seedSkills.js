const mongoose = require('mongoose');
const Skill = require('./models/Skill');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_hub');
    console.log('✅ MongoDB connected for seeding skills');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const sampleSkills = [
  {
    title: 'Python Programming Fundamentals',
    category: 'Programming',
    description: 'Learn Python from basics to advanced concepts including data structures, OOP, and web development.',
    instructor: {
      name: 'Rahul Sharma',
      contact: 'rahul.sharma@sece.edu',
      experience: '3 years Python development'
    },
    level: 'Beginner',
    duration: '6 weeks',
    price: 500,
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '4:00 PM - 5:30 PM',
      location: 'Computer Lab A'
    },
    maxStudents: 15,
    enrolledStudents: 8,
    status: 'Active',
    tags: ['Python', 'Programming', 'Beginner-friendly']
  },
  {
    title: 'Web Development with React',
    category: 'Programming',
    description: 'Master modern web development with React, JavaScript, and responsive design principles.',
    instructor: {
      name: 'Priya Patel',
      contact: 'priya.patel@sece.edu',
      experience: '4 years full-stack development'
    },
    level: 'Intermediate',
    duration: '8 weeks',
    price: 800,
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '5:00 PM - 7:00 PM',
      location: 'Computer Lab B'
    },
    maxStudents: 12,
    enrolledStudents: 10,
    status: 'Active',
    tags: ['React', 'JavaScript', 'Web Development']
  },
  {
    title: 'Graphic Design with Photoshop',
    category: 'Design',
    description: 'Learn professional graphic design techniques using Adobe Photoshop and design principles.',
    instructor: {
      name: 'Arjun Kumar',
      contact: 'arjun.kumar@sece.edu',
      experience: '5 years graphic design'
    },
    level: 'Beginner',
    duration: '4 weeks',
    price: 600,
    schedule: {
      days: ['Saturday'],
      time: '10:00 AM - 1:00 PM',
      location: 'Design Studio'
    },
    maxStudents: 10,
    enrolledStudents: 6,
    status: 'Active',
    tags: ['Photoshop', 'Design', 'Creative']
  },
  {
    title: 'English Communication Skills',
    category: 'Languages',
    description: 'Improve your English speaking, writing, and presentation skills for academic and professional success.',
    instructor: {
      name: 'Dr. Meera Singh',
      contact: 'meera.singh@sece.edu',
      experience: '10 years English teaching'
    },
    level: 'Intermediate',
    duration: '5 weeks',
    price: 400,
    schedule: {
      days: ['Monday', 'Wednesday'],
      time: '3:00 PM - 4:30 PM',
      location: 'Language Lab'
    },
    maxStudents: 20,
    enrolledStudents: 15,
    status: 'Active',
    tags: ['English', 'Communication', 'Speaking']
  },
  {
    title: 'Data Structures & Algorithms',
    category: 'Academic',
    description: 'Master fundamental computer science concepts essential for coding interviews and competitive programming.',
    instructor: {
      name: 'Vikram Reddy',
      contact: 'vikram.reddy@sece.edu',
      experience: '6 years CS teaching'
    },
    level: 'Advanced',
    duration: '10 weeks',
    price: 1000,
    schedule: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      time: '2:00 PM - 4:00 PM',
      location: 'Computer Lab C'
    },
    maxStudents: 8,
    enrolledStudents: 8,
    status: 'Full',
    tags: ['DSA', 'Algorithms', 'Competitive Programming']
  }
];

const seedSkills = async () => {
  try {
    await Skill.deleteMany({});
    console.log('🗑️ Cleared existing skills');

    const insertedSkills = await Skill.insertMany(sampleSkills);
    console.log(`✅ Inserted ${insertedSkills.length} sample skills`);

    console.log('\n📚 Sample Skills Created:');
    insertedSkills.forEach((skill, index) => {
      console.log(`${index + 1}. ${skill.title}`);
      console.log(`   Category: ${skill.category}`);
      console.log(`   Level: ${skill.level}`);
      console.log(`   Price: ₹${skill.price}`);
      console.log(`   Enrolled: ${skill.enrolledStudents}/${skill.maxStudents}`);
      console.log('');
    });

    console.log('🎉 Skills collection seeded successfully!');
    console.log('📊 Collection: skills');
    console.log('🔗 You can view this in MongoDB Compass');
    
  } catch (error) {
    console.error('❌ Error seeding skills:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedSkills();
};

runSeed();