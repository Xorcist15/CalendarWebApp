class WeekCalendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          font-family: "Fira Code", monospace;
          font-optical-sizing: auto;
          font-style: normal;
          overflow: scroll;
        }

        .calendar {
          display: grid;
          grid-template-columns: 50px repeat(7, 1fr);
          grid-template-rows: 30px repeat(24, 1fr);
          height: 100%;
          width: 100%;
          border: 1px solid #ccc;
        }

        .day-header {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f0f0f0;
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          font-size: 20px;
        }

        .time-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          height: 40px;
        }

        .time-slot.hour {
          background-color: #f0f0f0;
          font-size: 14px;
        }

        .time-slot.event {
          background-color: #e0e0ff;
          cursor: pointer;
        }
      </style>
      <div class="calendar">
        <div class="time-slot hour"></div>
        <div class="day-header">Sun</div>
        <div class="day-header">Mon</div>
        <div class="day-header">Tue</div>
        <div class="day-header">Wed</div>
        <div class="day-header">Thu</div>
        <div class="day-header">Fri</div>
        <div class="day-header">Sat</div>
        <!-- More time slots will be added here dynamically -->
      </div>
    `;
  }

  connectedCallback() {
    this.renderTimeSlots();
  }

  renderTimeSlots() {
    const calendar = this.shadowRoot.querySelector('.calendar');
    for (let hour = 0; hour < 24; hour++) {
      const timeLabel = document.createElement('div');
      timeLabel.classList.add('time-slot', 'hour');
      timeLabel.textContent = `${hour}:00`;
      calendar.appendChild(timeLabel);

      for (let day = 0; day < 7; day++) {
        const timeSlot = document.createElement('div');
        timeSlot.classList.add('time-slot');
        calendar.appendChild(timeSlot);
      }
    }
  }
}

customElements.define('week-calendar', WeekCalendar);

