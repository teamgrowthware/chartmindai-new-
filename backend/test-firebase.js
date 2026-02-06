
import { db } from './firebase.js';

async function testConnection() {
  console.log('Testing Firestore Connection...');
  try {
    const testDoc = db.collection('test').doc('test-doc');
    await testDoc.set({
      timestamp: new Date().toISOString(),
      message: 'Hello from backend',
    });
    console.log('Successfully wrote to Firestore!');

    const doc = await testDoc.get();
    console.log('Successfully read from Firestore:', doc.data());
  } catch (error) {
    console.error('Firestore Connection Failed:', error);
  }
}

testConnection();
