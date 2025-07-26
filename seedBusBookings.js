const mongoose = require('mongoose');
const BusBooking = require('./models/BusBooking');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-hub');
    console.log('✅ MongoDB connected for seeding bus bookings');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample bus booking data
const sampleBookings = [
  {
    bookingId: 'BUS1703001001',
    passengerName: 'Rahul Kumar',
    phone: '9876543210',
    travelDate: new Date('2024-01-15'),
    passengers: 1,
    route: {
      id: 1,
      name: 'Ukkadam (Coimbatore)',
      distance: '31 km',
      fare: 46.50,
      time: '50 min'
    },
    totalFare: 46.50,
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    paymentDate: new Date(),
    status: 'Confirmed'
  },
  {
    bookingId: 'BUS1703001002',
    passengerName: 'Priya Sharma',
    phone: '9876543211',
    travelDate: new Date('2024-01-16'),
    passengers: 2,
    route: {
      id: 2,
      name: 'Gandhipuram (Coimbatore)',
      distance: '28 km',
      fare: 42.00,
      time: '45 min'
    },
    totalFare: 84.00,
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    paymentDate: new Date(),
    status: 'Confirmed'
  },
  {
    bookingId: 'BUS1703001003',
    passengerName: 'Arjun Patel',
    phone: '9876543212',
    travelDate: new Date('2024-01-17'),
    passengers: 1,
    route: {
      id: 4,
      name: 'Pollachi',
      distance: '40 km',
      fare: 60.00,
      time: '1h 5min'
    },
    totalFare: 60.00,
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    paymentDate: new Date(),
    status: 'Confirmed'
  },
  {
    bookingId: 'BUS1703001004',
    passengerName: 'Sneha Reddy',
    phone: '9876543213',
    travelDate: new Date('2024-01-18'),
    passengers: 3,
    route: {
      id: 9,
      name: 'Tiruppur',
      distance: '63 km',
      fare: 94.50,
      time: '1h 35min'
    },
    totalFare: 283.50,
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    paymentDate: new Date(),
    status: 'Confirmed'
  },
  {
    bookingId: 'BUS1703001005',
    passengerName: 'Vikram Singh',
    phone: '9876543214',
    travelDate: new Date('2024-01-19'),
    passengers: 1,
    route: {
      id: 5,
      name: 'Udumalpet',
      distance: '44 km',
      fare: 66.00,
      time: '1h 10min'
    },
    totalFare: 66.00,
    paymentStatus: 'Pending',
    paymentMethod: 'UPI',
    status: 'Confirmed'
  }
];

// Seed function
const seedBusBookings = async () => {
  try {
    // Clear existing bookings
    await BusBooking.deleteMany({});
    console.log('🗑️ Cleared existing bus bookings');

    // Insert sample bookings
    const insertedBookings = await BusBooking.insertMany(sampleBookings);
    console.log(`✅ Inserted ${insertedBookings.length} sample bus bookings`);

    // Display inserted bookings
    console.log('\n📋 Sample Bus Bookings Created:');
    insertedBookings.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.bookingId}`);
      console.log(`   Passenger: ${booking.passengerName}`);
      console.log(`   Route: SECE → ${booking.route.name}`);
      console.log(`   Date: ${booking.travelDate.toDateString()}`);
      console.log(`   Fare: ₹${booking.totalFare}`);
      console.log(`   Status: ${booking.paymentStatus}`);
      console.log('');
    });

    console.log('🎉 Bus booking collection seeded successfully!');
    console.log('📊 Collection: busbookings');
    console.log('🔗 You can view this in MongoDB Compass');
    
  } catch (error) {
    console.error('❌ Error seeding bus bookings:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run seeding
const runSeed = async () => {
  await connectDB();
  await seedBusBookings();
};

runSeed();