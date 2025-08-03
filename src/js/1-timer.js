import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
let userSelectedDate = null; //! select date in milliseconds

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      return iziToast.error({
        color: 'red',
        message: 'Please select a future date.',
        position: 'topRight',
        close: false,
      });
    }
    userSelectedDate = selectedDates[0];
    startBtn.disabled = false;
  },
};

flatpickr(dateInput, options);

startBtn.addEventListener('click', start);

function start() {
  updateInterval();
}

function updateInterval() {
  let intervalId = setInterval(() => {
    dateInput.disabled = true;
    const currentDate = Date.now();
    let diff = userSelectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(diff);
    console.log(String(days).padStart(2, '0'));
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    startBtn.disabled = true;
    if (diff <= 1000) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      dateInput.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
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
