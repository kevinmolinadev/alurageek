import { dbProducts, dbCategorys } from '../db/client-service.js';

const sectiond = (name) => {
    let section = document.createElement('section');
    let data = `
  <div class="section__header flex">
      <h2 class="header__title">${name}</h2>
      <a class="header__link" href="./products.html">Ver todo</a>
  </div>
  <div class="section__products grid">
  </div>
  `
    section.innerHTML = data;
    section.classList.add('gallery__section')
    return section;
}

export const product = (id, name, img, description, price, idcategory) => {
    let product = document.createElement('article');
    let data = `
    <div class="product__img">
        <img loading="lazy" src="${img}" alt="${name}">
    </div>
    <p class="product__title">${name}</p>
    <p class="product__price">$${price}</p>
    <a href="../product.html?id=${id}" class="product__link">Ver producto</a>`
    product.innerHTML = data;
    product.classList.add('product');
    return product;
}

export const Load = async () => {
    const textSearch = document.querySelector('.header__search input');
    const gallery = document.getElementById('gallery');
    try {
        const sections = await dbCategorys();
        const products = await dbProducts();
        if(textSearch.value===''){
            sections.forEach((section) => {
                let productsCategory = products.filter(product => product.idcategory === section.id)
                if (productsCategory.length > 0) {
                    let newSection = sectiond(section.name);
                    const grid = newSection.querySelector('.section__products');
                    productsCategory.forEach(({ id, name, img, description, price, idcategory }) => {
                        if (idcategory == section.id) {
                            let newProduct = product(id, name, img, description, price, idcategory);
                            grid.appendChild(newProduct);
                        }
                    })
                    gallery.appendChild(newSection);
                }
            })
        }
    } catch (error) {
        console.error(error);
    }
};
Load();
