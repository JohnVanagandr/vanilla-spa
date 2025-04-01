import "../components/image/my-img.js";
import "../components/card/my-card.js"

export default async function aboutController(params) {
  const todoList = document.querySelector("#todo");
  const loadingDiv = document.getElementById("loading");

  let currentPage = 1;
  const limit = 12; // Número de elementos por página
  let isLoading = false; // Para evitar múltiples peticiones
  let hasMoreData = true; // Para saber si aún hay datos por cargar

  // API de Dragon Ball Z (reemplaza con tu API real si es diferente)
  async function fetchCharacters(page, limit) {
    try {
      const response = await fetch(
        `https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`
      );
      const data = await response.json();

      // Si no hay más datos, dejamos de cargar
      if (!data || !data.items || data.items.length < limit) {
        hasMoreData = false;
      }

      return data.items || [];
    } catch (error) {
      console.error("Error obteniendo datos:", error);
      return [];
    }
  }

  async function loadMoreCharacters() {
    if (isLoading || !hasMoreData) return;
    isLoading = true;
    loadingDiv.style.display = "block";

    const characters = await fetchCharacters(currentPage, limit);

    try {
      if (characters.length > 0) {
        const fragmen = document.createDocumentFragment();
        characters.forEach((character) => {
          const card = document.createElement("my-card");
          card.setAttribute("id", character.id);
          card.setAttribute("name", character.name);
          card.setAttribute("race", character.race);
          card.setAttribute("image", character.image);
          fragmen.append(card)
        });
        todoList.append(fragmen);
        currentPage++; // Pasar a la siguiente página
      }

      loadingDiv.style.display = "none";
      isLoading = false;
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  }

  // Detectar el final de la página y cargar más contenido
  window.addEventListener("scroll", () => {
    if (isLoading || !hasMoreData) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreCharacters();
    }
  });

  document.addEventListener("click", (e) => {
    let card = e.target.closest(".card");
    if (card) {
      let cardId = card.dataset.id;
      // Actualizar la URL sin recargar la página
      location.hash = `#/character/${cardId}`;
    }
  });

  loadMoreCharacters();
}
