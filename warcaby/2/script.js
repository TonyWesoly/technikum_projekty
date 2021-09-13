window.onload = createGame;

$(window).resize(
	function () {
		utilities.resizeAll();
	}
)

let endOfTheGame = {

	// turnWithoutCapture:0,

	// checkIsDraw:function(){

	// }

	checkWhoWin: function () { // 0 - nikt nie wygral, 1 - wygral bialy, 2 - wygral czarny

		let whiteFields = 0;
		let blackFields = 0;
		for (let i = 0; i < globalVariables.numberOfFields; i++) {
			for (let j = 0; j < globalVariables.numberOfFields; j++) {
				if (globalVariables.board[i][j] === "_")
					continue;
				else if (globalVariables.board[i][j] === "w" || globalVariables.board[i][j] === "W")
					whiteFields++;
				else if (globalVariables.board[i][j] === "b" || globalVariables.board[i][j] === "B")
					blackFields++;

				if (whiteFields != 0 && blackFields != 0)
					return 0;
			}
		}
		if (whiteFields === 0)
			return 2;
		else if (blackFields === 0)
			return 1;
	}

	// showWinAndResetGame: function () {

	// }

}

let globalVariables = {

	numberOfFields: 8,

	board: [],

	playerColor: true, //true = white, false = black

	playerDirection: true, //true = bottom, false = top

	nowIsPlaying: true, //true = player, false = computer

	scaleToWidth: false
}

var utilities = {



	// checkIsDraw:function(){

	// },

	paintWhiteAndActivate: function (x, y) {
		document.querySelectorAll(".blueDiv")[y * 8 + x].style.opacity = "0.6";
		document.querySelectorAll(".field")[y * 8 + x].classList.add("canMove");
	},

	paintWhiteButCantBeYellow: function (x, y) {
		document.querySelectorAll(".blueDiv")[y * 8 + x].style.opacity = "0.6";
		document.querySelectorAll(".field")[y * 8 + x].classList.add("canMove");
		document.querySelectorAll(".blueDiv")[y * 8 + x].classList.add("cantBeYellow");
	},

	unactiveAndTransparentAll: function () {
		$(".canMove").removeClass("canMove");
		$(".blueDiv").each(function () {
			$(this).css("background-color", "rgb(255, 255, 255)");
			$(this).css("opacity", ".0");
		});
		for (var i = 0; i < globalVariables.numberOfFields * globalVariables.numberOfFields; i++) {
			document.querySelectorAll(".field")[i].onclick = "";
		}
	},

	unactiveAllButCanMove: function () {
		// $(".canMove").removeClass("canMove");
		$(".blueDiv").each(function () {
			if ($(this).css("opacity") === "0.6")
				$(this).css("background-color", "rgb(219, 218, 168)");
		});
		$(".cantBeYellow").each(function () {
			$(this).css("opacity", ".0");
			$(this).css("background-color", "rgb(255, 255, 255)");
			$(this).removeClass("cantBeYellow");
		});
	},

	// changePictureToTransparent: function (x, y) {
	// 	globalVariables.board[y][x] = "_";
	// 	document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "31.25vw 6.25vw";
	// },

	// changePictureToBlack: function (x, y) {
	// 	globalVariables.board[y][x] = "b";
	// 	document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "18.75vw 6.25vw";
	// },

	// changePictureToWhite: function (x, y) {
	// 	globalVariables.board[y][x] = "w";
	// 	document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "25vw 6.25vw";
	// },

	// changePictureToWhiteKing: function (x, y) {
	// 	globalVariables.board[y][x] = "W";
	// 	document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "12.5vw 6.25vw";
	// },

	// changePictureToBlackKing: function (x, y) {
	// 	globalVariables.board[y][x] = "B";
	// 	document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "6.25vw 6.25vw";
	// },
	resizeAllPictures: function () {
		for (let i = 0; i < globalVariables.numberOfFields; i++) {
			for (let j = 0; j < globalVariables.numberOfFields; j++) {
				if (globalVariables.board[i][j] === "_")
					utilities.changePictureToTransparent(j, i);
				else if (globalVariables.board[i][j] === "w")
					utilities.changePictureToWhite(j, i);
				else if (globalVariables.board[i][j] === "b")
					utilities.changePictureToBlack(j, i);
				else if (globalVariables.board[i][j] === "W")
					utilities.changePictureToWhiteKing(j, i);
				else if (globalVariables.board[i][j] === "B")
					utilities.changePictureToBlackKing(j, i);
			}
		}
	},

	resizeAll: function () {
		let width = window.innerWidth;
		let height = window.innerHeight;
		if (width * 0.5 < height * 0.8) {
			$(".field").css("background-size", "31.25vw 6.25vw");
			globalVariables.scaleToWidth = true;
			utilities.resizeAllPictures();
		} else {
			$(".field").css("background-size", "50vh 10vh");
			globalVariables.scaleToWidth = false;
			utilities.resizeAllPictures();
		}
	},

	changePictureToTransparent: function (x, y) {
		globalVariables.board[y][x] = "_";
		if (!globalVariables.scaleToWidth)
			document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "50vh 10vh";
		else
			document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "31.25vw 6.25vw";
	},

	changePictureToBlack: function (x, y) {
		globalVariables.board[y][x] = "b";
		if (!globalVariables.scaleToWidth)
			document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "30vh 10vh";
		else
			document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "18.75vw 6.25vw";
	},

	changePictureToWhite: function (x, y) {
		globalVariables.board[y][x] = "w";
		if (!globalVariables.scaleToWidth)
			document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "40vh 10vh";
		else
			document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "25vw 6.25vw";
	},

	changePictureToWhiteKing: function (x, y) {
		globalVariables.board[y][x] = "W";
		if (!globalVariables.scaleToWidth)
			document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "20vh 10vh";
		else
			document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "12.5vw 6.25vw";
	},

	changePictureToBlackKing: function (x, y) {
		globalVariables.board[y][x] = "B";
		if (!globalVariables.scaleToWidth)
			document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "10vh 10vh";
		else
			document.querySelectorAll(".field")[(y * 8) + x].style.backgroundPosition = "6.25vw 6.25vw";
	},

	checkCanBeKing: function () {
		let boolOnTop = globalVariables.playerDirection ? !globalVariables.playerColor : globalVariables.playerColor;
		let colorOnTop = boolOnTop ? "w" : "b";
		let colorOnBottom = colorOnTop === "w" ? "b" : "w";

		for (let index = 0; index < globalVariables.numberOfFields; index++) {
			if (globalVariables.board[0][index] === colorOnBottom) {
				if (colorOnBottom == "b")
					this.changePictureToBlackKing(index, 0);
				else
					this.changePictureToWhiteKing(index, 0);
			}
			if (globalVariables.board[globalVariables.numberOfFields - 1][index] === colorOnTop) {
				if (colorOnTop == "b")
					this.changePictureToBlackKing(index, globalVariables.numberOfFields - 1);
				else
					this.changePictureToWhiteKing(index, globalVariables.numberOfFields - 1);
			}
		}
	}
}

