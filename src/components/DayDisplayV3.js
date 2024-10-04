class DayDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.getTemplate();
    this.currentDate = new Date();
    console.log("Initial date:", this.currentDate);
  }

  // Template method for better organization
  getTemplate() {
    return `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .container {
          width: 100%;
          height: 100%;
          overflow: auto;
        }

        .calendar {
          display: grid;
          grid-template-columns: 60px 1fr; /* Time column + events */
          grid-template-rows: 30px repeat(24, 1fr); /* Header + hours */
          height: 100%;
          width: 100%;
          border: 1px solid #e0e0e0;
          position: relative;
        }

        .day-header {
          color: red;
          grid-column: 1 / -1;
          position: sticky;
          top: 0;
          background-color: #fff;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #e0e0e0;
          font-size: 20px;
          padding: 10px 0;
        }

        .time-header {
          position: sticky;
          left: 0;
          background-color: #fff;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #e0e0e0;
          border-right: 1px solid #e0e0e0;
          font-size: 14px;
          height: 60px;
          padding: 0 10px;
        }

        .time-slot {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #e0e0e0;
          height: 60px;
          position: relative;
          transition: background-color 0.2s ease; /* Smooth transition */
        }

        .time-slot:hover {
          background-color: #f0f0f0; /* Hover effect */
        }

        .time-slot.event {
          background-color: #e0e0ff;
          cursor: pointer;
        }
      </style>
      <div class="container">
        <div class="calendar">
          <!-- Time slots will be dynamically added here -->
        </div>
      </div>
    `;
  }

  connectedCallback() {
    console.log("Shadow root:", this.shadowRoot);
    this.renderCalendar();
  }

  renderCalendar() {
    this.renderDayHeader();
    this.renderTimeSlots();
  }

  renderDayHeader() {
    const calendar = this.shadowRoot.querySelector('.calendar');
    let dayHeader = calendar.querySelector('.day-header');

    if (dayHeader) {
      dayHeader.remove();
    }

    dayHeader = document.createElement('div');
    dayHeader.classList.add('day-header');
    dayHeader.setAttribute('role', 'heading');
    dayHeader.setAttribute('aria-level', '1');

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = this.currentDate.toLocaleDateString(undefined, options);
    dayHeader.textContent = formattedDate;
    console.log("this is the day header :", dayHeader.textContent);
    calendar.prepend(dayHeader); // Add the header at the top of the calendar

    console.log("Day header updated:", dayHeader.textContent);
  }

  renderTimeSlots() {
    console.log("Rendering time slots for:", this.currentDate); // Log current date
    const calendar = this.shadowRoot.querySelector('.calendar');
    const fragment = document.createDocumentFragment(); // Efficient DOM manipulation

    // Clear existing time slots before rendering new ones
    const timeSlots = calendar.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => slot.remove());

    for (let hour = 0; hour < 24; hour++) {
      const timeLabel = document.createElement('div');
      timeLabel.classList.add('time-slot', 'time-header');
      timeLabel.textContent = `${hour}:00`;
      fragment.appendChild(timeLabel);

      const timeSlot = document.createElement('div');
      timeSlot.classList.add('time-slot');
      timeSlot.setAttribute('aria-label', `Time slot for ${hour}:00`);
      timeSlot.addEventListener('click', () => this.handleSlotClick(hour));
      fragment.appendChild(timeSlot);
    }

    calendar.appendChild(fragment); // Append all at once
    console.log("Time slots rendered"); // Log after rendering
  }

  goToToday() {
    this.currentDate = new Date(); // Set the date to today
    this.renderCalendar();
  }

  goToPreviousDay() {
    this.currentDate.setDate(this.currentDate.getDate() - 1); // Go to the previous day
    this.renderCalendar();
  }

  goToNextDay() {
    this.currentDate.setDate(this.currentDate.getDate() + 1); // Go to the next day
    this.renderCalendar();
  }

  // Placeholder method for handling time slot clicks
  handleSlotClick(hour) {
    console.log(`You clicked on the time slot for ${hour}:00`);
  }
}

// Define the custom element
customElements.define('day-calendar', DayDisplay);

