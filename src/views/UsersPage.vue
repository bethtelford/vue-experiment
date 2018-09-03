<template>
  <div class="users">
    <h1>This is the users page</h1>
    <div class='user'>
      <p>{{$store.state.name}}</p>
      <p>{{$store.state.username}}</p>
      <p>{{$store.state.email}}</p>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Users',
  data() {
    return {
      users: ['test', 'test']
    }
  }
};
</script>