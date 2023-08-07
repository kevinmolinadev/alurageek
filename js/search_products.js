import { dbProducts } from './db/client-service.js';
import { product, Load } from './index.js';
const logo = document.querySelector('.header__logo')
const form = document.querySelector('.header__search');
const textSearch = document.querySelector('.header__search input');
const btnSearch = document.querySelector('.search__btn input');
const gallery = document.getElementById('gallery');
let click = 0;
btnSearch.addEventListener('click', () => {
    click++;
    if (click <= 1 && window.innerWidth <= 768) {
        btnSearch.classList.add('btn__input--click');
        textSearch.classList.add('search__input--click')
        form.classList.add('header__search--click', 'transition-effect');
        logo.classList.add('header__logo--click', 'transition-effect');
    }
});
document.addEventListener('click', (e) => {
    if (!form.contains(e.target)) {
        btnSearch.classList.remove('btn__input--click');
        textSearch.classList.remove('search__input--click')
        form.classList.remove('header__search--click', 'transition-effect');
        logo.classList.remove('header__logo--click', 'transition-effect');
        click = 0;
    }
});
textSearch.addEventListener('input', () => {
    if (textSearch.value == '') {
        gallery.innerHTML = '';
        Load();
    }
});
const search = async () => {
    const nameProduct = textSearch.value;
    try {
        const products = await dbProducts();
        if (nameProduct !== '') {
            const productsName = products.filter((product) => {
                return product.name.toLowerCase().startsWith(nameProduct.toLowerCase());
            });
            if (productsName.length > 0) {
                gallery.innerHTML = `
                <h2 class="header__title">Productos encontrados: ${productsName.length}</h2>
                <div class="section__products grid"></div>`
                const grid = gallery.querySelector('.section__products');
                productsName.forEach(({ id, name, img, description, price, idcategory }) => {
                    let newProduct = product(id, name, img, description, price, idcategory);
                    grid.appendChild(newProduct);
                })
            }else{
                gallery.innerHTML=`<h2 class="header__title product--not-found">No se encontraron productos con la palabra: "${nameProduct}"</h2>`
            }
        }
    } catch (error) {
        console.error(error);
    }
}
const searchSubmit = (e) => {
    e.preventDefault();
    search();
};
form.addEventListener('submit', searchSubmit);
setTimeout(() => {
    textSearch.value = localStorage.getItem('search');
    search();
    localStorage.removeItem('search')
}, 5)