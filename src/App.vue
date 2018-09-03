<template>
  <div id="app">
    <the-nav-bar/>
    <router-view/>
  </div>
</template>

<script>
import TheNavBar from "./components/TheNavBar.vue";
export default {
  name: "App",
  components: { TheNavBar }
};
</script>
