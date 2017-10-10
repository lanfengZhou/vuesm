<template>
<div class="box">
    <v-dheader class="dhead"></v-dheader>
    <div class="addsence"><a href="javascript:;" @click="add"><span class="glyphicon glyphicon-plus"></span>情景模式</a></div>
    <div :class="{overlay:addisActive,overlays:!addisActive}">
    	<!-- <div class=""></div> -->
    	<form class="form-horizontal modelForm">
		  <div class="form-group">
		    <label for="senceName" class="col-sm-offset-2 col-sm-2 control-label">情景名称</label>
		    <div class="col-sm-4">
		      <input type="text" class="form-control" placeholder="情景名称" v-model="senceName">
		    </div>
		  </div>
		  <div class="form-group">
		  	<div class="col-sm-4 col-sm-offset-4">
		  		<p>(以下请依次选择所要添加的控制类型，控制设备，控制状态)</p>
		  	</div>
		  	<div class="col-sm-4 addInfo-add">
		    	<span class="glyphicon glyphicon-plus" @click="addContent" title="添加内容"></span>
				<span class="glyphicon glyphicon-minus" @click="delContent" title="删除内容"></span>
		    </div>
		  </div>
		  <!-- 添加内容 -->
		  <div class="form-group" v-for="(item,index) in contents">
		    <label class="col-sm-offset-2 col-sm-2 control-label">内容{{index+1}}</label>
		    <div class="col-sm-2">
		      <select type="text" class="form-control" v-model='selected[index]' @change="ctrlType($event,selected[index])">
		      	<option value="null">请选择控制类型</option>
		      	<option value="light">灯光</option>
		      	<option value="curtain">窗帘</option>
		      	<option value="plugbase">插座</option>
		      	<option value="music">音乐</option>
		      	<option value="air">空调</option>
		      </select>
		    </div>
		    <div class="col-sm-2" v-if="selected[index]!=='music'">
		      <select type="text" class="form-control" v-model='dev_selected[index]' @change="ctrlDev($event)">
		      	<option value="null">请选择控制设备</option>
		      	<option v-for="item in devlist[selected[index]]" :value="item.did">{{item.name}}</option>
		      </select>
		    </div>
		    <div class="col-sm-3" v-if="selected[index]=='light'||selected[index]=='curtain'||selected[index]=='plugbase'">
		      <div class="radio">
				  <label><input type="radio" :name="index" value="on" v-model="picked[index]">打开</label>
				  <label><input type="radio" :name="index" value="off" v-model="picked[index]">关闭</label>
			  </div>
		    </div>
		    <div class="col-sm-3" v-else-if="selected[index]=='music'">
		      <div class="radio">
				  <label><input type="radio" :name="index" value="start" v-model="picked[index]">打开</label>
				  <label><input type="radio" :name="index" value="stop" v-model="picked[index]">关闭</label>
			  </div>
		    </div>
		    <div class="col-sm-offset-4 col-sm-6" v-else-if="selected[index]=='air'">
		      <div class="col-sm-2">
		      	电源：
				  <label><input type="radio" :name="index" value="open" v-model="picked[index]">打开</label>
				  <label><input type="radio" :name="index" value="close" v-model="picked[index]">关闭</label>
			  </div>
			  <div class="col-sm-2">
			  	模式：
				  <select type="text" class="form-control" v-model="model[index]">
			      	<option value="cold">制冷</option>
			      	<option value="hot">制热</option>
		      	  </select>
			  </div>
			  <div class="col-sm-2">
			 	温度：
				  <select type="text" class="form-control" v-model="temp[index]">
			      	<option value="16">16</option>
			      	<option value="17">17</option>
			      	<option value="18">18</option>
			      	<option value="19">19</option>
			      	<option value="20">20</option>
			      	<option value="21">21</option>
			      	<option value="22">22</option>
			      	<option value="23">23</option>
			      	<option value="24">24</option>
			      	<option value="25">25</option>
			      	<option value="26">26</option>
			      	<option value="27">27</option>
			      	<option value="28">28</option>
			      	<option value="29">29</option>
			      	<option value="30">30</option>
		      	  </select>
			  </div>
			 </div>
		  </div> 
		  <div class="form-group">
		    <div class="col-sm-10 col-sm-offset-4">
		      <button type="button" class="btn btn-primary col-sm-1" @click="submit">提交</button>
		      <button type="button" class="btn btn-primary col-sm-1 col-sm-offset-2" @click="cancle">取消</button>
		    </div>
		  </div>
		</form>
        <div class="addInfo-close" @click="close">x</div>
    </div>
    <!-- 情景模式表格 -->
    <div class="table-responsive table-box">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th width="10%">编号</th>
                    <th width="20%">情景名称</th>
                    <th width="50%">情景内容</th>
                    <th width="20%">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in tableList">
                    <td >{{data.num}}</td>
                    <td >{{data.author}}</td>
                    <td >{{data.contents}}</td>
                    <td ><button type="button" class="btn btn-success">执行</button>  <button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4">
                        <div class="pull-left">
                            <button class="btn btn-default" @click="refresh">刷新</button>
                        </div>
                        <div class="pull-right">
                            <boot-page :async="false" :data="lists" :lens="lenArr" :page-len="pageLen" :param="room_id" v-on:resData="getData"></boot-page>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
        </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import bootPage from '../components/Bootpage'
