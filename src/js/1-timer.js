import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
let userSelectedDate = null; //! select date in milliseconds
let saveInterval = null; //! interval time in milliseconds

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startActive(userSelectedDate);
    console.log(selectedDates[0]);
  },
};

flatpickr(dateInput, options);

dateInput.addEventListener('input', saveValue);

startBtn.addEventListener('click', start);

function saveValue() {
  let a = flatpickr.parseDate(dateInput.value);
  userSelectedDate = a.getTime();
  intervalTime(userSelectedDate);
}

function startActive(a) {
  if (a > Date.now()) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
    iziToast.error({
      color: 'red',
      message: 'Please select a future date.',
      position: 'topRight',
      close: false,
    });
  }
}

function intervalTime(a) {
  saveInterval = a - Date.now();
} //! in a put select date in milliseconds, a = number; (userSelectedDate)

function start() {
  updateInterval();
}

function updateInterval() {
  let intervalId = setInterval(() => {
    saveInterval -= 1000;
    showDateHtml(convertMs(saveInterval));
    if (saveInterval > 0) {
      startBtn.disabled = true;
      dateInput.disabled = true;
    } else {
      clearInterval(intervalId);
      startBtn.disabled = false;
      dateInput.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showDateHtml(data) {
  days.textContent = String(data.days).padStart(2, '0');
  hours.textContent = String(data.hours).padStart(2, '0');
  minutes.textContent = String(data.minutes).padStart(2, '0');
  seconds.textContent = String(data.seconds).padStart(2, '0');
}
