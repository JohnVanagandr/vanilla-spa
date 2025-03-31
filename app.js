import { initRouter } from "./src/router.js";

async function loadView(view, params = {}) {
  try {
    console.log(view);
    
    const response = await fetch(`/src/views/${view}.html`);
    if (!response.ok) throw new Error(`No se pudo cargar ${view}`);

    const html = await response.text();
    document.getElementById("app").innerHTML = html;

    // Cargar controlador dinámicamente si existe
    try {
      console.log(`/src/controllers/${view}Controller.js`);
      
      const module = await import(`/src/controllers/${view}Controller.js`);
      module.default(params);
    } catch (err) {
      console.warn(`No se encontró controlador para ${view}`);
    }
  } catch (error) {
    console.error("Error al cargar la vista:", error);
  }
}

// Iniciar el enrutador
initRouter(loadView);

export default loadView;
