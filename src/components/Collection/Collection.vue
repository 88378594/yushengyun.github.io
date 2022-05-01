<template>
  <div class="box">
    <div class="header">
      <i @click="$router.push({ path: '/' })" class="iconfont icon-fanhui"></i>
      <b>我的收藏</b>
    </div>
    <div style="height: 1.5rem"></div>
    <div style="padding: 0.2rem">
      <div class="cateChild">
        <div
          v-for="item in featCateList"
          :key="item.featCateId + ''"
          :class="{ cateChild_border: active == item.featCateId + '' }"
          @click="active = item.featCateId+''"
        >
          {{ item.featCateName }}
        </div>
      </div>
      <mt-tab-container
        style="overflow: auto;height: 78vh;"
        class="page-tabbar-tab-container"
        v-model="active"
        swipeable
      >
        <mt-tab-container-item
          v-for="item in featCateList"
          :key="'' + item.featCateId + ''"
          :id="'' + item.featCateId + ''"
        >
          <div class="nav_box">
            <CollectionChild :imgType="imgType" v-if="active==item.featCateId+''" />
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 切换页面加载动画 -->
    <div class="fakeloader"></div>
  </div>
</template>

<script>
import CollectionChild from "@/components/Collection/CollectionChild.vue";
import req from "@/utils/request";
export default {
  name: "Collection",

  data() {
    return {
      active: "", //通过这个绑定要显示的内容
      imgType:"",
      featCateList: [],
    };
  },
  watch: {
    active(newValue) {
        this.$nextTick(()=>{
            this.imgType=newValue
        })
      console.log(newValue, "监听器");
    },
  },
  mounted() {
    //cha分类
    req.post("/selectFeatCate").then((res) => {
      console.log(res);
      this.featCateList = res.data;
      this.$nextTick(()=>{
          this.active = res.data[0].featCateId + "";
      })
    });

    $(".fakeloader").fakeLoader({
      timeToHide: 500,
      bgColor: "#34495e",
      spinner: "spinner3",
    });
    console.log(this.active, "当前值");
  },
  components: {
    CollectionChild,
  },
  methods: {},
};
</script>

<style scoped>
.header {
  width: 100%;
  line-height: 1.5rem;
  /* justify-content: space-around; */
  height: 1.5rem;
  background-color: #414a54;
  position: fixed;
  font-size: 0.45rem;
  top: 0;
  transition: 0.8s;
  text-align: center;
  color: white;
  z-index: 999;
}
.cateChild {
  width: 100%;
  /* margin-left: 0.2rem; */
  align-items: center;
  height: 2rem;
  /* display: flex; */
  display: -webkit-box;
  overflow-x: auto;
  white-space: nowrap;
}
.cateChild div {
  width: 20%;
  margin-right: 0.3rem;
  line-height: 1.2rem;
  font-size: 0.35rem;
  text-align: center;
  color: aliceblue;
  border-radius: 0.1rem;
  transition: 1s;
  background-color: rgba(198, 214, 228, 0.479);
  height: 1.2rem;
}
.cateChild_border {
  color: rgba(255, 255, 255, 0.664) !important;
  transition: 1s;
  border: 1px solid rgb(194, 199, 199);
  background-color: rgba(198, 214, 228, 0.137) !important;
}
i {
  font-size: 0.55rem !important;
  float: left;
  margin-left: 0.4rem;
}
b{
    margin-left: -0.5rem;
}
.box_nr {
  width: 10%;
  height: 1rem;
}
.box {
  width: 100%;
  padding: 0;
  margin: 0;
  color: aliceblue;
}
.nav_box {
  height: 70vh;
  /* padding: 0.2rem; */
}
input {
  width: 85%;
  height: 0.9rem;
  text-align: center;
  background: rgb(215 226 231);
  border-radius: 2rem;
  font-size: 0.3rem !important;
  transition: 0.8s;
  border-style: none;
  outline: none;
}
</style>