<template>
  <section id="auth">
    <div class="tabs">
      <button class="tab" :class="{selected: sign}" @click="sign = true">Sign In</button>
      <button class="tab" :class="{selected: !sign}" @click="sign = false">Sign Up</button>
    </div>
    <div class="sign in" v-show="sign">
      <p>Sign In</p>
      <form>
        <p>Email:</p>
        <input type="email" v-model="email" required />
        <p>Password:</p>
        <input type="text" v-model="password" required />
        <p>Your Name:</p>
        <input type="submit" value="Sign In" @click.prevent="toggleSignIn">
      </form>
    </div>

    <div class="sign up" v-show="!sign">
      <p>Sign Up</p>
      <form>
        <p>Email:</p>
        <input type="email" v-model="email" required />
        <p>Password:</p>
        <input type="text" v-model="password" required />
        <p>Your Name:</p>
        <input type="text" v-model="name" required />
        <input type="submit" value="Sign Up" @click.prevent="handleSignUp">
      </form>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      sign: true,
      email: "",
      password: "",
      name: ""
    };
  },

  computed: {
    storeEmail () {
      return this.$store.state.email
    },
  },

  methods: {
    currentUser() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          alert(user.email)
          this.$emit('signedIn');
          this.$store.commit("updateName", this.name);
          this.$store.commit("updateEmail", user.email);
          this.$emit('getUser')
          // var displayName = user.displayName;
          // var email = user.email;
          // var emailVerified = user.emailVerified;
          // var photoURL = user.photoURL;
          // var isAnonymous = user.isAnonymous;
          // var uid = user.uid;
          // var providerData = user.providerData;
        } else {
          // No user is signed in.
          console.log('Not signed in')
        }
      })
    },
    toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
        console.log('first 1')
      } else {
        var $email = this.email
        var $password = this.password
        var $name = this.name

        if ($email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if ($password.length < 4) {
          alert('Please enter a password.');
          return;
        }

        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword($email, $password)
        .then(() => {

          console.log('third')
          this.currentUser()
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          alert('Wrong password.');
          console.log(error);
          // document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
    },

    handleSignUp() {
      var $email = this.email
      var $password = this.password
      var self = this
      if ($email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if ($password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword($email, $password)
      .then(() => {
        alert('new user!'),
        this.$store.commit('updateName', self.name),
        self.$emit('addUser')
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    },
    sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    },
    sendPasswordReset() {
      var $email = this.email
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail($email)
      .then(() => {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }
  },
  mounted() {
    this.currentUser()
    setTimeout(() => {

    }, 500);
  },
  components: {},
  props: ["comments"]
};
</script>

<style scoped lang="scss">
.tabs {
  width: 100%;
  background: #666;
  border-top: 1px solid #555;
  border-left: 1px solid #555;
  border-right: 1px solid #555;
  margin-top: 10px;
}
.tabs .tab {
  /* background: #666; */
  color: #fff;
  padding: 8px;
  cursor: pointer;
}
.tabs .tab.selected {
  background: #e6e7e8;
  color: #000;
  cursor: default;
}
.sign {
  padding: 10px;
  border-bottom: 1px solid #555;
  border-left: 1px solid #555;
  border-right: 1px solid #555;
}
input[type="text"] {
  background: #fff;
  width: 100%;
  padding: 10px;
}
input[type="email"] {
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
</style>
