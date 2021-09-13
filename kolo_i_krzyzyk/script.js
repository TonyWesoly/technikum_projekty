var game_fields=[];
var p_char;
var c_char;

window.onload = select_player;

function select_player()
{
	var game = document.querySelector(".game");
	var string="";
	game.style.backgroundColor="white";
	string+='<div class=textbox>WYBIERZ GRACZA </br>KÓŁKO ZACZYNA:</div>';
	string+='<div class="playerSelect">';
	string+='<div onclick="select_O()"> <img src="img/o.png"> </div>';
	string+='<div onclick="select_X()"> <img src="img/x.png"> </div>';
	string+='</div>'
	game.innerHTML=string;
}

function select_O()
{
	p_char="o";
	c_char="x";
	create_game();
}

function select_X()
{
	p_char="x";
	c_char="o";
	create_game();
	cpu_move();
}

function create_game()
{
	var game = document.querySelector(".game");
	game.style.backgroundColor="black";
	var string="";
	for(var i=0;i<3;i++){
		for (var j = 0; j < 3; j++) {
			var id_number=(i*10)+j;
			string+='<div class="gameField" onclick="player_move('+id_number+')" id='+id_number+'><div class="red_div"></div></div>';
		}
	}
	game.innerHTML=string;

	for (var i = 0; i < 3; i++) {
		game_fields[i]=[];
				for (var j = 0; j < 3; j++)
		{
			game_fields[i][j]=i*10+j;
		}
	}

}

function player_move(id_number)
{
	var j = (id_number % 10);
	var i = (Math.floor(id_number / 10));


	change_picture(p_char,i,j);


	if(isMovesLeft())
		cpu_move();
	else
		changeAllAttributes();

}


function change_picture(player,i,j)
{
	var field = document.querySelectorAll(".gameField")[j + (i*3)];

	field.removeAttribute("onclick");

	if(player=="x"){
		field.innerHTML+='<img src="img/x.png">';
		game_fields[i][j]="x";
	}
	else{
		field.innerHTML+='<img src="img/o.png">';
		game_fields[i][j]="o";
	}
	show_win();
}

function changeAllAttributes()
{
	for(var i=0;i<3;i++){
		for (var j = 0; j < 3; j++) {
			var field = document.querySelectorAll(".gameField")[j + (i*3)];

//			field.removeAttribute("onclick");
            field.setAttribute("onclick","location = location");
		}
	}

	document.querySelector(".message").innerHTML="KLIKNIJ NA DOWOLNE POLE ABY ZAGRAĆ JESZCZE RAZ";
}

function if_win()
{
	if( ( (game_fields[0][0]==game_fields[1][1]) && (game_fields[2][2]==game_fields[1][1]) ) ||
	( (game_fields[0][2]==game_fields[1][1]) && (game_fields[2][0]==game_fields[1][1]) ) ) 
	{
		if(game_fields[1][1]==c_char)
			return 1;
		else
			return -1;
	}

	for (var i = 0; i < 3; i++) {
		if( (game_fields[0][i]==game_fields[1][i]) && (game_fields[2][i]==game_fields[1][i]) ) 
		{
			if(game_fields[0][i]==c_char)
			return 1;
		else
			return -1;
		}
		if( (game_fields[i][2]==game_fields[i][1]) && (game_fields[i][0]==game_fields[i][1]) ) 
		{
			if(game_fields[i][2]==c_char)
			return 1;
		else
			return -1;
		}
	}

	return 0;
}

function show_win()
{
	if( (game_fields[0][0]==game_fields[1][1]) && (game_fields[1][1]==game_fields[2][2]) ) 
	{
		for (var i = 0; i < 3; i++) {
			// console.log(i*4);
			document.querySelectorAll(".red_div")[i*4].style.opacity = ".5";
		}
		changeAllAttributes();
	}
	else if( (game_fields[0][2]==game_fields[1][1]) && (game_fields[1][1]==game_fields[2][0]) ) 
	{
		for (var i = 0; i < 3; i++) {
			// console.log((i+1)*2);
			document.querySelectorAll(".red_div")[(i+1)*2].style.opacity = ".5";
		}
		changeAllAttributes();
	}
	for (var i = 0; i < 3; i++) {
		if( (game_fields[0][i]==game_fields[1][i]) && (game_fields[1][i]==game_fields[2][i]) )
		{
			for (var j = 0; j < 3; j++) {
				document.querySelectorAll(".red_div")[(j*3)+i].style.opacity = ".5";
			}
			changeAllAttributes();
		}
		if( (game_fields[i][2]==game_fields[i][1]) && (game_fields[i][1]==game_fields[i][0]) )
		{
			for (var j = 0; j < 3; j++) {
				document.querySelectorAll(".red_div")[(i*3)+j].style.opacity = ".5";
			}
			changeAllAttributes();
		}
	}
}


function isMovesLeft()
{
	var free_fields=0;

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {


			if(game_fields[i][j]==i*10+j)
			{
				free_fields++;
			}
		}
	}
	if(free_fields==0)
		return false;
	else
		return true;
}

function win_if_you_can(player)
{
	
	var score = if_win();
				
	if(score==1)
		return 1;
	if(score==-1)
		return -1;

	if(!isMovesLeft())
		return 0;

	if(player==c_char)
	{
		var maxValue=-1000;

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if(game_fields[i][j]==i*10+j)
				{

				game_fields[i][j]=player;
				var value=win_if_you_can(p_char);
				game_fields[i][j]=i*10+j;

				maxValue = value > maxValue ? value : maxValue;
				}
			}
		}
		return maxValue;
	}
	else
	{
		var minValue=1000;

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if(game_fields[i][j]==i*10+j)
				{

				game_fields[i][j]=player;
				var value=win_if_you_can(c_char);
				game_fields[i][j]=i*10+j;

				minValue = value < minValue ? value : minValue;
				}
			}
		}
		return minValue;
	}
}

function cpu_move()
{
	var maxValue = -1000;
	var xx=0;
	var yy=0;

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if(game_fields[i][j]==i*10+j)
			{
			game_fields[i][j]=c_char;
			var value=win_if_you_can(p_char);
			console.log((i*3+j)+" score=  "+value);
			game_fields[i][j]=i*10+j;
				if(value > maxValue)
				{
					xx=i;
					yy=j;
					maxValue = value;
				}
			}
		}
	}
	console.log("----------------------");
	change_picture(c_char,xx,yy);

	if(!isMovesLeft())
		changeAllAttributes();
}