let tilesMat = [
    [0,0,0],
    [0,1,0],
    [0,0,0]
];
printMap();

let menuScreen = $(".menu__container");
let gameScreen = $(".game");

let char = $(".tile > h1");

let tiles = $(".tile");

let startGame = $("#start__game");

let y=0, x=0;
findChar();

startGame.click(function(e){
    menuScreen.hide();
    gameScreen.show();
});
// w = 87 a = 65 s = 83 d = 68
$(document).keydown(function (e) {
    switch(e.keyCode){
        case 87:
            findChar();
            console.log("W");
            if((y-1) < 0){
                break;
            }
            if(tilesMat[y-1][x] == 0){
                let currentTile = $("[id='" + y + " " + x + "']");
                let nexTile = $("[id='" + (y-1) + " " + x + "']");
                nexTile.html(currentTile.html());
                currentTile.html("");
                tilesMat[y][x] = 0;
                tilesMat[y-1][x] = 1;
                printMap();
            }
            break;
        case 65:
            findChar();
            console.log("A");
            if(tilesMat[y][x-1] == 0){
                let currentTile = $("[id='" + y + " " + x + "']");
                let nexTile = $("[id='" + y + " " + (x-1) + "']");
                nexTile.html(currentTile.html());
                currentTile.html("");
                tilesMat[y][x] = 0;
                tilesMat[y][x-1] = 1;
                printMap();
            }
            break;
        case 83:
            findChar();
            console.log("S");
            if((y+1) > 2){
                break;
            }
            if(tilesMat[y+1][x] == 0){
                let currentTile = $("[id='" + y + " " + x + "']");
                let nexTile = $("[id='" + (y+1) + " " + x + "']");
                nexTile.html(currentTile.html());
                currentTile.html("");
                tilesMat[y][x] = 0;
                tilesMat[y+1][x] = 1;
                printMap();
            }
            break;
        case 68:
            findChar();
            console.log("D");
            if(tilesMat[y][x+1] == 0){
                let currentTile = $("[id='" + y + " " + x + "']");
                let nexTile = $("[id='" + y + " " + (x+1) + "']");
                nexTile.html(currentTile.html());
                currentTile.html("");
                tilesMat[y][x] = 0;
                tilesMat[y][x+1] = 1;
                printMap();
            }
            break;
        default:
            break;
    }
});

// tiles.click(function(e){
//     console.log(e.target.id);
// })

function findChar(){
    for(let i=0; i<tilesMat.length; i++){
        for(let j=0; j<tilesMat.length; j++){
            if(tilesMat[i][j] == 1){
                y = i; x = j;
            }
        }
    }
    console.log("Y = " + y + " X = " + x);
}
function printMap(){
    let tmp = ""
    for(let i=0; i<tilesMat.length; i++){
        for(let j=0; j<tilesMat.length; j++){
            tmp += tilesMat[i][j];
        }
        tmp += "\n";
    }
    console.log(tmp);
}