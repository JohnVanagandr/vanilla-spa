import { initRouter } from "./src/router.js";
import "./src/components/header/my-header.js"

const initApp = () => {
  // Creamos el componeten my-header
  if (!document.querySelector("my-header")) {
    const header = document.createElement("my-header");
    document.body.prepend(header);    
  }
}


const loadView = async (view, params = {}) => {

  try {
    const basePath = window.location.pathname.includes("spa")
      ? "/vanilla-spa/src/"
      : "/src/";

    const response = await fetch(`${basePath}/views/${view}.html`);
    if (!response.ok) throw new Error(`No se pudo cargar ${view}`);

    const html = await response.text();
    document.getElementById("app").innerHTML = html;

    // Cargar controlador dinámicamente si existe
    try {
      const module = await import(
        `${basePath}/controllers/${view}Controller.js`
      );
      module.default(params);
    } catch (err) {
      console.warn(`No se encontró controlador para ${view}`);
    }
  } catch (error) {
    console.error("Error al cargar la vista:", error);
  }
};

// Ejecutar al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// Iniciar el enrutador
initRouter(loadView);

export default loadView;
