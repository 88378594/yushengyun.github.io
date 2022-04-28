<template>
  <div id="app">
        <router-view class="app-view"/>
    <!-- <lg-preview></lg-preview> -->
    
  </div>
</template>

<script>
import '@/assets/css/fakeloader.css'
import '@/assets/js/jquery.min.js'
import '@/assets/js/fakeloader.min.js'
export default {
  name: 'App',
  components: {
  },
  methods:{
     
  }
}
</script>

<style>
.backTop{
  position: fixed;
  bottom: 2rem;
  right: 0.3rem;
  width: 1rem;
  height: 1rem;
  background-color: #4f5f70;
  text-align: center;
  border-radius: 0.2rem;
  line-height: 1rem;
}
#nprogress .bar { background: #536f91 !important;}
html,body{
  background-color: #39434f;
}
ol, ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

p{
  -webkit-margin-before: 0px;
  -webkit-margin-after: 0px;
}

*, :after, :before {
    box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100%;
  background-color: #39434f;
}

.app-view{
  width: 100%;
  height: 100%;
  overflow: auto;
  position: absolute;
  -webkit-overflow-scrolling: touch;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.mint-spinner-snake{
  margin: 0 auto;
}
</style>
