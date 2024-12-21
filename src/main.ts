import App from './App.svelte';
import { getFirebaseConfig } from './firebase/setup';

const firebaseConfig = getFirebaseConfig();
const app = new App({
  target: document.body,
  props: { firebaseConfig },
});

export default app;
