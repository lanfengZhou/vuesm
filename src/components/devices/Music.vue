<template>
	<div id="music" class="music">
		<div class="songlist">
			<ul>
				<li v-for="(item,index) in songslist"><a href="javascript:;" :id="item.no" @click="play($event,item.no,item.name,item.singer)">{{item.name}}</a></li>
			</ul>
		</div>
		<div class="playerorder">
			<a href="javascript:;" v-bind:class="playorder" :title="ordername" @click=playOrder></a>
		</div>
		<div class="player">
			<a href="javascript:;" class="btn_prev" title="上一首" @click="chagePrev"></a>
			<a href="javascript:;" v-bind:class="{btn_play:isActive,'btn_stop':!isActive}" @click="chagePlay"><span class="icon_text"></span></a>
			<a href="javascript:;" class="btn_next" title="下一首" @click="chageNext"></a>
		</div>
		<div class="player_music">
			<div class="player_music_info">
				<a href="javascript:;" class="songname">{{songname}}</a>
			</div>
			<div class="player_music_time">{{currenttime}}/{{songtime}}</div>
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
				isActive:'',
				playwidth: 0,
				voicewidth:0,
				timer:'',
				playmax:384,
				voicemax:84,
				songslist:'',
				isVoice:true,
				songname:'',
				songtime:'',
				currenttime:'00:00',
				playorder:'',
				ordername:''
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
					$.post('/run/audio/playerControl',{arg:'pause'},function(){});
				}else{
					//ajax
					this.isActive=true;
					$.post('/run/audio/playerControl',{arg:'play'},function(){})
				}
			},
			//上一首
			chagePrev(){
				var that=this;
				this.isActive=false;
				$.post('/run/audio/playerControl',{arg:'last'},function(data){
					that.songname=data.song.name+'/'+data.song.singer;
					that.songtime=that.timeShift(data.song.duration);
					that.currenttime=that.timeShift(data.song.process/100*data.song.duration);
					that.playwidth=0;
					that.isActive=true;
				})
			},
			//下一首
			chageNext(){
				var that=this;
				this.isActive=false;
				$.post('/run/audio/playerControl',{arg:'next'},function(data){
					that.songname=data.song.name+'/'+data.song.singer;
					that.songtime=that.timeShift(data.song.duration);
					that.currenttime=that.timeShift(data.song.process/100*data.song.duration);
					that.playwidth=0;
					that.isActive=true;
				})
			},
			//点击进度条
			processLoad(e){
				e.cancelBubble = true;
				var that=this;
				this.playwidth=Math.round(e.offsetX/400*100);
				var duration=that.unShift(that.songtime);
				// clearInterval(this.timer);
				that.currenttime=that.timeShift(duration*that.playwidth/100);
				$.post('/run/audio/playerControl',{arg:'process',process:that.playwidth},function(data){})
				// $.post('/run/audio/playerControl',{arg:'process',process:this.playwidth},function(data){});

			},
			voiceLoad(e){
				e.cancelBubble = true;
				this.voicewidth=Math.round(e.offsetX/100*100);
				$.post('/run/audio/playerVoice',{voiceValue:this.voicewidth},function(data){})
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
					// clearInterval(that.timer);
					var duration=that.unShift(that.songtime);
					that.currenttime=that.timeShift(duration*that.playwidth/100);
					$.post('/run/audio/playerControl',{arg:'process',process:that.playwidth},function(data){})
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
					$.post('/run/audio/playerVoice',{voiceValue:that.voicewidth},function(data){})
				};
				document.onmousemove=function(e){
				  	var thisX=(e||window.event).clientX;
				  	var to=Math.min(that.voicemax,Math.max(-2,dot_offset_left+(thisX-dot_x)));//dot距离父元素左边的距离+（document上鼠标距离左边的距离-dot距离左边的距离）
				  	that.voicewidth=Math.round(to/that.voicemax*100);
				 }
			},
			//初始化
			init(){
				var that=this;
				clearInterval(this.timer);
				$.post('/run/audio/getSongList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
					that.songslist=data.songs;
					that.playorder=data.order.toLocaleLowerCase();
						// if(data.currentSong.state=='play'){
						// 	that.isActive=false;
						// 	that.isActive=true;
						// }
						that.isActive=data.currentSong.state=='play'?true:false;
						that.songname=data.currentSong.name+'/'+data.currentSong.singer;
						that.voicewidth=data.currentSong.volume;
						that.playwidth=data.currentSong.process;
						that.songtime=that.timeShift(data.currentSong.duration);
						that.currenttime=that.timeShift(data.currentSong.process/100*data.currentSong.duration);
				});
			},
			//音量开关
			switchVoice() {
				if(this.isVoice){
					this.isVoice=false;
					$.post('/run/audio/playerVoice',{voiceValue:0},function(data){})
				}else{
					this.isVoice=true;
					$.post('/run/audio/playerVoice',{voiceValue:this.voicewidth},function(data){})
				}
			},
			//选择歌曲播放
			play (e,num,name,singer) {
					var that=this;
					this.isActive=false;
					this.isActive=true;
					$.post('/run/audio/selectSong',{no:num},function(data){
						that.songtime=that.timeShift(data.song.duration);
					})
				this.songname=name+'/'+singer;
				this.currenttime="00:00";
				this.playwidth=0;
			},
			//歌曲播放顺序,单曲/顺序/随机
			playOrder(){
				if(this.playorder=='random'){
					this.playorder='single';
				}else if(this.playorder=='single'){
					this.playorder='order';
				}else if(this.playorder=='order'){
					this.playorder='random';
				}

			},
			//时间转换
			timeShift(time){
				var minute=parseInt(time/60);
				var second=parseInt(time%60);
				return (minute>=10?minute:'0'+minute)+':'+(second>=10?second:'0'+second);
			},
			unShift(time){
				var duration=time.match(/(\d+):(\d+)/g);
				return parseInt(RegExp.$1*60)+parseInt(RegExp.$2);
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
			},
			playorder:function(){
				if(this.playorder=='order'){
					this.ordername="顺序播放"
				}else if(this.playorder=='single'){
					this.ordername="单曲循环"
				}else{
					this.ordername="随机播放"
				}
				$.post('/run/audio/playOrder',{order:this.playorder.toLocaleUpperCase()},function(){})
			},
			isActive:function(){
				// console.log()
				var that=this;
				clearInterval(this.timer);
				if(this.isActive){
					//歌曲总时长
					var duration=this.unShift(this.songtime);
					function process(){
						if(that.playwidth<100){
							// var prewidth=parseFloat((100/duration).toFixed(1));;
							var ctime=that.unShift(that.currenttime)+1;
							if(ctime>=duration){
								ctime=duration;
							}
							that.currenttime=that.timeShift(ctime);
							that.playwidth=parseInt(ctime/duration*100);
							// that.playwidth+=prewidth;
							// that.currenttime=that.timeShift(that.playwidth/100*duration);
						}else{
						}
					}
					this.timer=setInterval(process,1000);
				}else{
					clearInterval(this.timer);
					// clearTimeout(this.timer);
				}
			},
			playwidth:function(){
				var that=this;
				if(this.playwidth>=100){
					clearInterval(that.timer);
					this.isActive=false;
					function nextplay(){
						$.post('/run/audio/playerControl',{arg:'play'},function(data){
							if(data.song.process>10){
								setTimeout(nextplay,2000);
							}else{
								that.isActive=true;
								that.playwidth=data.song.process;
								that.songtime=that.timeShift(data.song.duration);
								that.currenttime=that.timeShift(data.song.process/100*data.song.duration);
								that.songname=data.song.name+'/'+data.song.singer;
							}
							
						})
					}
					setTimeout(nextplay,2000);
					
				}
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
	.playerorder{
		position: relative;
		top:10px;
	}
	.playerorder .order{
		position: absolute;
		left: 50px;
		width: 20px;
		height: 16px;
		background:url(../../assets/images/video/m_order.png) no-repeat center;
	}
	.playerorder .single{
		position: absolute;
		left: 50px;
		width: 20px;
		height: 16px;
		background:url(../../assets/images/video/m_single.png) no-repeat center;
	}
	.playerorder .random{
		position: absolute;
		left: 50px;
		width: 20px;
		height: 16px;
		background:url(../../assets/images/video/m_random.png) no-repeat center;
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