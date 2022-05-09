<template>
    <div class="box">
        <Search />
        <p class="cate_font">特色分类</p>
        <!-- 数据加载中动图 -->
        <p class="wallpaper_list_loading" v-show="isLoadShow">
          <img style="width:0.7rem" src="../../assets/img/loading.gif" alt="">
        </p>
        <div class="box_cont">
            <div class="box_nr" v-for="(item,index) in featCateList" :key="index" @click="selectFeatList(item.featCateId)">
                <div style="width:100%;height:3.5rem">
                     <img class="img" v-lazy="'http://106.13.215.188:8080/img/'+item.imgName" alt="">
                </div>
                <p>
                    {{item.featCateName}}
                </p>
            </div>
        </div>
        
         <p class="cate_font">更多分类</p>
         <div class="box_contx">
            <div class="box_nr" v-for="(item,index) in cateList" :key="index" @click="selectCateChildList(item.cateId)" >
                <div style="width:100%;height:3.5rem">
                 <img class="img" v-lazy="'http://106.13.215.188:8080/img/'+item.imgName" alt="">
                </div>
                <p>
                    {{item.cateName}}
                </p>
            </div>
         </div>
         <!-- 数据加载中动图 -->
        <p class="wallpaper_list_loading" v-show="isLoadShow">
          <img style="width:0.7rem" src="../../assets/img/loading.gif" alt="">
        </p>
    </div>
</template>

<script>
import req from '@/utils/request'
import Search from "@/components/common/Search.vue";
export default {
    name: 'Cate',
    data() {
        return {
            isLoadShow:true,
            cateList:[],
            featCateList:[]
        };
    },
    mounted() {
            this.selectCateList();
    },
    components:{
        Search
    },
    methods: {
        selectFeatList(featCateId){
            this.$router.push({name:'FeatCateChild',params:{id:featCateId}});
        },
        selectCateChildList(cateId){
            this.$router.push({name:'CateChild',params:{id:cateId}});
            console.log(cateId);
        },
        //查询更多分类
        selectCateList(){
            setTimeout(()=>{
                req.post("/selectCate").then((res)=>{
                    this.cateList=res.data
                    this.isLoadShow=false
                })
               req.post("/selectFeatCate").then((res)=>{
                    this.featCateList=res.data
                    this.isLoadShow=false
                })
            },500)
        },
        //查询特色分类
        selectFateCateList(){

        }
    },
};
</script>

<style scoped>
.img{
    width: 100%;
    height: 3.5rem;
    object-fit: cover;
    border-top-left-radius: 0.15rem;
    border-top-right-radius: 0.15rem;

}
.img[lazy=loading] {
  width: 0.5rem !important;
  height: 0.5rem;
  position: relative;
  top: 50%;
  left: 40%;
  size: 10%;
  margin: auto;
}
.box_cont{
    width: 100%;
    margin-left: 0.07rem;
    /* display: flex; */
    /* height: 4.4rem; */
    display: -webkit-box;
    overflow-x: auto;
    white-space: nowrap;
}
.box_nr{
    margin-top: 0.2rem;
    width: 31.22%;
    /* width: 3rem; */
    display: flex;
    background-color: #5a697a;
    border-radius: 0.15rem;
    flex-wrap: wrap;
    /* height: 4rem; */
    /* align-items:flex-end; */
    margin-right: 0.2rem;
}
.box_nr p{
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.3rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.753);
    /* background-color: #3f3f3fad; */
    /* border-radius: 0.15rem; */
}
.box_contx{
    width: 100%;
    margin-left: 0.07rem;
    flex-wrap: wrap;
    display: flex;
}
.box{
    padding-left: 0.2rem;
    padding-right: 0.2rem;
}
.wallpaper_list_loading {
  color: rgb(206, 206, 206);
  text-align: center;
  font-size: 0.37rem;
  height: 1.5rem;
  padding-top: 15px;
}
.cate_font{
    color: rgb(206, 206, 206);
    font-size: 0.45rem;
    font-weight: bold;
    margin-top: 0.5rem;
}
</style>