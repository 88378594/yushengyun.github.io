<template>
  <div class="box">
    <div class="header">
      <i @click="$router.push({ path: '/' })" class="iconfont icon-fanhui"></i>
      <input type="text" placeholder="搜索喜欢的壁纸、专辑、用户" />
    </div>
    <div style="height: 1.5rem"></div>
    <div style="padding: 0.2rem">
      <div class="cateChild">
        <div
          v-for="item in cateChildList"
          :key="item.childId + ''"
          :class="{ cateChild_border: active == item.childId + '' }"
          @click="active = item.childId+''"
        >
          {{ item.childName }}
        </div>
      </div>
      <br />
      <mt-tab-container
        style="overflow: auto"
        class="page-tabbar-tab-container"
        v-model="active"
        swipeable
      >
        <mt-tab-container-item
          v-for="item in cateChildList"
          :key="'' + item.childId + ''"
          :id="'' + item.childId + ''"
        >
          <div class="nav_box">
            <CateList :sortId="sortId" :sortChildId="sortChildId" v-if="active==''+item.childId+''" />
            <!-- {{ item.childName }} -->
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 切换页面加载动画 -->
    <div class="fakeloader"></div>
  </div>
</template>

<script>
import CateList from "@/components/list/CateList.vue";
import req from "@/utils/request";
export default {
  name: "Catechild",

  data() {
    return {
      active: "", //通过这个绑定要显示的内容
      cateId: this.$route.params.id, //父分类id
      sortId:null,
      sortChildId:null,

      cateChildList: [],
    };
  },
  watch: {
    active(newValue) {
        this.sortId=this.cateId
        this.sortChildId=newValue
    //     req.post("/selectCateImg", { sortId:this.cateId,sortChildId:newValue,"pageNo":1,
    // "pageSize":4}).then((res) => {
    //         console.log(res);
    //     })
      console.log(newValue, "监听器");
    },
       
  },
  mounted() {
    //cha分类
    req.post("/selectCateChild", { cateId: this.cateId }).then((res) => {
      console.log(res);
      this.cateChildList = res.data;
      this.$nextTick(()=>{
          this.active = res.data[0].childId + "";
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
    CateList,
  },
  methods: {},
};
</script>

<style scoped>
.header {
  width: 100%;
  align-items: center;
  justify-content: space-around;
  height: 1.5rem;
  background-color: #414a54;
  display: flex;
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
  width: 12.6%;
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