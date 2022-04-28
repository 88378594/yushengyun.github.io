<template>
    <div class="about">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-viewer v-for="(item,index) in List" :key="index">
					<!-- <img :src="'http://106.13.215.188:8080/img/'+item.imgName"> -->
            		<img v-lazy="'http://106.13.215.188:8080/img/'+item.imgName" :alt="item.auThor">

				</div>
				<!-- <div class="swiper-slide">Slide 2</div>
				<div class="swiper-slide">Slide 3</div> -->
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>

			<!-- 如果需要导航按钮 -->
			<!-- <div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div> -->

			<!-- 如果需要滚动条 -->
			<!--    <div class="swiper-scrollbar"></div>-->
		</div>
	</div>
</template>

<script>
import req from '@/utils/request'
export default {
    name: 'Swiper',
	data() {
		return {
			List:[]
		};
	},
	created(){
		
	},
	mounted() {
		 req.post("/selectSwiper",).then((res) => {
			// res.data.pop();
			this.List=res.data
		 })
		new Swiper('.swiper-container', {
			loop: true, //无缝轮播
			// 如果需要分页器
			pagination: '.swiper-pagination',
			// 如果需要前进后退按钮
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			observer:true,
			observeParents:true,
			mousewheelControl: true, //开启鼠标滚轮控制
			// 如果需要滚动条
			// scrollbar: '.swiper-scrollbar',
			//如果需要自动切换海报
			autoplay: 3000,
		});
		
	}
};
</script>

<style scoped>
.swiper-container {
	margin-top: 0.1rem;
	height: 6rem;
	border-radius: 0.5rem;
	width: 100%;
	margin-bottom: 0.7rem;
}
.swiper-wrapper .swiper-slide {
	width: 100%;
	height: 6rem;
  	background-color: #39434f;
	text-align: center;
	line-height: 5rem;
}
.swiper-slide img{
	width: 100%;
	height: 6rem;
}

.swiper-slide img[lazy=loading] {
  transition: none !important;
  width: 0.5rem !important;
  margin: auto;
}
</style>