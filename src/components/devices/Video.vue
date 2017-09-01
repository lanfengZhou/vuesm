<template>
	<div id="env" class="env">
		<ul class="airlogo">
			<li v-for="(item,index) in tvlist">
				<p>{{item.name}}</p>
				<img :src="item.url" :id="item.did" :name="item.name" @click="tvClick" title="点击控制电视">
			</li>
			<li v-for="(item,index) in topboxlist">
				<p>{{item.name}}</p>
				<img :src="item.url" title="点击控制机顶盒" :id="item.did" :name="item.name" @click="topboxClick">
			</li>
		</ul>
		<v-tv v-if="tvflag" :tv_did="tv_did"></v-tv>
		<v-topbox v-if="topboxflag" :topbox_did="topbox_did"></v-topbox>
		<v-music v-if="room_id"></v-music>
	</div>
</template>

<script >
	import {mapGetters} from 'vuex'
	import Tvcontrol from '../devices/Tvcontrol'
	import Topboxctrl from '../devices/Topboxctrl'
	import Music from '../devices/Music'
	export default{
		data(){
			return {
				tvlist:'',
				topboxlist:'',
				onurl:require('../../assets/images/video/video_on.png'),
				topboxon:require('../../assets/images/video/topbox_on.png'),
				tvflag:false,
				tv_did:'',
				topboxflag:false,
				topbox_did:''
			}
		},
		created(){

		},
		mounted(){
			this.init();
		},
		components:{
			"v-tv":Tvcontrol,
			"v-topbox":Topboxctrl,
			"v-music":Music
		},
		computed:{
			...mapGetters({
				room_id:'id',
			})
		},
		methods:{
			tvClick(e){
				var ele=e.target;
				this.tv_did=e.target.getAttribute('id');
				if(!this.tvflag){
					this.tvflag=true;
				}else{
					this.tvflag=false;
				}
			},
			topboxClick(e){
				var ele=e.target;
				this.topbox_did=e.target.getAttribute('id');
				if(!this.topboxflag){
					this.topboxflag=true;
				}else{
					this.topboxflag=false;
				}
			},
			init(){
				var that=this;
				$.post('/run/audio/getTvList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
					data.televisons.forEach(function(item,index,arr){
							item.url=that.onurl;
					});
					that.tvlist=data.televisons;
				});
				$.post('/run/audio/getTopboxList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
					data.topboxes.forEach(function(item,index,arr){
							item.url=that.topboxon;
					});
					that.topboxlist=data.topboxes;
				})
			}
		},
		watch:{
			room_id:function(){
				this.init();
			},
			// did:function(){
			// 	var that=this;
			// 	$.post('/run/envControl/getAirState',{did:this.did},function(data){
			// 		that.temp_now=data.airConditioner.temp;
			// 		that.model_now=data.airConditioner.model;
			// 		that.dir_now=data.airConditioner.dir;
			// 		that.speed_now=data.airConditioner.speed;
			// 	})
			// }
		}
	}
</script>
<style scoped>
	.env{
		position: relative;
		left: 213px;
		top:150px;
		/*height: 100%*/
	}
	.env .airlogo{
		text-align: left;
		/*list-style: none;*/
	}
	.env .airlogo li{
		display: inline-block;
		width: 100px;
		margin-left: 60px;
		text-align: center;
	}
	.env .airlogo img, .env .airlogo input{
		cursor: pointer;
	}
	.env .airlogo p{
		font-size: 16px;
		font-family: "微软雅黑";
	}
	
</style>