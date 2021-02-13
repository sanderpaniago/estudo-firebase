const db = require('./firestore')
const admin = require('firebase-admin')

const findAll = async() => {
    const productsDB = await db.collection('products').get()
    if (productsDB.empty)
        return []

    const products = []
    productsDB.forEach(item => {
        products.push({
            ...item.data(),
            id: item.id
        })
    })
    const products2 = []
    for await(product of products) {
        const imgs = []
        const imgsDB = await db
                        .collection('products')
                        .doc(product.id)
                        .collection('images')
                        .get()
        imgsDB.forEach(img => {
            imgs.push({
                ...img.data(),
                id: img.id
            })
        })

        products2.push({
            ...product,
            imgs
        })
    }


    return products2
}

const findAllPaginated = async({pageSize = 10, startAfter = ''}) => {

    const productsDB = await db
                    .collection('products')
                    .orderBy('product')
                    .limit(pageSize+1)
                    .startAfter(startAfter)
                    .get()

    if (productsDB.empty) {
        return {
            data: [],
            total: 0
        }
    }


    const products = []
    let total = 0 
    productsDB.forEach(item => {
        if(total < pageSize) {
            products.push({
                ...item.data(),
                id: item.id
            })
        } 
        total++
    })

    const products2 = []
    for await(product of products) {
        const imgs = []
        const imgsDB = await db
                        .collection('products')
                        .doc(product.id)
                        .collection('images')
                        .get()
        imgsDB.forEach(img => {
            imgs.push({
                ...img.data(),
                id: img.id
            })
        })

        products2.push({
            ...product,
            imgs
        })
    }

    return {
        data: products2,
        total: products.length,
        hasNext: total > pageSize,
        startAfter: products[products.length-1].category
    }
}

const create = async ({categories, ...data}) => {
    try {
        const doc =  db.collection('products').doc()
        const categoriesRef = categories.map(cat => db.collection('categories').doc(cat))
        await doc.set({
            ...data,
            categories: categoriesRef,
            categories2: categories
        })
        
        return console.log('Procudo criado com sucesso!!!!')
    } catch (err) {
        console.log('Erro ao criar produto!!!!',err)
    }
}

const addImage = async (id, data)=> {

    const imageRef = db
        .collection('products')
        .doc(id)
        .collection('images')
        .doc()


    await imageRef.set(data)

}

const update = async (id,{categories, ...data}) => {
    try {

        const doc =  db.collection('products').doc(id)
        const categoriesRef = categories.map(cat => db.collection('categories').doc(cat))
        
        await doc.update({
            ...data,
            categories: admin.firestore.FieldValue.arrayUnion(...categoriesRef),
            categories2: admin.firestore.FieldValue.arrayUnion(...categories),
        })
        
        
        return console.log('produto atualizado com sucesso.')
    } catch (err) {
        console.log("erro ao atualizar produto!!!", err)
    }
}

const delet = async (id) => {
    try {

        const images = await db
        .collection('products')
        .doc(id)
        .collection('images')
        .get()

        const exclusoes = []

        images.forEach( image => {
            exclusoes.push(db.collection('products').doc(id).collection('images').doc(image.id).delete())
        })
        await Promise.all(exclusoes)

        const doc = db.collection('products').doc(id)
        await doc.delete()

        return console.log('produto excluido com sucesso!!')

    } catch (err) {
        console.log('erro ao deletar produto', err)
    }
}

module.exports = {findAll, create, update, delet, findAllPaginated, addImage}