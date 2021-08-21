import worldTpl from '../src/templates/world.hbs';
import worldItemTpl from '../src/templates/world-item.hbs';
import API from '../src/js/api-service';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import './sass/main.scss';

const inputEl = document.querySelector('.form-control');
const countryEl = document.querySelector('.js-card-container');

inputEl.addEventListener('input', debounce(onSearch, 500));

// Поиск страны

function onSearch(e) {
    const searchQuery = e.target.value;

    if (!searchQuery) {
        clearMurkup();
        return;
    } 

    API.fetchCountryName(searchQuery)
        .then(renderCountryCard)
        .catch(error => console.log(error));
}

// Создаем разметку по результату поиска

function renderCountryCard(countries) {
    if (countries.length <= 10 && countries.length >= 2) {
        const markupItem = worldItemTpl(countries);
        countryEl.innerHTML = markupItem;
    } else if (countries.length === 1) {
        const murkup = worldTpl(countries);
        countryEl.innerHTML = murkup;
    } else if (countries.length > 10) {
        clearMurkup();
        onError();
    } else
        onFetchError();   
}

// Очищает разметку

function clearMurkup() {
    countryEl.innerHTML = '';
}

// Ненашли страну

function onFetchError() {
  alert('Упс, что-то пошло не так и мы не нашли вашу страну!');
}

// Ошибка PNotify

function onError() {
    error({
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 2000,
    });
}




  