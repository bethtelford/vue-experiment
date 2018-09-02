<template>
  <div class="register">
    <form @submit="toggleModule">
      Name: <input v-model="name"/>
      Username: <input v-model="username"/>
      Email: <input 
        v-model="email" 
        @blur='validateEmail'
      />
      Password: <input 
        v-model="password" 
        @blur="validatePasswordLength"
        type='password'
      />
      Confirm Password: <input 
        v-model="confirmPassword"
        @blur="validatePasswordMatch"
        type='password'
      />
      <button>Complete</button>
    </form>
    <div v-show="showModule">
      I am the module 
      <button @click="register">Confirm</button>
      <button @click="cancel">Cancel</button>
    </div>
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
      // boolean for module conditional rendering
      showModule: false,
      // allowModule determines if the 'toggleModule' function is allowed to fire, based on the data validation happening in the form
      allowModule: true
    };
  },
  methods: {
    validateEmail() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.email).toLowerCase())) {
        this.allowModule = true;
      } else {
        console.log("you need a valid email address");
        this.allowModule = false;
      }
    },
    validatePasswordLength() {
      if (this.password.length >= 12) {
        this.allowModule = true;
      } else {
        console.log("you need a longer password", this.password);
        this.allowModule = false;
      }
    },
    validatePasswordMatch() {
      if (this.password === this.confirmPassword) {
        this.allowModule = true;
      } else {
        console.log("does not match");
        this.allowModule = false;
      }
    },
    toggleModule(e) {
      e.preventDefault();
      // if allowModule is true, the data validation has been successful, and all fields must have values
      if (
        this.allowModule &&
        this.name &&
        this.username &&
        this.email &&
        this.password &&
        this.confirmPassword
      ) {
        this.showModule = true;
      }
      // this.showModule = true;
    },
    register() {
      console.log("axios request here");
      // push method to fire after HTTP response
      this.$router.push('login')
    },
    cancel() {
      this.showModule = false;
    }
  }
};
</script>

<style>
input {
  border: 1px solid black;
}
</style>