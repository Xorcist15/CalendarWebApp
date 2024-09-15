const templateM = document.createElement("template");
templateM.innerHTML = `
      <style>
        :host {
          width: var(--month-width);
          height: 100%;
          display: block; /* Ensure the custom element is rendered as a block element */
          --color: red;
        }

        .container {
          width: 100%;
          height: 100%;
          overflow: auto;
        }

        .calendar{
          display: grid;
          grid-template-columns: repeat(7, calc(100% / 7));
          grid-template-rows: repeat(5, calc(100% / 7 ));
          border: 1px solid #000;
          color: var(--color);
        }

        .grid-item {
          background-color: #ccc;
          border: 1px solid #000;
          padding: 10px;
        }

      </style>

      <div id="container">
        <div class="calendar"> </div>
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
    const calendar = this.shadowRoot.querySelector(".calendar");
    for (let i = 0; i < 31; i++) {
      const gridItem = document.createElement('div');
      gridItem.setAttribute("class", "grid-item");
      gridItem.innerText = `Day ${i + 1} of selected month`;
      calendar.appendChild(gridItem);
    }
  }
}

customElements.define('month-calendar', MonthDisplay);
