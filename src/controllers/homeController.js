const homeController = () => {
  try {
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const lista = document.querySelectorAll(".carrusel .figura");
    let indiceActual = 0;

    const actualizarActiva = (indice) => {
      // Ocultamos todas las imagenes
      lista.forEach(img => img.classList.remove('activa'));
      // Mostramos la imagen con el indice enviado
      lista[indice].classList.add('activa');
      
    };

    nextBtn.addEventListener("click", () => {
      // Avanza en la lista y reinicia si llega al final
      indiceActual = (indiceActual + 1) % lista.length;
      actualizarActiva(indiceActual);
    });
    prevBtn.addEventListener('click', () => {
      // Retrocedemos y reinicia si está en el incio
      indiceActual = (indiceActual - 1 + lista.length) % lista.length;
      actualizarActiva(indiceActual);
    })
  } catch (error) {
    console.log(error);
    
  }
};

export default homeController;