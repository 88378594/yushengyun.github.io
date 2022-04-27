<template>
    <div class="mine">
    <h2>SEMO</h2>
    <p @click="switchTo(1)">收藏列表<span class='right'><i style="font-size:0.4rem" class="iconfont icon-youjiantou"></i></span></p>
    <p @click="switchTo(2)">退出账号</p>
    <p @click="clearLocalStorage()">清除缓存<span class="right">{{ localStorageSize }}</span></p>
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
            localStorageSize : ((unescape(encodeURIComponent(JSON.stringify(localStorage))).length - 2) / 1024).toFixed(2) + 'KB'
        };
    },

    mounted() {
        
    },

    methods: {
         switchTo(index){
            switch(index){
                case 1:
                // this.$router.push('/Collection');
                break;
                case 2:
                    sessionStorage.clear();
                    pxmu.toast('当前账号已退出');
                    this.$router.push('/');
                break;
                case 3:
                // this.$router.push('/About');
                break;
            }
        },
        clearLocalStorage(){
            localStorage.clear();
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