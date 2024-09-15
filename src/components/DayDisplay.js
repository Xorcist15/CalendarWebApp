class DayDisplay extends HTMLElement {
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
          overflow: hidden;
        }

        .container {
          width: 100%;
          height: 100%;
          overflow: auto;
        }

        .calendar {
          display: grid;
          grid-template-columns: 60px 1fr;
          grid-template-rows: 30px repeat(24, 1fr);
          height: 100%;
          width: 100%;
          border: 1px solid #e0e0e0;
          position: relative;
        }

        .day-header {
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
        }

        .time-slot::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: #e0e0e0;
        }

        .time-slot.event {
          background-color: #e0e0ff;
          cursor: pointer;
        }
      </style>
      <div class="container">
        <div class="calendar">
          <div class="day-header">Selected Day</div>
          <!-- Rest of rows will be added with for loop -->
        </div>
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
      timeLabel.classList.add('time-slot', 'time-header');
      timeLabel.textContent = `${hour}:00`;
      calendar.appendChild(timeLabel);

      const timeSlot = document.createElement('div');
      timeSlot.classList.add('time-slot');
      calendar.appendChild(timeSlot);
    }
  }
}

customElements.define('day-calendar', DayDisplay);