var moveUtilities = {
	canMoveFields: function () //uaktywni pola które mogą się ruszyć
	{
		var graphicFields = document.querySelectorAll(".field");
		let whereCanMove = [0, 0, 0, 0];
		let findCapture = false;
		let isKing = false;
		let kingMoveArray = 0;
		let canCaptureArray = 0;
		let colorOfPlayer = globalVariables.nowIsPlaying === globalVariables.playerDirection ? globalVariables.playerColor : !globalVariables.playerColor;
		for (var i = 0; i < globalVariables.numberOfFields; i++) {
			var j = i % 2 == 0 ? 1 : 0;
			for (; j < globalVariables.numberOfFields; j = j + 2) {

				////////////////////////////////////
				//sprawdzenie czy to prawidlowa figura i czy figura to krol
				if (colorOfPlayer === true && (globalVariables.board[i][j] === "b" || globalVariables.board[i][j] === "B"))
					continue;
				else if (colorOfPlayer === false && (globalVariables.board[i][j] === "w" || globalVariables.board[i][j] === "W"))
					continue;

				isKing = false;
				if (globalVariables.board[i][j] === "W" || globalVariables.board[i][j] === "B")
					isKing = true;
				else if (globalVariables.board[i][j] === "_")
					continue;
				//////////////////////////////////////

				//////////////////////////////////////
				//wywoluje dla normalnego pionka
				if (!isKing) {
					if (captureUtilities.canCapture(j, i)) //uaktywni przejmowanie
					{
						if (!findCapture) {
							utilities.unactiveAndTransparentAll();
							findCapture = true;
							whereCanMove = [0, 0, 0, 0];
						}
						utilities.paintWhiteAndActivate(j, i);
						graphicFields[i * 8 + j].onclick = (function (x, y) {
							return function () {
								utilities.unactiveAllButCanMove();
								captureUtilities.capture(x, y, 0, 0, 0, 0);
								return false;
							}
						})(j, i);

					}
					if (!findCapture) //sprawdz czy moze sie ruszyc
						whereCanMove = moveUtilities.canMoveMan(j, i);

					utilities.checkCanBeKing();

					if (whereCanMove[0] !== 0 || whereCanMove[1] !== 0 || whereCanMove[2] !== 0 || whereCanMove[3] !== 0) {
						utilities.paintWhiteAndActivate(j, i);
						// whoCanMove[i][j] = whereCanMove;

						graphicFields[i * 8 + j].onclick = (function (wCM, x, y) {
							return function () {
								moveUtilities.addMovePlayerClass(wCM, x, y); //pokaż gdzie możesz się ruszyć
								return false;
							}
						})(whereCanMove, j, i);

						// paintWhite(j,i);
					}
				}
				/////////////////////////////////////////

				/////////////////////////////////////////
				//wywoluje dla krola
				else {
					kingMoveArray = moveUtilities.canMoveKing(j, i);
					canCaptureArray = captureUtilities.canKingCapture(j, i);

					if (canCaptureArray[0] || canCaptureArray[1] || canCaptureArray[2] || canCaptureArray[3]) {
						if (!findCapture) {
							utilities.unactiveAndTransparentAll();
							findCapture = true;
						}

						utilities.paintWhiteAndActivate(j, i);
						graphicFields[i * 8 + j].onclick = (function (x, y) {
							return function () {
								utilities.unactiveAllButCanMove();
								captureUtilities.capture(x, y, kingMoveArray[0], kingMoveArray[1], kingMoveArray[2], kingMoveArray[3]);
								return false;

							}
						})(j, i);
					} else if (!findCapture) {
						if (kingMoveArray[0] > 0 || kingMoveArray[1] > 0 || kingMoveArray[2] > 0 || kingMoveArray[3] > 0) {
							utilities.paintWhiteAndActivate(j, i);
							graphicFields[i * 8 + j].onclick = (function (kMA, x, y) {
								return function () {
									moveUtilities.addMoveKingClass(kMA, x, y); //pokaż gdzie możesz się ruszyć
									return false;
								}
							})(kingMoveArray, j, i);
						}
					}
				}
				//////////////////////////////////////////
			}
		}
	},

	addMovePlayerClass: function (whoCanMove, x, y) //pokaż gdzie możesz się ruszyć
	{
		utilities.unactiveAllButCanMove();

		// let yy = globalVariables.nowIsPlaying ? (y - 1) : (y + 1);

		// let direction1 = 0;
		// let direction2 = 0;
		// if (whoCanMove === 1)
		// 	direction1 = 1
		// else if (whoCanMove === 2)
		// 	direction1 = 2;
		// else {
		// 	direction1 = 1;
		// 	direction2 = 2;
		// }
		let xx = 0;
		let yy = 0;
		for (let i = 0; i < 4; i++) {
			if (whoCanMove[i] !== 0) {
				if (i === 0) {
					xx = -1;
					yy = -1;
				} else if (i === 1) {
					xx = 1;
					yy = -1;
				} else if (i === 2) {
					xx = -1;
					yy = 1;
				} else if (i === 3) {
					xx = 1;
					yy = 1;
				}

				utilities.paintWhiteButCantBeYellow(x + xx, y + yy);
				let graphicField = document.querySelectorAll(".field")[x + xx + (y + yy) * 8];
				graphicField.onclick = (function (inputX, inputY, xPlusOffset) {
					return function () {
						moveUtilities.moveAndChangeTurn(inputX, inputY, xPlusOffset); //rusz się i zmień turę

						return false;
					}
				})(x, y, x + xx);
			}
		}

		// if (direction2 != 0) {
		// 	let xx1 = (direction2 === 1) ? x - 1 : x + 1;
		// 	utilities.paintWhiteButCantBeYellow(xx1, yy);
		// 	let graphicField = document.querySelectorAll(".field")[xx1 + yy * 8];

		// 	graphicField.onclick = (function (inputX, inputY) {
		// 		return function () {
		// 			moveUtilities.moveAndChangeTurn(inputX, inputY, direction2); //rusz się i zmień turę

		// 			return false;
		// 		}
		// 	})(x, y);
		// }

		// let xx2 = (direction1 == 1) ? x - 1 : x + 1;
		// utilities.paintWhiteButCantBeYellow(xx2, yy);
		// let graphicField = document.querySelectorAll(".field")[xx2 + yy * 8];

		// graphicField.onclick = (function (inputX, inputY) {
		// 	return function () {
		// 		moveUtilities.moveAndChangeTurn(inputX, inputY, direction1); //rusz się i zmień turę

		// 		return false;
		// 	}
		// })(x, y);

	},

	addMoveKingClass: function (kingMoveArray, x, y) {
		let graphicField = document.querySelectorAll(".field");

		utilities.unactiveAllButCanMove();
		for (let index = 1; index <= kingMoveArray[0]; index++) {
			utilities.paintWhiteButCantBeYellow(x - index, y - index);
			graphicField[(x - index) + (y - index) * 8].onclick = (function (inputX, inputY, xx, yy) {
				return function () {
					moveUtilities.moveKingAndChangeTurn(inputX, inputY, xx, yy); //rusz się i zmień turę

					return false;
				}
			})(x, y, x - index, y - index);
		}
		for (let index = 1; index <= kingMoveArray[1]; index++) {
			utilities.paintWhiteButCantBeYellow(x + index, y - index);
			graphicField[(x + index) + (y - index) * 8].onclick = (function (inputX, inputY, xx, yy) {
				return function () {
					moveUtilities.moveKingAndChangeTurn(inputX, inputY, xx, yy); //rusz się i zmień turę

					return false;
				}
			})(x, y, x + index, y - index);
		}
		for (let index = 1; index <= kingMoveArray[2]; index++) {
			utilities.paintWhiteButCantBeYellow(x - index, y + index);
			graphicField[(x - index) + (y + index) * 8].onclick = (function (inputX, inputY, xx, yy) {
				return function () {
					moveUtilities.moveKingAndChangeTurn(inputX, inputY, xx, yy); //rusz się i zmień turę

					return false;
				}
			})(x, y, x - index, y + index);
		}
		for (let index = 1; index <= kingMoveArray[3]; index++) {
			utilities.paintWhiteButCantBeYellow(x + index, y + index);
			graphicField[(x + index) + (y + index) * 8].onclick = (function (inputX, inputY, xx, yy) {
				return function () {
					moveUtilities.moveKingAndChangeTurn(inputX, inputY, xx, yy); //rusz się i zmień turę

					return false;
				}
			})(x, y, x + index, y + index);
		}
	},

	// moveSubfunction(inputX,inputY,mD){
	// 	return function() {
	// 		moveUtilities.moveAndChangeTurn(inputX,inputY,direction1,mD);	//rusz się i zmień turę

	// 		return false;
	// 	}
	// },

	moveAndChangeTurn: function (inputX, inputY, direction) {
		moveUtilities.movePawn(inputX, inputY, direction,
			globalVariables.nowIsPlaying ? inputY - 1 : inputY + 1); //rusz pionkiem
		globalVariables.nowIsPlaying = !globalVariables.nowIsPlaying;
		// moveUtilities.canMoveFields(); //uaktywni drugą stronę
		minimaxUtilities.startCpuTurn();
	},

	moveKingAndChangeTurn: function (x, y, xx, yy) {
		moveUtilities.movePawn(x, y,
			xx,
			yy); //rusz pionkiem
		globalVariables.nowIsPlaying = !globalVariables.nowIsPlaying;
		// moveUtilities.canMoveFields(); //uaktywni drugą stronę
		minimaxUtilities.startCpuTurn();
	},

	movePawn: function (x, y, xx, yy) {
		let color = globalVariables.board[y][x];
		utilities.changePictureToTransparent(x, y);
		utilities.unactiveAndTransparentAll();

		// let xx = (whereMove == 1) ? x - 1 : x + 1;
		// let yy = moveDirection ? y - 1 : y + 1;

		if (color === "w")
			utilities.changePictureToWhite(xx, yy);
		else if (color === "b")
			utilities.changePictureToBlack(xx, yy);
		else if (color === "W")
			utilities.changePictureToWhiteKing(xx, yy);
		else if (color === "B")
			utilities.changePictureToBlackKing(xx, yy);

		for (var i = 0; i < globalVariables.numberOfFields * globalVariables.numberOfFields; i++) {
			document.querySelectorAll(".field")[i].onclick = "";
		}
	},

	canMoveKing(x, y) {
		let moveArray = [0, 0, 0, 0];
		// let isKing = globalVariables.board[y][x] === "W" || globalVariables.board[y][x] === "B";
		let xOffset = 1;
		let yOffset = 1;
		let canMove = [true, true, true, true];
		while (canMove[0] || canMove[1] || canMove[2] || canMove[3]) {
			y - yOffset > -1 && x - xOffset > -1 && globalVariables.board[y - yOffset][x - xOffset] === "_" && canMove[0] ? moveArray[0]++ : canMove[0] = false;
			y - yOffset > -1 && x + xOffset < globalVariables.numberOfFields && globalVariables.board[y - yOffset][x + xOffset] === "_" && canMove[1] ? moveArray[1]++ : canMove[1] = false;
			x - xOffset > -1 && y + yOffset < globalVariables.numberOfFields && globalVariables.board[y + yOffset][x - xOffset] === "_" && canMove[2] ? moveArray[2]++ : canMove[2] = false;
			y + yOffset < globalVariables.numberOfFields && x + xOffset < globalVariables.numberOfFields && globalVariables.board[y + yOffset][x + xOffset] === "_" && canMove[3] ? moveArray[3]++ : canMove[3] = false;
			xOffset++;
			yOffset++;
		}

		return moveArray;
	},

	canMoveMan: function (x, y) //true = down is playing
	{
		let whitePlayesBottom = globalVariables.playerColor === globalVariables.playerDirection;
		let color = globalVariables.board[y][x];
		yOffset = whitePlayesBottom && color === 'w' ? -1 : 1;
		let moveArray = [0, 0, 0, 0];

		if (yOffset === -1) {
			moveArray[0] = y - 1 >= 0 && x - 1 >= 0 && globalVariables.board[y - 1][x - 1] === "_" ? 1 : 0;
			moveArray[1] = y - 1 >= 0 && x + 1 <= 7 && globalVariables.board[y - 1][x + 1] === "_" ? 1 : 0;
		} else {
			moveArray[2] = y + 1 <= 7 && x - 1 >= 0 && globalVariables.board[y + 1][x - 1] === "_" ? 1 : 0;
			moveArray[3] = y + 1 <= 7 && x + 1 <= 7 && globalVariables.board[y + 1][x + 1] === "_" ? 1 : 0;
		}
		return moveArray;

	}

	// moveBaseOnColor: function(x,y,xx,yy)
	// {
	// 	let color = board[y][x];
	// 	utilities.changePictureToTransparent(x,y);
	// 	if(color === "w")
	// 	utilities.changePictureToWhite(xx,yy);
	// 	else if(color === "W")
	// 	utilities.changePictureToWhiteKing(xx,yy);
	// 	else if(color === "b")
	// 	utilities.changePictureToBlack(xx,yy);
	// 	else if(color === "B")
	// 	utilities.changePictureToBlackKing(xx,yy);
	// 	else
	// 	return false;
	// }
}

