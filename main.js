//global variables/////////////////
var canvas = document.getElementById('lodowa');
var context = canvas.getContext('2d');
var height = canvas.clientHeight;
var width = canvas.clientWidth;

var matrixHight = 50;
var matrixWidth = 90;
var opened = 0;
var maintab = maketab(matrixWidth, matrixHight);
var mMid = 30;
var mHalfOfWidth = 15;
var mHeight = 40;
var tempI = 250;
var tempO = 333;
var ValueOfDoor = [];
var sensorPositionBack = [];
var sensorPositionDoor = [];
////////////////////////////////

function runCanvas(){
    setInterval(siteLoop, 10);
}

function siteLoop(){
    heat();
    if (opened === 0) Freez(sensorPositionBack, sensorPositionDoor, 275, 2);
    draw();
}

function setTempInside(){
    tempI = document.getElementById("tempI").value;

    inFreezer(tempI);
    draw();
}

function setTempOutside(){
    tempO = document.getElementById("tempO").value;

    maintab = tabOfX(maintab, tempO);
    freezermaker(maintab,mHalfOfWidth,mHeight,mMid);
    inFreezer(tempI);
    draw();

}
function openDoor(){
    if(opened === 1) return 0;
    var opVD = 0;
    for (let i=maintab.length-mHeight+1; i<maintab.length-1; i++){
        maintab[i][mMid+mHalfOfWidth]  = ValueOfDoor[opVD++];
    }
    opened = 1;
    draw();
}

function closeDoor(){
    if(opened === 0) return 0;
    for (let i=maintab.length-mHeight+1; i<maintab.length-1; i++){
        ValueOfDoor.push(maintab[i][mMid+mHalfOfWidth]);
        maintab[i][mMid+mHalfOfWidth] = -1;

    }
    opened = 0;
    draw();
}


window.onload = function () {

    maintab = tabOfX(maintab, tempO);
    for (let k = mHeight-2; k>0; k--) ValueOfDoor.push(333);
    freezermaker(maintab,mHalfOfWidth,mHeight,mMid);
    inFreezer(tempI);
    for (let i=0; i<mHeight-2; i++) sensorPositionBack.push([maintab.length-mHeight+1+i,mMid-mHalfOfWidth+1]);
    for (let i=0; i<mHeight-2; i++) sensorPositionDoor.push([maintab.length-mHeight+1+i,mMid+mHalfOfWidth-1]);
    // for (let position of sensorPositionDoor){
    //     maintab[position[0]][position[1]] = 1;
    //     console.log(position);
    // }
    //maintab[0][5] = 0;
    //maintab[1][5] = 200;
    // maintab[5][5] = 360;
    // maintab[45][11] = 400;
    draw();

}