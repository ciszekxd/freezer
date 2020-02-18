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
    conteiner.push([oy,ox]);
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
    var copy = maketab(gold[0].length, gold.length);
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
function heatstepV2(matrix, modul) {
    var delta_plus = 0;
    var delta_minus = 0;
    var surface = [];
    for (let y=0; y<matrix.length; y++){
        for (let x=0; x<matrix[0].length; x++){
            delta_minus = 0;
            delta_plus = 0;
            if(matrix[y][x] === -1) continue;
            surface = surfacefinder(matrix, [[y,x]]);
            if(surface.length !== 0){
                delta_plus = matrix[y][x] * modul / surface.length;
                delta_minus = matrix[y][x] * modul;
            }
            for (poz of surface) matrix[poz[0]][poz[1]] += delta_plus;
            matrix[y][x] -= delta_minus;
        }
    }
    return matrix;
}
function heatstepV3(matrix, modul) {
    var delta_plus = 0;
    var delta_minus = 0;
    var copy = copy_content(matrix);
    var surface = [];
    for (let y=0; y<matrix.length; y++){
        for (let x=0; x<matrix[0].length; x++){
            delta_minus = 0;
            delta_plus = 0;
            if(matrix[y][x] === -1) continue;
            surface = surfacefinder(matrix, [[y,x]]);
            if(surface.length !== 0){
                delta_plus = matrix[y][x] * modul / surface.length;
                delta_minus = matrix[y][x] * modul;
            }
            for (poz of surface) copy[poz[0]][poz[1]] += delta_plus;
            copy[y][x] -= delta_minus;
        }
    }
    return copy;
}

function heat() {
    maintab = heatstepV3(maintab, 0.1);

}

function Freez(checklineB,checklineD,borderValue, module){
    var activated = 0;
    for(let ele of checklineB){
        if (maintab[ele[0]][ele[1]] > borderValue) activated = 1;
    }
    for (let ele of checklineD){
        if (maintab[ele[0]][ele[1]] > borderValue) activated = 1;
    }

    if(activated === 1){
        for (let ment of checklineB){
            maintab[ment[0]][ment[1]] -= module;
            maintab[ment[0]][ment[1]-2] += module;
        }
    }

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


