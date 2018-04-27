import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App.vue'
import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
require('./scss/styles.scss')

// Vue.use(Vuetify)
Vue.use(VueFire)

new Vue({
  el: '#app',
  render: h => h(App)
})
