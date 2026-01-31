importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyADLkAkLTqIQf7h_doRZdMEMAg4F7bvUAc",
  authDomain: "portal360-dcc07.firebaseapp.com",
  projectId: "portal360-dcc07",
  storageBucket: "portal360-dcc07.appspot.com",
  messagingSenderId: "257771081405",
  appId: "1:257771081405:web:2fa62a0d24e9ba0b39b1d4",
  measurementId: "G-05QPQQXRPD",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message:", payload);

  const notificationTitle =
    payload.notification?.title || payload.data?.title || "New Notification";
  const notificationBody =
    payload.notification?.body || payload.data?.body || "You have a new update";

  const notificationOptions = {
    body: notificationBody,
    icon: "/icon-192x192.png",
    badge: "/badge-72x72.png",
    tag: payload.data?.taskId || "default",
    data: payload.data || {},
    requireInteraction: true,
    vibrate: [200, 100, 200],
  };

  console.log("[SW] Showing notification:", notificationTitle);

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked:", event.notification.data);

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          const url = event.notification.data?.taskId
            ? `/tasks?taskId=${event.notification.data.taskId}`
            : "/dashboard";
          return clients.openWindow(url);
        }
      })
  );
});
