// class MonthDisplay extends HTMLElement {
//   constructor() {
//     super();
//     // const shadow = this.attachShadow({ mode: 'open' });
//     this.attachShadow({ mode: 'open' });
//     this.shadowRoot.innerHTML = this.getTemplate();
//     this.currentDate = new Date();
//   }
//   // template method for better organization
//   getTemplate() {
//     return `
//       <style>
//         :host {
//           height: 100%;
//           width: 100%;
//           display: block; 
//         }
//         .container {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           overflow: auto;
//           flex-direction: column; 
//         }
//         .header-container {
//           width: 100%;
//           display: grid;
//           grid-template-columns: repeat(7, 1fr);
//         }
//         .grid-header {
//           background-color: #f0f0f0; /* Lighter background for header */
//           padding: 10px;
//           text-align: center;
//           border-bottom: 2px solid #ccc; /* Distinct separation */
//         }
//         .calendar {
//           display: grid;
//           grid-template-columns: repeat(7, 1fr); /* 7 columns for days */
//           grid-auto-rows: 1fr; /* Each row will take up equal space */
//           gap: 10px; /* Space between day blocks */
//           height: calc(100% - 50px); /* Adjusted to allow for header height */
//           padding: 10px; /* Add padding to calendar */
//         }
//         .grid-item {
//           background-color: #ffffff; /* White background for day items */
//           border: 1px solid #ccc; /* Light border for distinction */
//           border-radius: 5px; /* Slightly rounded corners */
//           padding: 10px;
//           text-align: center;
//           display: flex; /* Center content */
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow for card effect */
//           min-height: 60px; /* Minimum height for each day block */
//         }
//         .empty-cell {
//           background-color: transparent; /* Make empty cells invisible */
//         }
//       </style>
//
//       <div class="container">
//         <div class="header-container"></div>
//         <div class="calendar"></div>
//       </div>
//     `;
//   }
//
//   connectedCallback() {
//     this.renderMonth();
//   }
//
//   renderMonth() {
//     const headers = this.shadowRoot.querySelector(".header-container");
//     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//
//     this.createHeaders(headers, days);
//     this.createCalendarDays();
//   }
//
//   createHeaders(container, days) {
//     days.forEach(day => {
//       const gridHeader = document.createElement('div');
//       gridHeader.setAttribute("class", "grid-header");
//       gridHeader.innerText = day;
//       container.appendChild(gridHeader);
//     });
//   }
//
//   createCalendarDays() {
//     const calendar = this.shadowRoot.querySelector(".calendar");
//     const currentDate = new Date();
//     const month = currentDate.getMonth();
//     const year = currentDate.getFullYear();
//     const daysInMonth = new Date(year, month + 1, 0).getDate(); // Days in the month
//     const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week for the first day
//
//     // Adjust firstDayOfMonth to start from Monday (1) instead of Sunday (0)
//     const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
//
//     // Add empty cells for the days before the first of the month
//     for (let i = 1; i < adjustedFirstDay; i++) {
//       const emptyCell = document.createElement('div');
//       emptyCell.setAttribute("class", "grid-item empty-cell"); // Optional class for styling
//       calendar.appendChild(emptyCell);
//     }
//
//     // Create the grid items for each day of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       const gridItem = document.createElement('div');
//       gridItem.setAttribute("class", "grid-item");
//       gridItem.innerText = `${i}`;
//       calendar.appendChild(gridItem);
//     }
//   }
// }
//
// customElements.define('month-calendar', MonthDisplay);

class MonthDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.getTemplate();
    this.currentDate = new Date(); // Store the current date
    this.currentMonth = this.currentDate.getMonth(); // Current month
    this.currentYear = this.currentDate.getFullYear(); // Current year
  }

  getTemplate() {
    return `
      <style>
        /* Styles as previously defined */
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
          background-color: #f0f0f0;
          padding: 10px;
          text-align: center;
          border-bottom: 2px solid #ccc;
        }
        .calendar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-auto-rows: 1fr;
          gap: 10px;
          height: calc(100% - 50px);
          padding: 10px;
        }
        .grid-item {
          background-color: #ffffff;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          min-height: 60px;
        }
        .empty-cell {
          background-color: transparent;
        }
      </style>

      <div class="container">
        <div class="header-container"></div>
        <div class="calendar"></div>
        <div class="navigation">
          <button id="prevMonth">Previous</button>
          <button id="nextMonth">Next</button>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.renderMonth();
    // this.shadowRoot.getElementById('prevMonth').addEventListener('click', () => this.goToPreviousMonth());
    // this.shadowRoot.getElementById('nextMonth').addEventListener('click', () => this.goToNextMonth());

    this.shadowRoot.getElementById('prevMonth').addEventListener('click', () => this.goToPreviousMonth());
    this.shadowRoot.getElementById('nextMonth').addEventListener('click', () => this.goToNextMonth());
  }

  renderMonth() {
    const headers = this.shadowRoot.querySelector(".header-container");
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    this.createHeaders(headers, days);
    this.createCalendarDays();
  }

  createHeaders(container, days) {
    // Clear existing headers before creating new ones
    container.innerHTML = '';
    days.forEach(day => {
      const gridHeader = document.createElement('div');
      gridHeader.setAttribute("class", "grid-header");
      gridHeader.innerText = day;
      container.appendChild(gridHeader);
    });
  }

  createCalendarDays() {
    const calendar = this.shadowRoot.querySelector(".calendar");
    calendar.innerHTML = ''; // Clear existing days

    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate(); // Days in the month
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay(); // Day of the week for the first day

    const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth; // Adjust for Monday start

    // Add empty cells for the days before the first of the month
    for (let i = 1; i < adjustedFirstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.setAttribute("class", "grid-item empty-cell");
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

  goToPreviousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11; // December
      this.currentYear--; // Go to the previous year
    } else {
      this.currentMonth--;
    }
    this.renderMonth(); // Re-render the month with updated values
  }

  goToNextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0; // January
      this.currentYear++; // Go to the next year
    } else {
      this.currentMonth++;
    }
    this.renderMonth(); // Re-render the month with updated values
  }
}

customElements.define('month-calendar', MonthDisplay);
