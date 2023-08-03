const products = 'http://localhost:3000/products';
const categorys = 'http://localhost:3000/category';
export const dbProducts = () => {
    return fetch(products).then((responsive) => responsive.json());
}
export const dbProduct = (id) => {
    return fetch(`${products}/${id}`).then((responsive) => responsive.json());
}
export const dbCategorys = () => {
    return fetch(categorys).then((responsive) => responsive.json());
}
export const dbCategory = (id) => {
    return fetch(`${categorys}/${id}`).then((responsive) => responsive.json());
}

export const deleteProduct = (id) => {
    return fetch(`${products}/${id}`, {
        method: 'DELETE',
    })
}
export const updateProduct = (id, name, img, description, price, idcategory) => {
    return fetch(`${products}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, img, description, price, idcategory })
    });
}