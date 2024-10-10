class DayDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.getTemplate();
    this.currentDate = new Date();
    this.isDragging = false;
    this.startY = null;
    this.taskElement = null;
  }

  connectedCallback() {
    this.renderCalendar();

    const calendar = this.shadowRoot.querySelector('.calendar');
    calendar.addEventListener('mousedown', this.handleMouseDown.bind(this));
    calendar.addEventListener('mousemove', this.handleMouseMove.bind(this));
    calendar.addEventListener('mouseup', this.handleMouseUp.bind(this));
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

        /* Default styling for task element */
        .task {
          position: absolute;
          background-color: rgba(173, 216, 230, 0.8); /* Light blue color */
          border: 1px solid #000;
        }
      </style>
      <div class="container">
        <div class="calendar">
          <!-- Time slots will be dynamically added here -->
        </div>
      </div>
    `;
  }

  renderCalendar() {
    this.renderDayHeader();
    this.renderTimeSlots();
  }

  renderDayHeader() {
    const calendar = this.shadowRoot.querySelector('.calendar');

    const dayHeader = document.createElement('div');
    dayHeader.classList.add('day-header');
    dayHeader.setAttribute('role', 'heading');
    dayHeader.setAttribute('aria-level', '1');

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = this.currentDate.toLocaleDateString(undefined, options);
    dayHeader.textContent = formattedDate;
    calendar.prepend(dayHeader); // Add the header at the top of the calendar
    console.log("day header rendered with ", this.currentDate);
  }

  renderTimeSlots() {
    const calendar = this.shadowRoot.querySelector('.calendar');
    const fragment = document.createDocumentFragment(); // Efficient DOM manipulation

    for (let hour = 0; hour < 24; hour++) {
      const timeLabel = document.createElement('div');
      timeLabel.classList.add('time-slot', 'time-header');
      timeLabel.textContent = `${hour}:00`;
      fragment.appendChild(timeLabel);

      const timeSlot = document.createElement('div');
      timeSlot.classList.add('time-slot');
      timeSlot.setAttribute('aria-label', `Time slot for ${hour}:00`);
      fragment.appendChild(timeSlot);
    }
    calendar.appendChild(fragment); // Append all at once
    console.log("Time slots rendered for:", this.currentDate); // Log current date
  }

  // Handle mouse down event to start dragging
  handleMouseDown(e) {
    if (e.target.classList.contains('time-slot')) {
      this.isDragging = true;
      const calendarTop = this.shadowRoot.querySelector('.calendar').getBoundingClientRect().top;
      this.startY = e.clientY - calendarTop;

      const hour = Math.floor(this.startY / 60);
      const offsetY = this.startY % 60;

      this.taskElement = document.createElement('div');
      this.taskElement.classList.add('task');
      this.taskElement.style.position = 'absolute'; // Ensure the task is absolutely positioned
      this.taskElement.style.top = `${hour * 60 + offsetY}px`; // Correct position within the hour slot
      this.taskElement.style.left = '60px'; // Position it in the event column
      this.taskElement.style.width = 'calc(100% - 60px)';
      this.taskElement.style.height = '60px';
      this.shadowRoot.querySelector('.calendar').appendChild(this.taskElement);

      e.preventDefault();
    }
  }


  // Handle mouse move event to update the task element's height
  handleMouseMove(e) {
    if (this.isDragging && this.taskElement) {
      const calendarTop = this.shadowRoot.querySelector('.calendar').getBoundingClientRect().top;
      const currentY = e.clientY - calendarTop;
      const newHeight = Math.max(60, currentY - this.startY); // Minimum height of 60px
      this.taskElement.style.height = `${newHeight}px`;

      e.preventDefault();
    }
  }


  // Handle mouse up event to finish dragging
  handleMouseUp(e) {
    if (this.isDragging) {
      this.isDragging = false;
      const calendarTop = this.shadowRoot.querySelector('.calendar').getBoundingClientRect().top;
      const endY = e.clientY - calendarTop;
      const startHour = Math.floor(this.startY / 60);
      const endHour = Math.ceil(endY / 60);
      console.log(`Task created from ${startHour}:00 to ${endHour}:00`);

      // Optionally, you can add additional logic to save the task or adjust its final position/height

      e.preventDefault();
    }
  }
}

// Define the custom element
customElements.define('day-calendar', DayDisplay);

