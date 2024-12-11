// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAu8yHaNBCxNXMJ-1M1BY7ac9vUhzqPDVE",
    authDomain: "pmnm2024-c51ea.firebaseapp.com",
    projectId: "pmnm2024-c51ea",
    storageBucket: "pmnm2024-c51ea.firebasestorage.app",
    messagingSenderId: "970289693845",
    appId: "1:970289693845:web:6d02871359e3736fc8479c",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  // Customize the notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
