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
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login(e) {
      e.preventDefault();
      // Fields must be filled in
      if (this.username && this.password) {
        console.log('login axios request here');
        // push method to fire after HTTP response
        this.$router.push('users')
      }
    }
  }
};
</script>