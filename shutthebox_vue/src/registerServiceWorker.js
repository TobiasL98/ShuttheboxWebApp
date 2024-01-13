import { Workbox } from "workbox-window";

let wb;

if ("serviceWorker" in navigator) {
  const serviceWorkerPath = `${process.env.BASE_URL}service-worker.js`;
  wb = new Workbox(serviceWorkerPath);

  wb.addEventListener("controlling", () => {
    window.location.reload();
  });

  wb.register()
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
} else {
  wb = null;
}

export default wb;
