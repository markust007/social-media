<template>
  <div id="app">
      <transition name="fade">
      <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw" v-show="loader"></i>
      </transition>

      <container v-if="items"></container>

  </div>
</template>

<script>
/////////////////////VARIABLES & IMPORTS////////////////////
//////////////////////////////////////////////////////////
import store from './store/index'

import axios from 'axios';

import container from './containers/Container.vue'


import {polyfill} from "mobile-drag-drop";
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";


/////////////////////SCORM VARIABLE////////////////////
//////////////////////////////////////////////////////////

var json = 'data/data.json';

polyfill({
    // use this to make use of the scroll behaviour
    dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});


export default {
  name: 'app',
  store,
  data () {
    return {
      loader: true
    }
  },
  components: {
    container
  },

  computed: {
    menu () {
      return this.$store.state.menu
    },
    items () {
      return this.$store.state.items
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      axios.get(json)
      .then(response => {
        // JSON responses are automatically parsed.
        this.$store.commit('setItems', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    },
    menuToggle () {
      this.$store.commit('menuToggle')
    }

  },
  mounted() {
    this.loader = false
  }
}
</script>

<style>
    /* global styles */
</style>
