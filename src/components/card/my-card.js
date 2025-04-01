import "../image/my-img.js";

class MyCard extends HTMLElement {
  constructor() {
    super();
    // Creamos el Shadow DOM
    this.attachShadow({ mode: "open" });
  }
  // Cunado los atributos cambian, los actualizamos
  static get observedAttributes() {
    return ["id", "name", "race", "image"];
  }

  render() {
    const basePath = window.location.pathname.includes("spa")
      ? "/spa/src/"
      : "/src/";
    // Crear y agregar el enlace al archivo CSS externo al Shadow DOM
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${basePath}/components/card/card.css`;
    this.shadowRoot.appendChild(link);

    const id = this.getAttribute("id") || "";
    const name = this.getAttribute("name") || "";
    const race = this.getAttribute("race") || "";
    const imageUrl = this.getAttribute("image") || "";
    this.shadowRoot.innerHTML = "";

    const card = document.createElement("div");
    card.setAttribute("data-id", id);
    card.classList.add("card");
    card.innerHTML = `
      <div class="card__body">
        <my-img src="${imageUrl}" alt="${name}"></my-img>
      </div>
      <div class="card__footer" data-id=${id}>
        <h2>${name}</h2>
        <p>${race}</p>
      </div>
    `;
    this.shadowRoot.append(card);
    this.shadowRoot.append(link);
  }

  // Este método es llamado cada vez que uno de los atributos observados cambia
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // Cuando el componente se agrega al DOM, actualizamos los atributos
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  // Método para agregar el event listener al componente
  addEventListeners() {
    const card = this.shadowRoot.querySelector(".card");
    card.addEventListener("click", this.handleClick.bind(this));
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
