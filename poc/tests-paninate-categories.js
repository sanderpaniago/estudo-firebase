const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const pageSize = 1

const categories = db
                    .collection('categories')
                    .orderBy('category')
                    .limit(pageSize+1)
                    .startAfter('')
                    .get()
categories.then(snapshot => {
    console.log('is empety ',snapshot.empty)
    let total = 0
    snapshot.forEach(item => {
      if(total < pageSize) {
        console.log(item.id, ' =>', item.data())
      }
      total++
    })
    if(total > pageSize) {
      console.log('hasNext')
    } else {
      console.log('doest haveNext')
    }
})