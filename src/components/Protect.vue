<template>
	<div id="device">
		<v-dheader class="dhead"></v-dheader>
		<div class="sensorlist">
			<ul><li v-for="(item,index) in sensorlist"><a href="javascript:;">{{item.name}}</a><p>[{{item.state}}]</p></li></ul>
		</div>
		<div class="cameralist">
			<ul><li v-for="(item,index) in cameralist">
				<div class="center">
					<p>{{item.name}}</p>
					<div class="c_up" @click="sendOrder('up',item.did)"></div>
					<div class="c_left" @click="sendOrder('left',item.did)"></div>
					<div class="c_right" @click="sendOrder('right',item.did)"></div>
					<div class="c_down" @click="sendOrder('down',item.did)"></div>
				</div>
				<div class="videoframe">
					<div class="zoom_in">
						<img :id="item.did" @click="getImg($event,item.did)"  alt="点击播放"><span class="c_scale"  @click="zoom($event)"></span>
					</div>
				</div>
				
				</li>
			</ul>
		</div>
		<!-- <div class="fullscreen"></div> -->
		<div class="switch" >
			<button type="button" class="btn btn-primary" @click="turnAll('true')"><span></span>布防</button>
			<button type="button" class="btn btn-primary" @click="turnAll('false')">撤防</button>
		</div>
		<transition name="fade">
			<router-view></router-view>
		</transition>
		<!-- <v-multilight class="light"></v-multilight> -->
	</div>
</template>

<script>
	import Dheader from '../components/devices/Dheader'
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				sensorlist:'',
				timer:'',
				cameratimer:'',
				cameralist:'',
				isSelect:true
			}
		},
		created(){

		},
		mounted(){
			if(!!this.room_id){
				clearInterval(this.timer);
				this.initSensor();
				this.initCamera();
			}
			
		},
		destroyed(){
			clearInterval(this.timer);
			clearInterval(this.cameratimer);
		},
		computed:{
			...mapGetters({
				room_id:'id',
			})
		},
		components:{
			"v-dheader":Dheader
		},
		methods:{
			turnAll(arc){
				$.post('/run/protect/startProtect',{room_id:this.room_id,state:arc},function(data){
					if(data.success){
						alert(arc=='true'?'布防成功':'撤防成功')
					}
					
				})
			},
			initSensor(){
				var that=this;
				clearInterval(this.timer);
				function getSensorStates(){
					$.post('/run/protect/getSensorStates',{building_id:sessionStorage.buildID,room_id:that.room_id},function(data){
						that.sensorlist=data.ioSensors;
					})
				}
				getSensorStates();
				this.timer=setInterval(getSensorStates,3000);
			},
			initCamera(){
				var that=this;
				$.post('/run/camera/getCameraList',{building_id:sessionStorage.buildID,room_id:that.room_id},function(data){
						that.cameralist=data.cameras;
					})
			},
			getImg(e,did){
				var ele=e.target;
				var did=ele.getAttribute('id');
				var that=this;
				clearInterval(this.cameratimer);
				var i=1;
				this.cameratimer=setInterval(function(){
					console.log(i++);
					ele.setAttribute('src','/run/camera/getImage?did='+did+'&'+Math.random());
				},300);
				
			},
			zoom(e){
				// if(this.isSelect){
				// 	this.isSelect=false;
				// }else{
				// 	this.isSelect=true;
				// }
				var ele=e.target;
				if(ele.parentNode.getAttribute('class')=='zoom_in'){
					ele.parentNode.setAttribute('class','zoom_out');
				}else{
					ele.parentNode.setAttribute('class','zoom_in');
				}
				
			},
			sendOrder(order,did){
				$.post('/run/camera/ptzControl',{did:did,dir:order},function(){})
			}
		},
		watch:{
			room_id:function(){
				this.initSensor();
				this.initCamera();
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
	.dhead{
		margin-left: -213px;
	}
	.sensorlist{
		position: absolute;
		top: 60px;
		width: 100%;
		text-align: center;
	}
	.sensorlist ul{
		list-style:none;
	}
	.sensorlist ul li,.cameralist ul li{
		display: inline-block;
		margin-left: 50px;
	}
	.sensorlist ul li a,.cameralist ul li a{
		color: #fff;
		text-decoration: none;
		font-size: 18px;
	}
	.sensorlist ul li a:before{
		content: '';
		display:inline-block;
		width: 16px;
		height: 16px;
		background: url(../assets/images/protect_logo.png) no-repeat;
		vertical-align: middle;
	}
	.sensorlist ul li p{
		font-family: '微软雅黑';
	}
	.cameralist{
		margin-top:200px;
		width: 100%;
		text-align: center;
	}
	.cameralist ul li img{
		cursor: pointer;
	}
	#device .switch{
		position: absolute;
		top: 15px;
		right: 10px;
	}
	#device .switch button{
		width: 100px;
		margin-left: 20px;
	}
	.center{
		display: inline-block;
	}
	.center .c_up,.center .c_down,.center .c_left,.center .c_right{
		width: 32px;
		height: 32px;
		margin: 0 auto;
	}
	.center .c_up:hover,.center .c_down:hover,.center .c_left:hover,.center .c_right:hover,.c_scale:hover{
		opacity: 0.5;
		color: #0f0;
		cursor: pointer;
	}
	.center .c_up{
		background:url("../assets/images/video/up.png") no-repeat center;
	}
	.center .c_down{
		background:url("../assets/images/video/down.png") no-repeat center;
	}
	.center .c_left{
		display: inline-block;
		background:url("../assets/images/video/left.png") no-repeat center;
		vertical-align: middle;
		margin-right: 20px;
	}
	.center .c_right{
		display: inline-block;
		background:url("../assets/images/video/right.png") no-repeat center;
		vertical-align: middle;
	}
	.videoframe{
		display: inline-block;
	}
	.videoframe img{
		display: inline-block;
		width: 100%;
		height: 100%;
		background-color: #000;
	}
	.videoframe .c_scale{
		position: absolute;
		width: 20px;
		height: 20px;
		bottom: 0;
		right:0;
		background: url("../assets/images/protect_scale.png") no-repeat center;
		/*vertical-align: bottom;*/
		/*z-index: 20;*/
		/*margin-right: 20px;*/
	}
	.zoom_in{
		position: relative;
		width: 300px;
		height: 300px;
		background-color: #000;
	}
	.zoom_out{
		position: absolute;
		top:-62px;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2000
	}
	.fullscreen{
		width: 100%;
		height: 3000px;
		margin-top:-62px;
		position: absolute;
		z-index: 20;
		background-color: #e8e8e8;
		opacity: 0.5;
	}
	.fade-enter-active {
  		transition: all .5s
	}
	.fade-enter, .fade-leave-active {
	  	opacity: 0;
	  	transform: rotate( -60deg ) translateX( 400px );
	}
</style>