<template>
  <div class="login">
    <form @submit="login">
      <input v-model="username">
      <input 
        v-model="password"
        type="password">
      <button>Login</button>
    </form>
    <span>Don't have an account? <router-link to='/signup'>Signup</router-link></span>
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
  methods: {
    ...mapMutations(["updateUser"]),
    async login(e) {
      const { username, password } = this;
      e.preventDefault();
      // Fields must be filled in
      if (username && password) {
        try {
          let user = await axios.post("http://localhost:4000/auth/login", {
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