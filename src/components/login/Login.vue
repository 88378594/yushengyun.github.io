<template>
    <div>
       <div class="div">
            <br><br>
            <h1>SEMO</h1>
            <input placeholder="用户名/邮箱" type="text" @keyup.enter="sub" v-model="userList.userName"><br>
            <input placeholder="请输入密码" type="text" @keyup.enter="sub" v-model="userList.passWord"><br>
            <div :class="{'bottom_plus':userList.userName!=''&&userList.passWord!=''}" class="button" @click="sub">
                <i style="font-size: 0.8rem;" class="iconfont icon-a-youjiantouzhixiangyoujiantou"></i>
            </div><br><br>
            <div class="bottom">
                <a>找回密码</a>
                <router-link to="reg">新用户注册</router-link>
            </div>
        </div>
      
        <div class="fakeloader"></div>
    </div>
</template>


<script>
import req from '@/utils/request';
export default {
    name: 'Login',

    data() {
        return {
            //存放input输入框的值的对象
                userList:{
                    userName: '',
                    passWord: '',
                }
        };
    },

    mounted() {
         $(".fakeloader").fakeLoader({
            timeToHide:700,
            bgColor:"#34495e",
            spinner:"spinner3"
        });
    },

    methods: {
        sub(){
                //非空效验
            if(this.userList.passWord!=''&&this.userList.userName!=''){
                    //发起登录请求
                    req.post("/login",this.userList).then((res)=>{
                    if(res.msg=="用户名或密码错误"){
                        pxmu.toast({
                            msg: "用户名或密码错误", //内容 不能为空
                            time: 2500, //停留时间 默认2500毫秒
                            bg: 'rgba(0, 0, 0, 0.36)', //背景颜色 默认黑色
                            color: '#fff', //文字颜色 默认白色
                            location: '',//居中center 顶部top 底部bottom默认
                            animation: 'slidedown', //显示的动画 默认fade 动画支持详见动画文档
                            type: 'wap', //默认wap样式 可选参数：pc 入参pc时
                            status: '', //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
                        });
                    }else{
                        sessionStorage.setItem("userName",res.data[0].userName)
                        sessionStorage.setItem("userId",res.data[0].userId)
                        this.$router.push({path:"/index"});
                    }
                }
            )
            }else{
                pxmu.toast({
                            msg: "请填写完整！", //内容 不能为空
                            time: 2500, //停留时间 默认2500毫秒
                            bg: 'rgba(0, 0, 0, 0.86)', //背景颜色 默认黑色
                            color: '#fff', //文字颜色 默认白色
                            location: '',//居中center 顶部top 底部bottom默认
                            animation: 'slidedown', //显示的动画 默认fade 动画支持详见动画文档
                            type: 'wap', //默认wap样式 可选参数：pc 入参pc时
                            status: '', //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
                        });
            }
            
        }
    },
};
</script>

<style scoped>

</style>