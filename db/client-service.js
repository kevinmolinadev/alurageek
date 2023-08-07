const products = 'https://backend-alura.onrender.com/products';
const categorys = 'https://backend-alura.onrender.com/category';
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

export const newProduct = (name, img, description, price, idcategory) => {
    return fetch(products, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, img, description, price, idcategory })
    });
}

export const newCategory = async (name) => {
    const responsive = await fetch(categorys, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });
    const data = await responsive.json();
    return data;
}