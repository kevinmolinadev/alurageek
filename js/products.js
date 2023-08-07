import { deleteProduct, dbProducts } from "../db/client-service.js";
const form = document.querySelector('.header__search');
const textSearch = document.querySelector('.header__search input');

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
    deleteP.addEventListener('click', async () => {
        try {
            let id = deleteP.id;
            await deleteProduct(id);
            product.style.opacity = 0
            product.style.transition = 'opacity 1s';
        } catch (error) {
            console.error(error);
        }
        setTimeout(()=>{
            product.style.display = 'none'
        },900)
    })
    product.classList.add('product');
    return product;
}

const Load= async () => {
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
};
Load();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('search', textSearch.value);
    window.location.href = '../index.html';
})

