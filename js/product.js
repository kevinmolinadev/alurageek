import { dbProducts, dbProduct } from '../db/client-service.js';
import { product } from './index.js';
const url = window.location;
const searchParams = new URLSearchParams(url.search);
const form = document.querySelector('.header__search');
const textSearch = document.querySelector('.header__search input');
const idValue = searchParams.get('id');
const img = document.querySelector('.item__img img')
const title = document.querySelector('.item__title');
const price = document.querySelector('.item__price');
const description = document.querySelector('.item__description');
const recomended = document.querySelector('.section__products');

const productInformation = async (id) => {
    try {
        const product = await dbProduct(id);
        img.src = product.img;
        img.alt = product.name;
        title.textContent = product.name;
        price.textContent = `$${product.price}`;
        description.textContent = product.description;
    } catch (error) {
        console.log(error);
    }
}
productInformation(idValue);

const recomendedProducts = async (id) => {
    try {
        const Products = await dbProducts();
        const Product = await dbProduct(id);
        const listProducts = Products.filter(product => product.id != id);
        const productsCategory = listProducts.filter(product => product.idcategory == Product.idcategory)
        productsCategory.forEach(({ id, name, img, description, price, idcategory }) => {
            addProduct(id, name, img, description, price, idcategory);
        });
        let count = productsCategory.length;
        listProducts.forEach(({ id, name, img, description, price, idcategory }) => {
            if (count > 5) {
                return;
            } else {
                addProduct(id, name, img, description, price, idcategory);
                count++;
            }
        })
    } catch (error) {
        console.error(error);
    }
}
recomendedProducts(idValue);

const addProduct = (id, name, img, description, price, idcategory) => {
    let newRecomended = product(id, name, img, description, price, idcategory);
    recomended.appendChild(newRecomended);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('search',textSearch.value);
    window.location.href = '../index.html';
})

