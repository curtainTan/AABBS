<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return {

      }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  min-height: 100vh;
  background-image: url("http://curtaintan.club/bg/1546081994339.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100vw 100vh;
}
input{
    background: transparent;
}
</style>
