import '../scss/main.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import chart from 'chart.js';
// uncomment the lines below to enable PWA
import { registerSW } from './pwa.js';
registerSW();

/* place your code below */

console.log('HELLO 🚀')

//  MY VARIABLES  //

// Menu links //
const nav = document.querySelector(".nav--js");
const menuStats = document.querySelector('.nav__link--stats');
const menuSettings = document.querySelector('.nav__link--settings');
const menuBacktoHome = document.querySelector('.nav__link--home');

// Subpages //
const stats = document.querySelector('.stats--js');
const settings = document.querySelector('.settings--js');
const hamburger = document.querySelector(".hamburger--js");

// Glass interactions //
const addGlass = document.querySelector(".add-glass--js");
const deleteGlass = document.querySelector(".delete-glass--js");
const counter = document.querySelector(".counter--js");
const water = document.querySelector('.water--js');
const waterGlass = document.querySelector('.main__water-glass');

// localStorage values //
const key = new Date().toISOString().slice(0, 10);
const keyValue = localStorage.getItem(key);
const firstTime = localStorage.getItem("firstTime");
const opacity = localStorage.getItem("opacity");

// Settings options //
const goalChoice = document.querySelector('.goal--js');
const capacityChoice = document.querySelector('.capacity--js');
const saveChoices = document.querySelector('.select--js');


// Goal, capacity, percentage - current status //
const goalStatus = document.querySelector('.goal');
const capacityStatus = document.querySelector('.capacity');
const percentageStatus = document.querySelector('.status');
const progressStatus = document.querySelector('.progress--js');
let select1 = 'myGoal';
let select2 = 'myCapacity';
const goalValue = localStorage.getItem(select1);
const capacityValue = localStorage.getItem(select2);


//             //


// GREETINGS NEW USERS //

// if (!firstTime) {
//     swal("WELCOME!", "Please, before you start to explore our app:\n Allow for notifications.\n It helps to keep your hydration on 100%! \n And don't forget to install our app! :)", "info");
//     localStorage.setItem("firstTime", "1");
// };

// WELCOME TO USERS EVERY DAY //

if (firstTime && !keyValue) {
    swal.fire("WELCOME!", "Nice to see you back. :)", "info");
}

// ADDING A GLASS //

addGlass.addEventListener('click', function (event) {
    result++;
    progress();
    if ((result * myCapacity) == 1000) {
        Swal.fire("", "You've alredy drunk 1l of water.\n \n Good job! ", "success");
    }
    localStorage.setItem(key, result);
    counter.innerHTML = result;
    glassAnimation();
    drinkingStatus();
});

// DELETING A GLASS //

deleteGlass.addEventListener('click', function (event) {
    result--;
    progress();
    if (result < 0) {
        Swal.fire("Oops!", "You don't have anything to delete", "error");
        result = 0;
    }
    localStorage.setItem(key, result);
    counter.innerHTML = result;
    drinkingStatus();
});


  // LOCALSTORAGE - loading //

let result = 0;
counter.value = result;

if (!keyValue) {
    result = 0;
    localStorage.setItem(key, result);
} else {
    result = keyValue;
    counter.innerHTML = result;

}

// SORTING VALUES IN LOCALSTORAGE //

const storage = Object.entries(localStorage).sort((a, b) => b[0].localeCompare(a[0]));

// MY GOAL AND MY CAPACITY AND MY STATUS BAR //


// default //
let myGoal = 4000;
let myCapacity = 250;

if(!goalValue || !capacityValue) {
    localStorage.setItem(select1, myGoal);
    localStorage.setItem(select2, myCapacity);
} else {
    myGoal = goalValue;
    myCapacity = capacityValue;
}

const drinkingStatus = () => {
    const percentage = ((result * myCapacity) / myGoal) * 100;
    percentageStatus.innerHTML = (Math.round(percentage) + " %");
    goalStatus.innerHTML = ((myGoal / myCapacity) + " glasses");
    capacityStatus.innerHTML = (myCapacity + " ml");
    progressStatus.value = ((result * myCapacity) / myGoal) * 100;
}
drinkingStatus();

// Save choice //

saveChoices.addEventListener('click', function (event) {
    myGoal = goalChoice.value;
    myCapacity = capacityChoice.value;
    localStorage.setItem(select1, myGoal);
    localStorage.setItem(select2, myCapacity);
    drinkingStatus();
    progress();
});

// HAMBURGER MENU //

hamburger.addEventListener('click', function (event) {
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});

//   HOME  - subpage   //

// button //
menuBacktoHome.addEventListener('click', function (event) {
    stats.classList.remove('stats--open');
    settings.classList.remove('settings--open');
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});

// STATISTIC - subpage//

// button //
menuStats.addEventListener('click', function (event) {
    stats.classList.add('stats--open');
    settings.classList.remove('settings--open');
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
    myDrinkingChart.destroy();
    myDrinkingChart = new Chart(ctx, config);
    updateConfig();
});

//  SETTINGS - subpage //

// button //
menuSettings.addEventListener('click', function (event) {
    settings.classList.add('settings--open');
    stats.classList.remove('stats--open');
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});

// GLASS ANIMATION //

