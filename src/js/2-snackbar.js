import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let milliseconds = null;
let selectState = null;

//elements:
const ms = document.querySelector('input[type="number"]');
const radioF = document.querySelector('input[value="fulfilled"]');
const radioR = document.querySelector('input[value="rejected"]');
const fieldset = document.querySelector('fieldset');
const btn = document.querySelector('button');
//======================

//!слушатели:
ms.addEventListener('input', saveMs);
fieldset.addEventListener('input', saveState);
btn.addEventListener('submit', createPromise);

//!handle functions:
function saveMs() {
  milliseconds = event.target.value;
}

function saveState() {
  event.target === radioF || event.target === radioR;
  selectState = event.target.value;
}
//====================================
function createPromise() {
  event.preventDefault();
  const prom = new Promise((resolve, reject) => {});

  prom.then(greenIziToast(milliseconds));
  prom.catch(redIziToast(milliseconds));
}
//show iziToasts, in delay will put milliseconds:
function greenIziToast(delay) {
  iziToast.show({
    color: 'green',
    message: `✅ Fulfilled promise in ${delay}ms`,
  });
}
function redIziToast(delay) {
  iziToast.show({
    color: 'red',
    message: `❌ Rejected promise in ${delay}ms`,
  });
}
