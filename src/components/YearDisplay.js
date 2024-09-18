// const templateY = document.createElement("template");
// templateY.innerHTML = `
//   <style>
//     :host {
//       display: block;
//       width: 100%;
//       height: 100%;
//       border: 
//     }
//   </style>
//   <div>Hello world</div>
// `;

class YearDisplay extends HTMLElement {
  constructor() {
    super();
    // const shadow = this.attachShadow({ mode: 'open' });
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `hello world`;
    // shadow.append(templateY.content.cloneNode(true));
    // console.log("hello wrodl");
  }

  connectedCallback() {
  }
}

customElements.define('year-calendar', YearDisplay);
