let tilesMat = createMap(40,40);
printMap();

let menuScreen = $(".menu__container");
let gameScreen = $(".game");

let gridMap = $(".grid");

let char = $(".tile > h1");

let tiles = $(".tile");

let startGame = $("#start__game");

let y=0, x=0;
let sy=0, sx=7;
let cy=sy, cx=sx;
findChar();
drawTiles();

startGame.click(function(e){
    menuScreen.hide();
    gameScreen.show();
});
// w = 87 a = 65 s = 83 d = 68
// [id='']
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
            if((y+1) > (tilesMat.length-1)){
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

let mySpawner = spawnCar();

setInterval(function(e){
    if(cy == tilesMat.length){
        clearInterval(mySpawner);
    }
}, 500);

function findChar(){
    for(let i=0; i<tilesMat.length; i++){
        for(let j=0; j<tilesMat[i].length; j++){
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
        for(let j=0; j<tilesMat[i].length; j++){
            tmp += tilesMat[i][j];
        }
        tmp += "\n";
    }
    console.log(tmp);
}

function drawTiles(){
    let fr = "";
    for(let i=0; i<tilesMat[0].length; i++){
        fr += "1fr "
    }
    console.log(fr);
    $(".grid").css("grid-template-columns" , fr);
    for(let i=0; i<tilesMat.length; i++){
        for(let j=0; j<tilesMat[i].length; j++){
            if(tilesMat[i][j] == 1){
                gridMap.append("<div id='" + i +" " + j +"' class='tile'><img src='https:/placehold.it/30x30' /></div>");
            }
            else {
                gridMap.append("<div id='" + i +" " + j +"' class='tile'></div>");
            }
        }
    }
}
function createMap(y, x){
    let mapArry = new Array(y);
    for(let i=0; i<mapArry.length; i++){
        mapArry[i] = new Array(x);
    }
    for(let i=0; i<mapArry.length; i++){
        for(let j=0; j<mapArry[i].length; j++){
            mapArry[i][j] = 0;
            if(i == (y/2) && j == (x/2)){
                mapArry[i][j] = 1;
            }
        }
    }
    console.log(mapArry);
    return mapArry;
}
function spawnCar(){
    tilesMat[0][7] = 2;
    $("[id='0 7']").append("<img src='https:/placehold.it/30x30' />");
    let spawnCar = setInterval(function(e){
        if((cy+1) < tilesMat.length){
            moveElement(cy, cx);
        }
    }, 500);
    return spawnCar;
}
function moveElement(yPointer, cx){
    cy = yPointer;
    cy++;
    console.log("y = " + cy);
    $("[id='" + cy + " " + cx + "']").html($("[id='" + (cy-1) + " " + (cx) + "']").html());
    $("[id='" + (cy-1) + " " + cx + "']").html("");
}
class myClass {
    constructor(x , y){
        this.x = x;
        this.y = y;
    }
}