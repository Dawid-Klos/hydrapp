import '../scss/main.scss';
import swal from 'sweetalert';
import chart from 'chart.js';
// uncomment the lines below to enable PWA
import { registerSW } from './pwa.js';
registerSW();

/* place your code below */

console.log('HELLO 🚀')

/* My variables */


const menuStats = document.querySelector('.nav__link--stats');
const menuSettings = document.querySelector('.nav__link--settings');
const menuBacktoHome = document.querySelector('.nav__link--home');
const stats = document.querySelector('.stats--js');
const settings = document.querySelector('.settings--js');
const hamburger = document.querySelector(".hamburger--js");
const nav = document.querySelector(".nav--js");
const addGlass = document.querySelector(".add-glass--js");
const deleteGlass = document.querySelector(".delete-glass--js");
const counter = document.querySelector(".counter--js");
const key = new Date().toISOString().slice(0, 10);
let result = '';



/* localStorage */

counter.value = result;

const drunkWater = localStorage.getItem(key);

if (!drunkWater) {
    result = 0;
    localStorage.setItem(key, result);
} else {
    result = localStorage.getItem(key);
    counter.innerHTML = result;
}

/* Adding glass */

addGlass.addEventListener('click', function (event) {
    result++;
    localStorage.setItem(key, result);
    if (result = 8) {
        swal("You've alredy drunk 2L of water. Good job! :)");
    }
    counter.innerHTML = result;
});


/* Deleting glass */

deleteGlass.addEventListener('click', function (event) {
    result--;
    if (result < 0) {
        swal("You don't have anything to delete");
        result = 0;
    }
    localStorage.setItem(key, result);
    counter.innerHTML = result;
});


/* Hamburger menu */

hamburger.addEventListener('click', function (event) {
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});

// !!! STATISTICS PAGE !!! //

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

// !!! HISTORY CHART !!! //


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

//* !!! SETTINGS !!! *//

menuSettings.addEventListener('click', function (event) {
    settings.classList.add('settings--open');
    stats.classList.remove('stats--open');
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});

/* Back to main page */

menuBacktoHome.addEventListener('click', function (event) {
    stats.classList.remove('stats--open');
    settings.classList.remove('settings--open');
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});
