/* 맞을 박스를 정의 */

var Box = function(stage,bg,x,y,nick) {
	this.stage = stage;
	this.box;
	this.nick=nick; // 박스를 식별할 때 사용하는 name
	this.bg=bg; // 배경이미지
	this.x=x;
	this.y=y;
	this.velY=0; // box가 아래로 이동할 때 사용
	this.life; // 박스의 목숨(나중에 구현)
	this.init=function() {
		this.box = document.createElement("div");
		this.box.setAttribute("name", this.nick); // 박스의 이름을 받음
		this.box.style.background = "url("+this.bg+")";
		this.box.style.position = "absolute";
		// 박스의 위치를 어떻게 줄 것인지 잘 골라야 한다.
		this.box.style.left = this.x+"px"; 
		this.box.style.top = this.y+"px";
		this.box.style.width = 55+"px";
		this.box.style.height = 55 + "px";
		this.box.style.marginTop=5+"px";
		this.box.style.marginLeft=5+"px";
		this.box.style.float = "left";
		this.box.style.align="center";

		this.stage.appendChild(this.box);
	}

	// 공이 바닥에 닿으면, 박스가 한 칸씩 내려오게 된다
	this.move = function() {
		this.velY=1;
		this.y+=this.velY;
		this.box.style.top = this.y+"px";
		
		var result = hitTest(this.box, down); 
		// 박스와 바닥이 충돌히는지 판단
		if(result) { // 박스와 바닥이 충돌하면, 게임을 멈추고 GAME OVER를 출력한다.
			setGameOver();
			clearInterval(st); // setInterval을 끈다
		}
	}
}