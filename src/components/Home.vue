<template>
	<div id="home">
		<div class="location">
			<span><img src="../assets/images/location.png"></span>
			<i>当前位置</i>
			<p class="loctext">{{lname}}</p>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				lname: sessionStorage.buildName
			}
		},
		created(){
			console.log(sessionStorage.buildID);
		}
	}
</script>
<style scoped>
	#home{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
	.location{
		position: relative;
		top:50%;
		left: 50%;
		margin-top: -100px;
		margin-left: -50px;
		width: 200px;
		height: 100px;
		text-align: left;
		color:#eee;
		font-family: '微软雅黑';
		font-size: 18px;
	}
	.location span{
		display: inline-block;
		vertical-align: bottom;
	}
	.location p{
		margin-top: 20px;
		text-align: center;
	}
</style>