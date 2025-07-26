const mongoose = require('mongoose');
const BusBooking = require('./models/BusBooking');

// Test MongoDB connection and create sample booking
async function testMongoDB() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/campus_hub');
        console.log('✅ Connected to MongoDB');

        // Test creating a booking
        const testBooking = new BusBooking({
            passengerName: 'Test User',
            phone: '9999999999',
            travelDate: new Date(),
            passengers: 1,
            route: {
                id: 1,
                name: 'Coimbatore',
                distance: '30 km',
                fare: 45.00,
                time: '45 min'
            },
            totalFare: 45.00,
            paymentStatus: 'Paid',
            paymentMethod: 'UPI',
            status: 'Confirmed'
        });

        const savedBooking = await testBooking.save();
        console.log('✅ Test booking created:', savedBooking.bookingId);

        // Fetch all bookings
        const allBookings = await BusBooking.find();
        console.log(`📊 Total bookings in database: ${allBookings.length}`);

        mongoose.connection.close();
        console.log('✅ Test completed successfully');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

testMongoDB();