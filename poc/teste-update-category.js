const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const doc = db.collection('categories').doc('RfGvHPHs7Dq0fjITwBka')

doc.update({
    category: 'Novo nome.'
}).then( snap => {
    console.log(snap)
})