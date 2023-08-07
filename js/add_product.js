import { dbCategorys, newProduct, newCategory} from "../db/client-service.js";
const formSearch = document.querySelector('.header__search');
const textSearch = document.querySelector('.header__search input');
const form = document.querySelector('[data-form]');
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

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const categorys= await dbCategorys();
        categorys.forEach(({ id, name }) => {
            let newC = addcategory(id, name);
            categoryOptions.appendChild(newC);
        });
    } catch (error) {
        console.error(error);
    }
});

categoryOptions.addEventListener('change',()=>{
    let opacity=1;
    if(categoryOptions.selectedIndex!=0){
        newcategory.disabled=true;
        newcategory.required=!newcategory.required;
        opacity=0.5;
    }else{
        console.log(opacity);
        newcategory.disabled=false;
    }
    newcategory.style.opacity=opacity;
})

newcategory.addEventListener('input',()=>{
    if(newcategory.value!=''){
        categoryOptions.selectedIndex=0;
        categoryOptions.disabled=true;
    }else{
        categoryOptions.disabled=false;
    }
})

form.addEventListener('submit', async (event) => {
    let idCategoryProduct='';
    try {
        event.preventDefault();
        if(newcategory.value!=''){
            const category=await newCategory(newcategory.value);
            idCategoryProduct=category.id;
        }else{
            idCategoryProduct=categoryOptions.value;
        }
        await newProduct(name.value, img.value, description.value, price.value, Number(idCategoryProduct));
        window.location.href = '../products.html';
    } catch (error) {
        console.error(error);
    }
})

formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('search',textSearch.value);
    window.location.href = '../index.html';
})