const _width = 800;
const cols = 14, s = _width / cols, rows =  Math.floor(cols * 0.7), _height = rows * s;
let grid, current = null;

function setup() {
    createCanvas(_width, _height);
    grid = createGrid(cols, rows);
    current = grid[0][0];
}

function draw() {
    background(255);
    grid.forEach(e => e.forEach(q => q.display()));
}

class Cell {
    constructor(x, y) {
        this.x = x * s;
        this.y = y * s;
        this.walls = [true, true, true, true];
        this.visited = false;
        setTimeout(() => {
            this.neighbours = Cell.getNeighbours(x, y);
        }, 1000);
    }

    display() {
        push();
        if(this.visited) fill(50, 153, 204);
        if(current === this) fill(150, 0, 255);
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

    static getNeighbours(x, y) {
        let a = [];
        if(y - 1 >= 0) a.push(grid[x][y - 1]);
        if(x + 1 < cols) a.push(grid[x + 1][y]);
        if(y + 1 < rows) a.push(grid[x][y + 1]);
        if(x - 1 >= 0) a.push(grid[x - 1][y]);
        
        return a;
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
    const r = Math.floor(Math.random() * current.neighbours.length);
    const next = current.neighbours[r];
    removeWalls(current, next);
    next.visited = true;
    
    return r;
}

function removeWalls(current, next) {
    current.walls[r] = false;
    switch (r) {
        case 0:
            next.walls[3] = false;
            break;
        case 1:
            next.walls[2] = false;
            break;
        case 2:
            next.walls[3] = false;
            break;
    }
}