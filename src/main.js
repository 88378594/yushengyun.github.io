// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'
import { Spinner } from 'mint-ui';



//组件
import Mint from 'mint-ui';
import { Toast } from 'mint-ui';
import vuePicturePreview from 'vue-picture-preview'

Vue.use(vuePicturePreview);
Vue.use(Mint);
Vue.config.productionTip = false
Vue.component(Spinner.name, Spinner);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
//验证登录
router.beforeEach((to,from,next)=>{
  if(to.path=='/')return next();
  if(to.path=='/reg')return next();
  const tk=sessionStorage.getItem('userName')
  if(!tk){
    pxmu.toast({
        msg: '当前未登录', //内容 不能为空
        time: 2500, //停留时间 默认2500毫秒
        bg: 'rgba(0, 0, 0, 0.86)', //背景颜色 默认黑色
        color: '#fff', //文字颜色 默认白色
        location: '',//居中center 顶部top 底部bottom默认
        animation: 'slidedown', //显示的动画 默认fade 动画支持详见动画文档
        type: 'wap', //默认wap样式 可选参数：pc 入参pc时
        status: '', //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
    });
    return next('/')
  }
  // 放行
  next()
})
