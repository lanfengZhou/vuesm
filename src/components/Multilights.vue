<template>
  <div class="m-light">
    <canvas id="canvas" width="360px" height="200px" v-on:click="touchclick" v-on:mousemove="touchmove" 
    v-on:mousedown="touchdown" v-on:mouseup="touchup" v-on:mouseleave="touchleave"></canvas>
    <div class="light">
      <label for="process"  id="light" v-on:click="lightclick" v-on:mousemove="lightmove" 
        v-on:mousedown="touchdown" v-on:mouseup="touchup" v-on:mouseleave="touchleave"></label>
      <input type="text" name="" class="process" id="process" disabled>
    </div>
    <div class="content">
      <div class="rColor" id="rColor"></div>
      <div class="hsl">
        <p><strong id="h">{{h}}</strong></p> 
        <p><strong id="s">{{s}}</strong></p>
        <p><strong id="l">{{l}}</strong></p>
      </div>
    </div>
  </div>
</template>

<script>
import hcolor from  '../assets/images/hcolor1.png'

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
function $ (id) {
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
      flag: ''
    }
  },
  mounted () {
    this.canvas = init()
    this.h = 'H（色相）:0'
    this.l = 'L（亮度%）:0'
    this.s = 'S（饱和度%）:0'
    this.fillcolor = $('rColor')
    this.lightprocess = $('process')
    function init () {
      var img = new Image()
      img.src = hcolor
      var hcanvas = document.getElementById('canvas')
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
      console.log('1111');
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
      this.h = 'H（色相）:' + e.offsetX
      this.s = 'S（饱和度%）:' + parseInt((1 - (e.offsetY / 200).toFixed(2)) * 100)
      this.fillcolor.style.backgroundColor = sHexColor
    },
    lightcommon: function (e) {
      this.lightprocess.style.top = -(200 - e.offsetY) + 'px'
      this.l = 'L（亮度%）:' + parseInt(((1 - e.offsetY / 200).toFixed(2)) * 100)
    }
  },
  watch: {
    h: function () {
      // ajax请求
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .m-light{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
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
  }
  .m-light .light .process{
    position: relative;
    top:0;
    left: 0;
    width: 0;
    height: 0;
    border: 8px solid #000;
    background-color: #fff;
    border-color: transparent black transparent transparent ;
  }
  .m-light .content{
    position: absolute;
    top: 250px;
    left: 50px;
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
