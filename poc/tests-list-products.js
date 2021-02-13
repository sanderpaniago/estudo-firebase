const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const products = db.collection('products').get()
products.then(snapshot => {
    console.log('is empety ',snapshot.empty)
    snapshot.forEach(item => {
        console.log(item.id, ' =>', item.data())
        db
          .collection('products')
          .doc(item.id)
          .collection('images')
          .get()
          .then(img=> {
            img.forEach(image=> {
              console.log(' img ==> ', image.id, ' =>', image.data())
            })
          })
    })
})