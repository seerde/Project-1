// 0 = save, 1 = player, 2 = cars, 3 = save(moving), 4 = win
let tilesMat = createMap(40,15);
printMap();

let menuScreen = $(".menu__container");
let gameScreen = $(".game");

let gridMap = $(".grid");

let char = $(".tile > h1");

let tiles = $(".tile");

let startGame = $("#start__game");

let y=0, x=0;
let sy=0, sx=7;
let check=0, check2=0, check3=0, check4=0, check5=0;

let min=2000, max=4001;
let randomInt = Math.floor(Math.random() * (max - min)) + min;
let carSpeed = 400;
let timer = 999;
let froggerHop = new sound("./sounds/sound-frogger-hop.wav");
let froggerSquash = new sound("./sounds/sound-frogger-squash.wav");

findChar();
drawTiles();

startGame.click(function(e){
    menuScreen.hide();
    gameScreen.show();
    $(".timer span").text(timer);
    $(".timer").show();
    setInterval(function(e){
        timer--;
        $(".timer span").text(timer);
        if(timer == -1){
            froggerSquash.play();
            alert("Game Over");
            location.reload(true);
        }
    }, 1000);
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
            if(tilesMat[y-1][x] == 0 || tilesMat[y-1][x] == 3){
                froggerHop.load();
                froggerHop.play();
                let currentTile = $("[id='" + y + " " + x + "']");
                let nexTile = $("[id='" + (y-1) + " " + x + "']");
                nexTile.html(currentTile.html());
                currentTile.html("");
                tilesMat[y][x] = 0;
                tilesMat[y-1][x] = 1;
                printMap();
            }
            else  if(tilesMat[y][x+1] == 2){
                froggerSquash.play();
                alert("Game over");
                location.reload(true);
            }
            break;
        case 65:
            findChar();
            console.log("A");
            if(tilesMat[y][x-1] == 0 || tilesMat[y][x-1] == 3){
                froggerHop.load();
                froggerHop.play();
                let currentTile = $("[id='" + y + " " + x + "']");
                let nexTile = $("[id='" + y + " " + (x-1) + "']");
                nexTile.html(currentTile.html());
                currentTile.html("");
                tilesMat[y][x] = 0;
                tilesMat[y][x-1] = 1;
                printMap();
            }
            else  if(tilesMat[y][x+1] == 2){
                froggerSquash.play();
                alert("Game over");
                location.reload(true);
            }
            break;
        case 83:
            findChar();
            console.log("S");
            if((y+1) > (tilesMat.length-1)){
                break;
            }
            if(tilesMat[y+1][x] == 0 || tilesMat[y+1][x] == 3){
                froggerHop.load();
                froggerHop.play();
                let currentTile = $("[id='" + y + " " + x + "']");
                let nexTile = $("[id='" + (y+1) + " " + x + "']");
                nexTile.html(currentTile.html());
                currentTile.html("");
                tilesMat[y][x] = 0;
                tilesMat[y+1][x] = 1;
                printMap();
            }
            else  if(tilesMat[y][x+1] == 2){
                froggerSquash.play();
                alert("Game over");
                location.reload(true);
            }
            break;
        case 68:
            findChar();
            console.log("D");
            if(tilesMat[y][x+1] == 0 || tilesMat[y][x+1] == 3){
                froggerHop.load();
                froggerHop.play();
                let currentTile = $("[id='" + y + " " + x + "']");
                let nexTile = $("[id='" + y + " " + (x+1) + "']");
                nexTile.html(currentTile.html());
                currentTile.html("");
                tilesMat[y][x] = 0;
                tilesMat[y][x+1] = 1;
                printMap();
            }
            else if(tilesMat[y][x+1] == 4){
                alert("Win");
                location.reload(true);
            }
            else if(tilesMat[y][x+1] == 2){
                froggerSquash.play();
                alert("Game over");
                location.reload(true);
            }
            break;
        default:
            break;
    }
});

spawnCar();
spawnCarRev();

