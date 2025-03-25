import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins during development
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Registration endpoint
const registerHandler: RequestHandler = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log('Registration attempt for username:', username);

    // Check if username already exists
    const userCheck = await pool.query(
      'SELECT * FROM players WHERE username = $1',
      [username]
    ).catch(err => {
      console.error('Error checking username:', err);
      throw err;
    });

    if (userCheck.rows.length > 0) {
      console.log('Username already exists:', username);
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    // Check if email is provided and unique
    if (email) {
      const emailCheck = await pool.query(
        'SELECT * FROM players WHERE email = $1',
        [email]
      ).catch(err => {
        console.error('Error checking email:', err);
        throw err;
      });

      if (emailCheck.rows.length > 0) {
        console.log('Email already registered:', email);
        res.status(400).json({ error: 'Email already registered' });
        return;
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    console.log('Attempting to insert new user');
    const result = await pool.query(
      'INSERT INTO players (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, hashedPassword, email]
    ).catch(err => {
      console.error('Error inserting user:', err);
      throw err;
    });

    const newUser = result.rows[0];
    console.log('User registered successfully:', newUser.username);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Registration error details:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Login endpoint
const loginHandler: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Query the database for the user
    const result = await pool.query(
      'SELECT * FROM players WHERE username = $1',
      [username]
    );

    const user = result.rows[0];

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Routes
app.post('/api/auth/register', registerHandler);
app.post('/api/auth/login', loginHandler);

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Successfully connected to PostgreSQL database');
  release();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 