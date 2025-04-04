import "../image/my-img.js";

class MyCard extends HTMLElement {

  constructor() {
    super();
    // Creamos el Shadow DOM
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }
  // Cunado los atributos cambian, los actualizamos
  static get observedAttributes() {
    return ["id", "name", "race", "image"];
  }
  // Método para renderizar el componente
  render() {
    const basePath = window.location.pathname.includes("spa")
      ? "/spa/src/"
      : "/src/";
    // Crear y agregar el enlace al archivo CSS externo al Shadow DOM
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${basePath}components/card/card.css`;
    this.shadowDOM.innerHTML = "";

    this.shadowDOM.innerHTML = `
           ${this.template()}
       `;
    this.shadowDOM.append(link);
  }
  // Método para definir la plantilla del componente
  template() {
    return `
      <div class="card">
        <div class="card__body">
          <my-img src="${this.attributes.image.value}" alt="${this.attributes.name.value}"></my-img>
        </div>
        <div class="card__footer" data-id="${this.attributes.id.value}">
            <h2>${this.attributes.name.value}</h2>
            <p>${this.attributes.race.value}</p>
        </div>
      </div>
    `;
  }
  // Este método es llamado cada vez que uno de los atributos observados cambia
  attributeChangedCallback(attribute, oldValue, newValue) {
    if (oldValue !== newValue && !newValue) {
      console.log(`Valor -> ${attribute}, Viejo -> ${oldValue}, Nuevo -> ${newValue}`);
      this.render();
    }
  }
  // Cuando el componente se agrega al DOM, actualizamos los atributos
  connectedCallback() {
    this.render();
    this.mapComponentAttributes();
    this.initComponent();
    this.addEventListeners();
  }
  // Método para agregar el event listener al componente
  addEventListeners() {
    const card = this.shadowDOM.querySelector(".card");
    card.addEventListener("click", this.handleClick.bind(this));
  }
  // Método para mapear los atributos del componente
  mapComponentAttributes() {
    const attributesMapping = [
      "id", "name", "race", "image"
    ];
    attributesMapping.forEach(key => {
      if (!this.attributes[key]) {
        this.attributes[key] = { value: '' };
      }
    });
  }
  // Método para inicializar el componente
  initComponent() {
    this.$card = this.shadowDOM.querySelector('.card');
  }
  // Método para desconectar el componente del dom
  disconnectedCallback() {
    this.remove();
  }
  // Método que se ejecuta cuando se hace clic en la card
  handleClick(event) {
    let card = event.target.closest(".card__footer");
    if (card) {
      let cardId = card.dataset.id;
      location.hash = `#/character/${cardId}`;
    }
  }
}

// Definir el Web Component
customElements.define("my-card", MyCard);
