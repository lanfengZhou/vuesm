<template>
	<div id="sence">
		<v-dheader class="dhead"></v-dheader>
		<div class="addsence"><a href="javascript:;" @click="add">新增情景模式</a></div>
		<div :class="{overlay:addisActive}">
			<div class="addInfo-close" @click="close">x</div>
		</div>
		<div class="content">
			<!-- <span><img src="../assets/images/content.png"></span> -->
			<!-- <i>当前位置</i>
			<p class="loctext">{{lname}}</p> -->
			<div class="list">
				<table border="3">
					<!-- <caption>情景模式</caption> -->
					<thead><tr><th>情景名称</th><th>情景内容</th><th>操作</th></tr></thead>
					<tbody>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
							<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
							<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
						<tr><td>离家模式</td><td>dewfew</td><td><button type="button" class="btn btn-primary">编辑</button>  <button type="button" class="btn btn-danger">删除</button></td></tr>
					</tbody>
				</table>
			</div>
			<!-- <nav aria-label="...">
			  <ul class="pagination">
			    <li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
			    <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
		        <li><a href="#">2</a></li>
		        <li><a href="#">3</a></li>
		        <li><a href="#">4</a></li>
		        <li><a href="#">5</a></li>
		        <li>
			      <a href="#" aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			      </a>
			    </li>
			  </ul>
			</nav> -->
		</div>
	</div>
</template>

<script>
	import Dheader from '../components/devices/Dheader'
	export default{
		data(){
			return {
				lname: sessionStorage.buildName,
				addisActive:false,
			}
		},
		created(){
			console.log(sessionStorage.buildID);
		},
		methods:{
			add(){
				this.addisActive=true;
			},
			close(){
				this.addisActive=false;
				console.log("2222");
			}
		},
		components:{
			"v-dheader":Dheader
		},
	}
</script>
<style scoped>
	#sence{
		position: fixed;
		width: 100%;
		height: 100%;
		/*z-index: 10;*/
	}
	.overlay{
		position: relative;
		width: 100%;
		height: 100%;
		background:rgba(7,17,27,0.95);
		z-index: 50;
	}
	.overlay .addInfo-close{
	    position: absolute;
	    top:50%;
	    left: 50%;
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
	.dhead{
		margin-left: -213px;
	}
	.addsence{
		position: absolute;
		top: 20px;
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
	.content{
		position: relative;
		width: 100%;
		height: 100%;
		color:#eee;
		font-family: '微软雅黑';
		font-size: 18px;
	}
	.list{
		position: absolute;
		top:80px;
		width: 100%;
		height: 80%;
		overflow-y: auto;
	}
	.list table{
		width: 100%;
		text-align: center;
	}
	.list caption{
		text-align: center;
		color: #fff;
	}
	.list table tr{
		height: 40px;
	}
	.list tbody tr:hover{
		color: #ff0;
		cursor: pointer;
	}
	.list thead tr th{
		text-align: center;
	}
	.list tr th:first-child{
		width: 100px;
	}
	.list tr th:last-child{
		width: 200px;
	}
	::-webkit-scrollbar{width:8px;}
	::-webkit-scrollbar-thumb{background:rgba(100,100,100,1);border-radius:10px;}
	::-webkit-scrollbar-thumb:hover{background-color:#8e8e8e;}
	::-webkit-scrollbar-thumb:active{background-color:#8e8e8e}
	::-webkit-scrollbar-thumb:window-inactive{background-color:#8e8e8e}
</style>