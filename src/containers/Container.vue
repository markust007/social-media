<template>
  <section id="container">

    <Auth :comments="comments" @signedIn="signedIn = true" v-show="!signedIn"></Auth>
    <!-- <Comment :comments="comments" v-show="signedIn"></Comment>
    <Wish :wishlist="wishlist"></Wish> -->
    <Topbar v-show="signedIn"></Topbar>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view v-show="signedIn" :comments="comments" :wishlist="wishlist" :key="this.$route.path"></router-view>
    </transition>

  </section>
</template>

<script>
import Auth from './components/Auth.vue'
import Topbar from './components/Topbar.vue'
// import Comment from './components/Comments.vue'
// import Wish from './components/Wishlist.vue'

import firebase from 'firebase'
import 'Firebase/firestore'

import { config, app, users, comments, wishlist, fs, timestamp } from '../util/config'
import date from '../util/date'

  export default {
    data: function () {
      return {
        signedIn: false
      }
    },
    firebase: {
      comments: comments,
      wishlist: wishlist
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
      }
    },
    methods: {

    },
    mounted() {
      console.log(fs)
      fs.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            console.log(doc.data());
        });
      }).catch((error) => {
          console.log("Error getting document:", error);
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
      Auth, Topbar
      // Comment, Wish
    },
    props: []
  }
</script>

<style scoped>

</style>
