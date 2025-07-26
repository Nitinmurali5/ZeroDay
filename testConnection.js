const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_hub';
  const client = new MongoClient(uri);

  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully to MongoDB!');

    const db = client.db('campus_hub');
    
    // Test creating tickets collection
    const ticketsCollection = db.collection('tickets');
    
    // Insert a test ticket
    const testTicket = {
      ticketId: 'TEST' + Date.now(),
      passengerName: 'Test User',
      phone: '9999999999',
      route: 'SECE to Chennai',
      travelDate: new Date(),
      totalFare: 100,
      paymentStatus: 'Paid',
      createdAt: new Date()
    };

    const result = await ticketsCollection.insertOne(testTicket);
    console.log('✅ Test ticket inserted:', result.insertedId);

    // Count documents
    const count = await ticketsCollection.countDocuments();
    console.log(`📊 Total tickets in collection: ${count}`);

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📋 Available collections:');
    collections.forEach(col => console.log(`  - ${col.name}`));

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Make sure MongoDB is running: net start MongoDB');
    console.log('2. Check if port 27017 is available');
    console.log('3. Verify .env file has correct MONGODB_URI');
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

testConnection();