const _width = 800;
const cols = 35, s = _width / cols, rows =  Math.floor(cols * 0.7), _height = rows * s;
let grid, current = null, k = false, stack = [], code = 1, next = null, dir = undefined;

function setup() {
        createCanvas(_width, _height);
    grid = createGrid(cols, rows);
    current = grid[2][1];
}

function draw() {
    background(255);
    grid.forEach(e => e.forEach(q => q.display()));
    if(code) code = chooseNeighbour();
}

function keyReleased() {
    if(keyCode === 32) k = !k;
}

class Cell {
    constructor(x, y) {
        this.x = x * s;
        this.y = y * s;
        this.walls = [true, true, true, true];
        this.visited = false;
    }

    display() {
        push();
        if(this.visited) fill('rgba(50, 153, 204, 0.5)');
        if(this === current) fill('rgba(150, 0, 255, 0.5)');
        // if(this === next) fill('rgba(0, 100, 0, 0.25');
        noStroke();
        rect(this.x, this.y, s);
        pop();

        // TOP
        if(this.walls[0]) line(this.x, this.y, this.x + s, this.y);
        // RIGHT
        if(this.walls[1]) line(this.x + s, this.y, this.x + s, this.y + s);
        // BOTTOM
        if(this.walls[2]) line(this.x + s, this.y + s, this.x, this.y + s);
        // LEFT
        if(this.walls[3]) line(this.x, this.y + s, this.x, this.y);
    }
}

function createGrid(cols, rows) {
    let array = new Array(cols);
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(rows);
        for (let j = 0; j < array[i].length; j++) {
            array[i][j] = new Cell(i, j);
        }        
    }
    return array;
}

function chooseNeighbour() {
    current.visited = true;
    const neighbours = getNeighbours(current);
    next = getNeighbours(current)[Math.floor(Math.random() * getNeighbours(current).length)];
    if(!next) {
        if(current === grid[2][1]){
            alert('Finished😁');
            return 0;
        } else {
            current = stack.pop();
        }
    } else {
        stack.push(current);

        dir = getDir(current, next);
        current.walls[dir] = false;
        next.walls[getIndex(dir)] = false;

        current = next;
    }
    return 1;
}

function getIndex(r) {
    if(typeof r !== 'number' || r < 0 || r > 3) throw new RangeError("r must be [0;3]");
    else return Math.round(1.83712 * Math.sin(1.91063 * r + 0.275643) + 1.5);
}

function getNeighbours(cell) {
    let a = [], x = Math.round(cell.x / s), y = Math.round(cell.y / s);
    if(y - 1 >= 0 && !grid[x][y - 1].visited) a.push(grid[x][y - 1]);
    if(x + 1 < cols && !grid[x + 1][y].visited) a.push(grid[x + 1][y]);
    if(y + 1 < rows && !grid[x][y + 1].visited) a.push(grid[x][y + 1]);
    if(x - 1 >= 0 && !grid[x - 1][y].visited) a.push(grid[x - 1][y]);
    
    return a;
}

function getDir(a, b) {
    if(a instanceof Cell && b instanceof Cell) {
        const r = (b.x - a.x) / s + 2 * (b.y - a.y) / s;
        return Math.round(0.5 * r * r * r - 1/3 * r * r - 1.5 * r + 7/3);
    } else throw new TypeError("a && b must be instances of Cell");
}