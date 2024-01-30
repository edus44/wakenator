import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const app = initializeApp({
  apiKey: 'AIzaSyBAMVBlKuNFbOBX4rvnUyEV-aVhCns7sxc',
  authDomain: 'wakenator-server.firebaseapp.com',
  databaseURL: 'https://wakenator-server.firebaseio.com',
  projectId: 'wakenator-server',
})

const auth = getAuth(app)
const db = getDatabase(app)

export { app, auth, db }