function glassAnimation() {
    waterGlass.classList.add('water-glass--js');
    waterGlass.classList.add('animate__animated');
    waterGlass.classList.add('animate__shakeY');
    setTimeout(function() {
    waterGlass.classList.remove('water-glass--js');
    waterGlass.classList.remove('animate__animated');
    waterGlass.classList.remove('animate__shakeY');
    }, 400);
}

// WATER OPACITY //

let opacityValue;

if (!opacity || !keyValue) {
    water.style.opacity = 0.05;
    localStorage.setItem("opacity", "0.05");
} else {
    opacityValue = opacity;
    water.style.opacity = opacityValue;
}

const progress = () => {
    water.style.opacity = `${progress}%`;
    const progress = ((result * myCapacity) / myGoal) * 100;
  
    if (progress <= 20) {
      water.style.opacity = 0.2;
      opacityValue = water.style.opacity;
    } else if (progress <= 40) {
      water.style.opacity = 0.3;
      opacityValue = water.style.opacity;
    } else if (progress <= 60) {
      water.style.opacity = 0.4;
      opacityValue = water.style.opacity;
    } else if (progress <= 70) {
      water.style.opacity = 0.5;
      opacityValue = water.style.opacity;
    } else if (progress <= 80) {
      water.style.opacity = 0.6;
      opacityValue = water.style.opacity;
    } else if (progress <= 90) {
      water.style.opacity = 0.7;
      opacityValue = water.style.opacity;
    } else {
      water.style.opacity = 1;
      opacityValue = water.style.opacity;
    }
    if (progress == 100) {
      Swal.fire("Daily goal", "Congratulations! \n \n You've achieved your goal today :)", "success");
    }
    localStorage.setItem("opacity", opacityValue);
  };

// MY DRINKING CHART HISTORY //

// CHART.JS //

let ctx = document.getElementById('myChart').getContext('2d');
let config = {
    type: 'bar',
    data: {
        Labels: [],
        datasets: [{
            label: 'How much you have drunk this day',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            padding: 6,
            pointStyle: 'rectRounded',
            radius: 4,
            hitRadius: 1,
            borderWidth: 1,
        }]
    },
    options: {
        animation: {
            duration: 1,
            easing: 'linear'
        },
        layout: {
            padding: {
                left: 10,
                right: 20,
                top: 20,
                bottom: 10
            }
        },
        legend: {
            display: true,
            position: 'bottom',
    },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};

let myDrinkingChart = new Chart(ctx, config);


// UPDATING CHART BY LOCALSTORAGE VALUES //

let chartDate = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
let chartGlassesValue = [5,2,5,2,8,5,7];

function drinkingChartValues() {

    for (const [key, value] of storage) {

        if (value !== 'INFO' && key !== 'myCapacity' && key !== 'myGoal' && key !== 'opacity' && key !== 'firstTime' && chartDate.length < 7) {
            chartDate.push(key.slice(5,10));
            chartGlassesValue.push(value);
        }
    }
}

// CHART UPDATING //

function updateDrinkingChart() {
    myDrinkingChart.data.datasets[0].data = chartGlassesValue;
    myDrinkingChart.data.labels = chartDate;
    myDrinkingChart.update();
}

function updateConfig() {

    myDrinkingChart.options.animation = {
        duration: 1200,
        easing: "easeInCubic"
    };
    myDrinkingChart.update();
}

drinkingChartValues();
updateDrinkingChart();

// ASK TO INSTALL THE APP //

let deferredPrompt;

window.addEventListener('beforeinstallprompt', e => {

    Swal.fire({
        title: 'Welcome!',
        text: "Just before you start, would you like to install the hydrapp?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3767AD',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, install it!'
    }).then((result) => {
        if (result.isConfirmed) {
            e.preventDefault()
            deferredPrompt = e
            deferredPrompt.prompt()
            deferredPrompt.userChoice
              .then(choiceResult => {
                if(choiceResult.outcome === 'accepted') {
                  console.log('user accepted A2HS prompt')
                  swal.close()
                } else {
                  console.log('user dismissed A2HS prompt')
                  swal.close()
                }
                deferredPrompt = null
              })
        } 
    }),
    true
  })
  
// VH PROBLEM IN THE BROWSER //

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

// PUSH NOTIFICATIONS - test //
// Zacząłem budować skrypt, który wysyła powiadomienie o konkretnych godzinacg
// Sprawdzić czy działa

// Notification.requestPermission(function(status) {
//     console.log('Notification permission status:', status);
// });

// function displayNotification() {
//     if (Notification.permission == 'granted') {
//       navigator.serviceWorker.getRegistration().then(function(reg) {
//         var options = {
//           body: 'Here is a notification body!',
//           icon: 'images/example.png',
//           vibrate: [100, 50, 100],
//           data: {
//             dateOfArrival: Date.now(),
//             primaryKey: 1
//           }
//         };
//         reg.showNotification('Hello world!', options);
//       });
//     }
//   }

// function checkDate() {
//     let date = new Date();
//     let hour = date.getHours();
//     if (hour === 8 || hour === 10 || hour === 14 || hour === 16) {
//         displayNotification();
//     }
// }
// let dateLoop = setInterval(function() {
//     checkDate();
// },5000);

  