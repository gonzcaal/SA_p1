const axios = require('axios');

// URL de la API de PokéAPI
const url = 'https://pokeapi.co/api/v2/pokemon/';

// Función para obtener los datos de una página específica
async function getDataByPage(page) {
  const response = await axios.get(url, {
    params: {
      offset: (page - 1) * 10,
      limit: 10
    }
  });

  return response.data.results;
}

// Función para imprimir los datos de una página
async function printPageData(page) {
  const data = await getDataByPage(page);
  console.log(`=== Página ${page} ===`);
  data.forEach(pokemon => {
    console.log(pokemon.name);
  });
}

// Función principal para imprimir todas las páginas
async function printAllPages() {
  try {
    const response = await axios.get(url);
    const totalCount = response.data.count;
    const totalPages = Math.ceil(totalCount / 10);

    for (let page = 1; page <= totalPages; page++) {
      await printPageData(page);
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error.message);
  }
}

// Llamar a la función principal para imprimir todas las páginas
printAllPages();
