<template>
	<div id="env" class="env">
		<v-dheader class="dhead"></v-dheader>
		<div class="content">
			<ul>
				<li v-for="(item,index) in envlist">
					<p>{{item.name}}</p>
					<img :src="item.url" :id="item.did" :name="item.name" :value="item.unit"@click="queryHis($event)" title="点击查询历史数据">
					<p>{{item.value}}/{{item.unit}}</p>
				</li>
			</ul>
		</div>
		<div id="dataHisChart"></div>
	</div>
</template>

<script>
	import echarts from '../../static/js/echarts'
	import Dheader from '../components/devices/Dheader'
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				envlist:'',
				tempurl:require('../assets/images/temp.png'),
				humiurl:require('../assets/images/humi.png'),
				lighturl:require('../assets/images/light.png'),
				pm25url:require('../assets/images/pm2.5.png'),
				hchourl:require('../assets/images/hcho.png'),
				show:false,
				mychart:'',
				option:{
	                backgroundColor:'rgba(255, 255, 255, 1)',
	                title: {
	                    text: '历史数据',
	                },
	                tooltip: {
	                    trigger: 'axis'//触发类型
	                },
	                xAxis: {
	                    // type:'time',
	                    name:"时间/h",
	                    // data: data.times,
	                },
	                yAxis: {
	                    name:"/值",
	                    splitLine: {//坐标轴在图标中的分割线
	                        show: false
	                    }
	                },
	                toolbox: {//工具栏
	                    left: 'center',
	                    feature: {
	                        dataZoom: {
	                            yAxisIndex: 'none'
	                        },
	                        restore: {},
	                        saveAsImage: {},
	                        magicType: {
								type: ['line', 'bar']
							}
	                    }
	                },
	                dataZoom: [{//用于区域缩放
	                    // startValue:data.times[0],
	                }, {
	                    type: 'inside'
	                }],
	                series: [
	                    {
	                        // name: $.trim(data.data1.name+'/'+data.data1.unit),
	                        type: 'line',
	                        // data: data.data1.values,
	                        markLine: {//图表标线
	                            silent: true,
	                            data: [{
	                                yAxis: 50
	                            }, {
	                                yAxis: 100
	                            }, {
	                                yAxis: 150
	                            }, {
	                                yAxis: 200
	                            }, {
	                                yAxis: 300
	                            }]
	                        }
	                    },
	                ],
	            }
			}
		},
		mounted(){
			if(!!this.room_id){
				this.init();
			}
		    
		},
		components:{
			"v-dheader":Dheader
		},
		computed:{
			...mapGetters({
				room_id:'id',
			})
		},
		methods:{
			init(){
				var that=this;
				$.post('/run/evn/getSensorStates',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
					data.numSensors.forEach(function(item,index,arr){
						if(item.unit==='℃'){
							item.url=that.tempurl;
						}else if(item.unit==='%'){
							item.url=that.humiurl;
						}else if(item.unit==='lux'){
							item.url=that.lighturl;
						}else if(item.unit==='ug/m3'){
							item.url=that.pm25url;
						}
						else{
							item.url=that.hchourl;
						}
					})
					that.envlist=data.numSensors;
					console.log(that.envlist);
				});
		    this.mychart=echarts.init(document.getElementById('dataHisChart'));;
            this.mychart.setOption(this.option, true);
			},
			queryHis(e){
				// this.show=true;
				var that=this;
				var options=this.option;
				var ele=e.target;
				var did=ele.getAttribute('id');
				var name=ele.getAttribute('name');
				var unit=ele.getAttribute('value');
				this.option.title.text=name+'历史数据';
				this.option.series[0].name=name+'/'+unit;
				this.mychart.setOption(this.option, true);
				$.post('/run/evn/getHisdata',{did:did},function(data){
					var xdata=[];
					var ydata=[];
					data.hisdata.forEach(function(item,index,arr){
						xdata.push(item.insertTime);
						ydata.push(item.data)
					});
					// console.log(xdata);
					options.xAxis.data=xdata;
					options.dataZoom.startValue=data.hisdata[0].insertTime;
					options.series[0].data=ydata;
					that.mychart.setOption(that.option, true);
				})
				
			}
		},
		watch:{
			room_id:function(){
					this.init();
			},
			show:function(){
				// if(this.show)
			}
		}
	}
</script>
<style scoped>
	.env{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 20;
	}
	#dataHisChart{
		position: relative;
		top:60px;
		left: 260px;
		width: 800px;
		/*margin:0 100px;*/
		height: 400px;
		border-radius: 10px;
	}
	.env .dhead{
		margin-left: -213px;
	}
	.env .content{
		position: relative;
		top:60px;
		left: 200px;
		width: 100%;
		/*background-color: #f00;
		margin:0 auto;*/
	}
	.env .content li{
		display: inline-block;
		text-align: center;
		font-family: "宋体";
		font-size: 16px;
		margin-left: 100px;
	}
	.env .content li img{
		cursor: pointer;
	}
	.env .content li img:hover{
		opacity: 0.6
	}
</style>
