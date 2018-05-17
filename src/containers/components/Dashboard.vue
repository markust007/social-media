<template>
  <section id="dashboard">
    <nav>
      <router-link to="comments">
        <p class="head">Comments<span><i class="fas fa-chevron-right"></i></span></p>
        <h3>{{commentsLength}}</h3>
        <p class="text">Total Comments</p>
        <div class="button-look">View Comments</div>
      </router-link>
      <router-link to="wishlist">
        <p class="head">Wishlists<span><i class="fas fa-chevron-right"></i></span></p>
        <h3>{{wishlistLength}}</h3>
        <p class="text">Total Wishlist's</p>
        <div class="button-look">View Wishlists</div>
      </router-link>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {
      sign: true,
    };
  },

  computed: {
    commentsLength() {
      return this.comments.length
    },
    wishlistLength() {
      return this.wishlist.length
    }
  },

  methods: {

  },
  mounted() {
    setTimeout(() => {

    }, 500);
  },
  components: {},
  props: ['comments', 'wishlist']
};
</script>

<style scoped lang="scss">
#dashboard {
  margin: 7% 0;
}
nav {
  display: flex;
  a {
    min-width: 200px;
    min-height: 225px;
    background: #fff;
    margin: 0 35px 0 0;
    border-radius: 4px;
    border: 1px solid #ddd;
    text-align: center;
    text-decoration: none;
    &:-webkit-any-link {
      text-decoration: none;
    }
    p, h3 {
      text-decoration: none;
    }
    .head {
      background: #eee;
      margin: 0;
      padding: 5px 10px;
      font-weight: 700;
      color: #666;
      border-bottom: 1px solid #ddd;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      text-align: left;
      span {
        float: right;
      }
    }
    h3 {
      font-size: 4rem;
      margin: 20px 0 0;
      color: #666;
    }
    .text {
      color: #666;
      margin: 0;
      font-weight: 700;
    }
    .button-look {
      background: rgba(95,179,206,1);
      padding: 5px;
      color: #fff;
      width: 125px;
      margin: 0 auto;
      border-radius: 60px;
      margin-top: 30px;
    }
  }
}
</style>
