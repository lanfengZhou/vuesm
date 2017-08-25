<template>
	<div id="tvcontrol" class="tvctrl">
		<div class="top">
			<div class="powerflag"></div>
			<div class="mute"></div>
			<div class="power">
				<div class="power_left"></div>
				<div class="power_center"></div>
				<div class="power_right"></div>
			</div>
			<div class="set"><a href="javascript:;">设置</a><span></span><a href="javascript:;">信源</a></div>
		</div>
		<div class="center">
			<div class="c_leftup"></div>
			<div class="c_rightup"></div>
			<div class="c_leftdown"></div>
			<div class="c_rightdown"></div>
			<div class="confrim"><a href="javascript:;">确定</a></div>
		</div>
		<div class="bottom">
			<div class="set"><a href="javascript:;">返回</a><span></span><a href="javascript:;">菜单</a></div>
			<div class="power">
				<div class="power_left"></div>
				<div class="power_center"></div>
				<div class="power_right"></div>
			</div>
		</div>
		<div class="footer">
			<div class="yinliang">
				<div class="add"></div><a href="javascript:;">音量</a><div class="dec"></div>
			</div>
			<span></span>
			<div class="pindao">
				<div class="up"></div><a href="javascript:;">频道</a><div class="down"></div>
			</div>
			<div class="power">
				<div class="power_left"></div>
				<div class="power_center"></div>
				<div class="power_right"></div>
			</div>
		</div>

	</div>
</template>

<script >
	export default{
		data(){
			return {

			}
		},

	}
</script>
<style scoped>
	.tvctrl{
		position: absolute;
		top: 0;
		right: 300px;
		width: 180px;
		height: 450px;
		background-color: #2c2c2c;
		border-radius: 30px;
	}
	.tvctrl .top{
		width: 100%;
		height: 50px;
		/*border-bottom: 4px solid #000;*/
	}
	.top .powerflag{
		position: relative;
		top: 10px;
		left: 10px;
		width: 10px;
		height: 10px;
		background-color: #fff;
		border-radius: 50%;
		box-shadow: 1px 1px 5px #888888
	}
	.top .mute{
		position: relative;
		top: -1px;
		left: 150px;
		width: 16px;
		height: 16px;
		background:url('../../assets/images/video/mute.png') no-repeat;
	}
	.power{
		width: 100%;
		/*background-color: #f00;*/
		/*text-align: center;*/
		margin-top: 15px;
		height: 36px;
		overflow: hidden;
	}
	.power .power_center,.power .power_center{
		width: 36px;
		height: 36px;
		border-radius: 50% 50%;
		border: 2px solid #000;
		margin-left: 10px;
		float: left;
	}
	.top .power .power_center{
		background:url('../../assets/images/video/off2.png') no-repeat center;
	}
	.bottom .power .power_center{
		background:url('../../assets/images/video/home.png') no-repeat center;
	}		
	.power .power_center:hover,.mute:hover,.center .confrim a:hover,.set a:hover,.add:hover, .dec:hover, .up:hover, .down:hover{
		opacity: 0.5;
		color: #0f0;
		cursor: pointer;
	}
	.power .power_left,.power .power_right{
		width:64px;
		border: 2px solid #000;
		margin-top:14px;
	}
	.power .power_left{
		float: left;
	}
	.power .power_right{
		float: right;
	}
	/*设置，信源,返回，菜单*/
	.set{
/*		background-color: #f00;*/
		position: relative;
		top: 0px;
		text-align: center;
	}
	.set span,.footer span{
		display: inline-block;
		margin: 0 45px;
	}
	.set a{
		color: #fff;
		text-decoration: none;
	}
	.center .c_leftup,.center .c_rightup,.center .c_leftdown,.center .c_rightdown{
		position: absolute;
		width: 50px;
		height: 50px;
	}
	.center .c_leftup{
		left: 20px;
		border-radius: 50px 0 0 0;
		background-color: #f00;
	}
	.center .c_rightup{
		left: 70px;
		border-radius:  0 50px 0 0 ;
		background-color: #0f0;
	}
	.center .c_leftdown{
		left: 20px;
		top:150px;
		border-radius:  0  0  0 50px;
		background-color: #00f;
	}
	.center .c_rightdown{
		left: 70px;
		top:150px;
		border-radius:  0  0 50px 0 ;
		background-color: #ff0;
	}		
	.center .confrim{
		margin: 50px 40px 0px;
		width: 100px;
		height: 100px;
		/*border: 4px solid #000;
		box-shadow: 1px 1px 5px #888888;
		border-radius: 50% 50%;*/
		text-align: center;
		line-height: 100px;
	}
	.center .confrim a{
		display: inline-block;
		width: 50px;
		height: 50px;
		border-radius: 50% 50%;
		border:2px solid #000;
		color: #fff;
		line-height: 50px;
		text-decoration: none;
		/*box-shadow: 1px 1px 5px #888888;*/
	}
	.footer {
		text-align: center;
	}
	.footer .yinliang,.footer .pindao{
		display: inline-block;
		text-align: center;
	}
	.footer a{
		color: #fff;
		text-decoration: none;
	}
	.footer .yinliang .add,.footer .yinliang .dec,.footer .pindao .up,.footer .pindao .down{
		width: 16px;
		height: 16px;
		margin-left: 5px;
		cursor: pointer;
	}
	.footer .yinliang .add{
		margin-bottom: 10px;
		background: url("../../assets/images/video/add.png");
	}
	.footer .yinliang .dec{
		margin-top: 10px;
		background: url("../../assets/images/video/dec.png");
	}
	.footer .pindao .up{
		margin-bottom: 10px;
		background: url("../../assets/images/video/up.png");
	}
	.footer .pindao .down{
		margin-top: 10px;
		background: url("../../assets/images/video/down.png");
	}				
</style>