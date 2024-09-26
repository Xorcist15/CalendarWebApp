const templateY = document.createElement("template");
templateY.innerHTML = `
<style>
  :host { 
    display: block;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
  .year-container {
    height: calc(100% - 50px);
    width: calc(100% - 50px);
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 40px;
  }
  .month-container {
    display: flex;
    flex-direction: column;
  }
  .month-header {
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
  .day-header-container {
    background-color: grey;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    padding: 5px 0;
  }
 .day-header, .day {
    display: flex;
    align-items: center; /* Center vertically */
    justify-content: center; /* Center horizontally */
    height: 50px; /* Match the height for alignment */
    width: 50px; /* Match the width for alignment */
    text-align: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
    padding: 0; /* Remove padding to reduce extra space */
  }
  .day:hover {
    background-color: #e0e0e0; /* Added hover effect */
    cursor: pointer;
  }
  .month-content {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0px; /* Reduce the vertical gap between days */
    margin-top: 0px;
  }
</style>

<div class="year-container"></div>
`;

class YearDisplay extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(templateY.content.cloneNode(true));
  }

  connectedCallback() {
    this.renderYear();
  }

  renderYear() {
    const year = this.shadowRoot.querySelector(".year-container");
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    months.forEach((month, monthIndex) => {
      const monthContainer = document.createElement("div");
      monthContainer.setAttribute("class", "month-container");

      const monthHeader = document.createElement("div");
      monthHeader.setAttribute("class", "month-header");
      monthHeader.innerText = month;
      monthContainer.appendChild(monthHeader);

      const dayHeaderContainer = this.createDayHeaderContainer(days);
      monthContainer.appendChild(dayHeaderContainer);

      const monthContent = this.createMonthContent(monthIndex);
      monthContainer.appendChild(monthContent);

      year.appendChild(monthContainer);
    });
  }

  createDayHeaderContainer(days) {
    const dayHeaderContainer = document.createElement("div");
    dayHeaderContainer.setAttribute("class", "day-header-container");
    days.forEach(day => {
      const dayHeader = document.createElement("div");
      dayHeader.setAttribute("class", "day-header");
      dayHeader.innerText = day;
      dayHeaderContainer.appendChild(dayHeader);
    });
    return dayHeaderContainer;
  }

  createMonthContent(monthIndex) {
    const monthContent = document.createElement("div");
    monthContent.setAttribute("class", "month-content");

    // Calculate the number of days in the month
    const daysInMonth = new Date(2023, monthIndex + 1, 0).getDate(); // Adjusted for the correct month length

    // Determine the starting day of the month
    const firstDayOfMonth = new Date(2023, monthIndex, 1).getDay();
    const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth; // Adjust for 0 index

    // Add empty cells for days before the first of the month
    for (let i = 1; i < adjustedFirstDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.setAttribute("class", "day"); // Optional: Add a class for empty cells
      monthContent.appendChild(emptyCell); // Empty cell for spacing
    }

    // Add the day elements to the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.setAttribute("class", "day");
      dayElement.innerText = day;
      monthContent.appendChild(dayElement);
    }

    return monthContent;
  }
}

customElements.define('year-calendar', YearDisplay);