spawner1();
function spawner1() {
    let min = 2000, max = 5001;
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    spawnCar();
    setTimeout(spawner1, rand);
}
spawner2();
function spawner2() {
    let min = 2000, max = 4001;
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    spawnCarRev();
    setTimeout(spawner2, rand);
}
spawner3();
function spawner3() {
    let min = 400, max = 700;
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    spawnCarFast();
    setTimeout(spawner3, rand);
}
lilypadSpawner();
function lilypadSpawner(){
    let rand = 0;
    if(check < 2){
        console.log(check);
        let min = 500, max = 501;
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        spawnLilypad();
        check++;
    }
    else{
        let min = 3000, max = 6001;
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        spawnLilypad();
        check=0;
    }

    setTimeout(lilypadSpawner, rand);
}
LogSpawner();
function LogSpawner(){
    let rand = 0;
    if(check2 < 4){
        console.log(check);
        let min = 1000, max = 1001;
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        spawnLog();
        check2++;
    }
    else{
        let min = 6000, max = 9001;
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        spawnLog();
        check2=0;
    }

    setTimeout(LogSpawner, rand);
}
LogSpawnerRev();
function LogSpawnerRev(){
    let rand = 0;
    if(check3 < 9){
        console.log(check);
        let min = 300, max = 301;
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        spawnLogRev();
        check3++;
    }
    else{
        let min = 1000, max = 2001;
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        spawnLogRev();
        check3=0;
    }

    setTimeout(LogSpawnerRev, rand);
}
LogSpawnerRev2();
function LogSpawnerRev2(){
    let rand = 0;
    if(check5 < 6){
        console.log(check);
        let min = 700, max = 701;
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        spawnLogRev2();
        check5++;
    }
    else{
        let min = 3000, max = 6001;
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        spawnLogRev2();
        check5=0;
    }

    setTimeout(LogSpawnerRev2, rand);
}
lilypadSpawnerRev();
function lilypadSpawnerRev(){
    let rand = 0;
    if(check4 < 1){
        let min = 500, max = 501;
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        spawnLilypadRev();
        check4++;
    }
    else{
        let min = 3000, max = 6001;
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        spawnLilypadRev();
        check4=0;
    }

    setTimeout(lilypadSpawnerRev, rand);
}

setInterval(function(e){
    randomInt = Math.floor(Math.random() * (max - min)) + min;

    if(tilesMat[38][2] == 2){
        $("[id='" + 38 + " " + 2 + "']").html("");
        $("[id='" + 38 + " " + 4 + "']").html("");
        tilesMat[38][2] = 0;
        tilesMat[38][4] = 0;
        clearInterval(spawnCar);
    }
    if(tilesMat[0][3] == 2){
        $("[id='" + 0 + " " + 3 + "']").html("");
        tilesMat[0][8] = 0;
        clearInterval(spawnCarRev);
    }
    if(tilesMat[38][5] == 2){
        $("[id='" + 38 + " " + 5 + "']").html("");
        tilesMat[38][5] = 0;
        clearInterval(spawnCarFast);
    }
    if(tilesMat[39][8] == 3){
        $("[id='" + 39 + " " + 8 + "']").html("");
        $("[id='"+ 39 +" "+ 8 +"']").removeAttr('style');
        $("[id='"+ 39 +" "+ 8 +"']").css("background-color", "rgb(18, 18, 126)");
        tilesMat[39][8] = 2;
        clearInterval(spawnLilypad);
    }
    if(tilesMat[0][9] == 3){
        $("[id='" + 0 + " " + 9 + "']").html("");
        $("[id='"+ 0 +" "+ 9 +"']").removeAttr('style');
        $("[id='"+ 0 +" "+ 9 +"']").css("background-color", "rgb(18, 18, 126)");
        tilesMat[0][9] = 2;
        clearInterval(spawnLog);
    }
    if(tilesMat[39][10] == 3){
        $("[id='" + 39 + " " + 10 + "']").html("");
        $("[id='"+ 39 +" "+ 10 +"']").removeAttr('style');
        $("[id='"+ 39 +" "+ 10 +"']").css("background-color", "rgb(18, 18, 126)");
        tilesMat[39][10] = 2;
        clearInterval(spawnLogRev);
    }
    if(tilesMat[0][11] == 3){
        $("[id='" + 0 + " " + 11 + "']").html("");
        $("[id='"+ 0 +" "+ 11 +"']").removeAttr('style');
        $("[id='"+ 0 +" "+ 11 +"']").css("background-color", "rgb(18, 18, 126)");
        tilesMat[0][11] = 2;
        clearInterval(spawnLilypadRev);
    }
    if(tilesMat[39][12] == 3){
        $("[id='" + 39 + " " + 12 + "']").html("");
        $("[id='"+ 39 +" "+ 12 +"']").removeAttr('style');
        $("[id='"+ 39 +" "+ 12 +"']").css("background-color", "rgb(18, 18, 126)");
        tilesMat[39][12] = 2;
        clearInterval(spawnLogRev2);
    }
}, 100);

