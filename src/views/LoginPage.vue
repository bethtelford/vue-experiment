<template>
  <div class="page">
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
            v-model="username" 
            label='Username' 
            outline 
            clearable
            autofocus
            color='#3D8C72' 
          />
        <v-text-field 
            v-model="password"
            label='Password' 
            outline 
            clearable 
            type='password'
            color='#3D8C72'
          />
        <v-btn 
          type='submit' 
          color='#3D8C72'
        >
          Log In
        </v-btn>
      </v-form>
      <span>Don't have an account? 
        <router-link 
          to='/signup'
          class='links' 
        >
          Signup
        </router-link>
      </span>
    </v-layout>
  </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "LoginPage",
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