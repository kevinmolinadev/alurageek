import { dbCategory, dbCategorys, dbProduct, updateProduct } from "./db/client-service.js";
const url = window.location;
const searchParams = new URLSearchParams(url.search);
const form = document.querySelector('[data-form]');
const idValue = searchParams.get('id');
const name = document.getElementById('name');
const img = document.getElementById('img');
const newcategory = document.getElementById('category');
const categoryOptions = document.getElementById('options');
const price = document.getElementById('price');
const description = document.getElementById('description');
const addcategory = (idCategory, nameCategory) => {
    let newCategory = document.createElement('option');
    newCategory.text = nameCategory;
    newCategory.value = idCategory;
    return newCategory;
}
const Product = async (id) => {
    try {
        const product = await dbProduct(id);
        const categorys = await dbCategorys();
        const category = await dbCategory(product.idcategory)
        name.value = product.name;
        img.value = product.img;
        console.log(category.name);
        categorys.forEach(({ id, name }) => {
            let newC = addcategory(id, name);
            if (newC.value == category.id) {
                newC.selected = true;
            }
            categoryOptions.appendChild(newC);
        });
        price.value = product.price;
        description.value = product.description;
    } catch (error) {
        console.error(error);
    }
}
Product(idValue);
form.addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        await updateProduct(idValue, name.value, img.value, description.value, price.value, Number(categoryOptions.value));
        window.location.href = '../products.html';
    } catch (error) {
        console.error(error);
    }
})
