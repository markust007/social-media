<template>
  <section id="wishlist">
    <div class="list-items" v-show="!showList">
      <h3 class="title">Lists</h3>
      <ul>
        <li v-for="(item, index) in wishlist" @click="select(item)">
          <p class="wish-for">{{item.for}}</p>
        </li>
      </ul>
    </div>

      <div class="wishlist" v-show="!editList && showList">
        <div v-show="mainItems.created == name">
          <button class="edit" @click="backtoLists"><i class="fas fa-caret-square-left"></i> Back</button>
          <button class="edit" @click="editThisList"><i class="fas fa-edit"></i> Edit List</button>
          <button class="edit" @click="deleteList"><i class="fas fa-trash-alt"></i> Delete List</button>
        </div>
        <p class="wish-for">Wishlist is for: {{mainItems.for}}</p>
        <ul>
          <li v-for="(item, index) in mainItems.items">
            <p :class="{strike: got[index]}">{{item.item}}</p>
            <button class="make-strike" @click="strike(index)">Got</button>
          </li>
        </ul>
      </div>

    <button class="new-list" @click="createList" v-show="!editList && !showList">Create New List</button>
    <button class="new-list close"@click="closeNewList" v-show="newList && !editList && !showList"><i class="fas fa-times"></i></button>

    <!-- WISHLIST NEW-->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="wishlist new" v-show="newList && !editList && !showList">
        <p>For:</p>
        <input type="text" v-model="newItems.for" />
        <ul>
          <li v-for="(item, index) in items">
            <input type="text" v-model="items[index].item" />
          </li>
        </ul>
        <button @click="addItem" class="add-item" :class="{disabled: items[items.length - 1] == ''}"><i class="fas fa-plus-square"></i> Add Item</button>
        <button class="save" @click="pushList">Save</button>
      </div>
    </transition>

    <!-- WISHLIST EDIT -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="wishlist edit" v-if="editList">
        <p>For:</p>
        <input type="text" v-model="editItems.for" />
        <ul>
          <li v-for="(item, index) in editItems.items">
            <input type="text" v-model="editItems.items[index].item" />
          </li>
        </ul>
        <button @click="editItemsAdd" class="add-item" :class="{disabled: editItems.items[editItems.items.length - 1] == ''}"><i class="fas fa-plus-square"></i> Add Item</button>
        <button class="save" @click="saveEditList">Save</button>
      </div>
    </transition>

    <!-- MODAL -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="modal" v-show="modal">
        <div class="modal-window">
          <p>Are you sure?</p>
          <button class="new-list" @click="yesModal">YES</button>
          <button class="new-list" @click="noModal">NO</button>
        </div>
      </div>
    </transition>
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
      editList: false,
      showList: false,
      modal: false,
      items: [{"item": "Edit Item", "got": false}],
      newItems: {
        created: "",
        for: "",
        date: "",
        items: [{"item": "Edit Item", "got": false}]
      },
      editItems: [{}],
      mainItems: [{}],
      got: [],
      key: null
    };
  },

  computed: {
    name () {
      return this.$store.state.name
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
      const fulldate = month + "/" + day + "/" + year + " at " + hour + ":" + min + " " + postfix;
      return fulldate
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
    gone(num) {
      wishlist.child("" + this.key + "").child("items").child("" + num + "").child("got").on('value').then((snapshot) => {
        let value = snapshot.val();
        if(value == true || value == "true") {
          return true
        } else {
        return false
        }
      });
    },
    backtoLists() {
      this.showList = false
      this.mainItems = [{}]
    },
    select(num) {
      this.got = []
      const VALUES = Object.values(num)
      VALUES.forEach((val) => {
        this.key = val; //GOT the key here
      });
      wishlist.child("" + this.key + "").once('value').then((snapshot) => {
        console.log(snapshot.val());
        this.mainItems = snapshot.val();
        console.log(snapshot.child("items").val())
        let items = snapshot.child("items").val()
        for (let i = 0; i < items.length; i++) {
            // console.log(snapshot.child("items").child(i).child("got").val())
            this.got.push(snapshot.child("items").child(i).child("got").val())
        }
        snapshot.forEach((snap) => {
          console.log(snap.val())
          console.log(snap.child("got").val())
        });
      });
      this.showList = true
    },
    deleteList(num) {
      // wishlist.on('child_removed', function(data) {
      //   deleteComment(postElement, data.key);
      // });
      // const VALUES = Object.values(num)
      // VALUES.forEach((val) => {
      //   this.key = val; //GOT the key here
      // })
      this.modal = true
    },
    strike(num) {
      // const VALUES = Object.values(num)
      // VALUES.forEach((val) => {
      //   this.key = val; //GOT the key here
      // })
      // event.target.previousElementSibling.classList.toggle("strike");
      wishlist.child("" + this.key + "").child("items").child("" + num + "").child("got").once('value').then((snapshot) => {
        let value = snapshot.val();
        if(value == true || value == "true") {
          wishlist.child("" + this.key + "").child("items").child("" + num + "").child("got").set(false);
        } else {
          wishlist.child("" + this.key + "").child("items").child("" + num + "").child("got").set(true);
        }
        this.got[num] = !snapshot.val();
      });
      this.$forceUpdate();
    },
    yesModal() {
      wishlist.child("" + this.key + "").remove();
      this.modal = false
      this.showList = false
      this.mainItems = [{}]
    },
    noModal() {
      this.modal = false
    },
    addItem() {
      this.items.push({"item": "", "got": false});
      this.$forceUpdate();
    },
    editItemsAdd() {
      this.editItems.items.push({"item": "", "got": false})
      // this.editItemsGifts.push("New Item");
      this.got.push(false);
      this.$forceUpdate();
    },
    saveEditList() {
      wishlist.child(this.key).set(this.editItems);
      this.mainItems = this.editItems
      this.editList = false
    },
    createList() {
      this.newList = true
      this.newItems.created = this.name
      this.newItems.date = this.date
    },
    closeNewList() {
      this.newList = false
      this.items = [{"item": "Edit Item", "got": false}],
      this.newItems = {
        created: "",
        for: "",
        date: "",
        items: [{"item": "Edit Item", "got": false}]
      }
    },
    pushList() {
      // let pushList = wishlist.push({
      //   created: this.name,
      //   for: "",
      //   items: []
      // });
      let pushList = wishlist.push(this.newItems);
      this.key = pushList.key
      wishlist.child(this.key).child("items").set(this.items);
      this.newList = false
      this.newItems = {
        created: "",
        for: "",
        date: "",
        items: [{"item": "Edit Item", "got": false}]
      }
      this.items = [{"item": "Edit Item", "got": false}]
      return pushList
    },
    // editList() {
    //   // let stuff = JSON.stringify(this.newItems)
    //   // this.items.push(stuff);
    //   this.items = [];
    //   this.items = this.items.concat(this.newItems);
    // },
    editThisList(num) {
      this.editList = true
      // const VALUES = Object.values(num)
      // VALUES.forEach((val) => {
      //   this.key = val; //GOT the key here
      // })
      wishlist.child("" + this.key + "").once('value').then((snapshot) => {
        console.log(snapshot.val());
        this.editItems = snapshot.val();
      })
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
#wishlist {
  margin: 1% 0;
}
.list-items {
  background: #fff;
  border: 1px solid #ccc;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  h3 {
    background: rgba(0,0,0,0.1);
    padding: 10px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      padding: 10px;
      border-top: 1px solid #ccc;
      cursor: pointer;
      p {
        margin: 0
      }
    }
  }
}
.edit, .save {
  background: #ccc;
  padding: 5px;
  border-radius: 2px;
}
.new-list {
  padding: 10px 20px;
  border-radius: 5px;
  background: lightblue;
  text-transform: uppercase;
  display: inline-block;
  margin: 0 auto;
  font-size: 1.1rem;
  &.close {
    color: #fff;
    background: red;
    display: inline-block;
  }
}
.add-item {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 2px;
  &.disabled {
    cursor: default;
    pointer-events: none;
    color: #ccc;
  }
}
.wishlist {
  background: white;
  margin-bottom: 10px;
  padding: 10px;
  .wish-for {
    margin: 5px 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
    li {
      border-top: 1px solid #ccc;
      padding: 5px;
      &:last-child {
        border-bottom: 1px solid #ccc;
        margin-bottom: 5px;
      }
      p {
        display: inline-block;
        margin: 0;
        &.strike {
          text-decoration: line-through;
        }
      }
      .make-strike {
        float: right;
        font-size: 0.7rem;
        background: #555;
        color: #fff;
        padding: 3px;
        border-radius: 2px;
        text-transform: uppercase;
      }
    }
  }
  &.new, .edit {
    p {
      margin: 0;
      display: inline-block;
    }
    input {
      display: inline-block;
      background-color: #ddd;
      padding: 5px;
    }
  }
}
.modal {
  position: absolute;
  background: rgba(0,0,0,0.7);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .modal-window {
    background: #fff;
    width: 400px;
    height: 250px;
    display: block;
    margin: 0 auto;
    margin-top: 40%;
    p {
      margin: 0;
      padding-top: 10%;
      text-align: center;
    }
  }
}
</style>
