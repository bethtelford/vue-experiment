<template>
  <div class='user-tile'>
    <p>{{user.name}}</p>
    <p>{{user.username}}</p>
    <p>{{user.email}}</p>
  </div>
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
.user-tile {
  border: 1px solid black;
}
</style>