var captureUtilities = {
	capture: function (x, y, Offset1, Offset2, Offset3, Offset4) { //1 = TOP LEFT, 2 = TOP RIGHT, 3 = BOTTOM LEFT, 4 = BOTTOM RIGTH
		let color = globalVariables.board[y][x];
		let isKing = color === 'B' || color === 'W';
		// let currentPlayer = (globalVariables.nowIsPlaying === globalVariables.playerDirection) ? globalVariables.playerColor : !globalVariables.playerColor;
		// let currentColor = currentPlayer ? "w" : "b";

		// let whereCanMove = [];
		// let index = 0;

		if (color === '_')
			return false;
		// else if(color==='W'||color==='B')
		// {

		// }
		let kingMove = 0;

		// let negativeOffset = -1 * xOffset - 1;
		// let negativeOffsetMinus2 = -1 * xOffset - 2;
		// let negativeOffset = -1 * yOffset - 1;
		// let negativeOffsetMinus2 = -1 * yOffset - 2;

		if (y > 1) {
			if (x > 1) {
				let helpfulValue1 = Offset1 * -1 - 1;
				if (captureUtilities.checkCanCapture(x, y, helpfulValue1, helpfulValue1)) {
					if (!isKing) {
						utilities.paintWhiteButCantBeYellow(x + helpfulValue1 - 1, y + helpfulValue1 - 1);
						captureUtilities.captureOpponentAndMove(x, y, helpfulValue1, helpfulValue1, 1);
					} else {
						kingMove = moveUtilities.canMoveKing(x + helpfulValue1, y + helpfulValue1);
						for (let i = 1; i <= kingMove[0]; i++) {
							utilities.paintWhiteButCantBeYellow(x + helpfulValue1 - i, y + helpfulValue1 - i);
							captureUtilities.captureOpponentAndMove(x, y, helpfulValue1, helpfulValue1, i);
						}
					}
				}
			}
			if (x < 6) {
				let helpfulValue1 = Offset2 + 1;
				let helpfulValue2 = Offset2 * -1 - 1;
				if (captureUtilities.checkCanCapture(x, y, helpfulValue1, helpfulValue2)) {
					if (!isKing) {
						utilities.paintWhiteButCantBeYellow(x + helpfulValue1 + 1, y + helpfulValue2 - 1);
						captureUtilities.captureOpponentAndMove(x, y, helpfulValue1, helpfulValue2, 1);
					} else {
						kingMove = moveUtilities.canMoveKing(x + helpfulValue1, y + helpfulValue2);
						for (let i = 1; i <= kingMove[1]; i++) {
							utilities.paintWhiteButCantBeYellow(x + helpfulValue1 + i, y + helpfulValue2 - i);
							captureUtilities.captureOpponentAndMove(x, y, helpfulValue1, helpfulValue2, i);
						}
					}
				}
			}
		}
		if (y < 6) {
			if (x > 1) {
				let helpfulValue2 = Offset3 + 1;
				let helpfulValue1 = Offset3 * -1 - 1;
				if (captureUtilities.checkCanCapture(x, y, helpfulValue1, helpfulValue2)) {
					if (!isKing) {
						utilities.paintWhiteButCantBeYellow(x + helpfulValue1 - 1, y + helpfulValue2 + 1);
						captureUtilities.captureOpponentAndMove(x, y, helpfulValue1, helpfulValue2, 1);
					} else {
						kingMove = moveUtilities.canMoveKing(x + helpfulValue1, y + helpfulValue2);
						for (let i = 1; i <= kingMove[2]; i++) {
							utilities.paintWhiteButCantBeYellow(x + helpfulValue1 - i, y + helpfulValue2 + i);
							captureUtilities.captureOpponentAndMove(x, y, helpfulValue1, helpfulValue2, i);
						}
					}
				}
			}
			if (x < 6) {
				let helpfulValue1 = Offset4 + 1;
				if (captureUtilities.checkCanCapture(x, y, helpfulValue1, helpfulValue1)) {
					if (!isKing) {
						utilities.paintWhiteButCantBeYellow(x + helpfulValue1 + 1, y + helpfulValue1 + 1);
						captureUtilities.captureOpponentAndMove(x, y, helpfulValue1, helpfulValue1, 1);
					} else {
						kingMove = moveUtilities.canMoveKing(x + helpfulValue1, y + helpfulValue1);
						for (let i = 1; i <= kingMove[3]; i++) {
							utilities.paintWhiteButCantBeYellow(x + helpfulValue1 + i, y + helpfulValue1 + i);
							captureUtilities.captureOpponentAndMove(x, y, helpfulValue1, helpfulValue1, i);
						}
					}
				}
			}
		}

		return false;
	},

	captureOpponentAndMove: function (x, y, xOffset, yOffset, offsetAfterCapture) //przejmi pole
	{
		let graphicField = document.querySelectorAll(".field")[x + xOffset + (xOffset / Math.abs(xOffset)) * offsetAfterCapture +
			(y + yOffset + (yOffset / Math.abs(yOffset)) * offsetAfterCapture) * 8];
		let color = globalVariables.board[y][x];

		graphicField.onclick = (function (x, y, xOffset, yOffset, offsetAfterCapture) {
			return function () {
				utilities.unactiveAndTransparentAll();
				utilities.changePictureToTransparent(x, y);
				let xOffsetAfterCapture = (xOffset / Math.abs(xOffset)) * offsetAfterCapture;
				let yOffsetAfterCapture = (yOffset / Math.abs(yOffset)) * offsetAfterCapture;
				utilities.changePictureToTransparent(x + xOffset, y + yOffset);
				// let color = globalVariables.nowIsPlaying === globalVariables.playerDirection ? globalVariables.playerColor : !globalVariables.playerColor;

				let xx = x + xOffset + xOffsetAfterCapture;
				let yy = y + yOffset + yOffsetAfterCapture;

				if (color === "w")
					utilities.changePictureToWhite(xx, yy);
				else if (color === "b")
					utilities.changePictureToBlack(xx, yy);
				else if (color === "W")
					utilities.changePictureToWhiteKing(xx, yy);
				else if (color === "B")
					utilities.changePictureToBlackKing(xx, yy);

				utilities.checkCanBeKing();

				if ((color === "w" || color === 'b') && captureUtilities.canCapture(xx, yy))
					captureUtilities.capture(xx, yy, 0, 0, 0, 0);
				else if ((color === "W" || color === 'B') && (
						captureUtilities.canKingCapture(xx, yy)[0] ||
						captureUtilities.canKingCapture(xx, yy)[1] ||
						captureUtilities.canKingCapture(xx, yy)[2] ||
						captureUtilities.canKingCapture(xx, yy)[3])) {
					let kingMoveArray = moveUtilities.canMoveKing(xx, yy);
					captureUtilities.canCapture(xx, yy, kingMoveArray[0], kingMoveArray[1], kingMoveArray[2], kingMoveArray[3]);
				} else {
					globalVariables.nowIsPlaying = !globalVariables.nowIsPlaying;
					// moveUtilities.canMoveFields();
					minimaxUtilities.startCpuTurn();
				}
				return false;
			}
		})(x, y, xOffset, yOffset, offsetAfterCapture);
	},



	canCapture: function (x, y) {
		let color = globalVariables.board[y][x];
		let currentPlayer = (globalVariables.nowIsPlaying === globalVariables.playerDirection) ? globalVariables.playerColor : !globalVariables.playerColor;
		let currentColor = currentPlayer ? "w" : "b";

		if (color === '_')
			return false;

		if (color !== currentColor)
			return false;

		if (x > 1) {
			if (y > 1) {
				if (captureUtilities.checkCanCapture(x, y, -1, -1)) {
					return true;
				}
			}
			if (y < 6) {
				if (captureUtilities.checkCanCapture(x, y, -1, 1)) {
					return true;
				}
			}
		}
		if (x < 6) {
			if (y > 1) {
				if (captureUtilities.checkCanCapture(x, y, 1, -1)) {
					return true;
				}
			}
			if (y < 6) {
				if (captureUtilities.checkCanCapture(x, y, 1, 1)) {
					return true;
				}
			}
		}

		return false;
	},

	canKingCapture: function (x, y) {
		let whereCanMove = moveUtilities.canMoveKing(x, y);
		let whereCanCapture = [false, false, false, false];
		let color1 = '';
		let color2 = '';
		if (globalVariables.board[y][x] === 'W') {
			color1 = 'b';
			color2 = 'B';
		} else {
			color1 = 'w';
			color2 = 'W';
		}
		let buffor = whereCanMove[0];

		if ((x - buffor > 1 && y - buffor > 1) && (globalVariables.board[y - buffor - 1][x - buffor - 1] === color1 ||
				globalVariables.board[y - buffor - 1][x - buffor - 1] === color2))
			if (globalVariables.board[y - buffor - 2][x - buffor - 2] === "_")
				whereCanCapture[0] = true;

		buffor = whereCanMove[1];

		if ((x + buffor < 6 && y - buffor > 1) && (globalVariables.board[y - buffor - 1][x + buffor + 1] === color1 ||
				globalVariables.board[y - buffor - 1][x + buffor + 1] === color2))
			if (globalVariables.board[y - buffor - 2][x + buffor + 2] === "_")
				whereCanCapture[1] = true;

		buffor = whereCanMove[2];

		if ((x - buffor > 1 && y + buffor < 6) && (globalVariables.board[y + buffor + 1][x - buffor - 1] === color1 ||
				globalVariables.board[y + buffor + 1][x - buffor - 1] === color2))
			if (globalVariables.board[y + buffor + 2][x - buffor - 2] === "_")
				whereCanCapture[2] = true;


		buffor = whereCanMove[3];

		if ((x + buffor < 6 && y + buffor < 6) && (globalVariables.board[y + buffor + 1][x + buffor + 1] === color1 ||
				globalVariables.board[y + buffor + 1][x + buffor + 1] === color2))
			if (globalVariables.board[y + buffor + 2][x + buffor + 2] === "_")
				whereCanCapture[3] = true;

		return whereCanCapture;
	},

	checkCanCapture: function (x, y, moveX, moveY) {
		if (globalVariables.board[y][x] === '_')
			return false;

		let opponentColor = (globalVariables.board[y][x] === 'w') || (globalVariables.board[y][x] === 'W') ? 'b' : 'w';
		let opponentKingColor = opponentColor === 'w' ? 'W' : 'B';

		if (x + moveX > 7 || x + moveX < 0 || y + moveY > 7 || y + moveY < 0)
			return false;

		if (((globalVariables.board[y + moveY][x + moveX] === opponentColor) || (globalVariables.board[y + moveY][x + moveX] === opponentKingColor)) && (globalVariables.board[y + moveY + (moveY / Math.abs(moveY))][x + moveX + (moveX / Math.abs(moveX))] === "_")) {
			return true;
		}


		return false;

	}

	// checkHowMuchCanCapture: function (x, y, howMany) {
	// 	let color = board[y][x];
	// 	let isKing = color === "W" || color === "B";
	// 	let opponent = 0;
	// 	let captureArray = [0,0,0,0];

	// 	if(!captureUtilities.canCapture(x,y))
	// 		return howMany;

	// 	if(captureUtilities.checkCanCapture(x,y,-1,-1))
	// 	{
	// 		utilities.changePictureToTransparent(x,y);
	// 		utilities.changePictureToTransparent(x-1,y-1);
	// 		opponent =board[y-2][x-2];
	// 		color === "w" ? utilities.changePictureToWhite(x-2,y-2):utilities.changePictureToBlack(x-2,y-2);
	// 		captureArray[0] = this.checkHowMuchCanCapture(x-2,y-2,howMany+1);
	// 		if(opponent==="b")
	// 			utilities.changePictureToBlack(x-2,y-2);

	// 	}
	// }



}

