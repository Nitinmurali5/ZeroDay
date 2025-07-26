const mongoose = require('mongoose');
require('dotenv').config();

const Poll = require('./models/Poll');

const samplePolls = [
  {
    pollId: 'POLL0001',
    question: 'What is your preferred exam format?',
    options: [
      { text: 'Online exams', votes: 12 },
      { text: 'Offline exams', votes: 25 },
      { text: 'Mixed format', votes: 8 }
    ],
    createdBy: 'admin',
    voters: [
      { username: 'kabil', optionIndex: 1, votedAt: new Date() },
      { username: 'student1', optionIndex: 0, votedAt: new Date() },
      { username: 'student2', optionIndex: 1, votedAt: new Date() }
    ],
    isActive: true
  },
  {
    pollId: 'POLL0002',
    question: 'Which campus facility needs improvement?',
    options: [
      { text: 'Library', votes: 18 },
      { text: 'Cafeteria', votes: 22 },
      { text: 'Sports facilities', votes: 15 },
      { text: 'Computer labs', votes: 10 }
    ],
    createdBy: 'admin',
    voters: [
      { username: 'student3', optionIndex: 1, votedAt: new Date() },
      { username: 'student4', optionIndex: 0, votedAt: new Date() }
    ],
    isActive: true
  },
  {
    pollId: 'POLL0003',
    question: 'Best time for campus events?',
    options: [
      { text: 'Morning (9-12 PM)', votes: 8 },
      { text: 'Afternoon (1-4 PM)', votes: 14 },
      { text: 'Evening (5-8 PM)', votes: 28 }
    ],
    createdBy: 'admin',
    voters: [
      { username: 'student5', optionIndex: 2, votedAt: new Date() },
      { username: 'student6', optionIndex: 2, votedAt: new Date() }
    ],
    isActive: true
  },
  {
    pollId: 'POLL0004',
    question: 'Preferred programming language for first year?',
    options: [
      { text: 'Python', votes: 35 },
      { text: 'Java', votes: 20 },
      { text: 'C++', votes: 15 }
    ],
    createdBy: 'admin',
    voters: [
      { username: 'student7', optionIndex: 0, votedAt: new Date() },
      { username: 'student8', optionIndex: 0, votedAt: new Date() }
    ],
    isActive: true
  },
  {
    pollId: 'POLL0005',
    question: 'Should we have more coding competitions?',
    options: [
      { text: 'Yes, monthly', votes: 42 },
      { text: 'Yes, quarterly', votes: 18 },
      { text: 'No, current frequency is fine', votes: 5 }
    ],
    createdBy: 'admin',
    voters: [
      { username: 'student9', optionIndex: 0, votedAt: new Date() },
      { username: 'student10', optionIndex: 0, votedAt: new Date() }
    ],
    isActive: true
  }
];

async function seedPolls() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_hub');
    console.log('✅ MongoDB connected for seeding polls');

    await Poll.deleteMany({});
    console.log('🗑️ Cleared existing polls');

    const polls = await Poll.insertMany(samplePolls);
    console.log(`✅ Inserted ${polls.length} sample polls`);

    console.log('\n📊 Sample Polls Created:');
    polls.forEach((poll, index) => {
      const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
      console.log(`${index + 1}. ${poll.question}`);
      console.log(`   Poll ID: ${poll.pollId}`);
      console.log(`   Options: ${poll.options.length}`);
      console.log(`   Total Votes: ${totalVotes}`);
      console.log(`   Status: ${poll.isActive ? 'Active' : 'Inactive'}`);
      console.log('');
    });

    console.log('🎉 Polls collection seeded successfully!');
    console.log('📊 Collection: polls');
    console.log('🔗 You can view this in MongoDB Compass');
    console.log('\n🚀 Start the server with: node server.js');
    console.log('🌐 Access polls at: http://localhost:3000/polls.html');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding polls:', error);
    process.exit(1);
  }
}

seedPolls();