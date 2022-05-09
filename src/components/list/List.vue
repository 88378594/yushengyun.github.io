<template>
    <div>
        <ul class="wallpaper_list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loaded">
          <!-- 轮播图组件 -->
          <Swiper></Swiper>
          <h2 style="color: #a4b3bd;font-size:0.5rem;font-weight: bold;margin-bottom:0.4rem">精选壁纸</h2>
        <!-- 循环图片列表 -->
       
          <li v-for="(item,index) in list" v-viewer :key="index">
              <div style="height:6rem">

              
                <img v-lazy="'http://106.13.215.188:8080/img/'+item.imgName" :alt="item.auThor">
                <!-- v-preview="'http://106.13.215.188:8080/img/'+item.imgName" -->
                <!-- 收藏工具条 -->
              </div>
              <TipTools :picInfo="item"><span slot="tips_text" class="tips_text">{{ item.auThor }}</span></TipTools>
          </li>
        </ul>
        <!-- 数据加载中动图 -->
        <p class="wallpaper_list_loading" v-show="isLoadShow">
          <img style="width:0.7rem" src="../../assets/img/loading.gif" alt="">
        </p>
        <!-- 数据加载完反馈 -->
        <p class="wallpaper_list_loaded" v-show="loaded">没有更多了</p>
        <!-- 返回顶部 -->
        <div v-show="backTop" @click="initFunc()" class="backTop">
          <i class="iconfont icon-dingbu"></i>
        </div>
    </div>
</template>

<script>
import req from '@/utils/request'
import TipTools from'@/components/common/TipTools.vue'
import Swiper from'@/components/common/Swiper.vue'
export default {
    name: 'List',
    data() {
        return {
            list : [],
            pageNo : 1,
            pageSize :7,
            isLoadShow : true,
            loading : false,
            loaded : false,
            backTop: false
        };
    },
    components:{
      TipTools,
      Swiper
    },
    mounted(){
      const tk = localStorage.getItem("userName");
      if (!tk) {
          
      }else{
        //请求收藏列表
        req.post("/selectLove",{userId:localStorage.getItem("userId")}).then((res) => {
            //存入本地缓存中
            localStorage.love=JSON.stringify(res.data);
        })
      }
        
     },
    //监听页数，判断返回顶部按钮显示隐藏
    watch:{
      pageNo(newName,oldName){
        if(newName>=3){
          this.backTop=true
        }else{
          this.backTop=false
        }
      }
    },
    methods: {
      //通过初始化数据，来达成返回顶部
      initFunc(){
        this.list=[];
        this.pageNo=1;
        this.isLoadShow=true,
        this.loading=false,
        this.loaded=false,
        this.loadMore();
      },
      // 无限滚动懒加载数据
      loadMore() {
        if (!this.loading){
          this.loading = true;
          setTimeout(() => {
              req.post("/selectImg",{pageNo:this.pageNo,pageSize:this.pageSize}).then((res) => {
              if (res.data.length == 1){
                this.loaded = true;
                this.isLoadShow = false;
              }else{
                // -1是因为后端返回的数据最后一条是总记录条数
                let length = res.data.length-1;
                for (let i = 0; i < length; i++) {
                  // 判断缓存中已收藏的图片
                  if (localStorage.love){
                    // 将缓存的收藏列表存入data
                    let data = JSON.parse(localStorage.love);
                    // 给data数据添加属性show来判断图片是否收藏
                    res.data[i].show = false;
                    for(let j=0; j<data.length; j++) {
                      // 判断缓存中收藏列表的数据与首页查询的数据是否有已收藏的已收藏就将当前的show设为true
                      if (data[j].imgId == res.data[i].imgId){
                        res.data[i].show = true;
                        break;
                      }
                    }
                  }else{
                    localStorage.love = "[]";
                    res.data[i].show = false;
                  }
                  this.list.push(res.data[i]);
                }
                this.pageNo++;
              }
              this.loading = false;
            },(err) => {
              console.log('Load Pic Data Failed',err)
            })
          }, 1000)
        }
      },
    },
};
</script>

<style scoped>
.backTop{
  position: fixed;
  bottom: 2rem;
  right: 0.3rem;
  width: 1rem;
  height: 1rem;
  color: white;
  background-color: #4f5f70;
  text-align: center;
  border-radius: 0.2rem;
  line-height: 1rem;
}
.wallpaper_list{
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  text-align: center;
  list-style-type: none;
}

.wallpaper_list li{
  width: 100%;
  height: 7rem;
  margin: 0 auto;
  margin-top: 0.2rem;
}

.wallpaper_list li img{
  /* transition: 0.5s; */
  /* display: block; */
  width: 100%;
  height: 6rem;
  object-fit: cover;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
}

.wallpaper_list_loading {
  color: rgb(206, 206, 206);
  text-align: center;
  font-size: 0.37rem;
  height: 1.5rem;
  /* line-height: 50px; */
  padding-top: 15px;
}

.wallpaper_list_loading div {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
.wallpaper_list_loaded {
  text-align: center;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.37rem;
  color: #999;
}

.wallpaper_list li img[lazy=loading] {
  width: 0.5rem !important;
  height: 0.5rem !important;
  position: relative;
  top: 50%;
  size: 10%;
  margin: auto;
}
</style>