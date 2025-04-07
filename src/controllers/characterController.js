import "../components/image/my-img.js";
const contactController = (params) => {
  let { characterId } = params;

  // Personaje
  const characters = document.querySelector(".characters");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  // Caracteristicas
  const name = document.querySelector(".name");
  const ki = document.querySelector(".ki");
  const maxki = document.querySelector(".maxki");
  const race = document.querySelector(".race");
  const gender = document.querySelector(".gender");
  const affiliation = document.querySelector(".affiliation");
  const description = document.querySelector(".description");
  // Planeta
  const planet = document.querySelector(".planet .name h2");
  const planet_description = document.querySelector(".planet .name p");
  const planet_img = document.querySelector(".planet img");
  // Transformaciones
  const transformations = document.querySelector("transformations");

  const loadCharacter = async (id) => {
    try {
      const response = await fetch(
        `https://dragonball-api.com/api/characters/${id}`
      );
      const data = await response.json();
      // Sección para las imagenes del personaje
      const img = document.createElement("my-img");
      img.setAttribute("src", data.image);
      img.setAttribute("class", "active");
      characters.append(img);
      if (data.transformations.length > 0) {
        const images = data.transformations;
        let indiceActual = 0; //Variable para administrar la galeria
        // Iteramos la respuesta del servidor
        images.forEach((element) => {
          const img = document.createElement("my-img");
          img.setAttribute("src", element.image);
          img.setAttribute("class", "none")
          characters.append(img);
        });
        // eventos para dinamizar el carrusel 
        // Trasnformamos la consulta del DOM a un arreglo
        let elementos = [...characters.children];
        // Método para actualizar el indice del carrusel
        const actualizarActiva = (indice) => {
          // Ocultamos todas las imagenes
          elementos.forEach((img) => img.setAttribute("class", "none"));
          // Mostramos la imagen con el indice enviado
          elementos[indice].setAttribute("class", "active");          
        };
        
        nextBtn.addEventListener("click", () => {
          // Avanza en la lista y reinicia si llega al final
          indiceActual = (indiceActual + 1) % elementos.length;
          actualizarActiva(indiceActual);
        });
        prevBtn.addEventListener("click", () => {
          // Retrocedemos y reinicia si está en el incio
          indiceActual = (indiceActual - 1 + elementos.length) % elementos.length;
          actualizarActiva(indiceActual);
        });        
      } else {
        nextBtn.classList.add("d-none");
        prevBtn.classList.add("d-none");
      }
      
      name.textContent = data.name;
      ki.querySelector("span").textContent = data.ki;
      maxki.querySelector("span").textContent = data.maxKi;
      race.querySelector("span").textContent = data.race;
      gender.querySelector("span").textContent = data.gender;
      affiliation.querySelector("span").textContent = data.affiliation;
      description.querySelector("p").textContent = data.description;
      planet.textContent = data.originPlanet.name;
      planet_description.textContent = data.originPlanet.description;
      planet_img.setAttribute("src", data.originPlanet.image);


    } catch (error) {
      console.error("Error obteniendo datos", error);
    }
  };

  loadCharacter(characterId);
}
export default contactController;