const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const productRef = db.collection('products').doc('eCosXNSb6AXcSGyKIEP8')

db
  .collection('products')
  .doc('eCosXNSb6AXcSGyKIEP8')
  .collection('images')
  .get()
  .then(img => {
    const listDelete = []
    img.forEach( image => {
      listDelete.push(image.delete())
    })
    return Promise.all(listDelete)
  })
  .then(()=> productRef.delete())
  .then(() => {
    console.log('everything was deleted')
  })