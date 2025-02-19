<template>
    <h1>Home Page</h1>
    <div>
      <NavBar />
      <SideBar />
      <VideoGrid />
    </div>
  </template>
  
  <script lang="js">
  import NavBar from '../components/NavBar.vue';
  import SideBar from '../components/SideBar.vue';
  import VideoGrid from '../components/VideoGrid.vue';
  
  export default {
    components: {
      NavBar,
      SideBar,
      VideoGrid
    }
  };
  </script>