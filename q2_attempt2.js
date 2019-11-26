var myvar,clickedActually=false;
var count,time=4;
var current= "X";
var serial=0;var p1s=0, p2s=0, p1="X", p2="O",gameOver=false;
var board=["U","U","U","U","U","U","U","U","U"];
var convert=["0","1","2","3","4","5","6","7","8"];
var validclicks=0;
/*function tp(x,y){
	document.getElementById(convert[x]).innerHTML="X";
}*/
function tp(square,value){
	
	if(board[square]=="U" && gameOver==false)
	{
		validclicks+=1;
		board[square]=value;
		document.getElementById(convert[square]).innerHTML=value;
		var winner;var new_board=board.slice();
		if(value=="X"){
			current="O";
			winner=bonus_win(new_board,"O");
		}
		else{
			current="X";
			winner=bonus_win(new_board,"X");
		}
		if(winner==p1){
			gameOver=true;
			p1s=p1s+4;
			serial=serial+1;
			row("1");
			reset("Player 1 won!");
		}
		else if(winner==p2){
			gameOver=true;
			p2s=p2s+4;
			serial=serial+1;
			row("2");
			reset("Player 2 won!");
		}
		else if(validclicks==9){
			gameOver=true;
			p1s=p1s+1;
			p2s=p2s+1;
			serial=serial+1;
			row("T");
			reset("Match tied!");
		}
	}
	else if(gameOver==true)
	{
		clearTimeout(myvar);
		clearInterval(count);
		document.getElementById("countdown").textContent ='';
		reset_all();
	}
}
function win(box){
	for(var i=0;i<7;i=i+3){
		if(box[i]==box[i+1] && box[i]==box[i+2] && box[i]!=="U"){
			return box[i];
		}

	}
	for(var i = 0; i < 3; i++){
		if(box[i]==box[i+3] && box[i]==box[i+6] && box[i]!=="U"){
			return box[i];
		}

	}
	if(box[0]==box[4] && box[0]==box[8] && box[0]!=="U"){
		return box[0];
	}
	if(box[2]==box[4] && box[2]==box[6] && box[2]!=="U"){
		return box[2];
	}
	return false;
}
function filled(box){
	for (var i=0;i<9;i++){
		if(box[i]=="U"){
			return false;
		}
	}
	return true;
}
function bonus_win(box,v_to_be_played){
	var win1=win(box);
	if(win1=="X")
	{
		return "X";
	}
	else if(win1=="O")
	{
		return "O";
	}
	else if(filled(box)){
		return false;
	}
	else{
		var win2=[true,true,true,true,true,true,true,true,true];
		for (var i = 0; i < 9; i++) {
						var new_box=box.slice();
					  if(new_box[i]=="U"){
						new_box[i]=v_to_be_played;
						if(v_to_be_played=="X")
						{
							win2[i]=bonus_win(new_box,"O");
						}
						else
						{
							win2[i]=bonus_win(new_box,"X");
						}
				}
			}

		
		var answer=true;
		for(var i=0;i<9;i++){
			if(win2[i]!==true)
				{
					//document.getElementById("win2").innerHTML+=win2[i];
					if(win2[i]==false){
						return false;
					}
					else if(answer!==true){
						if(answer!==win2[i]){
							return false;
						}
					}
					else if(answer==true){
						answer=win2[i];
					}

				}
		}
		return answer;
	}
}
function reset(v){
		//downloadTimer();
		document.getElementById("countdown").textContent = v + " Starting a new game in 5 seconds...";
		count=setInterval(function() {
									    document.getElementById("countdown").textContent = v + " Starting a new game in " + time + " seconds...";
									    time--;
									    if (time <= 0) {
									    	clearInterval(count);
									    }
									}, 1000);
		myvar=setTimeout(reset_all, 5000);
	}
function row(player) { 
            
                
            var MyTable = document.getElementById("score"); 
            
            // insert new row. 
            var NewRow = MyTable.insertRow(-1); 
            var Newcell1 = NewRow.insertCell(0); 
            var Newcell2 = NewRow.insertCell(1);
            var Newcell3 = NewRow.insertCell(2);
            var Newcell4 = NewRow.insertCell(3); 
            Newcell1.innerHTML = serial; 
            Newcell2.innerHTML = player;
            Newcell3.innerHTML = p1s;
            Newcell4.innerHTML = p2s; 
        } 
function reset_all(){

			document.getElementById("countdown").textContent ='';		
			time=4;
			validclicks=0;
			board=["U","U","U","U","U","U","U","U","U"];
			if(p1=="X"){
				p1="O";p2="X";
			}
			else{
				p2="O";p1="X";
			}
			current="X";
			document.getElementById('1').innerHTML='';
			document.getElementById('2').innerHTML='';
			document.getElementById('3').innerHTML='';
			document.getElementById('4').innerHTML='';
			document.getElementById('5').innerHTML='';
			document.getElementById('6').innerHTML='';
			document.getElementById('7').innerHTML='';
			document.getElementById('8').innerHTML='';
			document.getElementById('0').innerHTML='';
			gameOver=false;
	}
