<template>
  <div class="page">
    <v-layout 
      justify-space-between 
      align-start
    >
    <v-card 
      color='#3D8C72' 
      width='400px'
    >
      <v-card-text>{{$store.state.name}}</v-card-text>
      <v-card-text>{{$store.state.username}}</v-card-text>
      <v-card-text>{{$store.state.email}}</v-card-text>
    </v-card>
    <div class='users-list'>
      <user-tile
        v-for="user in users"
        v-bind:key="user.id"
        v-bind:user="user"
      />
    </div>
    </v-layout>
  </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";

import UserTile from "./../components/UserTile.vue";
export default {
  name: "Users",
  components: { UserTile },
  data() {
    return {
      users: []
    };
  },
  async mounted() {
    if (!this.$store.state.name) {
      try {
        let user = await axios.get("/api/user");
        this.updateUser(user.data);
        this.fetchUsers();
      } catch (err) {
        this.$router.push("login");
      }
    } else {
      this.fetchUsers();
    }
  },
  methods: {
    ...mapMutations(["updateUser"]),
    async fetchUsers() {
      const users = await axios.get("/api/users");
      this.users = users.data;
      console.log(this.users);
    }
  }
};
</script>

<style>
</style>