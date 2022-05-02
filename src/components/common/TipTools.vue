<template>
<div class="tiptools">
  <p class="tips">
    <span class="tips_type"><i class="iconfont icon-tupian"></i></span>
    <!-- 作者 -->
    <slot name="tips_text"></slot>
    <i style="margin-right: 0.5rem;" @click="downLoad()" class="iconfont icon-xiazai"></i>
    <!-- 点击收藏 -->
    <span class="tips_love" @click="loveIt()">
      <i class="iconfont icon-jushoucang"  v-show="!pic_info.show"></i>
      <i style="color:#ff0000db" class="iconfont icon-daohangshoucangyishoucang"  v-show="pic_info.show"></i>
    </span>
  </p>
</div>
</template>

<script>
import axios from 'axios';
import req from '@/utils/request'
export default {
  name: 'TipTools',
  props: ['picInfo'],
  data () {
    return {
      popupVisible : false,
      pic_info : this.picInfo,
    }
  },
  mounted(){
   
  },
  methods : {
    //下载图片
    downLoad(){
          window.location.href=`http://106.13.215.188:8089/file/downloadFile?fileName=${this.picInfo.imgName}`
          pxmu.success({
                msg: '图片下载成功', //loading信息 为空时不显示文本
                time: 1000, //停留时间 
                bg: 'rgba(0, 0, 0, 0.65)', //背景色
                color: '#fff', //文字颜色
                animation: 'fade', //动画名 详见动画文档
                close: true, // 自动关闭 为false时可在业务完成后调用 pxmu.closeload();手动关闭
                inscroll: false, //模态 不可点击和滚动
                inscrollbg : 'rgba(0, 0, 0, 0.45)',//自定义遮罩层颜色 为空不显示遮罩层
            });
      
          // console.log(error);
          //  pxmu.toast({
          //     msg: "图片下载失败，请检查网络", //内容 不能为空
          //     time: 2500, //停留时间 默认2500毫秒
          //     bg: "rgba(0, 0, 0, 0.86)", //背景颜色 默认黑色
          //     color: "#fff", //文字颜色 默认白色
          //     location: "", //居中center 顶部top 底部bottom默认
          //     animation: "slidedown", //显示的动画 默认fade 动画支持详见动画文档
          //     type: "wap", //默认wap样式 可选参数：pc 入参pc时
          //     status: "", //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
          //   });
    },
    loveIt(){
      const tk = localStorage.getItem("userName");
      if (!tk) {
        pxmu.toast({
          msg: "当前未登录", //内容 不能为空
          time: 3000, //停留时间 默认2500毫秒
          bg: "rgba(0, 0, 0, 0.86)", //背景颜色 默认黑色
          color: "#fff", //文字颜色 默认白色
          location: "", //居中center 顶部top 底部bottom默认
          animation: "slidedown", //显示的动画 默认fade 动画支持详见动画文档
          type: "wap", //默认wap样式 可选参数：pc 入参pc时
          status: "", //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
        });
        this.$router.push("/login");
      }else{
            if (!this.pic_info.show){
            //收藏
            //读取缓存中的收藏列表
            let data = JSON.parse(localStorage.love);
            let obj = {
              imgId : this.pic_info.imgId,
              imgName : this.pic_info.imgName,
              show : true
            }
            data.push(obj);

            let params={
              imgId : this.pic_info.imgId,
              imgName : this.pic_info.imgName,
              userId : localStorage.getItem("userId"),
              imgType : this.pic_info.imgType,
              auThor:this.pic_info.auThor
            }
            //发送请求，请求后端收藏接口
            req.post("/addLove",params).then((res) => {
                console.log(res);
            })
            //将已收藏的存入缓存
            localStorage.love = JSON.stringify(data);
            pxmu.success({
                msg: '收藏成功', //loading信息 为空时不显示文本
                time: 600, //停留时间 
                bg: 'rgba(0, 0, 0, 0.65)', //背景色
                color: '#fff', //文字颜色
                animation: 'fade', //动画名 详见动画文档
                close: true, // 自动关闭 为false时可在业务完成后调用 pxmu.closeload();手动关闭
                inscroll: false, //模态 不可点击和滚动
                inscrollbg : 'rgba(0, 0, 0, 0.45)',//自定义遮罩层颜色 为空不显示遮罩层
            });
          }else{
            //取消收藏
            /**与收藏同理 */
            let data = JSON.parse(localStorage.love);
            for(let i=0; i<data.length; i++) {
              if(data[i].imgId == this.pic_info.imgId) {
                data.splice(i, 1);
                break;
              }
            }
            let params={
              imgId : this.pic_info.imgId,
              imgName : this.pic_info.imgName,
              userId : localStorage.getItem("userId"),
              imgType : this.pic_info.imgType,
              auThor:this.pic_info.auThor
            }
            // 请求后端，取消收藏接口
            req.post("/delLove",params).then((res) => {
                console.log(res);
            })
            // 存入缓存
            localStorage.love = JSON.stringify(data);
            pxmu.success({
                msg: '取消收藏', //loading信息 为空时不显示文本
                time: 600, //停留时间 
                bg: 'rgba(0, 0, 0, 0.65)', //背景色
                color: '#fff', //文字颜色
                animation: 'fade', //动画名 详见动画文档
                close: true, // 自动关闭 为false时可在业务完成后调用 pxmu.closeload();手动关闭
                inscroll: false, //模态 不可点击和滚动
                inscrollbg : 'rgba(0, 0, 0, 0.45)',//自定义遮罩层颜色 为空不显示遮罩层
            });
          }
          // 取反，收藏点了就是取消收藏，取消点了就是收藏
          this.pic_info.show = !this.pic_info.show;
      }
      
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tips{
  height: 0.85rem;
  line-height: 0.85rem;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #404c59;
  border-bottom-left-radius: 0.15rem;
  border-bottom-right-radius: 0.15rem;
  margin-top: -2px;
}
span{
  color: #f7f7f7 !important;
  font-size: 0.36rem;
}
i{
   font-size: 0.47rem;
   color: #f7f7f7 ;
}
.tips .tips_type{
  float: left;
}

.tips .tips_text{
  float: left;
  padding-left: 5px;
}

.tips .tips_love{
  float: right;
}

.tips .tips_down{
  float: right;
  padding-right: 10px;
}

.tips svg{
  position: relative;
  top: 5px;
  z-index:1;
}

.tips .tips_right:nth-child(2){
  padding-right: 10px
}
</style>
