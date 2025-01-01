import { queryDatabase } from '../../../backend/dbInterface';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const users = await queryDatabase('users', { username });
    if (users.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found. Please try again or sign up to get started.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const user = users[0];
    const passwordMatch = await argon2.verify(user.password, password);
    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: 'Invalid password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return new Response(JSON.stringify({ message: 'Login successful!', token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    console.error('Stack trace:', error.stack);
    return new Response(JSON.stringify({ error: 'Failed to log in user.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
