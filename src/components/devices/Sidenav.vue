<template>
	<div id="sidenav" class="sidenav">
		<ul v-for="(item,index) in sidelist">
			<li @click="sidebarClick($event)"><router-link :to="item.url">{{item.content}}</router-link></li>
		</ul>
	</div>
</template>

<script >
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				sidelist:[
					{content:'灯光控制',url:'/ledctrl'},
					{content:'窗帘控制',url:'/curctrl'},
					{content:'影音控制',url:'/videoctrl'},
					{content:'环境控制',url:'/envctrl'},
				]
			}
		},
		computed:{
			...mapGetters({
				ctrltype:'type'
			})
		},
		methods:{
			roomid(){
				console.log("11111");
			},
			sidebarClick(e){
				var ele=e.target;
				var url=ele.getAttribute('href');
				var type=url.substr(2,url.length);
				if(type==='ledctrl'){
					this.$store.dispatch('setCtrlType',"/run/light/lightControl");
				}else if(type==='curctrl'){
					this.$store.dispatch('setCtrlType',"/run/curtain/curtainControl");
				}else{
					this.$store.dispatch('setCtrlType',"null");
				}
				
			}


		}
	}
</script>
<style scoped>
	.sidenav{
		position: absolute;
		width: 200px;
		height: 100%;
		/*background-color: #ff0;*/

	}
	.sidenav ul li{
		list-style: none;
		margin-top: 50px;
		text-align: center;
		height: 30px;
		line-height: 30px;
	}
	.sidenav ul li:hover{
		background: rgba(240,240,240,0.3);
	}
	.sidenav ul li.selected{
		background: rgba(240,240,240,0.3);
	}
	.sidenav ul li a{
		color: #fff;
		font-family: '微软雅黑';
		font-size: 16px;
	}
	.sidenav ul li a:hover{
		cursor: pointer;
		text-decoration: none;

	}
</style>