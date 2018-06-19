/*div로 구성한 상하좌우 쪼갠 공*/

var Ballz = function(stage,x,y) {
	this.img;
	this.rectArray;
	this.stage = stage;
	var me = this;
	this.x=x;
	this.y=y;
	this.width=20;
	this.height=20;
	this.velX=0;
	this.velY=0;
	this.flagX=true;
	this.flagY=true;
	this.result_down=true;// 바닥과 충돌하는지 확인
	this.jump=false;
	var scaleX= 1; // mario의 scaleX의 값을 전환시켜줄 값

	this.st; // setInterval을 받는 함수

	this.init=function() {

		this.rectArray=new Array();
		this.rectArray[1]=document.createElement("div");
		this.rectArray[2]=document.createElement("div");
		this.rectArray[3]=document.createElement("div");
		this.rectArray[4]=document.createElement("div");

		this.img = document.createElement("img");
		this.img.src = "mario.png";
//		this.img.src = "soccerball.png";
		this.img.style.position = "absolute";
		this.img.style.left = this.x+"px";
		this.img.style.top = this.y+"px";
		this.img.style.width = this.width+"px";
		this.img.style.height = this.height+"px";

		//좌측 사각형 
//		this.rectArray[1].style.border="1px solid red";
		this.rectArray[1].style.position="absolute";
		this.rectArray[1].style.left=this.x+"px";
		this.rectArray[1].style.top=this.y+4+"px";
		this.rectArray[1].style.width=3+"px";
		this.rectArray[1].style.height=12+"px";
		
		//위쪽 사각형 
//		this.rectArray[2].style.border="1px solid red";
		this.rectArray[2].style.position="absolute";
		this.rectArray[2].style.left=this.x+4+"px";
		this.rectArray[2].style.top=this.y+"px";
		this.rectArray[2].style.width=12+"px";
		this.rectArray[2].style.height=3+"px";

		//우측 사각형 
//		this.rectArray[3].style.border="1px solid red";
		this.rectArray[3].style.position="absolute";
		this.rectArray[3].style.left=this.x+17+"px";
		this.rectArray[3].style.top=this.y+4+"px";
		this.rectArray[3].style.width=3+"px";
		this.rectArray[3].style.height=12+"px";
		
		//아래쪽 사각형 
//		this.rectArray[4].style.border="1px solid red";
		this.rectArray[4].style.position="absolute";
		this.rectArray[4].style.left=this.x+4+"px";
		this.rectArray[4].style.top=this.y+17+"px";
		this.rectArray[4].style.width=12+"px";
		this.rectArray[4].style.height=3+"px";

		this.stage.appendChild(this.rectArray[1]);
		this.stage.appendChild(this.rectArray[2]);
		this.stage.appendChild(this.rectArray[3]);
		this.stage.appendChild(this.rectArray[4]);
		this.stage.appendChild(this.img);

	}

	this.move=function() {
		
		var resultX=false; // 센서가 감지했을 때 true false값 선언
		var resultY=false;

		this.img.src = "mario_jump.png";
		if(this.velX>0) { // 번갈아가며 좌우로 변하는 것을 구현하려 했으나 실패...
			this.img.style.transform = "scaleX("+scaleX+")";
		}
		else if(this.velX<0) {
//			scaleX *=(-1);
			this.img.style.transform = "scaleX("+(-scaleX)+")";
		}

		if(this.x>(430-this.width) || this.x<0) {
			this.flagX = !this.flagX;
			scaleX *= (-1);
			this.jump=false; // jump 초기화
			playAudio("mario jump.wav");

		}
		if(/*this.y>(550-this.height) ||*/ this.y<0) {
			this.flagY = !this.flagY;
			this.jump=false; //jump 초기화
			playAudio("mario jump.wav");
		}

//================
		//박스와 충돌했을 때 박스에서 튕겨나오는 코드
		for(var i=0;i<bigBoxArray.length; i++) {
			for(var j=0; j<bigBoxArray[i].length; j++) {
				// 새로방향 가로방향 히트테스트를 따로해서, 각각 flag를 전환한다.
				for(var k=1; k<this.rectArray.length;k++) {
					var result_box = hitTest(this.rectArray[k], bigBoxArray[i][j].box);
					if(result_box) {
						this.jump=false; //jump 초기화
						if(k==1 || k==3) {
							this.flagX = !this.flagX;
							scaleX *= (-1);
							resultX = true;
						}
						else {
							this.flagY=!this.flagY;
							resultY= true;
						}
						try{
							this.stage.removeChild(bigBoxArray[i][j].box);
						}
						catch(e) {
							console.log("이미 지워진 박스 "+i);
						}

						// 박스와의 충돌소리 
						if(bigBoxArray[i][j].nick=="itembox") {
							playAudio("mario coin.wav");
						}
						else if(bigBoxArray[i][j].nick=="brickbox") {
							playAudio("mario break brick.wav");
						}
					}
				}
				if(resultX || resultY) {
					bigBoxArray[i].splice(j,1);
					resultX=false;
					resultY=false;
				}
			}
		}
//==================

		(this.flagX)? this.x+=this.velX : this.x-=this.velX;
		(this.flagY)? this.y+=this.velY : this.y-= this.velY;


		// 바닥과의 충돌을 통해 멈추는 코드
		// 모든 변수의 초기화
		// 박스 생성의 키
		this.result_down = hitTest(this.img, down);
		if(this.result_down) {
			if(this.jump==false) {
				this.y = parseInt(down.style.top) - parseInt(this.img.style.height);
				this.velX = 0;
				this.velY = 0;
				//땅에 닿으면 숫자 출력
				round.innerText="round  "+round_num; 
				//방향설정 falg 초기화
				this.flagX=true;
				this.flagY=true;
				this.img.src = "mario.png"; // 착지하면 원래 img로 변환
				scaleX = 1; // scaleX 값의 초기화

				onGame=false;
				console.log("onGame="+onGame);
			}
			else {
				round_num++; // 공이 나는 동안 라운드숫자+1
				console.log("round_num "+round_num);
			}
		}

		// 최종이동
		this.img.style.left = this.x+"px";
		this.img.style.top = this.y+"px";
		this.rectArray[1].style.left=this.x+"px";
		this.rectArray[1].style.top=this.y+4+"px";
		this.rectArray[2].style.left=this.x+4+"px";
		this.rectArray[2].style.top=this.y+"px";
		this.rectArray[3].style.left=this.x+17+"px";
		this.rectArray[3].style.top=this.y+4+"px";
		this.rectArray[4].style.left=this.x+4+"px";
		this.rectArray[4].style.top=this.y+17+"px"
	} // move 중괄호
/*
	function playAudio(src) {
		var audio = document.createElement("audio");
		audio.src = src;
//		audio.src = "jump.mp3";
		audio.play();		
	}
*/

} // 전체 중괄호