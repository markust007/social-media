<template>
  <section id="comments">
    <ul>
      <li v-for="(comment, index) in comments">
        <div class="user">
          <i class="fa fa-user" aria-hidden="true"></i>
        </div>
        <div class="message">
          <p class="person">{{comment.person}}</p>
          <p class="date">{{comment.date}}</p>
          <p class="comment">{{comment.comment}}</p>
        </div>
      </li>
    </ul>
    <div class="add-comment">
      <input type="text" placeholder="Enter Comment" v-model="newMessage.comment" />
      <input type="submit" value="Add" @click.prevent="addComment">
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'


export default {
  data() {
    return {
      sign: true,
    };
  },

  computed: {

  },

  methods: {
    addComment() {
      this.$emit('addComment')
    }
  },
  mounted() {
    setTimeout(() => {

    }, 500);
  },
  components: {},
  props: ["comments", "newMessage"]
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
