<template>
  <div class='nav'>
    <h1>{{title}}</h1>
    <button 
      to='/login'
      @click="logout"
    >Logout</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
  name: "TheNavBar",
  data() {
    let title = this.$router.history.current.name;
    title = title[0].toUpperCase() + title.slice(1);
    return {
      title: title
    };
  },
  watch: {
    $route(to, from) {
      let title = to.name;
      title = title[0].toUpperCase() + title.slice(1);
      this.title = title;
    }
  },
  methods: {
    ...mapMutations(['logoutUser']),
    async logout() {
      try {
        await axios.post('/auth/logout');
        this.logoutUser();
        this.$router.push('login');
      } catch (err) {
        console.log('oops something went wrong');
      }
    }
  }
};
</script>