function findChar(){
    for(let i=0; i<tilesMat.length; i++){
        for(let j=0; j<tilesMat[i].length; j++){
            if(tilesMat[i][j] == 1){
                y = i; x = j;
            }
        }
    }
}
function printMap(){
    let tmp = ""
    for(let i=0; i<tilesMat.length; i++){
        for(let j=0; j<tilesMat[i].length; j++){
            tmp += tilesMat[i][j];
        }
        tmp += "\n";
    }
    console.log(tmp+"\n");
}

function drawTiles(){
    let fr = "";
    for(let i=0; i<tilesMat[0].length; i++){
        fr += "1fr "
    }
    $(".grid").css("grid-template-columns" , fr);
    for(let i=0; i<tilesMat.length; i++){
        for(let j=0; j<tilesMat[i].length; j++){
            if(tilesMat[i][j] == 1){
                gridMap.append("<div id='" + i +" " + j +"' class='tile'><img src='./img/frogger.png' width='30' height='30'/></div>");
            }
            else {
                gridMap.append("<div id='" + i +" " + j +"' class='tile'></div>");
            }
            if(j == 0 || j == 1 || j == 6 || j == 7){
                $("[id='" + i + " "+ j + "']").css({
                    "background-image": "url(./img/grass.png)",
                    "background-repeat": "no-repeat",
                    "background-size": "auto",
                    "background-position": "center"
                });
            }
            if(j == 13 || j == 14){
                $("[id='" + i + " "+ j + "']").css({
                    "background-image": "url(./img/grass2.png)",
                    "background-repeat": "no-repeat",
                    "background-size": "auto",
                    "background-position": "center"
                });
                tilesMat[i][j] = 5;
            }
            if(j > 1 && j < 6){
                $("[id='" + i + " "+ j + "']").css("background-color", "black");
            }
            if(j > 7 && j < 13){
                $("[id='" + i + " "+ j + "']").css("background-color", "rgb(18, 18, 126)");
                tilesMat[i][j] = 2;
            }
            if((j == 13 && i % 8 == 0) && i != 0){
                $("[id='" + i + " "+ j + "']").removeAttr('style');
                $("[id='" + (i-1) + " "+ j + "']").removeAttr('style');
                $("[id='" + i + " "+ j + "']").css("background-color", "rgb(18, 18, 126)");
                $("[id='" + (i-1) + " "+ j + "']").css("background-color", "rgb(18, 18, 126)");
                tilesMat[i][j] = 4;
                tilesMat[i-1][j] = 4;
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
            if(i == (y/2) && j == 0){
                mapArry[i][j] = 1;
            }
        }
    }
    return mapArry;
}
function spawnCar(){
    let cy = 0, cx = 2;
    let cy2 = 0, cx2 = 4;
    tilesMat[cy][cx] = 2;
    tilesMat[cy2][cx2] = 2;
    $("[id='0 2']").append("<img src='./img/slow_car1.png' width='30' height='30'/>");
    $("[id='0 4']").append("<img src='./img/slow_car3.png' width='30' height='30'/>");
    setInterval(function(e){
        if((cy+1) < tilesMat.length){
            moveElement(cy, cx);
        }
        if((cy2+1) < tilesMat.length){
            moveElement(cy2, cx2);
        }
    }, carSpeed);
    function moveElement(yPointer, cx){
        if(cx == 2){
            cy = yPointer;
            cy++;
            $("[id='" + cy + " " + cx + "']").html($("[id='" + (cy-1) + " " + (cx) + "']").html());
            $("[id='" + (cy-1) + " " + cx + "']").html("");
            if(tilesMat[cy][cx] == 1){
                froggerSquash.play();
                alert("Game Over");
                location.reload(true);
            }
            tilesMat[cy][cx] = 2;
            tilesMat[(cy-1)][cx] = 0;
        }
        else{
            cy2 = yPointer;
            cy2++;
            $("[id='" + cy2 + " " + cx + "']").html($("[id='" + (cy2-1) + " " + (cx) + "']").html());
            $("[id='" + (cy2-1) + " " + cx + "']").html("");
            if(tilesMat[cy][cx] == 1){
                froggerSquash.play();
                alert("Game Over");
                location.reload(true);
            }
            tilesMat[cy2][cx] = 2;
            tilesMat[(cy2-1)][cx] = 0;
        }
    }
}
function spawnCarRev(){
    let cy = 38, cx = 3;
    tilesMat[cy][cx] = 2;
    $("[id='38 3']").append("<img src='./img/slow_car2.png' width='30' height='30'/>");
    setInterval(function(e){
        if((cy-1) >= 0){
            moveElement(cy, cx);
        }
    }, carSpeed);
    function moveElement(yPointer, cx){
        cy = yPointer;
        cy--;
        $("[id='" + cy + " " + cx + "']").html($("[id='" + (cy+1) + " " + (cx) + "']").html());
        $("[id='" + (cy+1) + " " + cx + "']").html("");
        if(tilesMat[cy][cx] == 1){
            froggerSquash.play();
            alert("Game Over");
            location.reload(true);
        }
        tilesMat[cy][cx] = 2;
        tilesMat[(cy+1)][cx] = 0;
    }
}
function spawnCarFast(){
    let cy = 0, cx = 5;
    let carSpeed2 = 100;
    tilesMat[cy][cx] = 2;
    $("[id='0 5']").append("<img src='./img/fast_car.png' width='30' height='30'/>");
    setInterval(function(e){
        if((cy+1) < tilesMat.length){
            moveElement(cy, cx);
        }
    }, carSpeed2);
    function moveElement(yPointer, cx){
        cy = yPointer;
        cy++;
        $("[id='" + cy + " " + cx + "']").html($("[id='" + (cy-1) + " " + (cx) + "']").html());
        $("[id='" + (cy-1) + " " + cx + "']").html("");
        if(tilesMat[cy][cx] == 1){
            froggerSquash.play();
            alert("Game Over");
            location.reload(true);
        }
        tilesMat[cy][cx] = 2;
        tilesMat[(cy-1)][cx] = 0;
    }
}
function spawnLilypad(){
    let cy = 0, cx = 8;
    tilesMat[cy][cx] = 3;
    $("[id='"+ cy +" "+ cx +"']").css({
        "background-image": "url(./img/lilypad.png)",
        "background-repeat": "no-repeat",
        "background-size": "50%",
        "background-position": "center"
    });
    setInterval(function(e){
        if((cy+1) < tilesMat.length){
            moveElement(cy, cx);
        }
    }, 500);
    function moveElement(yPointer, cx){
        cy = yPointer;
        cy++;
        $("[id='"+ cy +" "+ cx +"']").html($("[id='"+ (cy-1) +" "+ cx +"']").html());
        $("[id='"+ (cy-1) +" "+ cx +"']").html("");
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/lilypad.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
        $("[id='"+ (cy-1) +" "+ cx +"']").removeAttr('style');
        $("[id='"+ (cy-1) +" "+ cx +"']").css("background-color", "rgb(18, 18, 126)");
        if(tilesMat[(cy-1)][cx] == 1){
            tilesMat[cy][cx] = 1;
            tilesMat[(cy-1)][cx] = 2;
        }
        else{
            tilesMat[cy][cx] = 3;
            tilesMat[(cy-1)][cx] = 2;
        }
    }
}
function spawnLilypadRev(){
    let cy = 39, cx = 11;
    tilesMat[cy][cx] = 3;
    $("[id='"+ cy +" "+ cx +"']").css({
        "background-image": "url(./img/lilypad.png)",
        "background-repeat": "no-repeat",
        "background-size": "50%",
        "background-position": "center"
    });
    setInterval(function(e){
        if((cy-1) >= 0){
            moveElement(cy, cx);
        }
    }, 500);
    function moveElement(yPointer, cx){
        cy = yPointer;
        cy--;
        $("[id='"+ cy +" "+ cx +"']").html($("[id='"+ (cy+1) +" "+ cx +"']").html());
        $("[id='"+ (cy+1) +" "+ cx +"']").html("");
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/lilypad.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
        $("[id='"+ (cy+1) +" "+ cx +"']").removeAttr('style');
        $("[id='"+ (cy+1) +" "+ cx +"']").css("background-color", "rgb(18, 18, 126)");
        if(tilesMat[(cy+1)][cx] == 1){
            tilesMat[cy][cx] = 1;
            tilesMat[(cy+1)][cx] = 2;
        }
        else{
            tilesMat[cy][cx] = 3;
            tilesMat[(cy+1)][cx] = 2;
        }
    }
}
function spawnLog(){
    let cy = 39, cx = 9;
    tilesMat[cy][cx] = 3;
    if(check2 == 0){
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/pixil-frame-0.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
    }
    else if(check2 == 4){
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/pixil-frame-2.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
    }
    else{
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/pixil-frame-1.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
    }
    setInterval(function(e){
        if((cy-1) >= 0){
            moveElement(cy, cx);
        }
    }, 1000);
    function moveElement(yPointer, cx){
        cy = yPointer;
        cy--;
        $("[id='"+ cy +" "+ cx +"']").html($("[id='"+ (cy+1) +" "+ cx +"']").html());
        $("[id='"+ (cy+1) +" "+ cx +"']").html("");
        $("[id='"+ cy +" "+ cx +"']").css($("[id='"+ (cy+1) +" "+ cx +"']").css([
            "background-image",
            "background-repeat",
            "background-size",
            "background-position"
        ]));
        $("[id='"+ (cy+1) +" "+ cx +"']").removeAttr('style');
        $("[id='"+ (cy+1) +" "+ cx +"']").css("background-color", "rgb(18, 18, 126)");
        if(tilesMat[(cy+1)][cx] == 1){
            tilesMat[cy][cx] = 1;
            tilesMat[(cy+1)][cx] = 2;
        }
        else{
            tilesMat[cy][cx] = 3;
            tilesMat[(cy+1)][cx] = 2;
        }
    }
}
function spawnLogRev(){
    let cy = 0, cx = 10;
    tilesMat[cy][cx] = 3;
    if(check3 == 0){
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/pixil-frame-2.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
    }
    else if(check3 == 9){
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/pixil-frame-0.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
    }
    else{
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/pixil-frame-1.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
    }
    setInterval(function(e){
        if((cy+1) < tilesMat.length){
            moveElement(cy, cx);
        }
    }, 300);
    function moveElement(yPointer, cx){
        cy = yPointer;
        cy++;
        $("[id='"+ cy +" "+ cx +"']").html($("[id='"+ (cy-1) +" "+ cx +"']").html());
        $("[id='"+ (cy-1) +" "+ cx +"']").html("");
        $("[id='"+ cy +" "+ cx +"']").css($("[id='"+ (cy-1) +" "+ cx +"']").css([
            "background-image",
            "background-repeat",
            "background-size",
            "background-position"
        ]));
        $("[id='"+ (cy-1) +" "+ cx +"']").removeAttr('style');
        $("[id='"+ (cy-1) +" "+ cx +"']").css("background-color", "rgb(18, 18, 126)");
        if(tilesMat[(cy-1)][cx] == 1){
            tilesMat[cy][cx] = 1;
            tilesMat[(cy-1)][cx] = 2;
        }
        else{
            tilesMat[cy][cx] = 3;
            tilesMat[(cy-1)][cx] = 2;
        }
    }
}
function spawnLogRev2(){
    let cy = 0, cx = 12;
    tilesMat[cy][cx] = 3;
    if(check5 == 0){
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/pixil-frame-2.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
    }
    else if(check5 == 6){
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/pixil-frame-0.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
    }
    else{
        $("[id='"+ cy +" "+ cx +"']").css({
            "background-image": "url(./img/pixil-frame-1.png)",
            "background-repeat": "no-repeat",
            "background-size": "50%",
            "background-position": "center"
        });
    }
    setInterval(function(e){
        if((cy+1) < tilesMat.length){
            moveElement(cy, cx);
        }
    }, 700);
    function moveElement(yPointer, cx){
        cy = yPointer;
        cy++;
        $("[id='"+ cy +" "+ cx +"']").html($("[id='"+ (cy-1) +" "+ cx +"']").html());
        $("[id='"+ (cy-1) +" "+ cx +"']").html("");
        $("[id='"+ cy +" "+ cx +"']").css($("[id='"+ (cy-1) +" "+ cx +"']").css([
            "background-image",
            "background-repeat",
            "background-size",
            "background-position"
        ]));
        $("[id='"+ (cy-1) +" "+ cx +"']").removeAttr('style');
        $("[id='"+ (cy-1) +" "+ cx +"']").css("background-color", "rgb(18, 18, 126)");
        if(tilesMat[(cy-1)][cx] == 1){
            tilesMat[cy][cx] = 1;
            tilesMat[(cy-1)][cx] = 2;
        }
        else{
            tilesMat[cy][cx] = 3;
            tilesMat[(cy-1)][cx] = 2;
        }
    }
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
    this.load = function(){
        this.sound.load();
    }
  }
  