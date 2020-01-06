
var canvas = document.getElementById('lodowa');
var context = canvas.getContext('2d');
var height = canvas.clientHeight;
var width = canvas.clientWidth;

var maintab = maketab(50,90);

window.onload = function () {

    maintab = tabOfX(maintab, 333);
    maintab = freezermaker(maintab,15,40,45);
    maintab[0][0] = 0;
    maintab[3][5] = 200;
    maintab[5][5] = 360;
    maintab[45][11] = 400;
    draw();
    setInterval(heat, 1000);
    setInterval(draw,1000);
}