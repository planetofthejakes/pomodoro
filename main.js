// grab the dom elements
const buttonTimer = document.querySelectorAll('.timer-button'); // buttons
const display = document.querySelector('.display-timer'); // h1 display
let countdown; // var to hold our interval

// display our timer
function displayTimer(seconds) {
  // grab minutes and seconds and seconds left and then display
  const mins = Math.floor(seconds / 60); // math.floor that shit yo
  const remainingSeconds = seconds % 60; // the seconds remaining out of 60 total
  const timeLeft = `${mins}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`; // if remaining seconds is less than 10 then add a 0, otherwise just display remainingSeconds
  display.textContent = timeLeft; // update and display on document
  document.title = timeLeft; // show timer in tab
}

// run our timer countdown 
function timer(seconds) {
  // grab the date
  const now = Date.now(); // this is going to be in milliseconds
  const then = now + seconds * 1000; // multiply by 1000 so you turn secs into millis
  displayTimer(seconds); // show it initially so it 
  display.style.animation = 0; // remove initial animation style on input
  countdown = setInterval( () => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // divide by 1000 to turn into seconds for display
    console.log(secondsLeft);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimer(secondsLeft);
  }, 1000)
}

// start the timer on button click
function startTimer() {
  clearInterval(countdown);
  // grab the data in the buttons for each time and convert from string to integer
  const seconds = parseInt(this.dataset.time, 10);
  timer(seconds);
}

// connect the buttons
buttonTimer.forEach(button => button.addEventListener('click', startTimer));

// hook up the the input value into time
// can grab specific form name this way by calling event listener on document and then dot notation to the name of the form's class, minutes
// eslint-disable-next-line func-names
document.minutes.addEventListener('submit', function(e) { 
  e.preventDefault(); // prevent reload on submish
  const seconds = this.mins.value;
  this.reset();
  clearInterval(countdown);
  display.style.animation = 0; // remove animation on input
  timer(seconds * 60); // multiply by 60 to get the minutes instead 
})