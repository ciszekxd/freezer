//import {testlog} from "./logic.js";
//import {heatstep} from "./logic.js";


function maketab(x,y){
    var matrix = [];
    for(let i = 0; i<y; i++){
        var inmatrix = [];
        for(let j = 0; j<x; j++){
            inmatrix.push(0);
        }
        matrix.push(inmatrix);
    }
    return matrix;
}



function draw() {


    var increaseX = width/maintab[0].length;
    var increaseY = height/maintab.length;


    context.clearRect(0,0,900,500);
    for (let i=0; i<maintab.length; i++){
        for (let j=0; j<maintab[0].length; j++){
            context.fillStyle = colourOfTemp(maintab[i][j]);

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
function inFreezer(newVal) {
    for(let i=matrixHight-mHeight+1; i< matrixHight-1; i++){
        for (let j= mMid-mHalfOfWidth+1; j<mMid+mHalfOfWidth; j++){
            maintab[i][j] = newVal;
        }
    }
}


