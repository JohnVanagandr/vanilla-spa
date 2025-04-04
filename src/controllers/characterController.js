import "../components/image/my-img.js";
const contactController = (params) => {
  let { characterId } = params;

  const character = document.querySelector(".character");
  const name = document.querySelector(".description h2");
  const description = document.querySelector(".description p");

  const loadCharacter = async (id) => {
    try {
      const response = await fetch(
        `https://dragonball-api.com/api/characters/${id}`
      );
      const data = await response.json();
      // console.log(data);
      const img = document.createElement("my-img");
      img.setAttribute("src", data.image);
      character.append(img)
      
      name.textContent = data.name;
      description.textContent = data.description;
    } catch (error) {
      console.error("Error obteniendo datos", error);
    }
  };

  loadCharacter(characterId);
}
export default contactController;