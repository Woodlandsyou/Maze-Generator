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
        this.line(this.x, this.y, this.x + s, this.y, this.walls[0]);
        // RIGHT
        this.line(this.x + s, this.y, this.x + s, this.y + s, this.walls[1]);
        // BOTTOM
        this.line(this.x + s, this.y + s, this.x, this.y + s, this.walls[2]);
        // LEFT
        this.line(this.x, this.y + s, this.x, this.y, this.walls[3]);
    }

    line(x1, y1, x2, y2, v) {
        if(v) line(x1, y1, x2, y2);
    }

    static getNeighbours(x, y) {
        let first = grid[x][y - 1 < 0 ? rows - 1:y - 1];
        let secound = grid[x + 1 > cols - 1 ? 0:x + 1][y];
        let third = grid[x][y + 1 > rows - 1 ? 0:y + 1];
        let fourth = grid[x - 1 < 0 ? cols - 1:x - 1][y];
        return [first, secound, third, fourth];
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
    const r = Math.floor(Math.random() * 4);
    switch (r) {
        case value:
            
            break;
    
        default:
            break;
    }
}