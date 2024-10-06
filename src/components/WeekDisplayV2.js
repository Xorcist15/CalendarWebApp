class WeekDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.getTemplate();
    this.currentDate = new Date(); // Initialize the current date
  }

  getTemplate() {
    return `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          font-family: "Fira Code", monospace;
          overflow: hidden;
        }
        .container {
          width: 100%;
          height: 100%;
          overflow: auto;
        }
        .calendar {
          display: grid;
          grid-template-columns: 50px repeat(7, 1fr);
          grid-template-rows: 30px repeat(24, 1fr);
          height: 100%;
          width: 100%;
          border: 1px solid #ccc;
          position: relative;
        }
        .day-header,
        .time-header {
          position: sticky;
          background-color: #f0f0f0;
          z-index: 1;
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .day-header {
          font-size: 20px;
        }
        .time-header {
          font-size: 14px;
        }
        .time-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          height: 40px;
          cursor: pointer; /* Change cursor for interactive slots */
        }
        .time-slot.event {
          background-color: #e0e0ff;
        }
      </style>
      <div class="container">
        <div class="calendar" role="grid" aria-label="Weekly Calendar">
          <div class="time-header"></div>
          <div class="day-header">Mon</div>
          <div class="day-header">Tue</div>
          <div class="day-header">Wed</div>
          <div class="day-header">Thu</div>
          <div class="day-header">Fri</div>
          <div class="day-header">Sat</div>
          <div class="day-header">Sun</div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.renderTimeSlots();
    this.addEventListeners();
    this.updateDayHeaders(); // Update day headers on load
  }

  renderTimeSlots() {
    const calendar = this.shadowRoot.querySelector('.calendar');
    for (let hour = 0; hour < 24; hour++) {
      const timeLabel = document.createElement('div');
      timeLabel.classList.add('time-slot', 'time-header');
      timeLabel.textContent = `${hour}:00`;
      calendar.appendChild(timeLabel);

      for (let day = 0; day < 7; day++) {
        const timeSlot = document.createElement('div');
        timeSlot.classList.add('time-slot');
        timeSlot.setAttribute('data-hour', hour);
        timeSlot.setAttribute('data-day', day);
        calendar.appendChild(timeSlot);
      }
    }
  }

  addEventListeners() {
    const timeSlots = this.shadowRoot.querySelectorAll('.time-slot:not(.time-header)');
    timeSlots.forEach(slot => {
      slot.addEventListener('click', this.handleTimeSlotClick.bind(this));
    });
  }

  handleTimeSlotClick(event) {
    const hour = event.currentTarget.getAttribute('data-hour');
    const day = event.currentTarget.getAttribute('data-day');
    alert(`Time Slot Clicked: Day ${day}, Hour ${hour}`);
  }

  updateDayHeaders() {
    const startOfWeek = this.getStartOfWeek(this.currentDate);
    const dayHeaders = this.shadowRoot.querySelectorAll('.day-header');

    dayHeaders.forEach((header, index) => {
      const headerDay = header.textContent.split(' ')[0]; // Extract the day (Mon, Tue, etc.)
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + (index));

      header.textContent = `${headerDay} ${dayDate.getDate()}`;
    });
  }

  getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
    return new Date(date.setDate(diff));
  }

  goToToday() {
    this.currentDate = new Date();
    this.updateDayHeaders();
  }

  goToNextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.updateDayHeaders();
  }

  goToPreviousWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.updateDayHeaders();
  }
}

customElements.define('week-calendar', WeekDisplay);