/*class square  {
	constructor(value){
		this.val=value;
	}
	click(s,v){
		clickedActually=false;
		if(this.val=="undefined")
		{
			validclicks=validclicks+1;
			clickedActually=true;
			this.val=v;
			document.getElementById(s).innerHTML=v;
			if(current=="X")
			{
				current="O";
			}
			else
			{
				current="X";
			}
		}
	}

}

class board  {
	constructor(v)
	{
		this.s1 = new square("undefined");
		this.s2 = new square("undefined");
		this.s3 = new square("undefined");
		this.s4 = new square("undefined");
		this.s5 = new square("undefined");
		this.s6 = new square("undefined");
		this.s7 = new square("undefined");
		this.s8 = new square("undefined");
		this.s9 = new square("undefined");
	}
	check()
	{
		if(this.s1.val == this.s2.val && this.s2.val==this.s3.val)
		{
			return this.s1.val;
		}
		else if(this.s4.val == this.s5.val && this.s5.val==this.s6.val)
		{
			return this.s4.val;
		}
		else if(this.s7.val == this.s8.val && this.s8.val==this.s9.val)
		{
			return this.s7.val;
		}
		else if(this.s1.val == this.s4.val && this.s4.val==this.s7.val)
		{
			return this.s1.val;
		}
		else if(this.s2.val == this.s5.val && this.s5.val==this.s8.val)
		{
			return this.s2.val;
		}
		else if(this.s3.val == this.s6.val && this.s6.val==this.s9.val)
		{
			return this.s3.val;
		}
		else if(this.s1.val == this.s5.val && this.s5.val==this.s9.val)
		{
			return this.s1.val;
		}
		else if(this.s3.val == this.s5.val && this.s5.val==this.s7.val)
		{
			return this.s3.val;
		}
		else{
			return false;
		}
	}
	clicked(s,v)
	{
		if(s=='1')
		{
			this.s1.click(s,v);
		}
		else if(s=='2')
		{
			this.s2.click(s,v);
		}
		else if(s=='3')
		{
			this.s3.click(s,v);
		}
		else if(s=='4')
		{
			this.s4.click(s,v);
		}
		else if(s=='5')
		{
			this.s5.click(s,v);
		}
		else if(s=='6')
		{
			this.s6.click(s,v);
		}
		else if(s=='7')
		{
			this.s7.click(s,v);
		}
		else if(s=='8')
		{
			this.s8.click(s,v);
		}
		else if(s=='9')
		{
			this.s9.click(s,v);
		}
		if(gameOver==false)
		{
			if(clickedActually)
			{
				var x=this.check();
				if(x==p1)
				{
					gameOver=true;
					p1s=p1s+4;
					serial=serial+1;
					row("1");
					this.reset("Player 1 won");
				}
				else if(x==p2)
				{
					gameOver=true;
					p2s=p2s+4;
					serial=serial+1;
					row("2");
					this.reset("Player 2 won");
				}
				else if(validclicks==9)
				{
					gameOver=true;
					p1s=p1s+1;
					p2s=p2s+1;
					serial=serial+1;
					row("T");
					this.reset("Match tied");
				}
			}
		}
		else
		{
			clearTimeout(myvar);
			clearInterval(count);
			document.getElementById("countdown").textContent ='';
			reset_all();
		}

	}
	reset(v){
		//downloadTimer();
		document.getElementById("countdown").textContent = v + " Starting a new game in 5 seconds";
		count=setInterval(function() {
									    document.getElementById("countdown").textContent = v + " Starting a new game in " + time + " seconds";
									    time--;
									    if (time <= 0) {
									    	clearInterval(count);
									    }
									}, 1000);
		myvar=setTimeout(reset_all, 5000);
	}

}
var myvar,clickedActually=false;
var count,time=4;
var box= new board("new");
var current= "X";
var serial=0;var p1s=0, p2s=0, p1="X", p2="O",validclicks=0,gameOver=false;

function row(player) { 
            
                
            var MyTable = document.getElementById("score"); 
            
            // insert new row. 
            var NewRow = MyTable.insertRow(-1); 
            var Newcell1 = NewRow.insertCell(0); 
            var Newcell2 = NewRow.insertCell(1);
            var Newcell3 = NewRow.insertCell(2);
            var Newcell4 = NewRow.insertCell(3); 
            Newcell1.innerHTML = serial; 
            Newcell2.innerHTML = player;
            Newcell3.innerHTML = p1s;
            Newcell4.innerHTML = p2s; 
        } 
function reset_all(){

			document.getElementById("countdown").textContent ='';		
			time=4;
			validclicks=0;
			box= new board("new");
			if(p1=="X"){
				p1="O";p2="X";
			}
			else{
				p2="O";p1="X";
			}
			current="X";
			document.getElementById('1').innerHTML='';
			document.getElementById('2').innerHTML='';
			document.getElementById('3').innerHTML='';
			document.getElementById('4').innerHTML='';
			document.getElementById('5').innerHTML='';
			document.getElementById('6').innerHTML='';
			document.getElementById('7').innerHTML='';
			document.getElementById('8').innerHTML='';
			document.getElementById('9').innerHTML='';
			gameOver=false;
	}

function bonus_check(bor,chance){
	if(bor.check()=='X')
	{
		return "X";
	}
	else if(bor.check()=='O')
	{
		return "O";
	}
	else{
		var v1=true,v2=true,v3=true,v4=true,v5=true,v6=true,v7=true,v8=true,v9=true;
		if(bor.s1.val=='undefined')
		{
			bor.click()
		}
	}
}
*//*function func(v){

	document.getElementById('countdown').innerHTML=v + " Starting a new game in " + time + " seconds";
	time=time-1; 
}
var seconds = document.getElementById("countdown").textContent;
var countdown = setInterval(function() {
    seconds--;
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
}, 1000);*/

/*var timeleft = 5;
function downloadTimer()
	{
	setInterval(function(){
  document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  timeleft -= 1;
  if(timeleft <= 0){
    document.getElementById("countdown").innerHTML ='';
  }
	}, 1000)
} */       