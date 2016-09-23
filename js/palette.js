function palette(cobj,canvas,copy){
	this.o = cobj;
	this.canvas = canvas;
	this.copy = copy;
	this.width = canvas.width;
	this.height = canvas.height;
	this.type = "polystar";
	// this.style = "stroke";
	this.style = "fill";
	// this.fillStyle = '"#"+"Math.floor(Math.round()*9)"+"Math.floor(Math.round()*9)"+"Math.floor(Math.round()*9)"+"Math.floor(Math.round()*9)"+"Math.floor(Math.round()*9)"+"Math.floor(Math.round()*9)"';
	// this.color = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
	// this.index = Math.floor(this.color.length*Math.round())
	// this.fillStyle = "#"+"this.color[this.index]"+"this.color[this.index]"+"this.color[this.index]"+"this.color[this.index]"+"this.color[this.index]"+"this.color[this.index]";
	this.fillStyle = "#000000";
	// console.log(this.fillStyle)	
	this.strokeStyle = "#000000";
	this.status = [];
	this.bnum = 5;
	this.jnum = 5;
	this.era = 30;
	this.lineWidth = 1;
}

palette.prototype.draw=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		that.init();
		var ox = e.offsetX;
		var oy = e.offsetY;
		document.onmousemove=function(e){
			that.o.clearRect(0,0,that.width,that.height);
			if(that.status.length>0){
				var ii=that.status[that.status.length-1];
				that.o.putImageData(ii,0,0,0,0,that.width,that.height);
			}
			var mx = e.offsetX;
			var my = e.offsetY;
			that[that.type](ox,oy,mx,my);
		}
		document.onmouseup=function(){
			var i=that.o.getImageData(0,0,that.width,that.height);
			that.status.push(i);
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}
//c初始化
palette.prototype.init=function(){
	this.o.fillStyle = this.fillStyle;
	this.o.strokeStyle = this.strokeStyle;
	this.o.lineWidth = this.lineWidth;
}
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.rect=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.rect(x1-.5,y1-.5,x2-x1,y2-y1);
	this.o.fillStyle = [this.fillStyle];
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.circle=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.arc((x2+x1)/2,(y2+y1)/2,Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2)),0,Math.PI*2,false);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.triangle=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x1,y2);
	this.o.lineTo(x2,y2)
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.pencil = function(){
	var that = this;
	this.copy.onmousedown = function(e){
		that.init();
		that.o.beginPath();
		document.onmousemove = function(e){
			var dx = e.offsetX;
			var dy = e.offsetY;
			that.o.lineTo(dx,dy);
			that.o.stroke();
		}
		document.onmouseup = function(){
			var i=that.o.getImageData(0,0,that.width,that.height);
			that.status.push(i);
			that.o.closePath();
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}
palette.prototype.polygon = function(x1,y1,x2,y2){
	this.o.beginPath();
	this.r = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
	var n = this.bnum;
	var d = 360/n;
	this.du = (d/180)*Math.PI;
	for (var i = 0; i < n; i++) {
		b = this.r*Math.cos(this.du*(i+1));
		a = this.r*Math.sin(this.du*(i+1));
		this.o.lineTo(x1+b,y1+a)
	};
	this.o.closePath();
	this.o[this.style]();
}

palette.prototype.polystar = function(x1,y1,x2,y2){
	this.o.beginPath();
	this.r1 = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
	this.r2 = this.r1*0.382;
	var n = this.jnum*2;
	var d = 360/n;
	this.du = (d/180)*Math.PI;
	for (var i = 0; i < n; i++) {
		if(i%2==0){
			b = this.r1*Math.cos(this.du*(i+1));
			a = this.r1*Math.sin(this.du*(i+1));
			this.o.lineTo(x1+b,y1+a)
		}else if(i%2==1){
			b = this.r2*Math.cos(this.du*(i+1));
			a = this.r2*Math.sin(this.du*(i+1));
			this.o.lineTo(x1+b,y1+a)
		}
		
	};
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.eraser = function(){
	var that = this;
	this.copy.onmousedown = function(e){
		var ox = e.offsetX;
		var oy = e.offsetY;
		var w = that.era;
		var ebox = document.createElement("div");
		ebox.style.cssText = "width:"+w+"px;height:"+w+"px;position:absolute;border:1px solid red"
		box = document.querySelector(".box");
		box.appendChild(ebox);
		document.onmousemove = function(e){
			// console.log(w)注意this的指向
			var dx = e.offsetX;
			var dy = e.offsetY;
			ebox.style.left = dx-w/2+"px";
			ebox.style.top = dy-w/2+"px";
			that.o.clearRect(dx-w/2,dy-w/2,w,w);
		}
		document.onmouseup = function(){
			box.removeChild(ebox);
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}
palette.prototype.clear=function(){
	this.o.clearRect(0,0,this.width,this.height);
	this.status= [];
}
