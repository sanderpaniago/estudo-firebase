const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const cat1 = '5Cz7xqZcHyz57vNzBgve'
const catRef = db.collection('categories').doc(cat1)

const doc = db.collection('products').doc()

doc.set({
    product: 'Sony bravel smart',
    price: 2000,
    categories: [catRef],
    categories2: [cat1]
}).then( snap => {
    console.log(snap)
})