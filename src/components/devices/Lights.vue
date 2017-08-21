<template>
	<div id="light" class="light">
		<!-- <p>dengguang{{room_id}}</p> -->
		<ul >
			<li v-for="(item,index) in lightslist">
				<p>{{item.name}}</p>
				<img :src="item.url" v-if="item.type==='hue'" @click="hueClick">
				<img v-else :src="item.url">
				<div class="switch switch-mini" v-if="item.status==='on'"> 
					<input type="checkbox" :id="item.did" :value="item.status" :name="item.type" checked @click="lightClick($event)"/>
				</div>
				<div class="switch switch-mini" v-else> 
					<input type="checkbox" :id="item.did" :value="item.status" :name="item.type" @click="lightClick($event)"/>
				</div>
			</li>
		</ul>
		<!-- <router-link :to='/mledctrl'></router-link> -->
	</div>
</template>

<script >
	import {mapGetters} from 'vuex'
	import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css'
	import 'bootstrap-switch/dist/js/bootstrap-switch.min.js'
	export default{
		data(){
			return {
				lightslist:'',
				onurl:require('../../assets/images/light_on.png'),
				offurl:require('../../assets/images/light_off.png')
			}
		},
		created(){

		},
		mounted(){
			var that=this;
			$.post('/run/light/getLightStates',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
				data.lights.forEach(function(item,index,arr){
					if(item.status==='on'){
						item.url=that.onurl;
					}else{
						item.url=that.offurl;
					}
				});
				that.lightslist=data.lights;
			})
		},
		computed:{
			...mapGetters({
				room_id:'id'
			})
		},
		methods:{
			lightClick(e){
				var that=this;
				var ele=e.target;
				var did=e.target.getAttribute('id');
				var value=e.target.checked?"on":"off";
				var key=e.target.getAttribute('name');
				$.post('/run/light/lightControl',{did:did,key:'io',value:value},function(data){
					that.lightslist.forEach(function(item,index,arr){
						if(item.did===data.light.did){
							item.status=data.light.status;
							item.url=data.light.status==='on'?that.onurl:that.offurl
						}
					})
				})
			},
			hueClick(){
				console.log("1");
			}
		},
		watch:{
			room_id:function(){
				//ajax 请求某个building，room下的所有灯光/run/light/getLightList
				var that=this;
				$.post('/run/light/getLightStates',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
					data.lights.forEach(function(item,index,arr){
						if(item.status==='on'){
							item.url=that.onurl;
						}else{
							item.url=that.offurl;
						}
					});
					that.lightslist=data.lights;
				})
			}
		}
	}
</script>
<style scope>
	.light{
		position: relative;
		left: 213px;
		top:150px;
		height: 100%
	}
	.light ul{
		text-align: center;
		/*list-style: none;*/
	}
	.light ul li{
		display: inline-block;
		width: 100px;
		margin-left: 60px;
	}
	.light ul li input,.light ul img{
		cursor: pointer;
	}
	.light ul img{
		margin-bottom: 10px;
	}
	.light ul p{
		font-size: 16px;
		font-family: "微软雅黑";
	}
</style>