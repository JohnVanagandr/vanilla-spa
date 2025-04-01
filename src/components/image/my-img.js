class MyImage extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" }); // Creamos el Shadow DOM
    this.img = document.createElement("img"); // Creamos la etiqueta img
    this.shadow.appendChild(this.img); // Añadimos la etiqueta img al shadow DOM

    // Añadimos estilos básicos directamente al componente
    // Añadimos estilos básicos directamente al componente
    const basePath = window.location.pathname.includes("spa")
      ? "/spa/src/"
      : "/src/";
    // Crear y agregar el enlace al archivo CSS externo al Shadow DOM
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${basePath}/components/image/image.css`;
    this.shadow.appendChild(link);
  }

  // Cuando el atributo 'src' cambia, actualizamos la imagen
  static get observedAttributes() {
    return ["src"];
  }

  // Callback cuando el atributo cambia
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src") {
      this.img.src = newValue; // Actualizamos la fuente de la imagen
    }
  }

  // Cuando el componente se agrega al DOM, actualizamos la imagen
  connectedCallback() {
    if (this.hasAttribute("src")) {
      this.img.src = this.getAttribute("src");
    }
  }
}

// Definir el Web Component
customElements.define("my-img", MyImage);
