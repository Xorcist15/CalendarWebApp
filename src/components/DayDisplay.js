class DayDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.getTemplate();
    this.currentDate = new Date();
    this.isDragging = false;
    this.startY = null;
    this.taskElement = null;
    this.dragThreshold = 5; // Threshold for detecting drag vs. click
  }

  connectedCallback() {
    this.renderCalendar();

    const calendar = this.shadowRoot.querySelector('.calendar');
    calendar.addEventListener('mousedown', this.handleMouseDown.bind(this));
    calendar.addEventListener('mousemove', this.handleMouseMove.bind(this));
    calendar.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

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

  handleMouseDown(e) {
    if (e.target.classList.contains('time-slot')) {
      this.isDragging = false; // Initially, assume it's not a drag
      this.startY = e.clientY;
      this.initialY = this.startY; // Save the initial Y position

      const calendarTop = this.shadowRoot.querySelector('.calendar').getBoundingClientRect().top;
      const quarterHourHeight = 15; // Height corresponding to a 15-minute interval
      this.startY = Math.round((e.clientY - calendarTop) / quarterHourHeight) * quarterHourHeight;

      // Create a task element but don't append it yet
      this.taskElement = document.createElement('div');
      this.taskElement.classList.add('task');
      this.taskElement.style.position = 'absolute';
      this.taskElement.style.top = `${this.startY}px`;
      this.taskElement.style.left = '60px';
      this.taskElement.style.width = 'calc(100% - 60px)';
      this.taskElement.style.height = '15px'; // Initial height set to 15px

      e.preventDefault();
    }
  }

  handleMouseMove(e) {
    if (this.startY !== null) {
      const distance = Math.abs(e.clientY - this.initialY);
      if (distance > this.dragThreshold) {
        if (!this.isDragging) {
          this.isDragging = true;
          // Append the task element to the calendar only when dragging starts
          this.shadowRoot.querySelector('.calendar').appendChild(this.taskElement);
        }

        const calendarTop = this.shadowRoot.querySelector('.calendar').getBoundingClientRect().top;
        const currentY = e.clientY - calendarTop;
        const newHeight = Math.max(15, currentY - this.startY); // Minimum height of 15px
        const quarterHourHeight = 15; // Height corresponding to a 15-minute interval
        const roundedHeight = Math.round(newHeight / quarterHourHeight) * quarterHourHeight;

        this.taskElement.style.height = `${roundedHeight}px`;

        e.preventDefault();
      }
    }
  }

  handleMouseUp(e) {
    if (this.startY !== null) {
      if (this.isDragging) {
        this.isDragging = false;
        // Task creation finished, handle as a drag
        console.log(`Task created from ${this.startY / 60}:00 to ${(this.startY + parseInt(this.taskElement.style.height)) / 60}:00`);
      } else {
        // Handle as a simple click, rounding to 30 minutes
        const calendarTop = this.shadowRoot.querySelector('.calendar').getBoundingClientRect().top;
        const clickY = e.clientY - calendarTop;
        const halfHourHeight = 30;
        const roundedY = Math.round(clickY / halfHourHeight) * halfHourHeight;
        console.log(`Simple click rounded to nearest half hour at ${roundedY / 60}:00`);

        // Optional: Create a task element for the simple click
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.style.position = 'absolute';
        taskElement.style.top = `${roundedY}px`;
        taskElement.style.left = '60px';
        taskElement.style.width = 'calc(100% - 60px)';
        taskElement.style.height = '30px'; // Height set to 30px for a simple click
        this.shadowRoot.querySelector('.calendar').appendChild(taskElement);
      }
      // Reset startY to null
      this.startY = null;
      e.preventDefault();
    }
  }
}

// Define the custom element
customElements.define('day-calendar', DayDisplay);