import Dheader from '../components/devices/Dheader'
export default {
    data () {
        return {
        	senceName:'',
        	devlist:{'light':'','curtain':'','plugbase':'','air':'','music':''},//设备列表
        	devtype:'',
        	show:false,
        	selected:['null'],//类型
        	dev_selected:['null'],//设备ID
        	picked:[],//状态
        	model:[],
        	temp:[],
            addisActive:false,
            contents:[1],
            lenArr: [5, 10, 20], // 每页显示长度设置
            pageLen: 5, // 可显示的分页数
            // url: '/bootpage/', // 请求路径
            param: {}, // 传递参数
            lists: [
                {num: 1, author: '离家模式', contents: 'BootPage是一款支持静态数据和服务器数据的表格分页组件', remark: 'dsds'},
                {num: 2, author: '回家模式', contents: '支持调整每页显示行数和页码显示个数，样式基于bootstrap', remark: 'dsds'},
                {num: 3, author: '自定义模式', contents: '<boot-page>标签中async指是否从服务器端获取数据，false为否', remark: 'dsds'},
                {num: 4, author: 'luozh', contents: 'data为静态的表格数据数组；', remark: 'dsds'},
                {num: 5, author: 'luozh', contents: 'lens为每页显示行数的数组', remark: 'dsds'},
                {num: 6, author: 'luozh', contents: 'page-len为可显示的页码数', remark: 'dsds'},
                {num: 7, author: 'luozh', contents: '服务器回传参数为{data:[], page_num: 6}, 其中data为表格数据，page_num为总页数', remark: 'dsds'},
                {num: 8, author: 'luozh', contents: '可以调用this.$refs.page.refresh()刷新表格数据', remark: 'dsds'},
                {num: 1, author: 'luozh', contents: 'BootPage是一款支持静态数据和服务器数据的表格分页组件', remark: 'dsds'},
                {num: 2, author: 'luozh', contents: '支持调整每页显示行数和页码显示个数，样式基于bootstrap', remark: 'dsds'}
            ], // 表格原始数据
            tableList: [] // 分页组件传回的分页后数据
        }
    },
    components: {
        bootPage,
        "v-dheader":Dheader
    },
    computed:{
		...mapGetters({
				room_id:'id',
			})
    },
    methods: {
        refresh () {
            this.$refs.page.refresh()
        },
        getData(datas){
            // console.log(datas);
            this.tableList=datas;
        },
        add(){
            this.addisActive=true;
        },
        close(){
            this.addisActive=false;
            this.selected=['null'];
            this.contents=[1];
            
        },
        //添加情景模式内容
        addContent(){
        	this.contents.push(0);
        	this.selected.push('null');
        	this.dev_selected.push('null');
        },
        delContent(){
        	this.contents.pop();
        	this.selected.pop();
        	this.dev_selected.pop();
        },
        //选择控制类型
       ctrlType(e,type){
       	// console.log(type);
        	var that=this;
        	// var ele=e.target;
        	// var index = ele.selectedIndex; // 选中索引
        	// var type = ele.options[index].value;
        	switch(type){
        		case 'light':
        			$.post('/run/light/getLightList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
	    					that.devlist[type]=data.lights;
	    					// that.devtype=type;
	    					// console.log(that.devlist);
	    			});
	    			break;
	    		case 'curtain':
	    			$.post('/run/curtain/getCurtainList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
	    					that.devlist[type]=data.curtains;
	    			});
	    			break;
	    		case 'plugbase':
	    			$.post('/run/envControl/getPlugList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
	    					that.devlist[type]=data.plugbases;
	    			});
	    			break;
	    		case 'music':
	    			// $.post('/run/envControl/getPlugList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
	    					that.devlist[type]='播放';
	    					// that.devtype=type;
	    					// console.log(that.devlist);
	    			// });
	    			break;
	    		case 'air':
	    			$.post('/run/envControl/getAirList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
	    					that.devlist[type]=data.airConditioners;
	    			});
	    			break;
        	}
        	
        },
        ctrlDev(e){
        	// console.log(this.dev_selected)
        },
        //提交表单
        submit(){
        	// console.log("111");
        	var actions='';
        	var that=this;
        	this.selected.forEach(function(item,idx,arr){
        		if(item=='air'){
        			actions+='{\"type\":\"'+item+'\",\"devID\":\"'+that.dev_selected[idx]+'\",\"power\":\"'+that.picked[idx]+'\",\"model\":\"'+that.model[idx]+'\",\"temp\":\"'+that.temp[idx]+'\"},';
        		}else{
        			actions+='{\"type\":\"'+item+'\",\"devID\":\"'+that.dev_selected[idx]+'\",\"tarState\":\"'+that.picked[idx]+'\"},';
        		}
        		
        	});
        	if(this.selected.indexOf('null')!==-1){
        		alert('请完成表单！！！');
        	}else{
        		$.post('/run/scene/add',{scene_name:this.senceName,actions:'['+actions+']',room_id:this.room_id},function(data){
        		if(data.result=='ok'){
        			that.cancle();
        		}
        		
        	});
        	}
        	
        	console.log(this.selected);
        	console.log(this.dev_selected);
        	console.log(this.picked);
        },
        cancle(){
        	this.addisActive=false;
            this.selected=['null'];
            this.contents=[1];
        }
    },
    watch:{
    	// selected:function(){
    	// 	console.log(this.selected);
    	// 	var that=this;
    	// 	switch(this.selected){
    	// 		case 'light':
    	// 			$.post('/run/light/getLightList',{building_id:sessionStorage.buildID,room_id:this.room_id},function(data){
    	// 				that.devlist=data.lights;
    	// 				that.show=true;
    	// 			})
    	// 	}
    		
    	// }
    }
}
</script>

