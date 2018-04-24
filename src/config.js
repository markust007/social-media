import Firebase from 'Firebase'
import 'Firebase/firestore'

let config = {
  apiKey: "AIzaSyBTbP9rVzz37B5ZDNYm0YoqRRsFxoVqGfM",
    authDomain: "family-social-5026d.firebaseapp.com",
    databaseURL: "https://family-social-5026d.firebaseio.com",
    projectId: "family-social-5026d",
    storageBucket: "family-social-5026d.appspot.com",
    messagingSenderId: "697955346223"
}

let app = Firebase.initializeApp(config)
let users = app.database().ref('users')
let comments = app.database().ref('comments')
let fs = Firebase.firestore()

export default {
  namespaced: true, config, users, comments, fs
}
