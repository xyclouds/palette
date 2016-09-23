var c = null;
var copy = null;
var flag = true;
$(".jia").click(function(){
	var w = prompt("请输入宽度","800px")
	var h = prompt("请输入高度","630px")
	if(flag){
		$("<canvas>").appendTo($(".box-right")).attr("width",w).attr("height",h).addClass("cbox");
		flag=false;
	}
	copy = $(".copy")[0];
	c = $(".cbox")[0];
	create();
})
function create(){
	var cobj = c.getContext("2d");
	// console.log(cobj);
	var p = new palette(cobj,c,copy);
	console.log(p)
$(".tianchong input")[0].onchange = function(){
	var color = $(this).val()
	p.fillStyle = color;
	// console.log(p.fillStyle)
}
$(".miaobian input")[0].onchange = function(){
	var color = $(this).val()
	p.strokeStyle = color;
	// console.log(p.fillStyle)
}
$(".tianchong").click(function(){
	p.style = "fill";
})
$(".miaobian").click(function(){
	p.style = "stroke";
})
$(".xian").click(function(){
	p.type = "line";
	p.draw();
})
$(".yuan").click(function(){
	p.type = "circle";
	p.draw();
})
$(".yousanjiao").click(function(){
	p.type = "triangle";
	p.draw();
})
$(".wujiaoxingkong").click(function(){
	p.type = "polystar";
	var j = prompt("输入角数","5")||"5";
	p.jnum = j;
	p.draw();
})
$(".wubianxing").click(function(){
	p.type = "polygon";
	var b = prompt("输入边数","5")||"5";
	p.bnum = b;
	p.draw();
})
$(".rounded").click(function(){
	p.type = "rect";
	p.draw();
})
$(".qianbi").click(function(){
	p.type = "pencil";
	p.pencil();
})
$(".chexiao").click(function(){
	if(p.status.length>1){
		p.status.pop();
		var ii = p.status[p.status.length-1];
		p.o.putImageData(ii,0,0,0,0,p.width,p.height)
	}else if(p.status.length==1){
		p.status.pop();
		p.o.clearRect(0,0,p.width,p.height);
		
	}else if(p.status.length==0){
		alert("没有历史记录了！");
	}
})

$(".xiangpi").click(function(){
	p.eraser();
})
$(".qingkong").click(function(){
	p.clear();
})
$(".baocun").click(function(){
       var url=c.toDataURL().replace("image/png","image/octect-stream");
        location.href=url;
      })
$(".lineWidth input").change(function(){
	// alert(this.value)
	p.lineWidth=this.value;
	$("span").text(this.value);
})
}