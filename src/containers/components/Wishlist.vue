<template>
  <section id="wishlist">
    <div v-for="(item, index) in wishlist">
      <button @click="editThisList(item)">Edit this List</button>
      <p>Wishlist is for: {{item.for}}</p>
      <ul>
        <li v-for="(gift, id) in item.items">
          <!-- <label :for="item">{{gift}}</label> -->
          <!-- <input type="text" :id="item" :placeholder="gift"/> -->
          <p>{{gift}}</p>
        </li>
      </ul>
      <!-- <button @click="">Save</button> -->
      <hr />
    </div>
    <button @click="newList">New List</button>
    <div>
      <p>For:</p>
      <input type="text" v-model="listFor" />
      <ul>
        <li v-for="(item, index) in newItems">
          <input type="text" v-model="items[index]" />
        </li>
      </ul>
      <button @click="editList">Edit List</button>
      <button @click="saveList">Save</button>
      <hr />
    </div>
  </section>
</template>

<script>
import { config, app, users, comments, wishlist, fs, timestamp } from '../../util/config'
export default {
  data() {
    return {
      sign: true,
      listFor: "",
      items: [],
      newItems: [
        "Thing 1", "Thing 2"
      ],
      key: null
    };
  },

  computed: {

  },

  methods: {
    saveEdit() {
      // let wishRef = wishlist.child();
      // wishlist.on('child_changed', function(data) {
      //   setCommentValues(element, data.key, data.val().text, data.val().author);
      // });
      // var timestamp = (new Date()).getTime();
      // usersRef.update({
      //  '/someUserKey/lastLogin': timestamp,
      //  '/adminLogs/logins/anotherUserKey/lastLogin': timestamp
      // })
      // .catch(function (err) {
      //  console.log(‘one of these updates failed’, err);
      // });
    },
    deleteList() {
      // wishlist.on('child_removed', function(data) {
      //   deleteComment(postElement, data.key);
      // });
    },
    newList() {
      let pushList = wishlist.push({
        created: "Christopher",
        for: "Mark",
        items: {}
      });
      this.key = pushList.key
      console.log(pushList.key)
      return pushList
    },
    editList() {
      // let stuff = JSON.stringify(this.newItems)
      // this.items.push(stuff);
      this.items = [];
      this.items = this.items.concat(this.newItems);
    },
    editThisList(num) {
      const VALUES = Object.values(num)
      VALUES.forEach((val) => {
        this.key = val; //GOT the key here
      })
      // wishlist.once("value", function (snap) {
      //  console.log(snap.key) //logs wishlist
      // });
      wishlist.once('value').then((snapshot) => {
        console.log(snapshot.key) //logs wishlist
        snapshot.forEach((childSnap) => {
          console.log('user', childSnap.key, childSnap.val());
          const FINAL = childSnap.key
          if(FINAL == this.key) {
            let theKey = FINAL //GOT the key here
            console.log(theKey)
          } else {
            console.log('false')
          }
         });
        // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        // ...
      });
    },
    saveList() {
      // let key = this.key
      // let stuff = JSON.stringify(this.items)
      wishlist.child(this.key).child("items").set(this.items);
      // wishlist.update({
      //  "/key": this.items
      //  // "/adminLogs/logins/anotherUserKey/lastLogin": timestamp
      // })
    }
  },
  mounted() {
    setTimeout(() => {

    }, 500);
  },
  components: {},
  props: ['wishlist']
};
</script>

<style scoped lang="scss">

</style>
