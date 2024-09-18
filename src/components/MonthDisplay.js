const templateM = document.createElement("template");
templateM.innerHTML = `
      <style>
        :host {
          height: 100%;
          display: block; 
        }

        .container {
          width: 100%;
          height: 100%;
          display: flex;
          overflow: auto;
        }

        .calendar{
          display: grid;
          grid-template-columns: repeat(7, calc(100% / 7));
          grid-template-rows: repeat(5, calc(100% / 5 ));
          height: calc(var(--month-display-height) - 30px );
          width: var(--month-display-width);
        }

        .header-container{
          width: 100%;
          display: flex;
        }

        .grid-header {
          background-color: white;
          padding: 10px;
          text-align: center;
          height: 30px;
          width: calc(100% / 7);
        }

        .grid-item {
          background-color: white;
          border: 1px solid #000;
          padding: 10px;
          text-align: center;
        }

      </style>

      <div id="container">
        <div class="header-container"></div>
        <div class="calendar"></div>
      </div>
    `  ;

class MonthDisplay extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(templateM.content.cloneNode(true));
  }

  connectedCallback() {
    this.renderMonth();
  }

  renderMonth() {

    const headers = this.shadowRoot.querySelector(".header-container");
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i < days.length; i++) {
      const gridHeader = document.createElement('div');
      gridHeader.setAttribute("class", "grid-header");
      gridHeader.innerText = `${days[i]}`;
      headers.appendChild(gridHeader);
    }

    const calendar = this.shadowRoot.querySelector(".calendar");

    for (let i = 0; i < 31; i++) {
      const gridItem = document.createElement('div');
      gridItem.setAttribute("class", "grid-item");
      gridItem.innerText = `${i + 1}`;
      calendar.appendChild(gridItem);
    }
  }
}

customElements.define('month-calendar', MonthDisplay);
