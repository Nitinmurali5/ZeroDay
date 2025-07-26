const mongoose = require('mongoose');
const BusBooking = require('./models/BusBooking');
require('dotenv').config();

// Sample ticket data
const sampleTickets = [
  {
    bookingId: 'BUS' + Date.now() + '001',
    passengerName: 'Rahul Kumar',
    phone: '9876543210',
    travelDate: new Date('2024-12-25'),
    passengers: 2,
    route: {
      id: 1,
      name: 'Chennai Central',
      distance: '45 km',
      fare: 120,
      time: '2 hours'
    },
    totalFare: 240,
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    paymentDate: new Date(),
    status: 'Confirmed'
  },
  {
    bookingId: 'BUS' + (Date.now() + 1000) + '002',
    passengerName: 'Priya Sharma',
    phone: '9876543211',
    travelDate: new Date('2024-12-26'),
    passengers: 1,
    route: {
      id: 2,
      name: 'Bangalore',
      distance: '350 km',
      fare: 450,
      time: '7 hours'
    },
    totalFare: 450,
    paymentStatus: 'Paid',
    paymentMethod: 'Card',
    paymentDate: new Date(),
    status: 'Confirmed'
  },
  {
    bookingId: 'BUS' + (Date.now() + 2000) + '003',
    passengerName: 'Amit Patel',
    phone: '9876543212',
    travelDate: new Date('2024-12-27'),
    passengers: 3,
    route: {
      id: 3,
      name: 'Coimbatore',
      distance: '180 km',
      fare: 200,
      time: '4 hours'
    },
    totalFare: 600,
    paymentStatus: 'Pending',
    paymentMethod: 'UPI',
    status: 'Confirmed'
  },
  {
    bookingId: 'BUS' + (Date.now() + 3000) + '004',
    passengerName: 'Sneha Reddy',
    phone: '9876543213',
    travelDate: new Date('2024-12-28'),
    passengers: 1,
    route: {
      id: 4,
      name: 'Madurai',
      distance: '280 km',
      fare: 320,
      time: '5.5 hours'
    },
    totalFare: 320,
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    paymentDate: new Date(),
    status: 'Confirmed'
  },
  {
    bookingId: 'BUS' + (Date.now() + 4000) + '005',
    passengerName: 'Vikram Singh',
    phone: '9876543214',
    travelDate: new Date('2024-12-29'),
    passengers: 4,
    route: {
      id: 5,
      name: 'Trichy',
      distance: '220 km',
      fare: 250,
      time: '4.5 hours'
    },
    totalFare: 1000,
    paymentStatus: 'Paid',
    paymentMethod: 'Card',
    paymentDate: new Date(),
    status: 'Confirmed'
  }
];

async function seedTickets() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🔗 Connected to MongoDB');

    // Clear existing tickets
    await BusBooking.deleteMany({});
    console.log('🗑️ Cleared existing tickets');

    // Insert sample tickets
    const tickets = await BusBooking.insertMany(sampleTickets);
    console.log(`✅ Successfully seeded ${tickets.length} tickets`);

    // Display created tickets
    console.log('\n📋 Created Tickets:');
    tickets.forEach((ticket, index) => {
      console.log(`${index + 1}. ${ticket.bookingId} - ${ticket.passengerName} (${ticket.route.name})`);
    });

    console.log('\n🎯 Collection "busbookings" created in MongoDB Compass!');
    console.log('📊 You can now view this collection in MongoDB Compass');

  } catch (error) {
    console.error('❌ Error seeding tickets:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeder
seedTickets();