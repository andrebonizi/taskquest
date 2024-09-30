import App from './App.svelte';
import { getFirebaseConfig } from './firebase/setup';

const app = new App({
  target: document.body,
  props: {
    firebaseConfig: getFirebaseConfig(),
  },
});

export default app;
