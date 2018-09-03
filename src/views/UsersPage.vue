<template>
  <div class="users">
    <h1>This is the users page</h1>
    <div class='user'>
      <p>{{$store.state.name}}</p>
      <p>{{$store.state.username}}</p>
      <p>{{$store.state.email}}</p>
    </div>
    <div class='users-list'>
      <user-tile
        v-for="user in users"
        v-bind:key="user.id"
        v-bind:user="user"
      />
    </div>
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