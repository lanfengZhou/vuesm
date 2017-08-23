<template>
	<div id="light" class="light">
		<ul >
			<li v-for="(item,index) in curtainlist">
				<p>{{item.name}}</p>
				<img :src="item.url">
				<div class="switch switch-mini" v-if="item.status=='open'"> 
					<input type="checkbox" :id="item.did" :value="item.status" :name="item.type" :checked="true" title="开关" @click="lightClick($event)"/><span><img :src="stopurl" title="停止" :id="item.did" @click="stopClick($event)"></span>
				</div>
				<div class="switch switch-mini" v-else> 
					<input type="checkbox" :id="item.did" :value="item.status" :name="item.type" title="开关" @click="lightClick($event)" /><span><img :src="stopurl" title="停止" :id="item.did" @click="stopClick($event)"></span>
				</div>
			</li>
			<!-- <p>{{switchStatus}}</p> -->
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
				curtainlist:'',
				onurl:require('../../assets/images/curtain_on.png'),
				offurl:require('../../assets/images/curtain_off.png'),
				stopurl:require('../../assets/images/curtain_stop.png')
			}
		},
		created(){

		},
		mounted(){
			this.init();
		},
		computed:{
			...mapGetters({
				room_id:'id',
				ctrltype:'type',
				switchStatus:'switchStatus'
			})
		},
		methods:{
			lightClick(e){
				var that=this;
				var ele=e.target;
				var did=e.target.getAttribute('id');
				var value=e.target.checked?"open":"close";
				var key=e.target.getAttribute('name');
				$.post('/run/curtain/curtainControl',{did:did,state:value},function(data){
					that.curtainlist.forEach(function(item,index,arr){
						if(item.did===data.curtain.did){
							item.status=data.curtain.status;
							item.url=data.curtain.status==='open'?that.onurl:that.offurl
						}
					})
				})
			},
			stopClick(e){
				var ele=e.target;
				var did=e.target.getAttribute('id');
				var state="pasue";
				$.post('/run/curtain/curtainControl',{did:did,state:state},function(data){
				})
			},
			init(){
				var that=this;
				$.post('/run/curtain/getCurtainStates',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
					data.curtains.forEach(function(item,index,arr){
						if(item.status==='open'){
							item.url=that.onurl;
						}else{
							item.url=that.offurl;
						}
					});
					that.curtainlist=data.curtains;
				})
			}
		},
		watch:{
			room_id:function(){
				this.init();
			},
			switchStatus:function(){
				var that=this;
				$.post(this.ctrltype,{did:"all-"+sessionStorage.buildID+"-"+this.room_id,key:"io",state:this.switchStatus.match(/[a-z]+/g)[0]},function(data){
					that.curtainlist.forEach(function(item,index,arr){
							item.status=data.curtains[index].status;
							item.url=data.curtains[index].status==='open'?that.onurl:that.offurl
					})
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
		text-align: left;
		/*list-style: none;*/
	}
	.light ul li{
		display: inline-block;
		width: 100px;
		margin-left: 60px;
		text-align: center;
	}
	.light .switch{
		
	}
	.light .switch span{
		display: inline-block;
		width: 13px;
		height: 13px;
		margin-left: 10px;
		vertical-align: middle;
	}
	.light .switch img{
		vertical-align: middle;
	}
	.light .switch input{
		vertical-align: middle;
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