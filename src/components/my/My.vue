<template>
    <div class="mine">
    <h2>SEMO</h2>
    <p @click="switchTo(1)">收藏列表<span class='right'><i style="font-size:0.4rem" class="iconfont icon-youjiantou"></i></span></p>
    <p @click="clearLocalStorage()">清除缓存<span class="right">{{ localStorageSize }}</span></p>
    <p @click="switchTo(2)">退出账号</p>
    <h2>其他</h2>
    <p @click="switchTo(3)">反馈</p>
    <p @click="switchTo(4)">关于</p>
    </div>
</template>

<script>
export default {
    name: 'My',

    data() {
        return {
            // 获取缓存大小
            localStorageSize : ((unescape(encodeURIComponent(JSON.stringify(localStorage))).length - 2) / 1024).toFixed(2) + 'KB'
        };
    },

    mounted() {
        
    },

    methods: {
         switchTo(index){
            switch(index){
                case 1:
                  pxmu.toast({
                      msg: "再等等！", //内容 不能为空
                      time: 2500, //停留时间 默认2500毫秒
                      bg: "rgba(0, 0, 0, 0.86)", //背景颜色 默认黑色
                      color: "#fff", //文字颜色 默认白色
                      location: "", //居中center 顶部top 底部bottom默认
                      animation: "slidedown", //显示的动画 默认fade 动画支持详见动画文档
                      type: "wap", //默认wap样式 可选参数：pc 入参pc时
                      status: "", //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
                  });
                // this.$router.push('/Collection');
                break;
                case 2:
                    localStorage.clear();
                    sessionStorage.clear();
                    pxmu.toast('当前账号已退出');
                    this.$router.push('/login');
                break;
                case 3:
                  pxmu.toast({
                      msg: "我代码有问题？不可能，绝对不可能!!!", //内容 不能为空
                      time: 2500, //停留时间 默认2500毫秒
                      bg: "rgba(0, 0, 0, 0.86)", //背景颜色 默认黑色
                      color: "#fff", //文字颜色 默认白色
                      location: "", //居中center 顶部top 底部bottom默认
                      animation: "slidedown", //显示的动画 默认fade 动画支持详见动画文档
                      type: "wap", //默认wap样式 可选参数：pc 入参pc时
                      status: "", //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
                  });
                break;
                case 4:
                  pxmu.toast({
                      msg: "联系邮箱：monicaxiux@gmail.com", //内容 不能为空
                      time: 5000, //停留时间 默认2500毫秒
                      bg: "rgba(0, 0, 0, 0.86)", //背景颜色 默认黑色
                      color: "#fff", //文字颜色 默认白色
                      location: "", //居中center 顶部top 底部bottom默认
                      animation: "slidedown", //显示的动画 默认fade 动画支持详见动画文档
                      type: "wap", //默认wap样式 可选参数：pc 入参pc时
                      status: "", //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
                  });
                break;
            }
        },
        clearLocalStorage(){
            localStorage.removeItem('loglevel:webpack-dev-server')
            // localStorage.clear();
            this.localStorageSize = '0.00KB';
            pxmu.toast('清除成功');
        },
    },
};
</script>

<style scoped>
.mine{
  padding: 0.5rem;
  text-align: left;
}

h2{
  font-weight: bold;
  font-size: 0.4rem;
  color: #626C77;
  padding-top: 5px;
  padding-bottom: 5px;
}

p{
  font-weight: bold;
  font-size: 0.38rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  color: #f7f7f7;
}

.right{
  float: right;
  font-size: 0.35rem;
  color: #626C77;
}
</style>