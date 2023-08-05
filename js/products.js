import { deleteProduct, dbProducts } from "./db/client-service.js";
const product = (id, name, img, price) => {
    let product = document.createElement('article');
    let data = `
    <div class="product__img">
        <img src="${img}" alt="${name}">
        <div class="product__options">
            <a data-delete id="${id}"><img src="./img/products/delete.svg" alt="delete"></a>
            <a href="../edit_product.html?id=${id}"><img src="./img/products/edit.svg" alt="edit"></a>
        </div>
    </div>
    <p class="product__title">${name}</p>
    <p class="product__price">$${price}</p>
    <a href="../product.html?id=${id}" class="product__link">Ver producto</a>
    `
    product.innerHTML = data;
    let deleteP = product.querySelector('[data-delete]');
    deleteP.addEventListener('click', async (event) => {
        try {
            event.preventDefault();
            let id = deleteP.id;
            await deleteProduct(id);
        } catch (error) {
            console.error(error);
        }
    })
    product.classList.add('product');
    return product;
}
window.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.querySelector('.section__products');
    try {
        const data = await dbProducts();
        data.forEach(({ id, name, img, price }) => {
            let newProduct = product(id, name, img, price);
            contenedor.appendChild(newProduct);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
