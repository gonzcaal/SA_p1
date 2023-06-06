const soap = require('strong-soap').soap;

// URL de donde se va a consumir
const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';

// Cliente SOAP
soap.createClient(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
 
  const requestParams = {};

  // Llamar a la operación SOAP
  client.ListOfCountryNamesByName(requestParams, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    // Obtener los datos del resultado de la operación SOAP
    const data = result.ListOfCountryNamesByNameResult.tCountryCodeAndName;

    const pageSize = 10;

    // Dividir los datos en páginas
    const pages = [];
    for (let i = 0; i < data.length; i += pageSize) {
      const page = data.slice(i, i + pageSize);
      pages.push(page);
    }

    // Imprimir los datos de cada página
    pages.forEach((page, index) => {
      console.log(`=== Página ${index + 1} ===`);
      console.log(page);
    });
  });
});
