<template>
  <div class="register">
    <form @submit="complete">
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
      showModule: false,
      allowSubmit: true
    };
  },
  methods: {
    validateEmail() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(this.email).toLowerCase())) {
        console.log("you need a valid email address");
        this.allowSubmit = false;
      }
    },
    validatePasswordLength() {
      if (this.password.length < 12) {
        console.log("you need a longer password", this.password);
        this.allowSubmit = false;
      }
    },
    validatePasswordMatch() {
      if (this.password !== this.confirmPassword) {
        console.log("does not match");
        this.allowSubmit = false;
      }
    },
    complete(e) {
      e.preventDefault();
      if (this.allowSubmit) {
        this.showModule = true;
      }
    },
    register() {
      console.log('axios request here')
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