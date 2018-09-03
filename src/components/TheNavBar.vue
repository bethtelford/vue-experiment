<template>
  <div class='nav'>
    <h1>{{title}}</h1>
  </div>
</template>

<script>
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
  }
};
</script>