<template>
    <div class="box">
        <input type="text"  placeholder="搜索喜欢的壁纸、专辑、用户">
    </div>
</template>

<script>
export default {
    name: 'Search',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
.box{
    width: 100%;
    padding: 0;
    margin: 0;
}
input{
    width: 100%;
    height: 1rem;
    text-align: center;
    margin-top: 0.1rem;
    background: rgb(215 226 231);
    border-radius: 2rem;
    font-size: 0.3rem!important;
    align-items: center;
    transition: 0.8s;
    border-style: none;
    outline: none;
}
</style>