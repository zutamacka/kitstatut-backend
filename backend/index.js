/*
  dependencies - 
*/
const express = require('express')

/*
  dependencies - firebase
*/
// download from firebase by creating a web app, save in folder and adjust path
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('./serviceAccountKey.json');
/*
  config - firestore
*/
initializeApp({
  credential: cert(serviceAccount),
  // for cloud storage
  storageBucket: 'kitstatut.appspot.com'
});

const db = getFirestore();
const bucket = getStorage().bucket();

/*
  dependencies - busboy
*/
const busboy = require('busboy');
const { log } = require('console');
const inspect = require('util').inspect
// packages for saving a file to the tmp folder in the server
let path  = require('path');
let os  = require('os');
let fs  = require('fs');
const { createInflate } = require('zlib');
let UUID = require('uuid-v4')


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
})

/*
  endpoint - create post
*/
app.post('/posts-create', (request, response) => {
  response.set("Access-Control-Allow-Origin", "*")

  // create an uuid for this
  let uuid = UUID()

  // process response containing the form data via busboy
  const bb = busboy({ headers: request.headers });
  
  let fields = {}
  let fileData = {}

    //on-file hook do this for every file
  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    // write the file to the tmp folder on the server
    // gets the filepath by joining the tmpdir() path from the os package and the filename
    let filepath = path.join(os.tmpdir(), filename)
    // creates a writestream with the assigned filepath and writes it to the tmp folder
    file.pipe(fs.createWriteStream(filepath))
    // writes required stuff into a fileData object
    fileData = {filepath, mimeType}
  });

  //on-field hook - do this for every field
  bb.on('field', (name, val, info) => {
    fields[name] = val
    //console.log(`Field [${name}]: value: %j`, val);
  });

  // runs this when it's done processing all the data
  // here is where you actually insert stuff into the firestore db
  bb.on('close', () => {
    console.log('fields: ', fields);

    // upload the file from the tmp folder on the server into the firestore storage bucket
    bucket.upload(
      fileData.filepath, 
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid
          }
        },
      },
      (err, uploadedFile) => {
        if (!err) {
          createFile(uploadedFile)
        }
        else 
          console.log(err);
      }
    )

    // creates a file and post on firebase
    function createFile(uploadedFile) {
      // post fields to firestore
      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        // convert to integer
        date: parseInt(fields.date),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${ bucket.name }/o/${ uploadedFile.name }?alt=media&token=${ uuid }`
      }).then( () => {
        response.send('Post added: ' + fields.id )
      })
    }

    //response.send('Done parsing form.');
    console.log('Done parsing form. Demonic powers compel you');
  });
  request.pipe(bb);
})


/*
  listen on Heroku or home port 
*/
app.listen(process.env.PORT || port, () => {
  console.log(`${port}`)
  console.log('Demonic powers compel you');
})
