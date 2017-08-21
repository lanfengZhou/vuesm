<template>
	<div id="sidenav" class="sidenav">
		<ul v-for="(item,index) in sidelist">
			<li @click="sidebarClick"><router-link :to="item.url">{{item.content}}</router-link></li>
			<p>{{ctrltype}}</p>	
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
			sidebarClick(){

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