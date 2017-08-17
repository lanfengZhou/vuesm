<template>
	<div id="device">
		<v-sidenav></v-sidenav>
		<v-dheader v-on:selectroom="roomid"></v-dheader>
		<div class="refer"></div>
		<transition name="fade">
			<router-view></router-view>
		</transition>
		<!-- <v-multilight class="light"></v-multilight> -->
	</div>
</template>

<script>
	import Sidenav from '../components/devices/Sidenav'
	import Dheader from '../components/devices/Dheader'
	export default{
		data(){
			return {

			}
		},
		mounted(){

		},
		created(){

		},
		components:{
			"v-sidenav":Sidenav,
			"v-dheader":Dheader
		},
		methods:{
			roomid(){
			}
		}
	}
</script>
<style scoped>
	#device{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 20;
	}
	#device .refer{
		position: absolute;
		left: 200px;
		width: 3px;
		height: 100%;
		background-color: #fff;
	}
	#device .light{
		position: absolute;
		/*left: 200px;*/
	}
	.fade-enter-active {
  		transition: all .5s
	}
	.fade-enter, .fade-leave-active {
	  	opacity: 0;
	  	transform: rotate( -60deg ) translateX( 400px );
	}
</style>