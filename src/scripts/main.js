// HTML Elements used
const dropdownDisplaySelector = document.getElementById("display-selector");
const btnCurrentDay = document.getElementById("button-today");
const btnPrev = document.getElementById("button-previous");
const btnNext = document.getElementById("button-next");
const planningCalendar = document.getElementById("planning-calendar");

// Initialize the DayDisplay component
const dayDisplay = document.createElement('day-calendar');

console.log("hello day display: ", dayDisplay);

// Add event listeners to the buttons
btnCurrentDay.addEventListener('click', () => dayDisplay.goToToday());
btnPrev.addEventListener('click', () => dayDisplay.goToPreviousDay());
btnNext.addEventListener('click', () => dayDisplay.goToNextDay());

console.log(btnCurrentDay); console.log(btnPrev); console.log(btnNext);

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

