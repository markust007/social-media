import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    items: null,
    userName: "",
    menu: true,
    email: "",
    name: "",
    initials: ""
  },
  actions: {

  },
  mutations: {
    setItems (state, value) {
      state.items = value;
    },
    updateEmail (state, value) {
      state.email = value;
    },
    updateName (state, value) {
      state.name = value;
    },
    updateInitials (state, value) {
      state.initials = value;
    },
    changeUserName (state, value) {
      state.userName = value;
    },
    menuToggle (state) {
      state.menu = !state.menu;
    }
  },
  getters: {

  }
})
export default store

var QueryString = function() {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

if (QueryString.debug === "true") {
  document.addEventListener("keydown", (e) => {
    const actions = {
      ArrowRight: () => { store.commit('incrementProgress'), store.commit('locationPlus') },
      ArrowLeft: () => store.commit('locationMinus'),
    };
    maybe(actions[e.key]);
  })

  function maybe(fn) {
    fn ? fn() : null;
  }
}
