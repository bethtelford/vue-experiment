<template>
  <v-card 
    width='450px'
    class='user'
  >
    <v-card-text>{{user.name}}</v-card-text>
    <v-card-text>{{user.username}}</v-card-text>
    <v-card-text>{{user.email}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "UserTile",
  props: {
    user: Object
  }
};
</script>

<style>
.user {
  margin: 0 0 20px;
}
.user:last-child {
  margin: 0;
}
</style>