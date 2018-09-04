<template>
  <v-stepper-header class='nav-bar'>
    <v-layout 
      align-center 
      justify-center
    >
      <h1>{{title}}</h1>
      <button 
        @click="logout"
        v-show="showLogout"
        class='logout links'
      >
        Logout
      </button>
    </v-layout>
  </v-stepper-header>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "TheNavBar",
  data() {
    return {
      title: this.changeTitle(),
      showLogout: this.changeLogout()
    };
  },
  watch: {
    $route(to, from) {
      // Changing the name on display in the NavBar
      this.title = this.changeTitle();
      // Showing the logout button if relevant
      this.showLogout = this.changeLogout();
    }
  },
  methods: {
    ...mapMutations(["logoutUser"]),
    changeTitle() {
      let title = this.$router.history.current.name;
      return title[0].toUpperCase() + title.slice(1);
    },
    changeLogout() {
      let title = this.$router.history.current.name;
      if (title === "users") {
        return true;
      } else {
        return false;
      }
    },
    async logout() {
      try {
        await axios.post("/auth/logout");
        this.logoutUser();
        this.$router.push("login");
      } catch (err) {
        console.log("oops something went wrong");
      }
    }
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: #c4c4c4;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.logout {
  position: absolute;
  right: 15px;
  top: 25px;
}
</style>