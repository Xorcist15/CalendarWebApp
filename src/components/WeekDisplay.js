const template = document.createElement("template");
template.innerHTML = `
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
        }

        .day-header {
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          font-size: 20px;
        }

        .time-header {
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          font-size: 14px;
        }

        .time-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          height: 40px;
        }

        .time-slot.event {
          background-color: #e0e0ff;
          cursor: pointer;
        }
      </style>
      <div class="container">
        <div class="calendar">
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

class WeekDisplay extends HTMLElement {
  constructor() {
    super();
    // attaches a shadow DOM tree to the instance of the elemnt
    // Shadow root is the root node of the shadow DOM
    // Each class object has its own shadow root on creation 
    // because we called the this.attachShadow function
    // which allows encapsulation to happen
    // when browser's HTML parser encounters the custom element
    // it creates an instance of the element and calls the constructor
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(template.content.cloneNode(true));
  }

  // called when the element is added to the document DOM
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

      for (let day = 0; day < 7; day++) {
        const timeSlot = document.createElement('div');
        timeSlot.classList.add('time-slot');
        calendar.appendChild(timeSlot);
      }
    }
  }
}

customElements.define('week-calendar', WeekDisplay);