<style scoped>
    .box {
       position: fixed;
       padding-bottom:50px;
       width: 100%;
       height: 100%;
       overflow-y: auto;
    }
    .dhead{
        margin-left: -213px;
    }
    .table-hover{
       color: #e8e8e8;
    }
    .overlay{
        position: fixed;
        width: 100%;
        height: 100%;
        background:rgba(7,17,27,0.95);
        z-index: 50;
        overflow-y: auto;
    }
    .overlays{
        display: none;
    }
    .addInfo-close{
        position: absolute;
        top:10px;
        right: 50px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 40%;
        border: 1px solid #fff;
        clear: both;
        font-size: 16px;
        cursor: pointer;
    }
    .addsence{
        position: absolute;
        top: 10px;
        right: 20px;
        width: 150px;
        height: 40px;
        text-align: center;
        font-size: 20px;
        border-top: 2px solid #fff;
        border-bottom: 2px solid #fff;
        line-height: 40px;
        z-index: 20
    }
    .addsence a{
        color: #fff;
    }
    .addsence a:hover{
        cursor: pointer;
        color:#8e8e8e;
        text-decoration: none;
    }
    .table-box{
       margin-top: 60px; 
    }
    tbody tr:hover{
        background: rgba(142,142,142,0.5);
        color: #ff0;
        cursor: pointer;
    }
    ::-webkit-scrollbar{width:8px;}
    ::-webkit-scrollbar-thumb{background:rgba(100,100,100,1);border-radius:10px;}
    ::-webkit-scrollbar-thumb:hover{background-color:#8e8e8e;}
    ::-webkit-scrollbar-thumb:active{background-color:#8e8e8e}
    ::-webkit-scrollbar-thumb:window-inactive{background-color:#8e8e8e}
    .modelForm{
    	/*margin-left: 300px;*/
    	margin-top: 20px;
    	/*padding-bottom: 50px;*/
    	/*overflow-y: auto;*/
    }
    .addInfo-add span{
    	vertical-align: bottom;
    	margin-left: 50px;
    }
    .addInfo-add span:hover{
    	cursor: pointer;
    	color: #ff0;
    }
</style>