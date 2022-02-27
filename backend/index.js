/*
  dependencies
*/
const express = require('express')

/*
  firebase
*/
// download from firebase by creating a web app, save in folder and adjust path
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

/*
  config - express
*/

const app = express()
let port = 3000
/*
  endpoint - posts
*/


app.get('/posts', (request, response) => {
  let posts = [ ]
   response.set("Access-Control-Allow-Origin", "*")
  db.collection('posts').get().then(snapshot => {
    snapshot.forEach((doc) => {
      //console.log(doc.id, '=>', doc.data());
      posts.push(doc.data())
    });
     response.send(posts)
  })


 
  console.log('Demonic powers compel you');
})

/*
  listen
*/

// this is for HEROKU
app.listen(process.env.PORT || port, () => {
  console.log(`${port}`)
  console.log('Demonic powers compel you');
})



/*
app.get('/', (request, response) => {
  response.send('Yo Ho ho!')
})

app.listen(port, () => {
  console.log(`${port}`)
})
*/

