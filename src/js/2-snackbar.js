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
const form = document.querySelector('.form');
//======================

//!слушатели:
ms.addEventListener('input', saveMs);
fieldset.addEventListener('input', saveState);
form.addEventListener('submit', createPromise);

//!handle functions:
function saveMs() {
  milliseconds = event.target.value;
}

function saveState() {
  event.target === radioF || event.target === radioR;
  selectState = event.target.value;
}

function createPromise() {
  event.target === btn;
  event.preventDefault();
  form.reset();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectState === 'fulfilled') {
        return resolve(milliseconds);
      } else {
        return reject(milliseconds);
      }
    }, milliseconds);
  })
    .then(function (delay) {
      iziToast.show({
        color: 'green',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(function (delay) {
      iziToast.show({
        color: 'red',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
}
