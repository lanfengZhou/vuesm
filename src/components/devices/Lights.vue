<template>
	<div id="light" class="light">
		<p>dengguang{{room_id}}</p>
		<img src="../../assets/images/light_off.png">
		<div class="switch switch-mini "> 
			<input type="checkbox" id="myswitch" checked/>
		</div>
	</div>
</template>

<script >
	import {mapGetters} from 'vuex'
	import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css'
	import 'bootstrap-switch/dist/js/bootstrap-switch.min.js'
	export default{
		data(){
			return {
				lightsNum:''
			}
		},
		created(){

		},
		mounted(){
			$("#myswitch").bootstrapSwitch('toggleState');
		},
		computed:{
			...mapGetters({
				room_id:'id'
			})
		},
		watch:{
			room_id:function(){
				//ajax 请求某个building，room下的所有灯光/run/light/getLightList
				console.log(this.room_id);//房间号
				console.log(sessionStorage.buildID)//楼房号
			}
		}
	}
</script>
<style scope>
	
</style>