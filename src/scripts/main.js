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
      display = "day";
      console.log('day display');
      break;
    case '2':
      display = "week";
      console.log('week display');
      break;
    case '3':
      display = "month";
      console.log('month display');
      break;
    case '4':
      display = "year";
      console.log('year display');
      break;
  }
  planningCalendar.innerHTML = `<${display}-calendar></${display}-calendar>`;
}

function loadDefaultCalendar() {
  planningCalendar.innerHTML = "<year-calendar></year-calendar>";
}

loadDefaultCalendar();

const template = document.createElement("template");
