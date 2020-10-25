import '../scss/main.scss';
import swal from 'sweetalert';

// uncomment the lines below to enable PWA
import {registerSW} from './pwa.js';
registerSW();

/* place your code below */

console.log('HELLO 🚀')

/* My variables */

const hamburger = document.querySelector(".hamburger--js");
const nav = document.querySelector(".nav--js");
const addGlass = document.querySelector(".add-glass--js");
const deleteGlass = document.querySelector(".delete-glass--js");
const counter = document.querySelector(".counter--js");
const key = new Date().toISOString().slice(0,10);
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

addGlass.addEventListener('click', function(event) {
    result++;
    localStorage.setItem(key, result);
    if (result > 16) {
        result = 16;
        swal("You've alredy drunk 4L of water");
    }
    counter.innerHTML = result;
});


/* Deleting glass */

deleteGlass.addEventListener('click', function(event) {
    result--;
    if (result <= 0) {
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