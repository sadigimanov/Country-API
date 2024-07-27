const photo = document.querySelector('#photo');
const nameUI = document.querySelector('#name');
const subName = document.querySelector('#sub-name');
const bordersUI = document.querySelector('#borders');
const search = document.querySelector('#search');

const fetchCountryByName = async (name) => {
    const api = await fetch('https://restcountries.com/v3.1/name/' + name);
    const res = await api.json();
    return res[0];
}

const fetchCountryByCodes = async (array) => {
    const api = await fetch('https://restcountries.com/v3.1/alpha?codes=' + array.toString());
    const res = await api.json();
    return res;
}


const bordersDiv = (borders) => {
    bordersUI.innerHTML = ''
    borders.forEach((item) => {
        bordersUI.innerHTML += `
        <figure data-name="${item.name.common}" class="cursor-pointer aspect-[2/1]">
            <img class="size-full object-cover border border-gray-400" src="${item.flags.png}" alt="">
        </figure>
    `
    });
}

const uiCreate = async (name) => {
    try {
        const country = await fetchCountryByName(name);

        if (country) {
            photo.src = country.flags.png
            nameUI.textContent = country.name.common
            subName.textContent = country.capital[0]

            const borders = await fetchCountryByCodes(country.borders.filter(i => i !== 'ARM'));
            bordersDiv(borders);    
        }
    }
    catch (e) {
        console.log(e);
    }
}

uiCreate('azerbaijan');

search.addEventListener('keyup', (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && value.trim) {
        uiCreate(value)
    }
})
bordersUI.addEventListener('click', (e) => {
    const obj = e.target.closest('figure') ? e.target.closest('figure') : e.target;
    const name = obj.getAttribute('data-name');
    if (name) {
        uiCreate(name)
    }
})