const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());

// Добавете CORS middleware ПРЕДИ всички routes
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: 'admin',
  host: process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost',
  database: 'hospital_scheduler',
  password: 'dev_password_123',
  port: 5432,
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await pool.query('SELECT 1');
    res.json({ 
      status: 'OK', 
      service: 'Hospital API',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      service: 'Hospital API',
      database: 'disconnected',
      error: error.message 
    });
  }
});

// Get all operating rooms
app.get('/api/operating-rooms', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM operating_rooms ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all staff
app.get('/api/staff', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM staff ORDER BY first_name, last_name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🏥 Hospital backend running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`🏥 Operating rooms: http://localhost:${port}/api/operating-rooms`);
  console.log(`👥 Staff: http://localhost:${port}/api/staff`);
});
