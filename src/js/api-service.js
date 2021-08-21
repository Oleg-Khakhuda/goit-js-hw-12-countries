const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountryName(countryName) {
    return fetch(`${BASE_URL}/${countryName}`)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export default { fetchCountryName };