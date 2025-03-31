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
          const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`);
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
        characters.forEach((todo) => {
          const div = document.createElement("div");
          const img = document.createElement("img");
          const h2 = document.createElement("h2");
          const p = document.createElement("p");
          const footer = document.createElement("div");

          img.setAttribute("src", todo.image);
          div.classList.add("card");
          footer.classList.add("card__footer");
          h2.textContent = todo.name;
          p.textContent = todo.race;
          footer.append(h2, p);

          div.append(img, footer);
          fragmen.append(div);
          console.log(todo);
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
  })
  
  loadMoreCharacters()

 };
