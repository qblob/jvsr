import { queryDatabaseWithLimit } from '../../../backend/dbInterface';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit');
  const limitNumber = parseInt(limit, 10) || 5;

  try {
    const data = await queryDatabaseWithLimit('exampleCollection', limitNumber);
    // console.log('API data:', data); // Add logging
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    return new Response(JSON.stringify({ error: 'Error retrieving data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
