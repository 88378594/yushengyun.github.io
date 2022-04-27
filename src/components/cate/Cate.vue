<template>
    <div>
        <!-- <p class="wallpaper_list_loading" v-show="isLoadShow">加载中....</p> -->
        <p class="wallpaper_list_loading" v-show="isLoadShow">敬请期待</p>
    </div>
</template>

<script>
export default {
    name: 'Cate',

    data() {
        return {
            isLoadShow:true
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
.wallpaper_list_loading {
  color: rgb(206, 206, 206);
  text-align: center;
  height: 50px;
  font-size: 0.37rem;
  padding-top: 15px;
}
</style>