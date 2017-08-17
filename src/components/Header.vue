<template>
	<div id="header">
		<nav class="navbar navbar-inverse navbar-fixed-top">
	    <div class="container-fluid">
	      <div class="navbar-header ">
	        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	          <span class="sr-only">Toggle navigation</span>
	          <span class="icon-bar"></span>
	          <span class="icon-bar"></span>
	          <span class="icon-bar"></span>
	        </button>
	        <a class="navbar-brand navlogo" href="/"><span><img src="../assets/images/home.png" style="height: 40px;"></span>  智能家居</a>
	      </div>
	      <div id="navbar" class="navbar-collapse collapse">
	        <ul class="nav navbar-nav navbar-left   navmenu">
	          <li  v-for="(item,index) in listbar"  @click='touchclick()'><router-link :to="item.url"><span><img v-bind:src="item.imgurl"></span>{{item.content}}</router-link></li>
	        </ul>
	      </div>
	    </div>
	  </nav>
	</div>
</template>

<script >
	export default{
		data(){
			return {
				listbar:[
				{content:'首页',imgurl:require('../assets/images/shouye32.png'),url:'/home'},
				{content:'设备',imgurl:require('../assets/images/device32.png'),url:'/device'},
				{content:'环境',imgurl:require('../assets/images/env.png'),url:'/env'},
				{content:'安防',imgurl:require('../assets/images/protect.png'),url:'/protect'},
				{content:'能源',imgurl:require('../assets/images/power32.png'),url:'/power'},
				{content:'联动',imgurl:require('../assets/images/liandong.png'),url:'/contact'},
				{content:'情景',imgurl:require('../assets/images/qingjing.png'),url:'/scene'},
				]

			}
		},
		methods:{
			touchclick(){
				// console.log("1111");
				this.$emit('touchclick');

			}
		}
	}
</script>
<style scoped>
	.navlogo{
		color: #7ce918!important;
		word-spacing: -4px;
		letter-spacing: 2px;
		padding-top: 5px;
		display: inline-block;
		vertical-align: bottom
		/*margin-top: */
/*		height: 100%;*/
	}
	.navlogo img{
		display: inline-block;
		vertical-align: bottom;
	}
	.navlogo:hover{
		opacity: 0.8;
	}
	/*.navmenu{
		margin-left: 60px;
	}*/
	.navmenu li{
		margin-left: 20px;
		letter-spacing:2px;
		font-size: 15px;
	}
	.navmenu li:hover{
		background-color: #404040;
	}
/*	.navmenu li:active{
		background-color: #7ce918
	}*/
	.navmenu img{
		display: inline-block;
		vertical-align: bottom;
	}
</style>