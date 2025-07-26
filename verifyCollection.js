const mongoose = require('mongoose');
const BusBooking = require('./models/BusBooking');
require('dotenv').config();

async function verifyCollection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔗 Connected to MongoDB');

    // Get collection stats
    const count = await BusBooking.countDocuments();
    console.log(`📊 Total tickets in collection: ${count}`);

    // Get all tickets
    const tickets = await BusBooking.find().sort({ createdAt: -1 });
    
    console.log('\n🎫 Ticket Details:');
    console.log('='.repeat(80));
    
    tickets.forEach((ticket, index) => {
      console.log(`\n${index + 1}. Booking ID: ${ticket.bookingId}`);
      console.log(`   Passenger: ${ticket.passengerName}`);
      console.log(`   Phone: ${ticket.phone}`);
      console.log(`   Route: SECE → ${ticket.route.name}`);
      console.log(`   Travel Date: ${ticket.travelDate.toDateString()}`);
      console.log(`   Passengers: ${ticket.passengers}`);
      console.log(`   Total Fare: ₹${ticket.totalFare}`);
      console.log(`   Payment: ${ticket.paymentStatus} (${ticket.paymentMethod})`);
      console.log(`   Status: ${ticket.status}`);
    });

    // Query examples
    console.log('\n🔍 Query Examples:');
    console.log('='.repeat(50));
    
    const paidTickets = await BusBooking.find({ paymentStatus: 'Paid' });
    console.log(`✅ Paid tickets: ${paidTickets.length}`);
    
    const pendingTickets = await BusBooking.find({ paymentStatus: 'Pending' });
    console.log(`⏳ Pending tickets: ${pendingTickets.length}`);
    
    const todayTickets = await BusBooking.find({
      travelDate: {
        $gte: new Date().setHours(0,0,0,0),
        $lt: new Date().setHours(23,59,59,999)
      }
    });
    console.log(`📅 Today's tickets: ${todayTickets.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

verifyCollection();