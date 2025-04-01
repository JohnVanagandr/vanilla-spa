class CharacterCard extends HTMLElement {
  static get observedAttributes() {
    return ["name", "description", "image"]; // Atributos que queremos observar
  }

  constructor() {
    super();

    // Crear el Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    const basePath = window.location.pathname.includes("spa")
      ? "/spa/src/"
      : "/src/";
    // Crear y agregar el enlace al archivo CSS externo al Shadow DOM
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${basePath}/components/card/card.css`;
    shadow.appendChild(link);

    // Crear la estructura HTML
    this.card = document.createElement("div");
    this.title = document.createElement("h2");
    this.img = document.createElement("img");
    this.description = document.createElement("p");
    
    this.card.classList.add("card");


    // Añadir los elementos al shadow DOM
    this.card.appendChild(this.img);
    // this.card.appendChild(this.title);
    this.card.appendChild(this.description);
    // this.shadow.appendChild(this.card);
  }


  // Este método es llamado cada vez que uno de los atributos observados cambia
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name") {
      this.title.textContent = newValue; // Actualiza el nombre
    } else if (name === "description") {
      this.description.textContent = newValue; // Actualiza la descripción
    } else if (name === "image") {
      this.img.src = newValue; // Actualiza la imagen
    }
  }

  connectedCallback() {
    // Establecer los valores de los atributos si ya están definidos al agregar el componente al DOM
    this.attributeChangedCallback("name", "", this.getAttribute("name"));
    this.attributeChangedCallback("description", "", this.getAttribute("description"));
    this.attributeChangedCallback("image", "", this.getAttribute("image"));
  }
}

// Registrar el componente
customElements.define("character-card", CharacterCard);
