// HTML Elements used
const dropdownDisplaySelector = document.getElementById("display-selector");
const btnCurrentDay = document.getElementById("button-today");
const btnBars = document.getElementById("button-bars");
const btnPrev = document.getElementById("button-previous");
const btnNext = document.getElementById("button-next");
const btnSearch = document.getElementById("button-search");
const btnHelp = document.getElementById("button-help");
const btnSettings = document.getElementById("button-settings");
const planningCalendar = document.getElementById("planning-calendar");

function changeDisplay() {
  const selectedValue = dropdownDisplaySelector.value;
  let display = '';
  switch (selectedValue) {
    case '1':
      display = "<day-calendar></day-calendar>";
      break;
    case '2':
      display = "<week-calendar></week-calendar>";
      break;
    case '3':
      display = "<month-calendar></month-calendar>";
      break;
    case '4':
      display = "<year-calendar></month-calendar>";
      break;
    default:
      console.log(selectedValue);
  }
  planningCalendar.innerHTML = display;
}
