<template>
	<div id="tvcontrol" class="tvctrl">
		<div class="top">
			<div class="power">
				<div class="power_center" @mousedown='mouseDown' @mouseup='mouseUp' @click="powerCtrl"></div>
			</div>
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
			<div class="power">
				<div class="power_left" @click="sendOrder('home')"></div>
				<div class="power_center" @click="sendOrder('back')"></div>
				<div class="power_right" @click="sendOrder('set')"></div>
			</div>
		</div>
		<div class="footer">
			<div class="yinliang">
				<div class="add" @click="sendOrder('add')"></div><a href="javascript:;"></a><div class="dec" @click="sendOrder('dec')"></div>
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
					$.post(this.ctrltype,{did:this.topbox_did,key:'on'},function(data){});
				}else{
					this.powerStatus=true;
					$.post(this.ctrltype,{did:this.topbox_did,key:'off'},function(data){})
				}
			},
			sendOrder(orderType){
				$.post(this.ctrltype,{did:this.topbox_did,key:orderType},function(data){

				})
			}
		},
		props:['topbox_did']
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
		z-index: 20
	}
	.tvctrl .top{
		width: 100%;
		height: 50px;
		/*border-bottom: 4px solid #000;*/
	}
	.power{
		width: 100%;
		/*background-color: #f00;*/
		/*text-align: center;*/
		margin-top: 15px;
		height: 55px;
		overflow: hidden;
	}
	.power .power_center,.power .power_center,.power .power_left,.power .power_right{
		width: 36px;
		height: 36px;
		border-radius: 50% 50%;
		border: 2px solid #000;
		margin-left: 18px;
		margin-top: 15px;
		float: left;
	}
	.top .power .power_center{
		background:url('../../assets/images/video/off2.png') no-repeat center;
	}
	.bottom .power .power_center{
		background:url('../../assets/images/video/back.png') no-repeat center;
	}	
	.bottom .power .power_left{
		background:url('../../assets/images/video/home.png') no-repeat center;
	}
	.bottom .power .power_right{
		background:url('../../assets/images/video/menu.png') no-repeat center;
	}	
	.power .power_center:hover,.center .confrim a:hover,.set a:hover,.add:hover, .dec:hover, .up:hover, .down:hover,.power_left:hover,.power_right:hover{
		opacity: 0.5;
		color: #0f0;
		cursor: pointer;
	}
	.center{
		margin-top:10px;
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
		width: 30px;
		height: 100px;
		/*margin-top: 20px;*/
		text-align: center;
		margin: 20px auto;
		border: 2px solid #000;
		border-radius: 10px;
		/*background-color: #f00;*/
	}
	.footer .yinliang{
		display: inline-block;
		text-align: center;
	}
	.footer a{
		color: #fff;
		text-decoration: none;
	}
	.footer .yinliang .add,.footer .yinliang .dec{
		width: 16px;
		height: 16px;
		/*margin-left: 5px;*/
		/*margin-top:50px;*/
		cursor: pointer;
	}
	.footer .yinliang .add{
		margin-top: 18px;
		background: url("../../assets/images/video/add.png");
	}
	.footer .yinliang .dec{
		margin-top: 30px;
		background: url("../../assets/images/video/dec.png");
	}			
</style>