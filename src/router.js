export const initRouter = (loadView) => {
  // Constante para almacenar el objeto que contiene las rutas
  const routes = {
    home: () => loadView("home"),
    characters: () => loadView("characters"),
    character: (id) => loadView("character", { characterId : id }),
    planets: () => loadView("planets"),
  };
  // Método para detectar un cambio en las rutas
  const handleRouteChange = () => {
    // Eliminar `#/`
    let hash = location.hash.slice(2);

    if (!hash) {
      // Página por defecto
      return loadView("home");
    }
    // Separar la ruta y  losparámetros
    const [route, ...params] = hash.split("/");

    if (routes[route]) {
      // Pasar todos los parámetros a la función
      routes[route](...params);
    } else {
      // Cargamos la página no encontrada
      loadView("404");
    }
  }
  // Eventos para detectar cambios en la URL
  window.addEventListener("hashchange", handleRouteChange);
  window.addEventListener("DOMContentLoaded", handleRouteChange);
}
