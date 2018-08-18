import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBIvsZY7DZye-UDVFVNRKc80QGE535dZH4',
  authDomain: 'ishinomakihack2018.firebaseapp.com',
  databaseURL: 'https://ishinomakihack2018.firebaseio.com',
  projectId: 'ishinomakihack2018',
  storageBucket: 'ishinomakihack2018.appspot.com',
  messagingSenderId: '896922847870'
}
firebase.initializeApp(config)

const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

export { db, firebase }
