<template>
	<div id="music" class="music">
		<div class="songlist">
			<ul>
				<li v-for="(item,index) in songslist"><a href="javascript:;" :id="item.no" @click="play($event,item.no,item.name)">{{item.name}}</a></li>
			</ul>
		</div>
		<div class="player">
			<a href="javascript:;" class="btn_prev" title="上一首" @click="chagePrev"></a>
			<a href="javascript:;" v-bind:class="{btn_play:isActive,'btn_stop':!isActive}" @click="chagePlay"><span class="icon_text"></span></a>
			<a href="javascript:;" class="btn_next" title="下一首" @click="chageNext"></a>
		</div>
		<div class="player_music">
			<div class="player_music_info">
				<a href="" class="songname">歌曲名：{{songname}}</a>
				<!-- <a href="" class="singername">周杰伦</a> -->
			</div>
			<div class="player_music_time">02:48/04:16</div>
			<div class="player_progress">
				<div class="player_progress_inner" @mousedown="processLoad($event)">
					<!-- <div class="player_progress_load" style="width:100%;" @click="processLoad($event)"></div> -->
					<div class="player_progress_play" :style="{width: playwidth+'%'}">
						<i class="player_progress_dot"@mousedown="dotDown($event)"></i>
					</div>
				</div>
			</div>
		</div>
		<div v-bind:class="{player_turnvoice:isVoice,'player_mute':!isVoice}" @click="switchVoice"></div>
		<div class="player_voice">
		 	<div class="player_progress">
				<div class="player_progress_inner" @mousedown="voiceLoad($event)">
					<div class="player_progress_play" :style="{width: voicewidth+'%'}">
						<i class="player_progress_dot"@mousedown="voiceDown($event)"></i>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				isActive:true,
				playwidth: 0,
				voicewidth:0,
				timer:'',
				playmax:384,
				voicemax:84,
				songslist:'',
				isVoice:true,
				songname:''
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			chagePlay(){
				//play
				var that=this;
				if(this.isActive){
					//ajax
					this.isActive=false;
					$.post('/run/audio/playerControl',{arg:'play'},function(){})
					// function process(){
					// 	if(that.playwidth<=100){
					// 		that.playwidth+=1;
					// 	}else{
					// 		that.playwidth=0;
					// 	}
					// 	that.timer=setTimeout(process,1000);
					// }
					// process();
				}else{
					//ajax
					// clearTimeout(this.timer);
					this.isActive=true;
					$.post('/run/audio/playerControl',{arg:'pause'},function(){})
				}
			},
			chagePrev(){
				var that=this;
				$.post('/run/audio/playerControl',{arg:'last'},function(data){
					that.songname=data.song.name;
				})
			},
			chageNext(){
				var that=this;
				$.post('/run/audio/playerControl',{arg:'next'},function(data){
					that.songname=data.song.name;
				})
			},
			//点击进度条
			processLoad(e){
				e.cancelBubble = true;
				this.playwidth=Math.round(e.offsetX/400*100);

			},
			voiceLoad(e){
				e.cancelBubble = true;
				this.voicewidth=Math.round(e.offsetX/100*100);
			},
			dotDown(e){
				var e=e||window.event;
				e.cancelBubble = true;
				var dot_x=e.clientX;
				var dot_offset_left=e.target.offsetLeft;//dot距离父元素左边的距离
				var that=this;
				document.onmouseup=function(e){
					document.onmousemove=null;
					document.onmouseup=null;
				};
				document.onmousemove=function(e){
				  	var thisX=(e||window.event).clientX;
				  	var to=Math.min(that.playmax,Math.max(-2,dot_offset_left+(thisX-dot_x)));//dot距离父元素左边的距离+（document上鼠标距离左边的距离-dot距离左边的距离）
				  	that.playwidth=Math.round(to/that.playmax*100);
				 }
			},
			voiceDown(e){
				var e=e||window.event;
				e.cancelBubble = true;
				var dot_x=e.clientX;
				var dot_offset_left=e.target.offsetLeft;//dot距离父元素左边的距离
				var that=this;
				document.onmouseup=function(e){
					document.onmousemove=null;
					document.onmouseup=null;
				};
				document.onmousemove=function(e){
				  	var thisX=(e||window.event).clientX;
				  	var to=Math.min(that.voicemax,Math.max(-2,dot_offset_left+(thisX-dot_x)));//dot距离父元素左边的距离+（document上鼠标距离左边的距离-dot距离左边的距离）
				  	that.voicewidth=Math.round(to/that.voicemax*100);
				 }
			},
			init(){
				var that=this;
				$.post('/run/audio/getSongList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
					that.songslist=data.songs;
				});
			},
			//音量开关
			switchVoice(){
				if(this.isVoice){
					this.isVoice=false;
				}else{
					this.isVoice=true;
				}
			},
			//选择歌曲播放
			play(e,num,name){
				// if(this.isActive){
					this.isActive=false;
					$.post('/run/audio/selectSong',{no:num},function(data){
					})
					// $.post('/run/audio/playerControl',{arg:'play'},function(data){

					// })
				// }
				this.songname=name;
				this.playwidth=0;
			}
		},
		computed:{
			...mapGetters({
				room_id:'id',
			})
		},
		watch:{
			room_id:function(){
				this.init();
			}
		}
	}
