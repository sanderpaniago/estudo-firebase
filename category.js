const db = require('./firestore')

const findAll = async() => {
    const categoriesDB = await db.collection('categories').get()
    if (categoriesDB.empty)
        return []

    const categories = []
    categoriesDB.forEach(item => {
        categories.push({
            ...item.data(),
            id: item.id
        })
    })

    return categories
}

const findAllPaginated = async({pageSize = 10, startAfter = ''}) => {

    const categoriesDB = await db
                    .collection('categories')
                    .orderBy('category')
                    .limit(pageSize+1)
                    .startAfter(startAfter)
                    .get()

    if (categoriesDB.empty) {
        return {
            data: [],
            total: 0
        }
    }


    const categories = []
    let total = 0 
    categoriesDB.forEach(item => {
        if(total < pageSize) {
            categories.push({
                ...item.data(),
                id: item.id
            })
        } 
        total++
    })

    return {
        data: categories,
        total: categories.length,
        hasNext: total > pageSize,
        startAfter: categories[categories.length-1].category
    }
}

const create = async (categoryName) => {
    try {

        const doc =  db.collection('categories').doc()
        const response = await doc.set({
            category: categoryName
        })
        
        console.log(response)
        
        return console.log('Tabela criada com sucesso!!!!')
    } catch (err) {
        console.log('Erro ao criar categoria!!!!',err)
    }

}

const update = async (categoryId, newName) => {
    try {

        const doc = db.collection('categories').doc(categoryId)
        
        const response = await doc.update({
            category: newName
        })
        
        console.log(response)
        
        return console.log('Categoria atualizada com sucesso.')
    } catch (err) {
        console.log("erro ao atualizar categoria!!!", err)
    }
}

const delet = async (categoryId) => {
    try {
        const doc = db.collection('categories').doc(categoryId)
        
        const res = await doc.delete()

        console.log(res)

        return console.log('Categoria excluida com sucesso!!')
    } catch (err) {
        console.log('erro ao deletar categoria', err)
    }
}

module.exports = {findAll, create, update, delet, findAllPaginated}