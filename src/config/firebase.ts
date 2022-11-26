import { Config } from "../interfaces/firebase";

export function getFirebaseConfig(): Config{
	try {
		const apiKey = process.env.FIREBASE_API_KEY;
		const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
		const projectId =  process.env.FIREBASE_PROJECT_ID;
		const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
		const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
		const appId = process.env.FIREBASE_APP_ID;
		const measurementId = process.env.FIREBASE_MEASUREMENT_ID;

		return {
			apiKey,
			authDomain,
			projectId,
			storageBucket,
			messagingSenderId,
			appId,
			measurementId
		}
		
	} catch(e) {
		console.group('ERROR loading firebase env variables');
		console.error(e);
	}
}