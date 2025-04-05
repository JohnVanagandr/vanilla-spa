class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  // Cuando los attributos cambian de estado
  static get observedAttributes() {
    return [];
  }

  render() {
    const basePath = window.location.pathname.includes("spa")
      ? "/vanilla-spa/src/"
      : "/src/";
    // Crear y agregar el enlace al archivo CSS externo al Shadow DOM
    const link = document.createElement("link");
    const iconos = document.createElement("link");
    link.rel = "stylesheet";
    iconos.rel = "stylesheet";
    link.href = `${basePath}components/header/header.css`;
    iconos.href = " https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css";
    this.shadowDOM.appendChild(link);
    this.shadowDOM.innerHTML = "";
    this.shadowDOM.innerHTML = `
        ${this.template()}
    `;
    this.shadowDOM.append(link);
    this.shadowDOM.append(iconos);
    console.log(window.location.pathname.includes("spa"));
    
  }

  template() {
    return `
      <div class="container">
        <header class="header">
          <h2>
            <a href="#/">Goku</a>
          </h2>
          <nav class="menu">
            <a href="#/characters">Personajes</a>
            <a href="#/planets">Planetas</a>
          </nav>
          <div class="social">
            <a href="#/">
              <i class="ri-facebook-fill"></i>
            </a>
            <a href="#/">
              <i class="ri-instagram-line"></i>
            </a>
            <a href="#/">
              <i class="ri-youtube-line"></i>
            </a>
          </div>
        </header>
      </div>
      `;
  }
  // Cuando el componente se agrega al DOM, actualizamos los atributos
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.remove();
  }

  // Método para agregar el event listener al componente
  addEventListeners() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  handleScroll() {
    const menu = this.shadowDOM.querySelector(".header");
    let lastScrollY = window.scrollY;
    const threshold = 180;    
    let currentScrollY = window.scrollY;
    if (currentScrollY > threshold) {
      // Aplica el estilo de scroll normal
      menu.classList.add("show");
    } else {
      // Quita el estilo cuando sube completamente
      menu.classList.remove("show");
    }
    lastScrollY = currentScrollY;
  };
}

customElements.define("my-header", MyHeader);