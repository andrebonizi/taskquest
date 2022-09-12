import App from './App.svelte';
import { getFirebaseConfig } from './config/firebase';

const app = new App({
	target: document.body,
	props: {
		name: 'Bonizi',
		firebaseConfig: getFirebaseConfig()
	}
});

export default app;