import {testlog} from "./logic.mjs";
import {heatstep} from "./logic.mjs";


function maketab(x,y){
    var matrix = [];
    for(let i = 0; i<x; i++){
        matrix[i] = [];
        for(let j = 0; j<y; j++){
            matrix[i][j] = 0;
        }
    }
    return matrix;
}



function draw(matrix) {
    var canvas = document.getElementById('lodowa');
    var context = canvas.getContext('2d');
    var height = canvas.clientHeight;
    var width = canvas.clientWidth;

    var increaseX = width/matrix[0].length;
    var increaseY = height/matrix.length;



    for (let i=0; i<matrix.length; i++){
        for (let j=0; j<matrix[0].length; j++){
            context.fillStyle = colourOfTemp(matrix[i][j]);
            context.fillRect(j*increaseY, i*increaseX, increaseX, increaseY);
        }
    }
}
function colourOfTemp(temperature){
    var red;
    var green;
    var blue;
    if (temperature < 273 && temperature >= 0){
        red = 0;
        green = temperature/273*255;
        blue = 255;
    }else if (temperature === 273){
        red = 255;
        green = 255;
        blue = 255;
    }else if (temperature > 273 && temperature < 528){
        red = 255;
        green = 255-(temperature-273);
        blue = 0;
    }else {
        red = 0;
        green =0;
        blue =0;
    }
    return 'rgb('+ red +','+ green +','+ blue +')';
}
function tabOfX(matrix,x){
    for (let i=0; i<matrix.length; i++){
        for(let j=0; j<matrix[0].length; j++){
            matrix[i][j] = x;
        }
    }
    return matrix;
}
function freezermaker(matrix,halfOfWidth, height, mid){
    for (let i=mid-halfOfWidth; i<mid+halfOfWidth; i++) matrix[matrix.length-1][i]= -1;
    for (let i=mid-halfOfWidth; i<mid+halfOfWidth; i++) matrix[matrix.length-height][i]= -1;
    for (let i=matrix.length-height; i<matrix.length; i++) matrix[i][mid-halfOfWidth]= -1;
    for (let i=matrix.length-height; i<matrix.length; i++) matrix[i][mid+halfOfWidth]= -1;
    return matrix;
}

function siterun() {
    var maintab = maketab(50,90);

    maintab = tabOfX(maintab, 333);
    maintab = freezermaker(maintab,15,40,45);
    maintab[0][0] = 0;
    maintab[3][5] = 200;
    maintab[5][5] = 360;
    draw(maintab);
    maintab = heatstep(maintab, 0.01);
    maintab = heatstep(maintab, 0.01);
    maintab = heatstep(maintab, 0.01);
    maintab = heatstep(maintab, 0.01);
    for(let i=0; i<50; i++) {
        maintab = heatstep(maintab, 0.01);
        draw(maintab);
    }
    draw(maintab);
    testlog();
}
window.onload = siterun();
//siterun();
//var maintab = maketab(10,10);
//heatstep(maintab, 0.1);
