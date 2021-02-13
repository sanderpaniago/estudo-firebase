const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const productId = 'eCosXNSb6AXcSGyKIEP8'
const imageRef = db.collection('products').doc(productId).collection('images').doc()
imageRef.set({
    description: 'my description',
    url: 'my umage url'
}).then(snap => {
    console.log(snap)
})
