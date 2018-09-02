<template>
  <div class="register">
    <form>
      Name: <input v-model="name"/>
      Username: <input v-model="username"/>
      Email: <input 
        v-model="email" 
      />
      Password: <input 
        v-model="password" 
        type='password'
      />
      Confirm Password: <input 
        v-model="confirmPassword"
        type='password'
      />
    </form>
  </div>
</template>


<script>
export default {
  name: "Register",
  data() {
    return {
      name: "test",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      showModule: false,
      allowSubmit: true
    };
  }
};
</script>

<style>
input {
  border: 1px solid black;
}
</style>