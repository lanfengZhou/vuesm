<template>
	<div id="dheader" class="dheader">
		<select class="form-control" v-model="selected">
			<option disabled selected value="">请选择教室</option>
			<option :value="item.id" v-for="(item,index) in roomlist">{{item.room_name}}</option>
		</select>
		<!-- <select class="form-control">>
			<option value="1">请选择第几组灯</option>
		</select> -->
		<div class="switch" v-if="ctrltype==='/run/light/lightControl'">
			<button type="button" class="btn btn-primary" @click="turnAll('on')">全开</button>
			<button type="button" class="btn btn-primary" @click="turnAll('off')">全关</button>
		</div>
		<div class="switch" v-if="ctrltype==='/run/curtain/curtainControl'">
			<button type="button" class="btn btn-primary" @click="turnAll('open')">全开</button>
			<button type="button" class="btn btn-primary" @click="turnAll('close')">全关</button>
		</div>
	</div>
</template>

<script >
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				selected:'',
				roomlist:[],
				switchState:''
			}
		},
		created(){
			var that=this;
			//getroomlist
			$.post('/config/room/query',{building_id:sessionStorage.buildID},function(data){
					data.rooms.forEach(function(item,index,arr){
					that.roomlist.push(item);
				})
			})
		},
		methods:{
			...mapActions(['fun']),
			turnAll(arc){
				this.switchState=arc+parseInt(Math.random()*100);
				console.log(this.switchState);
			}
		},
		computed:{
			...mapGetters({
				room_id:'id',
				ctrltype:'type'
			})
		},
		watch:{
			selected:function(){
				// console.log(this.selected);
				let id=this.selected;
				this.$store.dispatch('fun',id);
			},
			switchState:function(){
				this.$store.dispatch('setSwitchStatus',this.switchState);
			}
		}
	}
</script>
<style scoped>
	.dheader{
		position: absolute;
		top:10px;
		left: 213px;
		width: 100%;
	}
	.dheader select{
		display: inline-block;
		width: 300px;
		margin-left: 10px;
	}
	.dheader .switch{
		position: absolute;
		top: 10px;
		right: 300px;
	}
	.dheader .switch button{
		width: 100px;
		margin-left: 20px;
	}
</style>