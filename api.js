const categories = require('./category')
const produtcs = require('./products')

// Chamando as funções referente a categoria

async function categoriesActions() {

    categories.findAll().then(res => console.log(res))
    
    categories.create('testando abstração')
    
    categories.update('jfv5SYGO26nxwQzzSJc3', 'Api fodastica')
    
    categories.delet('jfv5SYGO26nxwQzzSJc3')
    
    categories.findAllPaginated({pageSize: 1, startAfter: ''}).then(res => console.log(res))
}

async function productActions() {
    // await produtcs.create({
    //     product: "Abistração de produto",
    //     price: 25405,
    //     categories: ["MD0aEYhfkKYBOST6g49O"]
    // })

    // await produtcs.addImage('miiEswaPDJafmbHi3QpT', {
    //     url: '/image/carlinho-aguiar.png',
    //     description: 'new image'
    // })

    // await produtcs.update('miiEswaPDJafmbHi3QpT', {
    //     product: 'new name',
    //     categories: ['5Cz7xqZcHyz57vNzBgve']
    // })

    // await produtcs.delet('eCosXNSb6AXcSGyKIEP8')

    // console.log(await produtcs.findAll())
    console.log(await produtcs.findAllPaginated({pageSize: 1, startAfter: 'Sony bravel smart'}))

    

}
productActions()
