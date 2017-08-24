<template>
	<div id="device">
		<v-sidenav></v-sidenav>
		<v-dheader></v-dheader>
		<div class="refer"></div>
		<div class="switch" v-if="ctrltype==='/run/light/lightControl'">
			<button type="button" class="btn btn-primary" @click="turnAll('on')">全开</button>
			<button type="button" class="btn btn-primary" @click="turnAll('off')">全关</button>
		</div>
		<div class="switch" v-if="ctrltype==='/run/curtain/curtainControl'">
			<button type="button" class="btn btn-primary" @click="turnAll('open')">全开</button>
			<button type="button" class="btn btn-primary" @click="turnAll('close')">全关</button>
		</div>
		<transition name="fade">
			<router-view></router-view>
		</transition>
		<!-- <v-multilight class="light"></v-multilight> -->
	</div>
</template>

<script>
	import Sidenav from '../components/devices/Sidenav'
	import Dheader from '../components/devices/Dheader'
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				switchState:''
			}
		},
		mounted(){

		},
		created(){

		},
		computed:{
			...mapGetters({
				room_id:'id',
				ctrltype:'type'
			})
		},
		components:{
			"v-sidenav":Sidenav,
			"v-dheader":Dheader
		},
		methods:{
			turnAll(arc){
				this.switchState=arc+parseInt(Math.random()*100);
				console.log(this.switchState);
			}
		},
		watch:{
			switchState:function(){
				this.$store.dispatch('setSwitchStatus',this.switchState);
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
	#device .switch{
		position: absolute;
		top: 15px;
		right: 200px;
	}
	#device .switch button{
		width: 100px;
		margin-left: 20px;
	}
	.fade-enter-active {
  		transition: all .5s
	}
	.fade-enter, .fade-leave-active {
	  	opacity: 0;
	  	transform: rotate( -60deg ) translateX( 400px );
	}
</style>