import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig();
    const firebaseConfig = {
        apiKey: config.public.firebase.apiKey,
        authDomain: config.public.firebase.authDomain,
        projectId: config.public.firebase.projectId,
        storageBucket: config.public.firebase.storageBucket,
        messagingSenderId: config.public.firebase.messagingSenderId,
        appId: config.public.firebase.appId,
        measurementId: config.public.firebase.measurementId
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // 注入 Firebase 到 Nuxt 應用
    nuxtApp.provide('auth', auth);
    nuxtApp.provide('signInWithEmailAndPassword', signInWithEmailAndPassword);
    nuxtApp.provide('createUserWithEmailAndPassword', createUserWithEmailAndPassword);
    nuxtApp.provide('signOut', signOut);
});