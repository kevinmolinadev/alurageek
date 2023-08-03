import { dbProducts, dbProduct } from './db/client-service.js';
import { product } from './index.js';
const url = window.location;
const searchParams = new URLSearchParams(url.search);
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
const recomendedProducts = async (id) => {
    try {
        const Products = await dbProducts();
        let count = 0;
        for (const element of Products) {
            if (count > 5) {
                return;
            } else {
                if (element.id == id) {
                    console.log(element.name);
                } else {
                    count++
                    let newRecomended = product(element.id, element.name, element.img, element.description, element.price, element.idcategory);
                    recomended.appendChild(newRecomended)
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}
productInformation(idValue);
recomendedProducts(idValue);

