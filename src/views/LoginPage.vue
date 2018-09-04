<template>
  <div class="login">
    <v-layout 
      align-center 
      justify-center 
      column 
      class='form-container'
    >
    <v-form 
        @submit.prevent="login" 
        class='form' 
      >
      <v-text-field 
          label='Username' 
          outline clearable
          color='#3D8C72' 
          v-model="username" 
        />
      <v-text-field 
          label='Password' 
          outline 
          clearable 
          color='#3D8C72'
          v-model="password"
          type='password'
        />
      <v-btn 
        type='submit' 
        color='#3D8C72'
      >
        Log In
      </v-btn>
    </v-form>
    <span>Don't have an account? <router-link class='links' to='/signup'>Signup</router-link></span>
    </v-layout>
  </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
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
    async login() {
      const { username, password } = this;
      // Fields must be filled in
      if (username && password) {
        try {
          let user = await axios.post("/auth/login", {
            username,
            password
          });
          this.updateUser(user.data);
          this.$router.push("users");
        } catch (err) {
          console.log("Wrong username or password");
        }
      }
    }
  }
};
</script>

<style>
.login {
  height: 100vh;
  padding: 200px 300px;
}
</style>