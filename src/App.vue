<template>
  <v-app>
    <the-nav-bar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import TheNavBar from "./components/TheNavBar.vue";

export default {
  name: "App",
  components: { TheNavBar }
};
</script>

<style>
.links {
  color: black;
}
.links:hover {
  color:#3D8C72;
}
.form-container {
  padding: 70px;
  background-color: #C4C4C4;
}
.form {
  display: flex;
  flex-direction: column;
  width: 400px;
} 
.page{
  min-height: 100vh;
  padding: 15vh 300px 10vh;
}

</style>
