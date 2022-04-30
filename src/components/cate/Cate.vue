<template>
    <div class="box">
        <Search />
        <p class="cate_font">特色分类</p>
        <!-- 数据加载中动图 -->
        <p class="wallpaper_list_loading" v-show="isLoadShow">
          <img style="width:0.7rem" src="../../assets/img/loading.gif" alt="">
        </p>
        <div class="box_cont">
            <div class="box_nr" v-for="(item,index) in featCateList" :key="index" @click="selectFeatList()">
                <img class="img" v-lazy="'http://106.13.215.188:8080/img/'+item.imgName" alt="">
                <p>
                    {{item.featCateName}}
                </p>
            </div>
        </div>
        
         <p class="cate_font">更多分类</p>
         <div class="box_contx">
            <div class="box_nr" v-for="(item,index) in cateList" :key="index" @click="selectCateChildList(item.cateId)" >
                 <img class="img" v-lazy="'http://106.13.215.188:8080/img/'+item.imgName" alt="">
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
        const tk = localStorage.getItem("userName");
        if (!tk) {
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
        this.$router.push("/login");
        }else{
            this.selectCateList();
        }
    },
    components:{
        Search
    },
    methods: {
        selectFeatList(){
            pxmu.toast({
                msg: "敬请期待...", //内容 不能为空
                time: 2500, //停留时间 默认2500毫秒
                bg: "rgba(0, 0, 0, 0.86)", //背景颜色 默认黑色
                color: "#fff", //文字颜色 默认白色
                location: "", //居中center 顶部top 底部bottom默认
                animation: "slidedown", //显示的动画 默认fade 动画支持详见动画文档
                type: "wap", //默认wap样式 可选参数：pc 入参pc时
                status: "", //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
            });
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
    height: 3.3rem;
    border-top-left-radius: 0.15rem;
    border-top-right-radius: 0.15rem;

}
.img[lazy=loading] {
  transition: none !important;
  width: 0.5rem !important;
  margin: auto;
}
.box_cont{
    width: 100%;
    margin-left: 0.07rem;
    /* display: flex; */
    height: 4.4rem;
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
    height: 4rem;
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