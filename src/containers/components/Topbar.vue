<template>
  <header id="top">
    <ul class="nav">
      <li class="back">
        <router-link to="/" v-show="this.$route.path !== '/'"><i class="fas fa-chevron-left"></i></router-link>
      </li>
      <li>
        <router-link to="comments">Comments</router-link>
      </li>
      <li>
        <router-link to="wishlist">Wishlist</router-link>
      </li>
      <li class="initials">
        <p>{{initials}}</p>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      sign: true,
    };
  },

  computed: {
    initials() {
      return this.$store.state.initials
    }
  },

  methods: {

  },
  mounted() {
    setTimeout(() => {

    }, 500);
  },
  components: {},
  props: []
};
</script>

<style scoped lang="scss">
header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 35px;
  background: rgba(95,179,206,1);
  z-index: 99;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  li {
    display: inline-block;
    color: #fff;
    padding: 0;
    margin: 0 10px;
    font-size: 1.15rem;
    margin-top: 7px;
    a {
      color: #fff;
      text-decoration: none;
      transition: all .3s;
      &.router-link-exact-active {
        cursor: default;
        pointer-events: none;
        opacity: 0.5;
      }
    }
    &.back {
      position: absolute;
      margin-top: 6px;
      left: 15px;
      font-size: 1.5rem;
    }
    &:nth-child(2) {
      margin-left: 65px;
    }
    &:last-child {
      float: right;
      background: #fff;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      margin-right: 15px;
      color: rgba(95,179,206,1);
      font-size: 1.5rem;
      font-weight: 400;
      margin-top: 2px;
      // border: 1px solid rgba(95,179,206,1);
      p {
        margin: 4px 0 0;
      }
    }
  }
}
</style>
