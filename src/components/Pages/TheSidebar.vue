<template>
       <div class="sidebar" :class="{'side':isExpanded}">
      <div class="list--item" :class="{'width':isExpanded}">
        <div class="item">
            <div class="icon--item icon--home"></div>
            <div class="text--sidebar"  v-if="!isExpanded"><p >Trang chủ</p></div>
        </div>
        <router-link to="/report" >
        <div class="item">
          <div class="icon--item icon--report"></div>
          <div class="text--sidebar"  v-if="!isExpanded"><p>Báo cáo</p></div>
        </div>
      </router-link>
        <router-link to="/">
        <div class="item">
          <div class="icon--item icon--customer"></div>
            <div class="text--sidebar"  v-if="!isExpanded"><p>Khách hàng</p></div>
        </div>
       </router-link>
        <router-link to="/setting" >
        <div class="item">
          <div class="icon--item icon--setting"></div>
           <div class="text--sidebar"  v-if="!isExpanded"><p>Cài đặt</p></div>
        </div>
      </router-link>
      </div>
      <div class="btn--sidebar-footer">
       <div id="btn--hide-sidebar" v-show="!isExpanded" @click="toggleSidebar">
        <div id="previous" >
        </div>
        <p> Thu gọn</p>
       </div>
       <div id="btn--show-sidebar" v-show="isExpanded"  @click="toggleSidebar">
        <div  id="sidebar__icon--show" >    
        </div>
        <!-- <p> Mở rộng</p> -->
       </div>
      </div>
    </div>
</template>

<script>
export default {
   methods:{
    collapse(){

    },
    open(){

    },
    toggleSidebar() {
      this.isExpanded = !this.isExpanded; // Toggle the expanded state
    }
   },data() {
    return {
      isExpanded: false
    };
  },

}
</script>
<style scoped>

.side{
  width: 76px;
  transition: linear ;
  -webkit-transition: all 0.5s linear;
  animation: animation 2s;

}

.item-collapse{
  transition: width 0.5s ease;
  width: 44px;
}
@keyframes animation{
  26% {transform: translateX(-200px);}
}
.width{
  transition: width 0.5s ease;
  width: 76px;
}
a{
  text-decoration: none;
}

</style>