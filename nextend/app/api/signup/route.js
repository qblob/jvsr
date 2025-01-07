import { insertIntoDatabase } from '../../../backend/dbInterface';
import argon2 from 'argon2';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const hashedPassword = await argon2.hash(password);
    const user = { username, password: hashedPassword };
    await insertIntoDatabase('users', user);
    return new Response(JSON.stringify({ message: 'User signed up successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error signing up user:', error.message);
    console.error('Stack trace:', error.stack);
    return new Response(JSON.stringify({ error: 'Failed to sign up user.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
