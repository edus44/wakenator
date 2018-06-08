import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

firebase.initializeApp({
  apiKey: 'AIzaSyBAMVBlKuNFbOBX4rvnUyEV-aVhCns7sxc',
  authDomain: 'wakenator-server.firebaseapp.com',
  databaseURL: 'https://wakenator-server.firebaseio.com',
  projectId: 'wakenator-server',
})

const auth = firebase.auth()
const database = firebase.database()

export { auth, database, firebase }
