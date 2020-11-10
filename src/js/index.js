import '../scss/main.scss';
import swal from 'sweetalert';
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
const goalValue = localStorage.getItem(select1);
const capacityValue = localStorage.getItem(select2);


//             //


// GREETINGS NEW USERS //

if (!firstTime) {
    swal("WELCOME!", "Please, before you start to explore our app:\n Allow for notifications.\n It helps to keep your hydration on 100%! \n And don't forget to install our app! :)", "info");
    localStorage.setItem("firstTime", "1");
};


// WELCOME TO USERS EVERY DAY //


if (!keyValue) {
    swal("WELCOME!", "Nice to see you back. :)", "info");
}

// ADDING A GLASS //

addGlass.addEventListener('click', function (event) {
    result++;
    progress();
    if (result == 4) {
        swal("", "You've alredy drunk 1l of water.\n \n Good job! ", "success");
    }
    if (result == 16) {
        swal("", "You have to be very thursty! \n \n 4l behind you :)", "success");
    }
    localStorage.setItem(key, result);
    counter.innerHTML = result;
    glassAnimation();
});

// DELETING A GLASS //

deleteGlass.addEventListener('click', function (event) {
    result--;
    progress();
    if (result < 0) {
        swal("Oops!", "You don't have anything to delete", "error");
        result = 0;
    }
    localStorage.setItem(key, result);
    counter.innerHTML = result;
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
    const progress = (result / myGoal) * 100;
  
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
      swal("Daily goal", "Congratulations! \n \n You've achieved your goal today :)", "success");
    }
    localStorage.setItem("opacity", opacityValue);
  };




  // LOCALSTORAGE - loading //

let result = '';
counter.value = result;

if (!keyValue) {
    result = 0;
    localStorage.setItem(key, result);
} else {
    result = keyValue;
    counter.innerHTML = result;

}




// HAMBURGER MENU //

hamburger.addEventListener('click', function (event) {
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});


//  SETTINGS - subpage //

// button //
menuSettings.addEventListener('click', function (event) {
    settings.classList.add('settings--open');
    stats.classList.remove('stats--open');
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});


// myGoal and myCapacity //


let select1 = 'myGoal';
let select2 = 'myCapacity';
let myGoal = 8;
let myCapacity = 250;

if(!goalValue || !capacityValue) {
    localStorage.setItem(select1, myGoal);
    localStorage.setItem(select2, myCapacity);
} else {
    myGoal = goalValue;
    myCapacity = capacityValue;
}

// Save choice //

saveChoices.addEventListener('click', function (event) {
    myGoal = goalChoice.value;
    myCapacity = capacityChoice.value;
    localStorage.setItem(select1, myGoal);
    localStorage.setItem(select2, myCapacity);

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

// sorting values in localStorage //

const storage = Object.entries(localStorage).sort((a, b) => b[0].localeCompare(a[0]));

// MY DRINKING CHART HISTORY //

// Chart.js //

let ctx = document.getElementById('myChart').getContext('2d');
let config = {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Last 7 days of drinking',
            data: [12, 19, 3, 5, 2, 3, 4],
            backgroundColor: [
                'rgba(55, 102, 173, 0.8)',
                'rgba(55, 102, 173, 0.8)',
                'rgba(55, 102, 173, 0.8)',
                'rgba(55, 102, 173, 0.8)',
                'rgba(55, 102, 173, 0.8)',
                'rgba(55, 102, 173, 0.8)',
                'rgba(55, 102, 173, 0.8)'
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


// Updating chart by localStorage data //

let chartDate = [];
let chartGlassesValue = [];

function drinkingChartValues() {

    for (const [key, value] of storage) {

        if (value !== 'INFO' && chartDate.length < 7) {
            chartDate.push(key.slice(5,10));
            chartGlassesValue.push(value);
        }
    }
}

// chart updating //

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


// PUSH NOTIFICATIONS - test //

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
//   displayNotification();