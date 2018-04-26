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
    <button @click="createList">Create New List</button>
    <div v-show="newList">
      <p>For:</p>
      <input type="text" v-model="newItems.for" />
      <ul>
        <li v-for="(item, index) in items">
          <input type="text" v-model="newItems.items[index]" />
        </li>
      </ul>
      <!-- <button @click="editList">Edit List</button> -->
      <button @click="pushList">Save</button>
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
      newList: false,
      items: ["Edit Item"],
      newItems: {
        created: "",
        for: "",
        items: ["Edit Item"]
      },
      editItems: [],
      key: null
    };
  },

  computed: {
    name () {
      return this.$store.state.name
    }
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
    createList() {
      this.newList = true
      this.newItems.created = this.name
    },
    pushList() {
      // let pushList = wishlist.push({
      //   created: this.name,
      //   for: "",
      //   items: []
      // });
      let pushList = wishlist.push(this.newItems);
      this.key = pushList.key
      console.log(pushList.key)
      this.newList = false
      this.newItems = {
        created: "",
        for: "",
        items: ["Edit Item"]
      }
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
      wishlist.child("" + this.key + "").once('value').then((snapshot) => {
        console.log(snapshot.val());
        this.editItems = snapshot.val();
      });
      // console.log(this.key)
      // wishlist.once("value", function (snap) {
      //  console.log(snap.key) //logs wishlist
      // });
      // wishlist.once('value').then((snapshot) => {
      //   console.log(snapshot.key) //logs wishlist
      //   snapshot.forEach((childSnap) => {
      //     console.log('user', childSnap.key, childSnap.val());
      //     const FINAL = childSnap.key
      //     if(FINAL == this.key) {
      //       let theKey = FINAL //GOT the key here
      //       // this.key = theKey
      //       console.log(theKey)
      //     } else {
      //       console.log('false')
      //     }
      //    });
      //   // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      //   // ...
      // });
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
