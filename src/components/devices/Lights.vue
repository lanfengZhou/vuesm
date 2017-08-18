<template>
	<div id="light" class="light">
		<p>dengguang{{room_id}}</p>
		<div class="switch switch-mini">
			<input type="checkbox" id="myswitch" checked   />
		</div>
	</div>
</template>

<script >
	import {mapGetters} from 'vuex'
	import '../../../static/switch/css/bootstrap-switch.css'
	import '../../../static/switch/js/bootstrap-switch.js'
	export default{
		data(){
			return {
				lightsNum:''
			}
		},
		mounted(){
			// $("#myswitch").bootstrapSwitch('toggleState');
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