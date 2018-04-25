<template>
  <section id="wishlist">
    <div v-for="(item, index) in wishlist">
      <p>Wishlist is for: {{item.for}}</p>
      <ul>
        <li v-for="(gift, id) in item.items">
          <p>{{gift}}</p>
        </li>
      </ul>
    </div>
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

  },

  methods: {

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
