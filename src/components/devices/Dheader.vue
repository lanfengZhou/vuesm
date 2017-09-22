<template>
	<div id="dheader" class="dheader">
		<select class="form-control" v-model="selected">
			<option disabled selected value="">请选择教室</option>
			<option :value="item.id" v-for="(item,index) in roomlist">{{item.room_name}}</option>
		</select>
		<!-- <select class="form-control">>
			<option value="1">请选择第几组灯</option>
		</select> -->
	</div>
</template>

<script >
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				selected:'',
				roomlist:[]
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
		mounted(){
			this.selected=this.room_id;
		},
		methods:{
			
		},
		computed:{
			...mapGetters({
				room_id:'id'
			})
		},
		watch:{
			selected:function(){
				// console.log(this.selected);
				let id=this.selected;
				this.$store.dispatch('fun',id);
			}
		}
	}
</script>
<style scoped>
	.dheader{
		position: absolute;
		top:10px;
		left: 213px;
		z-index: 20
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