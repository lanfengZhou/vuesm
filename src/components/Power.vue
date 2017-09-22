<template>
  <div id="env" class="en">
    <v-dheader class="dhead"></v-dheader>
    <div class="content">
      <ul>
        <li v-for="(item,index) in powerList">
          <p><strong>{{item.name}}</strong></p>
          <img  :src='powerurl' title="点击查询历史数据" v-bind:class="{active:isActive==index}" class="power-img " :id="item.did" :name="item.name" @click="searchShow($event,index)">
          <p>总电量：{{item.total}}/kWh</p>
          <span class="label label-primary" >当前功率：{{item.realtimePower}}</span>
          <span class="label label-info" >当前电量：{{item.powerOfThisMouth}}</span>
        </li>
      </ul>
    </div>
    <div class="row my-row"  v-if="show">
      <div class="row">
        <div class="col-xs-3">
          <div class="input-group">
            <span class="input-group-btn">
             <button class="btn btn-default" type="button">开始时间</button>
            </span>
            <input type="date" class="form-control pull-left" v-model="startTime">
          </div>
        </div>
        <div class="col-xs-3">
          <div class="input-group">
            <span class="input-group-btn">
             <button class="btn btn-default" type="button">结束时间</button>
            </span>
            <input type="date" class="form-control pull-left" v-model="endTime">
          </div>
        </div>
        <div class="col-xs-2">
          <div class="input-group">
            <div class="input-group-btn">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>
              <ul class="dropdown-menu second-dropdown">
                <li ><a href="年" date-val="year" v-on:click.prevent="dateType($event)">年</a></li>
                <li><a href="月" date-val="mouth" v-on:click.prevent="dateType($event)">月</a></li>
                <li><a href="日" date-val="day"  v-on:click.prevent="dateType($event)">日</a></li>
              </ul>
            </div>
            <input type="text" class="form-control second-drop-val" v-model="date" placeholder="选择" >
          </div>
        </div>
        <div class="col-xs-1">
          <button class="btn btn-success" @click="searchHis"><span class="glyphicon glyphicon-search"></span>查询</button>
        </div>
      </div>
    </div>
    <div id="dataHisChart" ></div>
  </div>
</template>

<script type="es6">
  import echarts from '../../static/js/echarts'
  import Dheader from '../components/devices/Dheader'
  import {mapGetters,mapActions} from 'vuex'
  export default{
    data(){
      return {
        Datalist:[],
        powerDid:[],
        isActive:-1,
        powerList:'',
        startTime:'',
        endTime:'',
        date:'',
        powerdid:'',
        timeType:'',
        powerurl:require('../assets/images/power.png'),
        show:true,
        powerhis:'',
        mychart:'',
        powerName:'',
        option:{
          backgroundColor:'rgba(255, 255, 255,0.7)',
          title: {
            text: '485电表数据'//subtext: '485电表'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['用电量']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [{//用于区域缩放
            // startValue:data.times[0],
          }, {
            type: 'inside'
          }],
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} kWh'
            }
          },
          series: [
            {
              name:'用电量',
              type:'bar',
              data:[],
              barWidth:'13%',
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]

              }
            }

          ]
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
      room_id:'id'
    })
  },
  methods:{
    init(){
      var that=this;
      console.log(sessionStorage.buildID,this.room_id);
      $.post('/run/power/getAmmeterList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(d){
        if(d.success){
          d.ammeters.forEach(function(item,index,arr){
            that.getPower('/run/power/getRealtimePower',item,index);
            that.getBattery('/run/power/getPowerOfThisMouth',item,index);
          });
          that.powerList=d.ammeters;
          that.myChartInit();
        }
      })
    },
    //实时更新
    getPower(path,item,index){
      var that=this;
        $.post(path,{did:item.did},function(d){
          that.powerList[index].realtimePower=d.realtimePower;
        })
    },
    getBattery(path,item,index){
      var that=this;
      $.post(path,{did:item.did},function(d){
        that.powerList[index].powerOfThisMouth=d.powerOfThisMouth;
      })
    },
    //选择查询类型
    dateType(e){
      var ele=e.target;
      var name=ele.getAttribute('href');
      var type=ele.getAttribute('date-val');
      this.timeType=type;
      this.date=name;
    },
    searchShow(e,index){
      var that=this;
      var el=e.target;
      var did=el.getAttribute('id');
      that.powerName= el.getAttribute('name');
      that.powerdid=did;
      that.isActive=index;
      that.option.title.text=that.powerName+"历史数据";
      that.option.series[0].name=that.powerName;
      that.option.legend.data[0]=that.powerName;
      that.myChartInit();
    },
    searchHis(){
      var that=this;
      var xdata=[];
      var ydata=[];
      if(that.endTime>that.startTime){
        $.post('/run/power/getHisdata',{did:that.powerdid,startTime:that.startTime,endTime:that.endTime,timeType:that.timeType},function(d){
          if(d.success){
            console.log(d);
            var history=d.hisdata;
            $.each(history,function(key,item){
              xdata.push(item.time);
              ydata.push(item.data);
            })
            that.option.xAxis.data=xdata;
            that.option.series[0].data=ydata;
            that.myChartInit();
          }
        })
      }else{
        alert('请选择正确的时间区间');
      }
    },
    //初始化数据表
    myChartInit(){
      var that=this;
      var chartsbox=document.getElementById('dataHisChart');
      that.mychart=echarts.init(chartsbox);
      that.mychart.setOption(that.option, true);
    }
  },
  watch:{
    room_id:function(){
      this.init();
    }
  }
  }
</script>
<style scoped>
  .en{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 20;

  }
  #dataHisChart{
    position:absolute;
    left:50%;
    top:50%;
    width: 790px;
    height: 400px;
    transform: translate(-42%,-50%);
    border-radius: 10px;
  }
  .en .dhead{
    margin-left: -213px;
  }
  .en .content{
    position: relative;
    width: 200px;
    top:60px;
    left:50px;
    width: 100%;

  }
  .en .content>ul>li{
    list-style: none;
    width: 200px;
    margin-top: 5px;
    text-align: center;
    font-family: "宋体";
    text-align: center;
    font-size: 16px;

  }
  .en .content li img{
    cursor: pointer;
  }
  .en .content li img:hover{
    opacity: 0.6
  }
  .fade-enter-active {
    transition: all .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: rotate( -60deg ) translateX( 400px );
  }

  .power-img{
    width: 60px;
  }
  .my-row{
    position: absolute;
    width: 1000px;
    left:28%;
    top: 10px;
    z-index: 100;
  }

  .outputPower{
    position: absolute;
    width: 100px;
    height: 50px;
    background-color: #ddd;
  }

  .active{
    background-color:rgba(180,180,114,0.6);
  }
</style>
