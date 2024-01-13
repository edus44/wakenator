import { initializeApp } from 'firebase/app'
import { ref, getDatabase, set, onDisconnect, remove } from 'firebase/database'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'

const app = initializeApp({
  apiKey: 'AIzaSyBAMVBlKuNFbOBX4rvnUyEV-aVhCns7sxc',
  authDomain: 'wakenator-server.firebaseapp.com',
  databaseURL: 'https://wakenator-server.firebaseio.com',
  projectId: 'wakenator-server',
})

const auth = getAuth(app)
const db = getDatabase(app)

signInAnonymously(auth)
  .then(() => {
    console.log('signed in')
  })
  .catch(error => {
    console.log('error', error)
  })
console.log('what')

onAuthStateChanged(auth, user => {
  console.log(user?.uid)
  if (!user) return

  const list = ref(db, `/channel/gigigo/list/${user.uid}`)
  const meta = ref(db, `/channel/gigigo/meta/${user.uid}`)

  onDisconnect(list).remove()
  onDisconnect(meta).remove()

  set(list, {
    name: 'pepit2',
    host: 'browser',
    user: 'user',
  })
  set(meta, {
    name: 'pepit2',
    host: 'browser',
    user: 'user',
    ip: '0.0.0.0',
    av: '0',
    ts: new Date().toISOString(),
  })
})
