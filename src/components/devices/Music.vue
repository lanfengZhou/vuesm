<template>
	<div id="music" class="music">
		<div class="player">
			<a href="javascript:;" class="btn_prev" title="上一首"></a>
			<a href="javascript:;" v-bind:class="{btn_play:isActive,'btn_stop':!isActive}" @click="chagePlay"><span class="icon_text"></span></a>
			<a href="javascript:;" class="btn_next" title="下一首"></a>
		</div>
		<div class="player_music">
			<div class="player_music_info">
				<a href="" class="songname">告白气球</a>
				<a href="" class="singername">周杰伦</a>
			</div>
			<div class="player_music_time">02:48/04:16</div>
			<div class="player_progress">
				<div class="player_progress_inner" @click="processLoad($event)" @mousemove="processMove($event)" @mousedown="processDown($event)" @mouseup="processUp($event)">
					<!-- <div class="player_progress_load" style="width:100%;" @click="processLoad($event)"></div> -->
					<div class="player_progress_play" :style="{width: playwidth+'%'}">
						<i class="player_progress_dot" @click="dotClick" @mousedown="dotDown($event)" @mouseup="dotUp" @mousemove="dotMove($event)"></i>
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default{
		data(){
			return {
				isActive:true,
				playwidth: 0,
				timer:'',
				dotflag:false
			}
		},
		methods:{
			chagePlay(){
				//play
				var that=this;
				if(this.isActive){
					//ajax
					this.isActive=false;
					function process(){
						if(that.playwidth<=100){
							that.playwidth+=1;
						}else{
							that.playwidth=0;
						}
						that.timer=setTimeout(process,1000);
					}
					process();
				}else{
					//ajax
					clearTimeout(this.timer);
					this.isActive=true;
				}
			},
			//点击进度条
			processLoad(e){
				// console.log(parseInt(e.offsetX/400*100));
				this.dotflag=false;
				this.playwidth=parseInt(e.offsetX/400*100);
			},
			dotClick(){

			},
			dotDown(e){
				this.dotflag=true;
				var e=e||window.event;
				var x=e.clientX;
				var offset_left=e.target.offsetLeft;
				console.log(x+','+offset_left);
			},
			dotUp(){
				this.dotflag=false;
			},
			dotMove(e){
				if(!!this.dotflag){
					// console.log(e.offsetWidth);
					// this.playwidth=this.playwidth+parseInt(e.offsetLeft/400*100);
				}
			},
			processDown(e){
				this.dotflag=true;
			},
			processMove(e){
				if(!!this.dotflag){
					if(this.playwidth<=100){
							this.playwidth=parseInt(e.offsetX/400*100);
						}else{
							this.playwidth=100;
					}
				}
			},
			processUp(e){
				this.dotflag=false;
			}
		},
		computed:{

		},
		mounted(){
			var that=this;
			 document.addEventListener('mouseup',function(){
			 	that.dotflag=false;
			 })
			 document.addEventListener('mousedown',function(){
			 	that.dotflag=true;
			 })
			 document.addEventListener('mousemove',function(e){
				if(!!that.dotflag){
				  	var thisX=(e||window.event).clientX;
				  	console.log(thisX);
				}
			 // 	if(!!that.dotflag){
				// 	if(that.playwidth<=100){
				// 			that.playwidth=parseInt(e.offsetX/400*100);
				// 		}else{
				// 			that.playwidth=100;
				// 	}
				// }
			 })
		}
	}
</script>
<style scoped>
	.music{
		position: relative;
		width: 800px;
		height: 300px;
/*		background-color: #8e8e8e;*/

	}
	.player .btn_prev{
		position: absolute;
		top:15px;
		left: 20px;
		width: 16px;
		height: 16px;
		background:url(../../assets/images/video/m_prev.png);
	}
	.player .btn_play{
		position: absolute;
		top:15px;
		left: 70px;
		width: 16px;
		height: 16px;
		background:url(../../assets/images/video/m_start.png);
	}
	.player .btn_stop{
		position: absolute;
		top:15px;
		left: 70px;
		width: 16px;
		height: 16px;
		background:url(../../assets/images/video/m_stop.png);
	}
	.player .btn_next{
		position: absolute;
		top:15px;
		left: 120px;
		width: 16px;
		height: 16px;
		background:url(../../assets/images/video/m_next.png);
	}
	.player .btn_prev:hover,.player .btn_next:hover,.player .btn_play:hover{
		opacity: 0.7
	}
	.player_music{
		position: relative;
		margin: 0 200px 0 200px;
		/*width: 200px;*/
	}
	.player_music .player_music_info{
		padding-right: 90px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.player_music .player_music_time{
		position: absolute;
		top:0;
		right: 0;
	}
	.player_music .player_progress{
		padding-top:6px;
		height: 8px;
		cursor: pointer;
	}
	.player_music .player_progress_inner{
		position: relative;
		height: 2px;
		background:rgba(255,255,255,.2);
	}
	.player_music .player_progress_play{
		position: absolute;
		top:0;
		left: 0;
		height: 2px;
		background:rgba(255,255,255,1);
		/*background-color: #f00;*/
		cursor: pointer;
	}
	.player_music .player_progress_dot {
		position: absolute;
	    top: -8px;
	    right: -8px;
	    width: 16px;
	    height: 16px;
	    background:url(../../assets/images/video/m_dot.png) no-repeat center;
	    opacity: 1;
	    filter: none;
}
</style>