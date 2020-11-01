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
const water = document.querySelector('.water-glass--js');

// localStorage values //
const key = new Date().toISOString().slice(0, 10);
const keyValue = localStorage.getItem(key);

// GREETINGS NEW USERS //

if (!keyValue) {
    swal("WELCOME!", "Nice to see you here!", "info");
}
if (!keyValue) {
    swal("hydrAPP", "To begin just simply tap the Add glass button and start enyoing hydrated life!", "info");
}

// LOCALSTORAGE //

let result = '';
counter.value = result;

if (!keyValue) {
    result = 0;
    localStorage.setItem(key, result);
} else {
    water.style.opacity = 0.05;
    result = keyValue;
    counter.innerHTML = result;
}

// ADDING A GLASS //

addGlass.addEventListener('click', function (event) {
    result++;
    if (result == 8) {
        swal("", "You've alredy drunk 2L of water. Good job! ", "success");
    }
    if (result == 16) {
        swal("", "You have to be very thursty! 4l behind you :)", "success");
    }
    localStorage.setItem(key, result);
    counter.innerHTML = result;
});


// DELETING A GLASS //

deleteGlass.addEventListener('click', function (event) {
    result--;
    if (result < 0) {
        swal("Oops!", "You don't have anything to delete", "error");
        result = 0;
    }
    localStorage.setItem(key, result);
    counter.innerHTML = result;
});

// GLASS ANIMATION //




// WATER OPACITY //




// HAMBURGER MENU //

hamburger.addEventListener('click', function (event) {
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});


//  SETTINGS - subpage //

menuSettings.addEventListener('click', function (event) {
    settings.classList.add('settings--open');
    stats.classList.remove('stats--open');
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});

//   HOME  - subpage   //

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
    type: 'line',
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
            chartDate.push(key.slice(5, 10));
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
