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
    if (result >= 8) {;
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

/* Stats */

// button
menuStats.addEventListener('click', function(event) {
    stats.classList.add('stats--open');
    settings.classList.remove('settings--open');
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});

// history

const storage = Object.entries(localStorage).sort((a, b) => b[0].localeCompare(a[0]));

// for (const [key, value] of storage ) {
//     if (value !== 'INFO') {

//         let div = document.getElementById('div');
//         div.insertAdjacentHTML('beforeend', `<div class="stats__history--div">${key}          Liczba wypitych szklanek: ${value}</div>`);
//     }
//   }

// history chart 

let chartDate = [];
let chartGlassesValue = [];

function drinkingChartValues() {

    
    for (const [key, value] of storage ) {

        if (value !== 'INFO' && chartDate.length < 7) {
            chartDate.push(key.slice(5,10));
            chartGlassesValue.push(value);

        }
        console.log(chartDate);
        console.log(chartGlassesValue);

    }    

}

function updateDrinkingChart(){
    myDrinkingChart.data.datasets[0].data = chartGlassesValue;
    myDrinkingChart.data.labels = chartDate;
    myDrinkingChart.update();  
}

let ctx = document.getElementById('myChart').getContext('2d');
let myDrinkingChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Water drinking history',
            data: [12, 19, 3, 5, 2, 3, 4],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

drinkingChartValues();
updateDrinkingChart();

/* Settings */

menuSettings.addEventListener('click', function(event) {
    settings.classList.add('settings--open');
    stats.classList.remove('stats--open');
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});

/* Back to main page */

menuBacktoHome.addEventListener('click', function(event) {
    stats.classList.remove('stats--open');
    settings.classList.remove('settings--open');
    nav.classList.toggle('nav--open');
    hamburger.classList.toggle('is-active');
});
