
var canvas = document.getElementById('lodowa');
var context = canvas.getContext('2d');
var height = canvas.clientHeight;
var width = canvas.clientWidth;

var matrixHight = 50;
var matrixWidth = 90;
var opened = 0;
var maintab = maketab(matrixHight, matrixWidth);
var mMid = 30;
var mHalfOfWidth = 15;
var mHeight = 40;
var tempI = 250;
var tempO = 333;
var ValueOfDoor = [];


function runCanvas(){
    setInterval(heat, 1000);
    setInterval(draw,1000);
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
    console.log("started opening");
    var opVD = 0;
    for (let i=maintab.length-mHeight+1; i<maintab.length-1; i++){
        maintab[i][mMid+mHalfOfWidth]  = ValueOfDoor[opVD++];
    }
    opened = 1;
    draw();
    console.log("opened");

}

function closeDoor(){
    if(opened === 0) return 0;
    console.log("started closing");
    for (let i=maintab.length-mHeight+1; i<maintab.length-1; i++){
        ValueOfDoor.push(maintab[i][mMid+mHalfOfWidth]);
        maintab[i][mMid+mHalfOfWidth] = -1;

    }
    opened = 0;
    draw();
    console.log("closed");

}


window.onload = function () {

    maintab = tabOfX(maintab, tempO);
    for (let k = mHeight-2; k>0; k--) ValueOfDoor.push(333);
    freezermaker(maintab,mHalfOfWidth,mHeight,mMid);
    inFreezer(tempI);
    maintab[0][0] = 0;
    maintab[3][5] = 200;
    maintab[5][5] = 360;
    maintab[45][11] = 400;
    draw();
    console.log(mHeight-2);
    console.log(ValueOfDoor);

}