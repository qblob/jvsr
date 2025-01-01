import { insertIntoDatabase } from '../../../backend/dbInterface';
import { Binary } from 'mongodb';

export async function POST(req) {
  try {
    const { content } = await req.json();
    console.log('Received content:', JSON.stringify(content, null, 2));
    const processedContent = content.map(item => {
      if (item.type === 'image' || item.type === 'video') {
        console.log(`Processing ${item.type}:`, item.value);
        return { ...item, value: new Binary(Buffer.from(item.value.split(',')[1], 'base64')) };
      }
      return item;
    });
    console.log('Processed content:', JSON.stringify(processedContent, null, 2));
    await insertIntoDatabase('AdminPosts', { content: processedContent, createdAt: new Date() });
    return new Response(JSON.stringify({ message: 'Content saved successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving content:', error.message);
    console.error('Stack trace:', error.stack);
    return new Response(JSON.stringify({ error: 'Failed to save content.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
