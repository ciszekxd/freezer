function findmax(matrix){
    var temp = 0;
    var ox,oy;
    var conteiner=[];
    for (let i=0; i<matrix.length; i++){
        for(let j=0; j< matrix[0].length; j++){
            if(matrix[i][j] >= temp){
                temp = matrix[i][j];
                ox = i;
                oy = j;
            }
        }
    }
    conteiner.push([ox,oy]);
    return conteiner;
}

function surfacefinder(matrix, center){
    var container = [];
    var x,y;
    for(var position of center){
        x = position[0];
        y = position[1];
        if ((x - 1 > -1) && (y - 1 > -1) && (matrix[x][y] > matrix[x - 1][y - 1]) && (matrix[x-1][y-1] !== -1)
            && !(tableinclude(container,[x - 1, y - 1])) && !(tableinclude(center,[x - 1, y - 1])))
            container.push([x - 1, y - 1]);
        if ((x - 1 > -1) && (matrix[x][y] > matrix[x - 1][y]) && (matrix[x-1][y] !== -1)
            && !(tableinclude(container,[x - 1, y])) && !(tableinclude(center,[x - 1, y])))
            container.push([x - 1, y]);
        if ((x - 1 > -1) && (y + 1 < matrix[0].length) && (matrix[x][y] > matrix[x - 1][y + 1]) && (matrix[x-1][y+1] !== -1)
            && !(tableinclude(container,[x - 1, y + 1])) && !(tableinclude(center,[x - 1, y + 1])))
            container.push([x - 1, y + 1]);
        if ((y - 1 > -1) && (matrix[x][y] > matrix[x][y - 1]) && (matrix[x][y-1] !== -1)
            && !(tableinclude(container,[x, y - 1])) && !(tableinclude(center,[x, y - 1])))
            container.push([x, y - 1]);
        if ((y + 1 < matrix[0].length) && (matrix[x][y] > matrix[x][y + 1]) && (matrix[x][y+1] !== -1)
            && !(tableinclude(container,[x, y + 1])) && !(tableinclude(center,[x, y + 1])))
            container.push([x, y + 1]);
        if ((x + 1 < matrix.length) && (y - 1 > -1) && (matrix[x][y] > matrix[x + 1][y - 1]) && (matrix[x+1][y-1] !== -1)
            && !(tableinclude(container,[x + 1, y - 1])) && !(tableinclude(center,[x + 1, y - 1])))
            container.push([x + 1, y - 1]);
        if ((x + 1 < matrix.length) && (matrix[x][y] > matrix[x + 1][y]) && (matrix[x+1][y] !== -1)
            && !(tableinclude(container,[x + 1, y])) &&!(tableinclude(center,[x + 1, y])))
            container.push([x + 1, y]);
        if ((x + 1 < matrix.length) && (y + 1 < matrix[0].length) && (matrix[x][y] > matrix[x + 1][y + 1]) && (matrix[x+1][y+1] !== -1)
            && !(tableinclude(container,[x + 1, y + 1])) && !(tableinclude(center,[x + 1, y + 1])))
            container.push([x + 1, y + 1]);
    }
    return container;
}

