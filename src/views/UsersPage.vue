<template>
  <div class="page">
    <v-layout 
      justify-space-between 
      align-start
    >
      <v-card 
        width='400px'
        color='#3D8C72' 
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
  name: "UsersPage",
  components: { UserTile },
  data() {
    return {
      users: []
    };
  },
  async mounted() {
    if (!this.$store.state.name) {
      try {
        const user = await axios.get("/api/user");
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
      try {
        const users = await axios.get("/api/users");
        this.users = users.data;
      } catch (err) {
        console.log('Something went wrong fetching the users')
      }
    }
  }
};
</script>