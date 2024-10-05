// HTML Elements used
const dropdownDisplaySelector = document.getElementById("display-selector");
const btnCurrentDay = document.getElementById("button-today");
const btnPrev = document.getElementById("button-previous");
const btnNext = document.getElementById("button-next");
const planningCalendar = document.getElementById("planning-calendar");

// Initialize the currentDate variable to today's date
let currentDate = new Date();

btnCurrentDay.addEventListener('click', goToToday);
btnPrev.addEventListener('click', goToPreviousDay);
btnNext.addEventListener('click', goToNextDay);

function updateDayHeader(date) {
  const dayDisplay = document.querySelector("day-calendar");
  const dayHeader = dayDisplay.shadowRoot.querySelector(".day-header");

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);
  dayHeader.textContent = formattedDate;

  console.log("set date : ", formattedDate);
}

function goToToday() {
  currentDate = new Date(); // Reset the date to today
  updateDayHeader(currentDate);
}

function goToPreviousDay() {
  currentDate.setDate(currentDate.getDate() - 1); // Go to the previous day
  updateDayHeader(currentDate);
}

function goToNextDay() {
  currentDate.setDate(currentDate.getDate() + 1); // Go to the next day
  updateDayHeader(currentDate);
}

// Initialize the display to today's date on page load
document.addEventListener('DOMContentLoaded', () => {
  updateDayHeader(currentDate);
});

// Initialize the DayDisplay component

// Add event listeners to the buttons
// btnCurrentDay.addEventListener('click', () => {
//   const dayDisplay = document.querySelector("day-calendar");
//   const dayHeader = dayDisplay.shadowRoot.querySelector(".day-header");
//   console.log(dayDisplay);
//   console.log(dayHeader);
//   const currentDate = new Date();
//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//   const formattedDate = currentDate.toLocaleDateString(undefined, options);
//   dayHeader.textContent = formattedDate;
//   dayHeader.style.color = "purple";
//   console.log(formattedDate);
//
//   console.log(currentDate);
// });

// Change display function
function changeDisplay() {
  const selectedValue = dropdownDisplaySelector.value;
  let display = '';
  switch (selectedValue) {
    case '1':
      display = "day";
      break;
    case '2':
      display = "week";
      break;
    case '3':
      display = "month";
      break;
    case '4':
      display = "year";
      break;
    default:
      return; // Early return if no valid display type
  }

  // Clear current calendar
  while (planningCalendar.firstChild) {
    planningCalendar.removeChild(planningCalendar.firstChild);
  }

  // Create and append the new calendar
  const newCalendar = document.createElement(`${display}-calendar`);
  planningCalendar.appendChild(newCalendar);

  console.log(`${display} display`);
}

// Add event listener for dropdown
dropdownDisplaySelector.addEventListener('change', changeDisplay);






