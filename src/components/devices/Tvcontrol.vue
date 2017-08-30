<template>
	<div id="tvcontrol" class="tvctrl">
		<div class="top">
			<div class="powerflag"></div>
			<div class="mute"></div>
			<div class="power">
				<div class="power_left"></div>
				<div class="power_center" @mousedown='mouseDown' @mouseup='mouseUp' @click="powerCtrl"></div>
				<div class="power_right"></div>
			</div>
			<div class="set"><a href="javascript:;" @click="sendOrder('set')">设置</a><span></span><a href="javascript:;" @click="sendOrder('xinyuan')">信源</a></div>
		</div>
		<div class="center">
			<div class="confrim">
				<div class="c_up" @click="sendOrder('up')"></div>
				<div class="c_left" @click="sendOrder('left')"></div>
				<a href="javascript:;" @click="sendOrder('confrim')">确定</a>
				<div class="c_right" @click="sendOrder('right')"></div>
				<div class="c_down" @click="sendOrder('down')"></div>
			</div>
			
		</div>
		<div class="bottom">
			<div class="set"><a href="javascript:;" @click="sendOrder('back')">返回</a><span></span><a href="javascript:;" @click="sendOrder('menu')">菜单</a></div>
			<div class="power">
				<div class="power_left"></div>
				<div class="power_center" @click="sendOrder('home')"></div>
				<div class="power_right"></div>
			</div>
		</div>
		<div class="footer">
			<div class="yinliang">
				<div class="add" @click="sendOrder('voice_up')"></div><a href="javascript:;">音量</a><div class="dec" @click="sendOrder('voice_down')"></div>
			</div>
			<span></span>
			<div class="pindao">
				<div class="up" @click="sendOrder('pindao_up')"></div><a href="javascript:;" >频道</a><div class="down" @click="sendOrder('pindao_off')"></div>
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
				order:'',
				timer:'',
				ctrltype:'/run/audio/irControl',
				powerStatus:false
			}
		},
		methods:{
			mouseDown(){
				var that=this;
				this.timer=setTimeout(function(){
					if(that.ctrltype=='/run/audio/irLearn'){
						that.ctrltype='/run/audio/irControl';
						alert('退出学习状态');
						console.log('退出学习状态');
					}else{
						that.ctrltype='/run/audio/irLearn';
						alert('进入学习状态');
						console.log('进入学习状态');
					}
				},3000)
			},
			mouseUp(){
				clearTimeout(this.timer);
			},
			powerCtrl(){
				console.log(this.ctrltype);
				if(this.powerStatus){
					this.powerStatus=false;
					$.post(this.ctrltype,{did:this.tv_did,key:'on'},function(data){});
				}else{
					this.powerStatus=true;
					$.post(this.ctrltype,{did:this.tv_did,key:'off'},function(data){})
				}
			},
			sendOrder(orderType){
				$.post(this.ctrltype,{did:this.tv_did,key:orderType},function(data){

				})
			}
		},
		props:['tv_did']
	}
</script>
<style scoped>
	.tvctrl{
		position: absolute;
		top: 0;
		right: 500px;
		width: 180px;
		height: 450px;
		background-color: #2c2c2c;
		border-radius: 30px;
		z-index: 20
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
	.center{
		margin-top:35px;
	}
	.center .c_up,.center .c_down,.center .c_left,.center .c_right{
		width: 32px;
		height: 32px;
		margin: 0 auto;
	}
	.center .c_up:hover,.center .c_down:hover,.center .c_left:hover,.center .c_right:hover{
		opacity: 0.5;
		color: #0f0;
		cursor: pointer;
	}
	.center .c_up{
		background:url("../../assets/images/video/up.png") no-repeat center;
	}
	.center .c_down{
		background:url("../../assets/images/video/down.png") no-repeat center;
	}
	.center .c_left{
		display: inline-block;
		background:url("../../assets/images/video/left.png") no-repeat center;
		vertical-align: middle;
	}
	.center .c_right{
		display: inline-block;
		background:url("../../assets/images/video/right.png") no-repeat center;
		vertical-align: middle;
	}
	.center .confrim{
		width: 100%;
		height: 100px;
		text-align: center;
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