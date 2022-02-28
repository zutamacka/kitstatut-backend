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


//var admin = require("firebase-admin");



// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
const db = getFirestore();

/*
  config - express
*/
const app = express()
let port = 3000


/*
  endpoint - test
*/
app.get('/', (request, response) => {
  response.send('FLOOey')
})

/*
  endpoint - posts
*/
app.get('/posts', (request, response) => {
  // access for Heroku
  response.set("Access-Control-Allow-Origin", "*")
  //
  let posts = [] 
  db.collection('posts').orderBy('date','desc').get().then(snapshot => {
    snapshot.forEach((doc) => {
      posts.push(doc.data())
    });
     response.send(posts)
  })
  console.log('Demonic powers compel you');
})

/*
  endpoint - create post
*/
app.get('/posts-create', (request, response) => {
  response.set("Access-Control-Allow-Origin", "*")

  response.send('Demonic powers compel you')
  console.log('Demonic powers compel you');
})


/*
  listen on Heroku or home port 
*/
app.listen(process.env.PORT || port, () => {
  console.log(`${port}`)
  console.log('Demonic powers compel you');
})
