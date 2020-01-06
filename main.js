
var canvas = document.getElementById('lodowa');
var context = canvas.getContext('2d');
var height = canvas.clientHeight;
var width = canvas.clientWidth;

var matrixHight = 50;
var matrixWidth = 90;

var maintab = maketab(matrixHight, matrixWidth);
var mMid = 30;
var mHalfOfWidth = 15;
var mHeight = 40;


window.onload = function () {

    maintab = tabOfX(maintab, 333);
    freezermaker(maintab,mHalfOfWidth,mHeight,mMid);
    inFreezer(250);
    maintab[0][0] = 0;
    maintab[3][5] = 200;
    maintab[5][5] = 360;
    maintab[45][11] = 400;
    draw();
    setInterval(heat, 10000);
    setInterval(draw,10000);
}