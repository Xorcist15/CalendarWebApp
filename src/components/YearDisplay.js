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
      display: block;
      height: calc(100% - 50px);
      width: calc(100% - 50px);
      padding: 30px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 40px;
    }
    .month-content{
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(5, 1fr);
      width: 300px;
      height: 200px;
    }
    .month-header{
    }
    .day-header-container {
      background-color: grey;
      border-radius: 10px;
      display: flex;
      width: 300px;
      display: flex;
      justify-content: space-evenly;
    }
    .day-header{
      display: block;
      height: 30px;
      width: 30px;
      text-align: center;
      border-radius: 50%;
    }
    .day{
      display: block;
      height: 30px;
      width: 30px;
      text-align: center;
      border-radius: 50%;
    }

  </style>
  <div class="year-container">
     
  </div>
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
    // create the element
    for (let i = 0; i < months.length; i++) {
      const monthContainer = document.createElement("div");
      monthContainer.setAttribute("class", "month-container");

      const monthHeader = document.createElement("div");
      monthHeader.setAttribute("class", "month-header");
      monthHeader.innerText = `${months[i]}`;
      monthContainer.appendChild(monthHeader);

      const dayHeaderContainer = document.createElement("div");
      dayHeaderContainer.setAttribute("class", "day-header-container");
      // start by adding day headers
      for (let k = 0; k < days.length; k++) {
        const dayHeader = document.createElement("div");
        dayHeader.setAttribute("class", "day-header");
        dayHeader.innerText = `${days[k]}`;
        dayHeaderContainer.appendChild(dayHeader);
      }

      monthContainer.appendChild(dayHeaderContainer);

      const monthContent = document.createElement("div");
      monthContent.setAttribute("class", "month-content");
      monthContainer.appendChild(monthContent);

      // then add day elements
      for (let j = 0; j < 30; j++) {
        const day = document.createElement("div");
        day.setAttribute("class", "day");
        day.innerText = `${j + 1}`;
        monthContent.appendChild(day);
      }
      year.appendChild(monthContainer);
    }
  }
}

customElements.define('year-calendar', YearDisplay);
