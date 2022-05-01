<template>
  <div id="app">
    <transition name="f">
        <router-view class="app-view"/>
    <!-- <lg-preview></lg-preview> -->
    </transition>
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
  mounted(){
       this.currDevice();
  },
  methods:{
    currDevice(){
    var u = navigator.userAgent;
    var app = navigator.appVersion;// appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
    var browserLang = (navigator.browserLanguage || navigator.language).toLowerCase();    //获取浏览器语言
    
    var deviceBrowser = function(){
        return{
            trident: u.indexOf('Trident') > -1,  //IE内核
            presto: u.indexOf('Presto') > -1,  //opera内核
            webKit: u.indexOf('AppleWebKit') > -1,  //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,  //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),  //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/),  //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1,  //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1,  //是否iPad
            webApp: u.indexOf('Safari') == -1,  //是否web应用程序，没有头部和底部
            weixin: u.indexOf('MicroMessenger') > -1,  //是否微信
            qq: u.match(/\sQQ/i) == " qq",  //是否QQ
        }
    }();
    console.log(deviceBrowser);
    if(deviceBrowser.mobile!=true){
        // pxmu.toast({
        //     msg: "当前为PC端 本站为移动端，不建议PC使用!", //内容 不能为空
        //     time: 5000, //停留时间 默认2500毫秒
        //     bg: 'rgba(0, 0, 0, 0.36)', //背景颜色 默认黑色
        //     color: '#fff', //文字颜色 默认白色
        //     location: 'center',//居中center 顶部top 底部bottom默认
        //     animation: 'slidedown', //显示的动画 默认fade 动画支持详见动画文档
        //     type: 'pc', //默认wap样式 可选参数：pc 入参pc时
        //     status: 'error', //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
        // });
    }else if(deviceBrowser.android==true){
          // pxmu.toast({
          //     msg: "当前为Android端 请放心使用 如遇BUG 及时联系", //内容 不能为空
          //     time: 4000, //停留时间 默认2500毫秒
          //     bg: 'rgba(0, 0, 0, 0.36)', //背景颜色 默认黑色
          //     color: '#fff', //文字颜色 默认白色
          //     location: '',//居中center 顶部top 底部bottom默认
          //     animation: 'slidedown', //显示的动画 默认fade 动画支持详见动画文档
          //     type: 'wap', //默认wap样式 可选参数：pc 入参pc时
          //     status: '', //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
          // });
    }else{
        //  if(deviceBrowser.ios=true){
        //     pxmu.toast({
        //         msg: "当前为IOS端 可能出现BUG 请及时反馈", //内容 不能为空
        //         time: 4000, //停留时间 默认2500毫秒
        //         bg: 'rgba(0, 0, 0, 0.36)', //背景颜色 默认黑色
        //         color: '#fff', //文字颜色 默认白色
        //         location: '',//居中center 顶部top 底部bottom默认
        //         animation: 'slidedown', //显示的动画 默认fade 动画支持详见动画文档
        //         type: 'wap', //默认wap样式 可选参数：pc 入参pc时
        //         status: '', //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
        //     });
        // }
    } 
},
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
