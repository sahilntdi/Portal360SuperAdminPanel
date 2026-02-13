import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging, deleteToken } from 'firebase/messaging';
import api from './axios';

const firebaseConfig = {
  apiKey: "AIzaSyADLkAkLTqIQf7h_doRZdMEMAg4F7bvUAc",
  authDomain: "portal360-dcc07.firebaseapp.com",
  projectId: "portal360-dcc07",
  storageBucket: "portal360-dcc07.appspot.com",
  messagingSenderId: "257771081405",
  appId: "1:257771081405:web:2fa62a0d24e9ba0b39b1d4",
  measurementId: "G-05QPQQXRPD"
};

let firebaseApp: FirebaseApp | null = null;
let messaging: Messaging | null = null;

const initializeFirebase = (): FirebaseApp => {
  if (!firebaseApp) {
    if (getApps().length === 0) {
      firebaseApp = initializeApp(firebaseConfig);
      console.log('Firebase initialized');
    } else {
      firebaseApp = getApps()[0];
    }
  }
  return firebaseApp;
};


const getMessagingInstance = (): Messaging | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    if (!messaging) {
      const app = initializeFirebase();
      messaging = getMessaging(app);
    }
    return messaging;
  } catch (error) {
    console.error('Messaging error:', error);
    return null;
  }
};

const requestPermission = async (): Promise<boolean> => {
  try {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported');
      return false;
    }

    const permission = await Notification.requestPermission();
    console.log('Permission result:', permission);
    return permission === 'granted';
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};

export const initializeFCMToken = async (): Promise<boolean> => {
  try {
    console.log('Starting FCM token initialization...');
    
    const messagingInstance = getMessagingInstance();
    if (!messagingInstance) {
      console.warn('Messaging instance not available');
      return false;
    }

    if (Notification.permission !== 'granted') {
      console.log('Requesting notification permission...');
      const granted = await requestPermission();
      if (!granted) {
        console.log('Notification permission denied');
        return false;
      }
    } else {
      console.log('Notification permission already granted');
    }

    console.log('Waiting for service worker...');
    
    let registration;
    try {
      registration = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Service worker timeout')), 10000)
        )
      ]) as ServiceWorkerRegistration;
      
      console.log('Service worker ready:', registration);
    } catch (swError) {
      console.error('Service worker error:', swError);
      
      console.log('Attempting to register service worker...');
      try {
        registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        await navigator.serviceWorker.ready;
        console.log('Service worker registered successfully');
      } catch (registerError) {
        console.error('Failed to register service worker:', registerError);
        return false;
      }
    }

    const token = await getToken(messagingInstance, {
      vapidKey: 'BF3EA5PeVTzf_l9K1y1FD2svU4Mb2jgDMh4-SzQ0dbUf9pnBp6sTCEr_tnHTs_OREJENF0ELVPf3iTDl6RlJPtk',
      serviceWorkerRegistration: registration,
    });

    if (!token) {
      console.warn('No FCM token received');
      return false;
    }

    console.log('FCM Token obtained:', token.substring(0, 20) + '...');

    const response = await api.post('/fcm/fcm-token', { token });
    console.log('Backend response:', response.data);

    console.log('FCM token saved successfully');

    return true;
  } catch (error: any) {
    console.error('FCM initialization error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return false;
  }
};

export const cleanupFCMToken = async (): Promise<void> => {
  try {

    const messagingInstance = getMessagingInstance();
    
    if (messagingInstance) {
      console.log('Deleting token from Firebase...');
      try {
        await deleteToken(messagingInstance);
        console.log('Token deleted from Firebase');
      } catch (error) {
        console.warn('Could not delete Firebase token:', error);
      }
    }

    console.log('Removing token from backend...');
    try {
      await api.delete('/fcm/fcm-token');
      console.log('Token removed from backend');
    } catch (error) {
      console.warn('Could not remove token from backend:', error);
    }
    
    console.log('FCM token cleanup completed');
  } catch (error) {
    console.error('FCM cleanup error:', error);
  }
};

export const setupMessageListener = (): (() => void) | null => {
  const messagingInstance = getMessagingInstance();
  if (!messagingInstance) {
    console.warn('Cannot setup message listener - messaging not available');
    return null;
  }
  
  const unsubscribe = onMessage(messagingInstance, (payload) => {
    console.log('Foreground message received:', payload);

    const title = payload.notification?.title || payload.data?.title || 'New Notification';
    const body = payload.notification?.body || payload.data?.body || '';

    if (Notification.permission === 'granted') {
      console.log('Showing notification:', title);
      new Notification(title, {
        body,
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        data: payload.data,
      });
    } else {
      console.warn('Cannot show notification - permission not granted');
    }
  });

  console.log('Message listener setup complete');
  return unsubscribe;
};

export default {
  initializeFCMToken,
  cleanupFCMToken,
  setupMessageListener,
};