<template>
    <div>
      <div class="userPicBox">
            <div v-if="status" class="userPic">
                <img @click="update()" style="border-radius: 1rem;margin-bottom:0.2rem"  v-lazy="'http://106.13.215.188:8080/img/'+userPic" alt="" srcset="">
                <form v-if="sheetVisible" id="form" class="upload" target="frameName" action="http://106.13.215.188:8089/file/uploadFile" enctype="multipart/form-data" method="post">
                      <input type="hidden" name="userId" :value="userId" >
                      <input class="upload" @change="updatePost" name="file" type="file" accept="image/*">
                </form>
                <div class="card">
                  {{userName}}
                </div>
                <iframe style="display:none" frameborder="0" name="frameName"></iframe>
            </div>
            <button @click="Login()" class="button" v-if="!status">请登录</button>
      </div>
      
      <div class="mine">
        <h2>SEMO</h2>
        <p v-if="status" @click="switchTo(1)">收藏列表<span class='right'><i style="font-size:0.4rem" class="iconfont icon-youjiantou"></i></span></p>
        <p @click="clearLocalStorage()">清除缓存<span class="right">{{ localStorageSize }}</span></p>
        <p v-if="status" @click="switchTo(2)">退出账号</p>
        <h2>其他</h2>
        <p @click="switchTo(3)">反馈</p>
        <p @click="switchTo(4)">关于</p>
      </div>
      <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    </div>
</template>

<script>
import req from '@/utils/request'
import axios from 'axios';
export default {
    name: 'My',

    data() {
        return {
            // 获取缓存大小
            localStorageSize : ((unescape(encodeURIComponent(JSON.stringify(localStorage))).length - 2) / 1024).toFixed(2) + 'KB',
             actions:[
                {
                    name:'从相册选择头像',
                },
              ],
              userName:localStorage.getItem("userName"),
              userId:localStorage.getItem("userId"),
              sheetVisible:false,
              imgBase64:'',
              status:false,
              userPic:''
        };
    },

    mounted() {
        const tk = localStorage.getItem("userName");
        const tk2 = localStorage.getItem("userId");
        if (!tk||!tk2) {
          pxmu.toast({
            msg: "当前未登录", //内容 不能为空
            time: 2500, //停留时间 默认2500毫秒
            bg: "rgba(0, 0, 0, 0.86)", //背景颜色 默认黑色
            color: "#fff", //文字颜色 默认白色
            location: "", //居中center 顶部top 底部bottom默认
            animation: "slidedown", //显示的动画 默认fade 动画支持详见动画文档
            type: "wap", //默认wap样式 可选参数：pc 入参pc时
            status: "", //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
          });
          // this.$router.push("/login");
        } else {
          this.status=true
          this.selectUser()
        }
    },

    methods: {
      Login(){
        this.$router.push({path:"/login"});
      },
      updatePost(e){
        let file=e.target.files[0]
        // console.log(file.type);
         const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'|| file.type === 'image/webp'
          const isLt2M = (file.size / 1024 / 1024) < 2
          console.log(isImg);
          if (!isImg) {
            this.sheetVisible=false
              pxmu.fail('请正确上传图片');
          }
          else if (!isLt2M) {
            this.sheetVisible=false
              pxmu.fail('大小不能超过 2MB');
          }else{
            $("#form").submit();
            pxmu.success({
                  msg: '头像更换成功', //loading信息 为空时不显示文本
                  time: 1000, //停留时间 
                  bg: 'rgba(0, 0, 0, 0.65)', //背景色
                  color: '#fff', //文字颜色
                  animation: 'fade', //动画名 详见动画文档
                  close: true, // 自动关闭 为false时可在业务完成后调用 pxmu.closeload();手动关闭
                  inscroll: false, //模态 不可点击和滚动
                  inscrollbg : 'rgba(0, 0, 0, 0.45)',//自定义遮罩层颜色 为空不显示遮罩层
              });
            this.sheetVisible=false
            setTimeout(()=>{
              this.selectUser()
            },1000)
          }
        
      },
      selectUser(){
        req.post('/selectUser',{userId:this.userId}).then((res)=>{
          this.userPic=res.data[0].userPic
          console.log(res);
        })
      },
       update(){
         this.sheetVisible=true
       },
         switchTo(index){
            switch(index){
                case 1:
                    this.$router.push('/collection');
                break;
                case 2:
                    localStorage.clear();
                    sessionStorage.clear();
                    pxmu.toast('当前账号已退出');
                    this.status=false
                    // this.$router.push('/login');
                break;
                case 3:
                  pxmu.toast({
                      msg: "代码有问题？不可能，绝对不可能!!!", //内容 不能为空
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
img{
  width: 2rem;
  height: 2rem;
}
img[lazy=loading] {
  width: 0.5rem !important;
  height: 0.5rem !important;
  position: relative;
  top: 50%;
  size: 10%;
  margin: auto;
}
.card{
  color: white;
  text-align: center;
  width: 2rem;
  height: 1rem;
  border-radius: 0.1rem;
  /* backdrop-filter: blur(1px); */
}
.button{
  position: relative;
  top: 36%;
  width: 2rem;
  color: white;
  background-color: #39434f;
  height: 1rem;
}
.upload{
    position: fixed;
    opacity:0;
    z-index: 9999;
    bottom: 1.5rem;
    width: 100%;
    height: 1rem;
}
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
.userPic{
  width: 2rem;
  mix-blend-mode:none;
  margin-top: 0.8rem;
  height: 2rem;
  font-size: 0.4rem;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.userPicBox{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4.5rem;
  background: url("http://106.13.215.188:8080/img/1636013177604.jpg") no-repeat;
  background-size: 100%;
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