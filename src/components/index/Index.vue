<template>
  <div class="wallpaper_box">
    <div style="height: 1.6rem;"></div>
    <div class="header">
        {{title}}
    </div>
    <List v-if="title=='首页'" ></List>
    <Cate v-if="title=='分类'" ></Cate>
    <My v-if="title=='我的'" ></My>
    
    <div class="bottom">
      <i @click="switchTo(1)" :class="{'i_a':title=='首页','i_b':title!='首页'}" class="iconfont icon-zhuye"></i>
      <i @click="switchTo(2)" :class="{'i_a':title=='分类','i_b':title!='分类'}" class="iconfont icon-icon"></i>
      <i @click="switchTo(3)" :class="{'i_a':title=='我的','i_b':title!='我的'}" class="iconfont icon-wode"></i>
    </div>
    <div class="fakeloader"></div>
  </div>
</template>

<script>
import List from'@/components/list/List.vue'
import Cate from'@/components/cate/Cate.vue'
import My from'@/components/my/My.vue'
export default {
  name: 'Index',
  data () {
    return {
      title:'首页',
    }
  },
  components:{
    List,
    Cate,
    My
  },
  mounted(){
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
            this.$router.push('/');
        }else{
          pxmu.toast({
              msg: `"${sessionStorage.getItem("userName")}" 欢迎回来`, //内容 不能为空
              time: 2500, //停留时间 默认2500毫秒
              bg: 'rgba(0, 0, 0, 0.86)', //背景颜色 默认黑色
              color: '#fff', //文字颜色 默认白色
              location: '',//居中center 顶部top 底部bottom默认
              animation: 'slidedown', //显示的动画 默认fade 动画支持详见动画文档
              type: 'wap', //默认wap样式 可选参数：pc 入参pc时
              status: '', //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
          });
        }
      
    $(".fakeloader").fakeLoader({
            timeToHide:1500,
            bgColor:"#34495e",
            spinner:"spinner3"
        });
  },
  methods : {
        switchTo(i){
          switch(i){
              case 1:
                    this.title='首页'
              break;
              case 2:
                    this.title='分类'
              break;
              case 3:
                    this.title='我的'
              break;
          }
      },
  },
}
</script>

<style scoped>
.kz{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
}
.wallpaper_box{
  background-color: #39434f;
  padding-bottom: 1.6rem;
}
*{
    margin: 0;padding: 0;
}
body{
    background-color: #39434f;
}
.header{
    width: 100%;
    line-height: 1.5rem;
    background-color: #414a54;
    position:fixed;
    font-size: 0.45rem;
    top: 0;
    transition: 0.8s;
    text-align: center;
    color: white;
    z-index: 999;
}
img{
    width:100%;
    height: 5.5rem;
    margin-bottom: 0.1rem;
    transition: 0.8s;
    border-radius: 0.3rem;
}
.bottom{
    width: 100%;
    line-height: 1.5rem;
    z-index: 999;
    position: fixed;
    background-color: #414a54;
    /* transition: 0.3s; */
    color: white;
    bottom: 0;
    display: flex;
    /*justify-content: space-around;*/
}
.bottom i{
    font-size: 0.6rem;
    width: 33%;
    transition: 0.1s;
    text-align: center;
}

.i_a{
    color: white;
    font-size: 0.75rem !important;
}
.i_b{
    color: #929292;
}
</style>
