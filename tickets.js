const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

const uri = 'mongodb://localhost:27017';
const dbName = 'campus_hub';

// Add ticket directly to MongoDB
router.post('/add-ticket', async (req, res) => {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('bus_tickets');

    const { passengerName, phone, route, travelDate, passengers, paymentMethod } = req.body;

    // Calculate fare based on route
    const fares = {
      'SECE to Chennai Central': 120,
      'SECE to Bangalore': 450,
      'SECE to Coimbatore': 200,
      'SECE to Madurai': 320,
      'SECE to Trichy': 250
    };

    const baseFare = fares[route] || 100;
    const totalFare = baseFare * passengers;

    const ticket = {
      ticketId: 'TKT' + Date.now(),
      passengerName,
      phone,
      route,
      travelDate: new Date(travelDate),
      passengers,
      totalFare,
      paymentStatus: 'Paid',
      paymentMethod,
      bookingDate: new Date(),
      status: 'Confirmed'
    };

    const result = await collection.insertOne(ticket);
    
    res.json({
      success: true,
      message: 'Ticket added successfully to MongoDB',
      ticketId: ticket.ticketId,
      insertedId: result.insertedId
    });

  } catch (error) {
    console.error('Error adding ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding ticket to MongoDB',
      error: error.message
    });
  } finally {
    await client.close();
  }
});

// Get all tickets from MongoDB
router.get('/tickets', async (req, res) => {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('bus_tickets');

    const tickets = await collection.find({}).sort({ bookingDate: -1 }).toArray();
    
    res.json({
      success: true,
      tickets: tickets,
      count: tickets.length
    });

  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tickets from MongoDB',
      error: error.message
    });
  } finally {
    await client.close();
  }
});

module.exports = router;