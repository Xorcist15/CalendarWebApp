const templateM = document.createElement("template");
templateM.innerHTML = `
  <style>
    :host {
      height: 100%;
      width: 100%;
      display: block; 
    }
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: auto;
      flex-direction: column; 
    }
    .header-container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }
    .grid-header {
      background-color: #f0f0f0; /* Lighter background for header */
      padding: 10px;
      text-align: center;
      border-bottom: 2px solid #ccc; /* Distinct separation */
    }
    .calendar {
      display: grid;
      grid-template-columns: repeat(7, 1fr); /* 7 columns for days */
      grid-auto-rows: 1fr; /* Each row will take up equal space */
      gap: 10px; /* Space between day blocks */
      height: calc(100% - 50px); /* Adjusted to allow for header height */
      padding: 10px; /* Add padding to calendar */
    }
    .grid-item {
      background-color: #ffffff; /* White background for day items */
      border: 1px solid #ccc; /* Light border for distinction */
      border-radius: 5px; /* Slightly rounded corners */
      padding: 10px;
      text-align: center;
      display: flex; /* Center content */
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow for card effect */
      min-height: 60px; /* Minimum height for each day block */
    }
    .empty-cell {
      background-color: transparent; /* Make empty cells invisible */
    }
  </style>

  <div class="container">
    <div class="header-container"></div>
    <div class="calendar"></div>
  </div>
`;

class MonthDisplay extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(templateM.content.cloneNode(true));
  }

  connectedCallback() {
    this.renderMonth();
  }

  renderMonth() {
    const headers = this.shadowRoot.querySelector(".header-container");
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    this.createHeaders(headers, days);
    this.createCalendarDays();
  }

  createHeaders(container, days) {
    days.forEach(day => {
      const gridHeader = document.createElement('div');
      gridHeader.setAttribute("class", "grid-header");
      gridHeader.innerText = day;
      container.appendChild(gridHeader);
    });
  }

  createCalendarDays() {
    const calendar = this.shadowRoot.querySelector(".calendar");
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Days in the month
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week for the first day

    // Adjust firstDayOfMonth to start from Monday (1) instead of Sunday (0)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

    // Add empty cells for the days before the first of the month
    for (let i = 1; i < adjustedFirstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.setAttribute("class", "grid-item empty-cell"); // Optional class for styling
      calendar.appendChild(emptyCell);
    }

    // Create the grid items for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const gridItem = document.createElement('div');
      gridItem.setAttribute("class", "grid-item");
      gridItem.innerText = `${i}`;
      calendar.appendChild(gridItem);
    }
  }
}

customElements.define('month-calendar', MonthDisplay);

