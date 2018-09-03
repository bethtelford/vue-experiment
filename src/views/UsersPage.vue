<template>
  <div class="users">
    <h1>This is the users page</h1>
    <div class='user'>
      <p>{{$store.state.name}}</p>
      <p>{{$store.state.username}}</p>
      <p>{{$store.state.email}}</p>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "Users",
  data() {
    return {
      users: ["test", "test"]
    };
  },
  async mounted() {
    if (!this.$store.state.name) {
      try {
        let user = await axios.get("/api/user");
        this.updateUser(user.data);
      } catch (err) {
        this.$router.push("login");
      }
    }
    this.fetchUsers();
  },
  methods: {
    ...mapMutations(["updateUser"]),
    async fetchUsers() {
      const users = await axios.get('/api/users');
      this.users = users.data
      console.log(this.users)
    }
  }
};
</script>