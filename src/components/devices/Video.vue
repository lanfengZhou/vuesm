<template>
	<div id="env" class="env">
		<ul class="airlogo">
			<li v-for="(item,index) in tvlist">
				<p>{{item.name}}</p>
				<img :src="item.url" :id="item.did" :name="item.name" @click="airClick" title="点击控制空调">
				<div class="switch switch-mini" v-if="item.power=='打开'"> 
					<input type="checkbox" :id="item.did" :value="item.power" :name="item.name" :checked="true" title="开关" @click="turnAirState($event)"/>
				</div>
				<div class="switch switch-mini" v-else> 
					<input type="checkbox" :id="item.did" :value="item.power" :name="item.name" title="开关" @click="turnAirState($event)"/>
				</div>
			</li>
			<li v-for="(item,index) in topboxlist">
				<p>{{item.name}}</p>
				<img :src="item.url">
				<div class="switch switch-mini" v-if="item.status=='on'"> 
					<input type="checkbox" :id="item.did" :value="item.status" :name="item.type" :checked="true" title="开关" @click="turnPlugState($event)"/>
				</div>
				<div class="switch switch-mini" v-else> 
					<input type="checkbox" :id="item.did" :value="item.status" :name="item.type" title="开关" @click="turnPlugState($event)"/>
				</div>
			</li>
		</ul>
		<v-tv></v-tv>
	</div>
</template>

<script >
	import {mapGetters} from 'vuex'
	import Tvcontrol from '../devices/Tvcontrol'
	export default{
		data(){
			return {
				tvlist:'',
				topboxlist:'',
				onurl:require('../../assets/images/video/video_on.png'),
				offurl:require('../../assets/images/video/video_off.png'),
				pbon:require('../../assets/images/video/topbox_on.png'),
				pboff:require('../../assets/images/video/topbox_off.png'),
				airflag:false,
				did:'',
				airname:'',
				temp_now:'',
				model_now:'',
				dir_now:'',
				speed_now:''
			}
		},
		created(){

		},
		mounted(){
			this.init();
		},
		components:{
			"v-tv":Tvcontrol
		},
		computed:{
			...mapGetters({
				room_id:'id',
			})
		},
		methods:{
			turnAirState(e){
				var that=this;
				var ele=e.target;
				var did=e.target.getAttribute('id');
				this.airname=ele.getAttribute('name');
				var value=e.target.checked?"open":"close";
				$.post('/run/envControl/airControl',{did:did,fun:'loop',arg:value},function(data){
					that.tvlist.forEach(function(item,index,arr){
						if(item.did===data.airConditioner.did){
							item.power=data.airConditioner.power;
							item.url=data.airConditioner.power==='打开'?that.onurl:that.offurl;
						}
					});
					if(value=='open'){
						that.temp_now=data.airConditioner.temp;
						that.model_now=data.airConditioner.model;
						that.dir_now=data.airConditioner.dir;
						that.speed_now=data.airConditioner.speed;
					}else{
						that.temp_now="---";
						that.model_now="---";
						that.dir_now="---";
						that.speed_now="---";
					}
					
				})
			},
			turnPlugState(e){
				var that=this;
				var ele=e.target;
				var did=e.target.getAttribute('id');
				var value=e.target.checked?"on":"off";
				$.post('/run/envControl/plugControl',{did:did,state:value},function(data){
					that.topboxlist.forEach(function(item,index,arr){
						if(item.did===data.plugbase.did){
							item.status=data.plugbase.status;
							item.url=data.plugbase.status==='on'?that.pbon:that.pboff
						}
					})
				})
			},
			/**
			 * 数字调整温度
			 * @param  {[type]} e [description]
			 * @return {[type]}   [description]
			 */
			turnTemp(e){
				var ele=e.target;
				var state=e.target.innerText;
				var that=this;
				$.post('/run/envControl/airControl',{did:this.did,fun:"temp",arg:state},function(data){
					that.temp_now=data.airConditioner.temp;
					that.model_now=data.airConditioner.model;
					that.dir_now=data.airConditioner.dir;
					that.speed_now=data.airConditioner.speed;
				})
			},
			/**
			 * 空调loop控制
			 * @param  {[type]} e [description]
			 * @return {[type]}   [description]
			 */
			turnLoop(e,arg){
				var that=this;
				var ele=e.target;
				$.post('/run/envControl/airControl',{did:this.did,fun:"loop",arg:arg},function(data){
					that.temp_now=data.airConditioner.temp;
					that.model_now=data.airConditioner.model;
					that.dir_now=data.airConditioner.dir;
					that.speed_now=data.airConditioner.speed;
				})
			},
			airClick(e){
				var ele=e.target;
				this.did=e.target.getAttribute('id');
				this.airname=ele.getAttribute('name');
				// if(!this.airflag){
					this.airflag=true;
				// }else{
				// 	this.airflag=false;
				// }
			},
			hide(){
				this.airflag=false;
			},
			init(){
				var that=this;
				$.post('/run/audio/getTvList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
					data.televisions.forEach(function(item,index,arr){
						if(item.power==='打开'){
							item.url=that.onurl;
						}else{
							item.url=that.offurl;
						}
					});
					that.tvlist=data.televisions;
				});
				$.post('/run/audio/getTopboxList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
					data.topboxes.forEach(function(item,index,arr){
						if(item.status==='on'){
							item.url=that.pbon;
						}else{
							item.url=that.pboff;
						}
					});
					that.topboxlist=data.topboxes;
				})
			}
		},
		watch:{
			room_id:function(){
				this.init();
			},
			did:function(){
				var that=this;
				$.post('/run/envControl/getAirState',{did:this.did},function(data){
					that.temp_now=data.airConditioner.temp;
					that.model_now=data.airConditioner.model;
					that.dir_now=data.airConditioner.dir;
					that.speed_now=data.airConditioner.speed;
				})
			}
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
	.env .airmodel{
		/*position: absolute;*/
		width: 650px;
		/*left: 0;*/
		/*top:100px;*/
		text-align: left;
		margin-top: 100px;
	}
	.env .airmodel .airname{
		/*width: */
		font-size: 20px;
		font-family: "微软雅黑";
		color: #f4ea2a;
		text-align: center;
		cursor: pointer;
	}
	.env .switch{
		margin-left: 5px;
		margin-bottom: 70px;
	}
	.env .switch img{
		margin: 0 30px;
		cursor: pointer;
	}
	.env .switch img:hover{
		opacity: 0.6
	}
	.env .temp{
		width: 200px;
		display: inline-block;
		vertical-align: middle;
	}
	.env .temp li{
		display: inline-block;
		margin-left: 5px;
		margin-top: 10px;
	}
	.env .tempctrl,.env .model{
		display: inline-block;
		vertical-align: middle;
		text-align: center;
		font-family: "微软雅黑";
		font-size:16px;
		margin-left: 10px;
		/*list-style: none*/
	}
	.env .tempctrl img:hover{
		cursor: pointer;
		opacity: 0.6
	}
	.env .tempctrl p{
		margin: 40px 0;
	}
	.env .model{
		vertical-align: bottom;
	}
	.env .model li{
		display: inline-block;
		list-style: none;
		margin-left: 10px;
	}
	.env .model button{
		width: 100px;
	}
	.env .model .show_now{
		text-align: left;
	}
	.env .model .show_now p{
		/*display: inline-block;*/
		border-right: 2px solid #fff;
		border-left: 2px solid #fff;
		padding: 0 5px;
		margin-left: 10px;
	}
	.env .model .show_now span{
		/*display: inline-block;*/
		margin-right:120px;
	}
</style>