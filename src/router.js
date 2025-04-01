export function initRouter(loadView) {
  const routes = {
    home: () => loadView("home"),
    characters: () => loadView("characters"),
    character: (id) => loadView("character", { characterId : id }),
  };

  function handleRouteChange() {
    let hash = location.hash.slice(2); // Eliminar `#/`

    if (!hash) {
      return loadView("home"); // Página por defecto
    }    
    const [route, ...params] = hash.split("/"); // Separar ruta y parámetros

    if (routes[route]) {
      routes[route](...params); // Pasar todos los parámetros a la función
    } else {
      loadView("404"); // Página no encontrada
    }
  }

  // Detectar cambios en la URL
  window.addEventListener("hashchange", handleRouteChange);
  window.addEventListener("DOMContentLoaded", handleRouteChange);
}
