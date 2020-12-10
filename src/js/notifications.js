import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

// ASK TO INSTALL THE APP //

console.log("Hello");

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  Swal.fire({
    title: "Welcome!",
    text: "Just before you start, would you like to install the hydrapp?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3767AD",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, install it!",
  }).then((result) => {
    if (result.isConfirmed) {
      e.preventDefault();
      deferredPrompt = e;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("user accepted A2HS prompt");
          swal.close();
        } else {
          console.log("user dismissed A2HS prompt");
          swal.close();
        }
        deferredPrompt = null;
      });
    }
  }),
    true;
});

Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

function displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        let options = {
          body: "Hey! It's time to get some water.",
          icon: '../assets/img/water-mini.svg',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification('Hydrapp', options);
      });
    }
  }

function checkDate() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes;
    if (hour === 8 || hour === 9 || hour === 10 || hour === 12 || hour === 14 || hour === 16) {
        displayNotification();
    }
    if (hour == 12 && minutes == 1) {
      displayNotification();
    }
    if (hour == 12 && minutes == 3) {
      displayNotification();
    }
    if (hour == 12 && minutes == 5) {
      displayNotification();
    }
    if (hour == 12 && minutes == 8) {
      displayNotification();
    }
    if (hour == 12 && minutes == 10) {
      displayNotification();
    }
}
let dateLoop = setInterval(function() {
    checkDate();
},1800000);