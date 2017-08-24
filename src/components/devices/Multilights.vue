<template>
  <div class="m-light">
    <p class="lname" @click="hide">{{mulLightsname}}</p>
    <canvas id="colorcanvas" width="360px" height="200px" v-on:click="touchclick" v-on:mousemove="touchmove" 
    v-on:mousedown="touchdown" v-on:mouseup="touchup" v-on:mouseleave="touchleave"></canvas>
    <div class="light">
      <label for="process"  id="light" v-on:click="lightclick" v-on:mousemove="lightmove" 
        v-on:mousedown="touchdown" v-on:mouseup="touchup" v-on:mouseleave="touchleave"></label>
      <input type="text" name="" class="process" id="process" disabled>
    </div>
    <div class="content">
      <div class="rColor" id="rColor"></div>
      <div class="hsl">
        <p><strong id="h">H（色相）:{{h}}</strong></p> 
        <p><strong id="s">S（饱和度%）:{{s}}</strong></p>
        <p><strong id="l">L（亮度%）:{{l}}</strong></p>
      </div>
    </div>
  </div>
</template>

<script>
// import hcolor from  '../../assets/images/hcolor1.png'

//十六进制颜色值域RGB格式颜色值之间的相互转换  
  
    //-------------------------------------  
    //十六进制颜色值的正则表达式  
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;  
    /*RGB颜色转换为16进制*/  
    String.prototype.colorHex = function(){  
        var that = this;  
        if(/^(rgb|RGB)/.test(that)){  
            var aColor = that.replace(/(?:||rgb|RGB)*/g,"").split(",");  
            var strHex = "#";  
            for(var i=0; i<aColor.length; i++){  
                var hex = Number(aColor[i]).toString(16);  
                if(hex === "0"){  
                    hex += hex;   
                }  
                strHex += hex;  
            }  
            if(strHex.length !== 7){  
                strHex = that;    
            }  
            return strHex;  
        }else if(reg.test(that)){  
            var aNum = that.replace(/#/,"").split("");  
            if(aNum.length === 6){  
                return that;      
            }else if(aNum.length === 3){  
                var numHex = "#";  
                for(var i=0; i<aNum.length; i+=1){  
                    numHex += (aNum[i]+aNum[i]);  
                }  
                return numHex;  
            }  
        }else{  
            return that;      
        }  
    };
function $1 (id) {
  return document.getElementById(id)
}
export default {
  name: 'multilights',
  data () {
    return {
      canvas: '',
      fillcolor: '',
      h: '',
      s: '',
      l: '',
      lightprocess: '',
      flag: false,
      mlight_name:''
    }
  },
  created(){
  },
  mounted () {
    this.canvas = init()
    this.h = '0'
    this.l = '0'
    this.s = '0'
    this.fillcolor = $1('rColor')
    this.lightprocess = $1('process')
    function init () {
      var img = new Image()
      img.src = require('../../assets/images/hcolor1.png')
      var hcanvas = document.getElementById('colorcanvas')
      var ctx = hcanvas.getContext('2d')
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 360, 200)
      }
      return ctx
    }
  },
  methods:{
    touchclick: function (e) {
      this.touchcommon(e);
    },
    touchmove: function (e) {
      if (this.flag) {
        this.touchcommon(e);
      }
    },
    lightclick: function (e) {
      this.lightcommon(e);
    },
    lightmove: function (e) {
      if (this.flag) {
        this.lightcommon(e);
      }
    },
    touchdown: function () {
      this.flag=true;
    },
    touchup: function () {
      this.flag = false;
      //ajax请求
      console.log(this.flag);
      console.log(this.mulLightsdid);
    },
    touchleave: function () {
      this.flag = false;
    },
    touchcommon: function (e) {
      var imgData = this.canvas.getImageData(e.offsetX, e.offsetY, 360, 100),
          red = imgData.data[0],
          green = imgData.data[1],
          blue = imgData.data[2],
          sRgb = 'rgb(' + red + ',' + green + ',' + blue + ')',
          sHexColor = sRgb.colorHex()
      this.h = e.offsetX
      this.s =parseInt((1 - (e.offsetY / 200).toFixed(2)) * 100)
      this.fillcolor.style.backgroundColor = sHexColor
    },
    lightcommon: function (e) {
      this.lightprocess.style.top = -(200 - e.offsetY) + 'px'
      this.l =parseInt(((1 - e.offsetY / 200).toFixed(2)) * 100)
    },
    hide(){
      this.$emit('hide');
    }
  },
  watch: {
    flag:function(){
      if(!this.flag){
         $.post('/run/light/lightControl',{did:this.mulLightsdid,key:'hue',state:this.h},function(data){
        });
         $.post('/run/light/lightControl',{did:this.mulLightsdid,key:'lightness',state:this.l},function(data){
        })
      }
    }
  },
  props:['mulLightsdid','mulLightsname']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .m-light{
    position: relative;
    /*left: 50%;*/
    left: 13px;
    top: 30px;
    /*transform: translate(-50%,-50%);*/
    height: 280px;
    /*opacity: 0.8*/
  }
  .m-light .lname{
    width: 360px;
    font-size: 20px;
    font-family: "微软雅黑";
    color: #f4ea2a;
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .m-light #canvas{
    position: relative;
    top: 0px;
    left: 0px;
  }
  .m-light .light{
    position: relative;
    top: -205px;
    left: 380px;
    text-align: left;
  }
  .m-light .light label{
    position: relative;
    display: inline-block;
    width: 20px;
    height: 201px;
    border-width: 0;
    background:-moz-linear-gradient(top,#fff,#000);
    background:-webkit-gradient(linear,0 50%,100% 50%,from(#fff),to(#000));
    background:-webkit-linear-gradient(top,#fff,#000);
   /*background:-o-linear-gradient(top,#fff,#000);*/
    filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=white,endcolorstr=black,gradientType=0); 
    cursor: pointer;
  }
  .m-light .light .process{
    position: relative;
    top:0;
    left: 0;
    width: 0;
    height: 0;
    border: 8px solid #000;
    background-color: #fff;
    border-color: black transparent black black ;
  }
  .m-light .content{
    position: absolute;
    top: 100px;
    left: 450px;
  }
  .m-light .content .rColor{
    display: inline-block;
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }
  .m-light .content .hsl{
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;
    text-align: left;
    font-family: "微软雅黑"; 
  }
</style>
