<template>
  <section id="container">

    <Auth :comments="comments" @getUser="getUser" @addUser="addUser" :signedIn="signedIn = true" v-show="!signedIn"></Auth>
    <Comment :comments="comments" :newMessage="newMessage" @addComment="addComment" v-show="signedIn"></Comment>

  </section>
</template>

<script>
import Auth from './components/Auth.vue'
import Comment from './components/Comments.vue'

// import {config, app, users, comments, fs} from '../config'

import firebase from 'firebase'
import 'Firebase/firestore'

let config = {
  apiKey: "AIzaSyBTbP9rVzz37B5ZDNYm0YoqRRsFxoVqGfM",
    authDomain: "family-social-5026d.firebaseapp.com",
    databaseURL: "https://family-social-5026d.firebaseio.com",
    projectId: "family-social-5026d",
    storageBucket: "family-social-5026d.appspot.com",
    messagingSenderId: "697955346223"
}

let app = firebase.initializeApp(config)
let users = app.database().ref('users')
let comments = app.database().ref('comments')
let fs = firebase.firestore(app)

  export default {
    data: function () {
      return {
        newMessage: {
          comment: "",
          person: "",
          date: ""
        },
        signedIn: false
      }
    },
    firebase: {
      comments: comments
   },
    computed: {
      email () {
        return this.$store.state.email
      },
      name () {
        return this.$store.state.name
      },
      commentsLength() {
        return this.comments.length + 1
      },
      commentsRev() {
        return this.comments.reverse();
        this.$forceUpdate()
      },
      date() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date();
        // const month = monthNames[d.getMonth()];
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        const hours = d.getHours();
        let hour;
        let postfix;
        if (hours > 12) {
          hour = hours - 12
          postfix = "p.m."
        } else {
          hour = hours
          postfix = "a.m."
        }
        // hours > 12 ? hour = hours - 12 : hour = hours
        const min = d.getMinutes();
        const fulldate = month + "/" + day + "/" + year + " at " + hour + ":" + min + postfix;
        return fulldate
      }
    },
    methods: {
      addComment() {
        // comments.push(comments.length + 1 (this.newMessage));
        // this.newMessage.comment = '';
        comments.child("" + this.commentsLength + "").set({
          comment: this.newMessage.comment,
          person: this.name,
          date: this.date
        });
        this.newMessage.comment = '';
        console.log(comments.length)
      },
      getUser() {
        setTimeout(() => {
          let self = this
          let $index = this.email.indexOf("@")
          let $name = this.email.slice(0, $index);
          let docRef = fs.collection("users").doc("" + $name + "");
          docRef.get().then(function(doc) {
              if (doc.exists) {
                  self.$store.commit('updateName', doc.data().name)
              } else {
                  console.log("No such document!");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
        }, 150);
      },
      addUser() {
        setTimeout(() => {
          let $index = this.email.indexOf("@")
          console.log($index)
          let $name = this.email.slice(0, $index);
          console.log($name)
          fs.collection("users").doc($name).set({
            name: this.name,
            handle: $name,
            created: this.date
          })
        }, 150);
      }
    },
    mounted() {
      console.log(fs)
      fs.collection("users").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`);
                    console.log(doc.data());
                });
            });
            // USE BELOW FOR USER WITH AUTO GENERATED DOCUMENT
            // fs.collection("users").doc('newUser').add({
            //     name: "Some Guy",
            //     handle: "handle",
            //     created: this.date
            // })
            // USE BELOW FOR USER WHEN ADDING DOCUMENT
            // fs.collection("users").doc("newUser").set({
            //   name: "Some Guy",
            //   handle: "handle",
            //   created: this.date
            // })
            console.log(this.date)
    },
    components: {
      Auth, Comment
    },
    props: []
  }
</script>

<style scoped>

</style>