var startGame = {

	setPieces: function () {
		var isWhite = globalVariables.playerColor;
		var isWhite = globalVariables.playerDirection ? !isWhite : isWhite;

		for (var i = 0; i < globalVariables.numberOfFields; i++) {
			if (i == 3) {
				i = 5;
				isWhite = !isWhite;
			}


			var j = i % 2 == 0 ? 1 : 0;
			for (; j < globalVariables.numberOfFields; j = j + 2) {
				if (isWhite)
					utilities.changePictureToWhite(j, i);
				else
					utilities.changePictureToBlack(j, i);
			}
		}
	}
}

function createGame() {
	var game = document.querySelector(".game");
	var string = "";

	for (var i = 0; i < globalVariables.numberOfFields; i++) {
		globalVariables.board[i] = [];
		// whoCanMove[i] = [];
		for (var j = 0; j < globalVariables.numberOfFields / 2; j++) {
			if (i % 2 == 0)
				string += '<div class="white field"> <div class="blueDiv"></div> </div><div class="black field"> <div class="blueDiv"></div> </div>';
			else
				string += '<div class="black field"> <div class="blueDiv"></div> </div><div class="white field"> <div class="blueDiv"></div> </div>';
		}
	}
	game.innerHTML = string;

	for (var i = 0; i < globalVariables.numberOfFields; i++) {
		for (var j = 0; j < globalVariables.numberOfFields; j++) {
			globalVariables.board[i][j] = "_";
			// whoCanMove[i][j] = 0;
		}
	}

	startGame.setPieces();
	utilities.resizeAll();
	// var whiteDirection = (globalVariables.playerColor == true) ? globalVariables.playerDirection : !globalVariables.playerDirection;
	// moveUtilities.canMoveFields(); //uaktywni pola które mogą się ruszyć
	moveUtilities.canMoveFields();
}

