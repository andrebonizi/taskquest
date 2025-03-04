import { Config } from '../interfaces/firebase';

export function getFirebaseConfig(): Config {
  try {
    const apiKey = process.env.FIREBASE_API_KEY || null;
    const authDomain = process.env.FIREBASE_AUTH_DOMAIN || null;
    const projectId = process.env.FIREBASE_PROJECT_ID || null;
    const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || null;
    const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID || null;
    const appId = process.env.FIREBASE_APP_ID || null;
    const measurementId = process.env.FIREBASE_MEASUREMENT_ID || null;

    return {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId,
    };
  } catch (e) {
    return null;
  }
}
