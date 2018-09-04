<template>
  <div class="page">
    <v-layout 
      align-center 
      justify-center 
      column 
      class='form-container'
    >
      <v-form 
        @submit.prevent="toggleModule" 
        class='form' 
      >
        <v-text-field 
          style='{height: 60px}'
          label='Name' 
          outline 
          autofocus 
          clearable 
          color='#3D8C72' 
          v-model="name"
        />
        <v-text-field 
          label='Username' 
          outline clearable
          color='#3D8C72' 
          v-model="username" 
        />
        <v-text-field 
          label='Email' 
          outline 
          clearable 
          color='#3D8C72'
          v-model="email" 
          :rules="[validateEmail]"
          validate-on-blur
        />
        <v-text-field 
          label='Password' 
          outline 
          clearable 
          color='#3D8C72'
          v-model="password" 
          :rules="[validatePasswordLength]"
          validate-on-blur
          type='password'
        />
        <v-text-field 
          label='Confirm Password' 
          outline 
          clearable 
          color='#3D8C72'
          v-model="confirmPassword"
          :rules="[validatePasswordMatch]"
          validate-on-blur
          type='password'
        />
        <v-btn 
          type='submit' 
          color='#3D8C72'
        >
          Create Account
        </v-btn>
      </v-form>
      <span>Already have an account? <router-link class='links' to='/login'>Login</router-link></span>
    </v-layout>
    <div v-show="showModule">
      I am the module 
      <button @click="register">Confirm</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      // boolean for module conditional rendering
      showModule: false,
      // allowModule determines if the 'toggleModule' function is allowed to fire, based on the data validation happening in the form
      allowModule: true
    };
  },
  async mounted() {
    if (!this.$store.state.name) {
      try {
        let user = await axios.get("/api/user");
        this.updateUser(user.data);
        this.$router.push("login");
      } catch (err) {
        console.log(err);
      }
    } else {
      this.$router.push("users");
    }
  },
  methods: {
    ...mapMutations(["updateUser"]),
    validateEmail() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.email).toLowerCase())) {
        this.allowModule = true;
        return true;
      } else {
        console.log("you need a valid email address");
        this.allowModule = false;
        return 'You need to enter a valid email address'
      }
    },
    validatePasswordLength() {
      if (this.password.length >= 2) {
        this.allowModule = true;
        return true
      } else {
        console.log("you need a longer password", this.password);
        this.allowModule = false;
        return "You need a longer password"
      }
    },
    validatePasswordMatch() {
      if (this.password === this.confirmPassword) {
        this.allowModule = true;
        return true
      } else {
        console.log("does not match");
        this.allowModule = false;
        return "Passwords don't match"
      }
    },
    toggleModule() {
      // if allowModule is true, the data validation has been successful, and all fields must have values
      if (
        this.allowModule &&
        this.name &&
        this.username &&
        this.email &&
        this.password &&
        this.confirmPassword
      ) {
        this.showModule = true;
      }
    },
    async register() {
      const { name, username, email, password } = this;
      let user = await axios.post("/auth/register", {
        name,
        username,
        email,
        password
      });
      this.updateUser(user.data);
      this.$router.push("users");
    },
    cancel() {
      this.showModule = false;
    }
  }
};
</script>

<style scoped>
</style>