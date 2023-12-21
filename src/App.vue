<template>
  <div>
    <the-header></the-header>
    <div class="div layout--container">
     <the-sidebar></the-sidebar>
    <!-- end sidebar -->
     <router-view></router-view>
     <!-- <the-content></the-content> -->
   
  </div>
  </div>
</template>

<script>
import TheHeader from './components/Pages/TheHeader.vue';
import TheSidebar from './components/Pages/TheSidebar.vue';
export default {
  name: 'App',
  components: {
    TheHeader,
    TheSidebar,
    // TheContent,
  }
}
</script>

<style>
   @import url(./css/main.css);
</style>
