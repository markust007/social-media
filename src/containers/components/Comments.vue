<template>
  <section id="comments">
    <ul>
      <li v-for="(comment, index) in comments">
        <div class="user">
          <i class="fas fa-user"></i>
        </div>
        <div class="message">
          <p class="person">{{comment.person}}</p>
          <p class="date">{{comment.date}}</p>
          <p class="comment">{{comment.comment}}</p>
        </div>
      </li>
    </ul>
    <div class="add-comment">
      <input type="text" placeholder="Enter Comment" v-model="message" />
      <input type="submit" value="Add" @click.prevent="addComment">
    </div>
  </section>
</template>

<script>
import { config, app, users, comments, wishlist, fs, timestamp } from '../../util/config'
import fulldate from '../../util/date'

export default {
  data() {
    return {
      sign: true,
      message: "",
    };
  },

  computed: {
    name () {
      return this.$store.state.name
    },
    commentsLength() {
      return this.comments.length + 1
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
        comment: this.message,
        person: this.name,
        date: this.date
      });
      this.message = '';
    }
  },
  mounted() {
    setTimeout(() => {

    }, 500);
  },
  components: {},
  props: ["comments"]
};
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  li {
    width: 100%;
    margin: 5px 0;
    position: relative;
    background: #fff;
    padding: 10px;
    display: flex;
    * {
      margin: 0;
    }
    .user {
      background: #ccc;
      width: 30px;
      height: 30px;
      border-radius: 2px;
      text-align: center;
      margin-right: 10px;
      i {
        margin-top: 4px;
        font-size: 1.7rem;
        color: #fff;
      }
    }
    .message {
      flex: 1;
      .person {
        display: inline-block;
        font-size: 0.8rem;
        color: lightblue;
        font-weight: 600;
      }
      .date {
        color: #ccc;
        display: inline-block;
        font-size: 0.8rem;
      }
      .comment {
        font-size: 1.10rem;
        margin-top: 3px;
      }
    }
  }
}
.add-comment {
  width: 80%;
  margin: 25px auto 0;
  input[type="text"] {
    background: #fff;
    width: 100%;
    padding: 10px;
  }
  input[type="submit"] {
    padding: 10px 20px;
    border-radius: 5px;
    background: lightblue;
    text-transform: uppercase;
    display: block;
    margin: 10px auto 0;
    font-size: 1.1rem;
  }
}
</style>
