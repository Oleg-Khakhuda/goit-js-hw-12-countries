// import debounce from 'lodash.debounce';
import './sass/main.scss';
import worldTpl from '../src/templates/world.hbs';

const countryEl = document.querySelector('.js-card-container')

fetch('https://restcountries.eu/rest/v2/name/ukraine')
    .then(response => {
        console.log(response);
    return response.json();
})
    .then(country => {
        console.log(country);
        const murkup = worldTpl(country);
        console.log(murkup);
        countryEl.innerHTML = murkup;
    })
    .catch(error => {
        console.log(error);
    })





  