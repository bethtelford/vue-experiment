<template>
  <div class="page">
    <v-layout 
      align-center 
      justify-center 
      column 
      class='form-container'
    >
      <v-form 
        @submit.prevent="toggleModule" 
        class='form' 
      >
        <v-text-field 
          v-model="name"
          label='Name' 
          outline 
          clearable 
          color='#3D8C72' 
          autofocus 
        />
        <v-text-field 
          v-model="username" 
          label='Username' 
          outline 
          clearable
          color='#3D8C72' 
        />
        <v-text-field 
          v-model="email" 
          :rules="[validateEmail]"
          validate-on-blur
          label='Email' 
          outline 
          clearable 
          color='#3D8C72'
        />
        <v-text-field 
          v-model="password" 
          :rules="[validatePasswordLength]"
          validate-on-blur
          label='Password' 
          outline 
          clearable 
          type='password'
          color='#3D8C72'
        />
        <v-text-field 
          v-model="confirmPassword"
          :rules="[validatePasswordMatch]"
          validate-on-blur
          label='Confirm Password' 
          outline 
          clearable 
          type='password'
          color='#3D8C72'
        />
        <v-btn 
          type='submit' 
          color='#3D8C72'
        >
          Create Account
        </v-btn>
      </v-form>
      <span>Already have an account? 
        <router-link 
          to='/login'
          class='links' 
        >
          Login
        </router-link>
      </span>
    </v-layout>
    <div 
      @click="cancel"
      v-show="showModule"
      class='module-background'
    >
      <v-card
        width='500px'
        height='300px'
        color='#C4C4C4'
        class='module'
      >
        <v-icon 
          @click='cancel'
          color='#bc1c1c' 
          class='cancel-button'
        >cancel</v-icon>
        <h2>Does your information all look correct?</h2>
        <v-card-text><strong>Name:</strong> {{name}}</v-card-text>
        <v-card-text><strong>Username:</strong> {{username}}</v-card-text>
        <v-card-text><strong>Email:</strong> {{email}}</v-card-text>
        <v-btn 
          @click="register" 
          absolute
          left
          color='#3D8C72'
          class='buttons'
        >
          Confirm
        </v-btn>
        <v-btn 
          @click="cancel" 
          absolute
          right
          color='#bc1c1c'
          class='buttons'
        >
          Cancel
        </v-btn>
      </v-card>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
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
  async mounted() {
    if (!this.$store.state.name) {
      try {
        let user = await axios.get("/api/user");
        this.updateUser(user.data);
        this.$router.push("login");
      } catch (err) {
        console.log(err);
      }
    } else {
      this.$router.push("users");
    }
  },
  methods: {
    ...mapMutations(["updateUser"]),
    validateEmail() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.email).toLowerCase())) {
        this.allowModule = true;
        return true;
      } else {
        this.allowModule = false;
        return "You need to enter a valid email address";
      }
    },
    validatePasswordLength() {
      if (this.password.length >= 12) {
        this.allowModule = true;
        return true;
      } else {
        this.allowModule = false;
        return "You need a longer password";
      }
    },
    validatePasswordMatch() {
      if (this.password === this.confirmPassword) {
        this.allowModule = true;
        return true;
      } else {
        this.allowModule = false;
        return "Passwords don't match";
      }
    },
    toggleModule() {
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
    },
    cancel() {
      this.showModule = false;
    },
    async register() {
      const { name, username, email, password } = this;
      let user = await axios.post("/auth/register", {
        name,
        username,
        email,
        password
      });
      this.updateUser(user.data);
      this.$router.push("users");
    }
  }
};
</script>

<style scoped>
.module-background {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(44, 44, 44, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
}
.module {
  padding: 25px;
  position: relative;
}
.cancel-button {
  position: absolute;
  right: -25px;
  top: -25px;
}
.buttons {
  bottom: 20px;
}
</style>