let minimaxUtilities = {

	minimaxClass: class {

		constructor(xx, yy, wCM, iC, oAC = 0) {
			this.x = xx;
			this.y = yy;
			this.whereCanMove = [];
			this.whereCanMove.push(wCM);
			this.isCapture = iC;
			this.offsetAfterCapture = oAC;
		}
		// addWhereCanMove(wCM){
		// 	this.whereCanMove.push(wCM);
		// }
	},

	minimaxMoves: [],

	// startCpuTurn: function () {
	// 	setTimeout(function () {
	// 		minimaxUtilities.startCpuTurn1();
	// 	}, 500);
	// },

	startCpuTurn: function () {
		// let color = "_";
		// let isKing = false;
		// let findCapture = false;
		// let whereCanMove = [0, 0, 0, 0];
		// ////////////////////////////////////////////////
		// ///tworzenie talicy dostepnych ruchow
		// for (let i = 0; i < globalVariables.numberOfFields; i++) {
		// 	for (let j = 0; j < globalVariables.numberOfFields; j++) {
		// 		color = globalVariables.board[i][j];
		// 		whereCanMove = [0, 0, 0, 0];
		// 		if (color === "_" ||
		// 			(globalVariables.playerColor && (color === 'w' || color === 'W')) ||
		// 			!globalVariables.playerColor && (color === 'b' || color === 'B'))
		// 			continue;

		// 		isKing = color === 'W' || color === 'B';

		// 		utilities.checkCanBeKing();
		// 		if (!isKing) {
		// 			//////////////////////////////////////
		// 			///generowanie dla przejmowania
		// 			if (captureUtilities.canCapture(j, i)) //uaktywni przejmowanie
		// 			{
		// 				if (!findCapture) {
		// 					findCapture = true;
		// 					this.minimaxMoves = [];
		// 				}
		// 				whereCanMove = this.minimaxWhereCanCapture(j, i);

		// 				this.minimaxMoves.push(new this.minimaxClass(j, i, whereCanMove, true));
		// 				whereCanMove = [0, 0, 0, 0];
		// 			}
		// 			//////////////////////////////////////
		// 			///generowanie dla ruszania
		// 			if (!findCapture) //sprawdz czy moze sie ruszyc
		// 				whereCanMove = moveUtilities.canMoveMan(j, i);

		// 			// utilities.checkCanBeKing();

		// 			if (whereCanMove[0] !== 0 || whereCanMove[1] !== 0 || whereCanMove[2] !== 0 || whereCanMove[3] !== 0)
		// 				this.minimaxMoves.push(new this.minimaxClass(j, i, whereCanMove, false));

		// 		}

		// 	}
		// }
		// ///////////////////////////////////////////////////////////
		// ///losowanie pionka

		// let randomDirection = 0;
		// let randomMan = 0;
		// randomMan = this.randomMan(this.minimaxMoves.length);
		// let x = this.minimaxMoves[randomMan].x;
		// let y = this.minimaxMoves[randomMan].y;
		// ///////////////////////////////////////////////////////////
		// ///ruszanie
		// if (!findCapture) {
		// 	randomDirection = this.randomMove(randomMan);
		// 	this.minimaxMove(x, y, randomDirection);
		// }
		// ///////////////////////////////////////////////////////////
		// ///zbijanie
		// else {
		// 	randomDirection = this.randomCapture(randomMan);
		// 	this.minimaxCapture(x, y, randomDirection);
		// 	///////////////////////////////////////////////////////////
		// }




		// this.minimaxMoves = [];
		// globalVariables.nowIsPlaying = !globalVariables.nowIsPlaying;
		moveUtilities.canMoveFields();
	},


	minimaxMove: function (x, y, direction) {
		if (direction === 0)
			moveUtilities.movePawn(x, y, x - 1, y - 1);
		else if (direction === 1)
			moveUtilities.movePawn(x, y, x + 1, y - 1);
		else if (direction === 2)
			moveUtilities.movePawn(x, y, x - 1, y + 1);
		else if (direction === 3)
			moveUtilities.movePawn(x, y, x + 1, y + 1);
	},
	minimaxWhereCanCapture: function(x,y)
	{
		let table = [0,0,0,0];
		if(captureUtilities.checkCanCapture(x,y,-1,-1))
		table[0] = 1;
		if(captureUtilities.checkCanCapture(x,y,1,-1))
		table[1] = 1;
		if(captureUtilities.checkCanCapture(x,y,-1,1))
		table[2] = 1;
		if(captureUtilities.checkCanCapture(x,y,1,1))
		table[3] = 1;

		return table;
	},
	minimaxCapture: function (x, y, direction) {
		let xOffset = 0;
		let yOffset = 0;
		// let stillCapture = true;

		if (direction === 0) {
			xOffset = -1;
			yOffset = -1;
		} else if (direction === 1) {
			xOffset = 1;
			yOffset = -1;
		} else if (direction === 2) {
			xOffset = -1;
			yOffset = 1;
		} else if (direction === 3) {
			xOffset = 1;
			yOffset = 1;
		}

		utilities.changePictureToTransparent(x + xOffset, y + yOffset);
		moveUtilities.movePawn(x, y, x + (xOffset * 2), y + (yOffset * 2));

		// if (captureUtilities.canCapture(x + (xOffset * 2), y + (yOffset * 2))) {
		// 	let whereCanMove = this.minimaxWhereCanCapture(x + (xOffset * 2), y + (yOffset * 2));
		// 	this.minimaxCapture(x, y, randomDirection);
		// } 
		// 	stillCapture = false;

	},

	randomMan: function (howManyMoves) {
		return Math.floor(Math.random() * howManyMoves);
	},
	randomCapture: function (randomMan) {
		let randomDirection = 0;
		while (true) { ///losowy kierunek
			randomDirection = Math.floor(Math.random() * 4);
			if (this.minimaxMoves[randomMan].whereCanMove[0][randomDirection] > 0)
				break;
		}
		return randomDirection;
	},
	randomMove: function (randomMan) {
		let whoPlayes = globalVariables.playerDirection ? 2 : 0;
		let randomDirection = 0;
		while (true) { ///losowy kierunek
			randomDirection = Math.floor(Math.random() * 2) + whoPlayes;
			if (this.minimaxMoves[randomMan].whereCanMove[0][randomDirection] > 0)
				break;
		}
		return randomDirection;
	}


}