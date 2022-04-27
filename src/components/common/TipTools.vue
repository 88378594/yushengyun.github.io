<template>
<div class="tiptools">
  <p class="tips">
    <span class="tips_type"><i class="iconfont icon-tupian"></i></span>
    <slot name="tips_text"></slot>
    <!-- <i style="margin-right: 0.5rem;" class="iconfont icon-xiazai"></i> -->
    <span class="tips_love" @click="loveIt()">
      <i class="iconfont icon-jushoucang"  v-show="!pic_info.show"></i>
      <i class="iconfont icon-daohangshoucangyishoucang"  v-show="pic_info.show"></i>
    </span>
  </p>
</div>
</template>

<script>
import req from '@/utils/request'
export default {
  name: 'TipTools',
  props: ['picInfo'],
  data () {
    return {
      popupVisible : false,
      pic_info : this.picInfo
    }
  },
  mounted(){
   
  },
  methods : {
    loveIt(){
      
      if (!this.pic_info.show){
        //收藏
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
           userId : sessionStorage.getItem("userId")
        }
        req.post("/addLove",params).then((res) => {
            console.log(res);
        })
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
           userId : sessionStorage.getItem("userId")
        }
        req.post("/delLove",params).then((res) => {
            console.log(res);
        })
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
      this.pic_info.show = !this.pic_info.show;
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
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  margin-top: -2px;
}
span{
  color: #f7f7f7 !important;
  font-size: 0.36rem;
}
i{
   font-size: 0.47rem;
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
