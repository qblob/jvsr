import { queryDatabase } from '../../../backend/dbInterface';

export async function GET() {
  try {
    const posts = await queryDatabase('AdminPosts');
    // console.log('Retrieved posts:', JSON.stringify(posts, null, 2));
    console.log('Retrieved posts success');
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error retrieving posts:', error.message);
    console.error('Stack trace:', error.stack);
    return new Response(JSON.stringify({ error: 'Failed to retrieve posts.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