</script>
<style scoped>
	.music{
		position: absolute;
		width: 800px;
		height: 300px;
		left: 300px;
/*		background-color: #8e8e8e;*/

	}
	.music .songlist{
		width: 300px;
		height: 200px;
		margin: 10px auto 20px;
		padding-left: 30px;
		overflow: auto;
	}
	.music .songlist li{
		/*background-color: #f00;*/
	}
	.music .songlist li a{
		text-decoration: none;
		font-size: 16px;
	}
	.player{
		position: relative;
		top:10px;
	}
	.player .btn_prev{
		position: absolute;
		left: 100px;
		width: 16px;
		height: 16px;
		background:url(../../assets/images/video/m_prev.png);
	}
	.player .btn_play{
		position: absolute;
		left: 150px;
		width: 16px;
		height: 16px;
		background:url(../../assets/images/video/m_start.png);
	}
	.player .btn_stop{
		position: absolute;
		left: 150px;
		width: 16px;
		height: 16px;
		background:url(../../assets/images/video/m_stop.png);
	}
	.player .btn_next{
		position: absolute;
		left: 200px;
		width: 16px;
		height: 16px;
		background:url(../../assets/images/video/m_next.png);
	}
	.player .btn_prev:hover,.player .btn_next:hover,.player .btn_play:hover{
		opacity: 0.7
	}
	.player_music{
		position: relative;
		bottom:16px;
		margin: 0 150px 0 250px;
		/*width: 200px;*/
	}
	.player_music_info{
		padding-right: 90px;
		margin-bottom: 10px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.player_music_time{
		position: absolute;
		top:0;
		right: 0;
	}
	.player_progress{
		padding-top:6px;
		height: 8px;
		cursor: pointer;
	}
	.player_progress_inner{
		position: relative;
		height: 2px;
		background:rgba(255,255,255,.2);
	}
	.player_progress_play{
		position: absolute;
		top:0;
		left: 0;
		height: 2px;
		background:rgba(255,255,255,1);
		/*background-color: #f00;*/
		cursor: pointer;
	}
	.player_progress_dot {
		position: absolute;
	    top: -8px;
	    right: -8px;
	    width: 16px;
	    height: 16px;
	    background:url(../../assets/images/video/m_dot.png) no-repeat center;
	    opacity: 1;
	    filter: none;
}
	.player_voice{
		position: relative;
		bottom:22px;
		margin: 0 0px 0 700px;
	}
	.player_turnvoice:hover,.player_mute:hover{
		cursor: pointer;
		opacity: 0.6
	}
	.player_turnvoice{
		position: absolute;
		bottom:40px;
		left: 670px;
		width: 16px;
		height: 16px;
		background:url(../../assets/images/video/m_voice.png) no-repeat center;
	}
	.player_mute{
		position: absolute;
		bottom:40px;
		left: 670px;
		width: 16px;
		height: 16px;
		background:url(../../assets/images/video/m_mute.png) no-repeat center;
	}
</style>