function tableinclude(arr, ele){
    for(var tab of arr){
        if (tab[0] === ele[0] && tab[1] === ele[1]) return true;
    }
    return false;
}
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
function copy_content(gold) {
    var copy = maketab(gold.length, gold[0].length);
    for (let i=0; i<gold.length; i++){
        for(let j=0; j< gold[0].length; j++){
            copy[i][j] = gold[i][j];
        }
    }
    return copy
}
function centerfinder(matrix, x, y) {
    var container = [[x, y]];
    for (var ele of container){
        x = ele[0];
        y = ele[1];
        if ((x - 1 > -1) && (y - 1 > -1) && (matrix[x][y] === matrix[x - 1][y - 1]) && !(tableinclude(container,[x - 1, y - 1]))) container.push([x - 1, y - 1]);
        if ((x - 1 > -1) && (matrix[x][y] === matrix[x - 1][y]) && !(tableinclude(container,[x - 1, y]))) container.push([x - 1, y]);
        if ((x - 1 > -1) && (y + 1 < matrix[0].length) && (matrix[x][y] === matrix[x - 1][y + 1]) && !(tableinclude(container,[x - 1, y + 1]))) container.push([x - 1, y + 1]);
        if ((y - 1 > -1) && (matrix[x][y] === matrix[x][y - 1]) && !(tableinclude(container,[x, y - 1]))) container.push([x, y - 1]);
        if ((y + 1 < matrix[0].length) && (matrix[x][y] === matrix[x][y + 1]) && !(tableinclude(container,[x, y + 1]))) container.push([x, y + 1]);
        if ((x + 1 < matrix.length) && (y - 1 > -1) && (matrix[x][y] === matrix[x + 1][y - 1]) && !(tableinclude(container,[x + 1, y - 1]))) container.push([x + 1, y - 1]);
        if ((x + 1 < matrix.length) && (matrix[x][y] === matrix[x + 1][y]) && !(tableinclude(container,[x + 1, y]))) container.push([x + 1, y]);
        if ((x + 1 < matrix.length) && (y + 1 < matrix[0].length) && (matrix[x][y] === matrix[x + 1][y + 1]) && !(tableinclude(container,[x + 1, y + 1]))) container.push([x + 1, y + 1]);
    }
    return container;
}
function heatstep(matrix, modul) {
    var copy = copy_content(matrix);
    var delta_plus;
    var delta_minus;
    do {
        var center = findmax(copy);
        for (let point of center) {
            var surface = surfacefinder(matrix, [point]);
            if (surface.length === 0) {
                delta_plus = 0;
                delta_minus = 0;

            } else {
                delta_plus = matrix[point[0]][point[1]] * modul / surface.length;
                delta_minus = matrix[point[0]][point[1]] * modul;
            }
            copy[point[0]][point[1]] = -1;
            matrix[point[0]][point[1]] -= delta_minus;

            for (let ele of surface) {
                matrix[ele[0]][ele[1]] += delta_plus;
            }
        }
        // console.log(matrix);
        // console.log("///////////////////");
        // console.log(copy);
        // console.log("///////////////////////");
    } while(!equality_to_n1(copy));
    //console.log(matrix);
    return matrix;
}
function heat() {
    maintab = heatstep(maintab, 0.1);

}
function acurassy(prev, matrix){
    var sum = 0;
    for (let i=0; i<matrix.length; i++){
        for (let j=0; j<matrix[i].length; j++){
            sum += matrix[i][j];
        }
    }
    console.log("accurasy is ", sum/prev*100);
}
function equality_to_n1(matrix){
    for (let i=0; i<matrix.length; i++){
        for (let j=0; j<matrix[0].length; j++){
            if(matrix[i][j] !== -1) return false;
        }
    }
    return true;
}

function equality(matrix){
    for (let i=0; i<matrix.length; i++){
        for (let j=0; j<matrix[0].length; j++){
            if(abs(matrix[0][0]-matrix[i][j]) > 0.01) return false;
        }
    }
    return true;
}


function fazystep(x,y,matrix, wsp){
    var stuck = 0;
    while(!equality(matrix)){
        var delta = matrix[x][y] * wsp;
        matrix[x][y] -= delta;
        var grow = delta/8;
        stuck += grow;
        if(matrix[x][y] < stuck) break ;
        for (let i=0; i<matrix.length; i++){
            for (let j=0; j<matrix[0].length; j++){
                if((x == i) && (y == j)) continue;
                else matrix[i][j] += grow;
            }
        }
        //console.log("/////////////////////////////////////////////");
        //console.log(matrix);
    }
    return matrix;
}
function testlog() {
    console.log("test message");
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// console.log("helloworld");
//
// var matrix = maketab(3,3);
// matrix[0][0] = 1;
// matrix[0][1] = 2;
// matrix[0][2] = 1;
// matrix[1][0] = 5;
// matrix[1][1] = 4;
// matrix[1][2] = 7;
// matrix[2][0] = 10;
// matrix[2][1] = 2;
// matrix[2][2] = 10;
// var macik = maketab(2,2);
// macik[0][0] = -1;
// macik[0][1] = -1;
// macik[1][1] = -1;
// macik[1][0] = -1;
// //var opa = centerfinder(matrix,2,2);
// //var ora = surfacefinder(matrix, opa);
// for(let i=0; i<500; i++) {
//     var mat = heatstep(matrix, 0.01);
//     //sleep(1000);
//     console.clear();
//     console.log(matrix);
//
// }
// acurassy(42, mat);
//
// //console.log(opa);
// //console.log(ora);
// //console.log(macik);
// //console.log(equality_to_n1(macik));
// // var mat = fazy1ele(1,1,matrix,0.01);
// // acurassy(200, mat);