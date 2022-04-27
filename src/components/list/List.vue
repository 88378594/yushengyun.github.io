<template>
    <div>
        <ul class="wallpaper_list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loaded">
          <Swiper></Swiper>
          <h2 style="color: #a4b3bd;font-size:0.5rem;font-weight: bold;margin-bottom:0.4rem">精选壁纸</h2>
        <li v-for="(item,index) in list" :key="index">
            <img v-lazy="'http://106.13.215.188:8080/img/'+item.imgName" v-preview="'http://106.13.215.188:8080/img/'+item.imgName" :alt="item.auThor">
             <TipTools v-bind:picInfo="item"><span slot="tips_text" class="tips_text">{{ item.auThor }}</span></TipTools>
        </li>
        </ul>
        <p class="wallpaper_list_loading" v-show="isLoadShow">
          <img style="width:0.7rem" src="../../assets/img/loading.gif" alt="">
        </p>
        <p class="wallpaper_list_loaded" v-show="loaded">没有更多了</p>
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
        };
    },
    components:{
      TipTools,
      Swiper
    },
     mounted(){
        req.post("/selectLove",{userId:sessionStorage.getItem("userId")}).then((res) => {
            localStorage.love=JSON.stringify(res.data);
        })
     },

    methods: {
    loadMore() {
      if (!this.loading){
        this.loading = true;
        setTimeout(() => {
            req.post("/selectImg",{pageNo:this.pageNo,pageSize:this.pageSize}).then((res) => {
            if (res.data.length == 1){
              this.loaded = true;
              this.isLoadShow = false;
            }else{
              let length = res.data.length-1;
              for (let i = 0; i < length; i++) {
                 if (localStorage.love){
                  let data = JSON.parse(localStorage.love);
                  res.data[i].show = false;
                  for(let j=0; j<data.length; j++) {
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
        }, 500)
      }
    },
    },
};
</script>

<style scoped>
.wallpaper_list{
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  text-align: center;
  list-style-type: none;
}

.wallpaper_list li{
  width: 100%;
  /* transition: 0.5s; */
  height: 7rem;
  margin: 0 auto;
  margin-top: 0.2rem;
}

.wallpaper_list li img{
  /* transition: 1s; */
  /* display: block; */
  width: 100%;
  height: 6rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
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
  height: 50px;
  line-height: 50px;
  font-size: 0.37rem;
  color: #999;
}

.wallpaper_list li img[lazy=loading] {
  transition: none !important;
  width: 0.5rem !important;
  margin: auto;
}
</style>