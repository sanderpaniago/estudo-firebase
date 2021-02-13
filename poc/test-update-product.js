const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const cat1 = 'RfGvHPHs7Dq0fjITwBka'
const catRef = db.collection('categories').doc(cat1)

const doc = db.collection('products').doc('eCosXNSb6AXcSGyKIEP8')

doc.update({
    product: 'Carlinho aguiar é um produto',
    price: 2000,
    categories: admin.firestore.FieldValue.arrayUnion(catRef),
    categories2: admin.firestore.FieldValue.arrayUnion(cat1)
}).then( snap => {
    console.log(snap)
})