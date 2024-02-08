const SIZE = 4;
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const WIDTH = Math.floor(canvas.width / SIZE),
    HEIGHT = Math.floor(canvas.height / SIZE);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "hsl(45, 35%, 63%)";
let mouseDown = false;

const makeGrid = (flag = false) => {
    let arr = new Array(HEIGHT);
    for (let i = 0; i < HEIGHT; i++) {
        arr[i] = new Array(WIDTH);
        for (let j = 0; j < WIDTH; j++) {
            arr[i][j] = 0;
            if (flag) arr[i][j] = Math.random() < 0.1 ? 1 : 0;
        }
    }
    return arr;
};

let grid = makeGrid(),
    nextGrid;

const animate = () => {
    nextGrid = makeGrid();
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (grid[i][j] != 0) {
                // below
                if (i != HEIGHT - 1 && grid[i + 1][j] == 0) {
                    nextGrid[i + 1][j] = grid[i][j];
                }
                // both below left & below right
                else if (
                    i != HEIGHT - 1 &&
                    j != 0 &&
                    j != WIDTH - 1 &&
                    grid[i + 1][j - 1] == 0 &&
                    grid[i + 1][j + 1] == 0
                ) {
                    const dir = Math.random() < 0.5 ? -1 : 1;
                    nextGrid[i + 1][j + dir] = grid[i][j];
                }
                // below left
                else if (i != HEIGHT - 1 && j != 0 && grid[i + 1][j - 1] == 0) {
                    nextGrid[i + 1][j - 1] = grid[i][j];
                }
                // below right
                else if (
                    i != HEIGHT - 1 &&
                    j != WIDTH - 1 &&
                    grid[i + 1][j + 1] == 0
                ) {
                    nextGrid[i + 1][j + 1] = grid[i][j];
                } else {
                    nextGrid[i][j] = grid[i][j];
                }
            }
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (nextGrid[i][j] != 0) {
                ctx.fillStyle = `hsl(45, 35%, ${nextGrid[i][j]}%)`;
                ctx.fillRect(j * SIZE, i * SIZE, SIZE, SIZE);
            }
        }
    }
    grid = nextGrid;

    setTimeout(() => {
        animate();
    }, 5);
};

animate();

canvas.onmousemove = (e) => {
    e.preventDefault();
    if (mouseDown) {
        const row = Math.floor(e.clientY / SIZE),
            col = Math.floor(e.clientX / SIZE),
            val = 5;
        for (let i = -val; i <= val; i++) {
            for (let j = -val; j <= val; j++) {
                const r = row + i,
                    c = col + j;
                if (
                    r >= 0 &&
                    r < HEIGHT &&
                    c >= 0 &&
                    c < WIDTH &&
                    grid[r][c] == 0 &&
                    Math.random() < 0.25
                ) {
                    grid[r][c] = Math.floor(Math.random() * (90 - 40) + 40);
                }
            }
        }
    }
};
canvas.ontouchmove = (e) => {
    e.preventDefault();
    if (mouseDown) {
        const row = Math.floor(e.touches[0].clientY / SIZE),
            col = Math.floor(e.touches[0].clientX / SIZE),
            val = 5;
        for (let i = -val; i <= val; i++) {
            for (let j = -val; j <= val; j++) {
                const r = row + i,
                    c = col + j;
                if (
                    r >= 0 &&
                    r < HEIGHT &&
                    c >= 0 &&
                    c < WIDTH &&
                    grid[r][c] == 0 &&
                    Math.random() < 0.25
                ) {
                    grid[r][c] = Math.floor(Math.random() * (90 - 40) + 40);
                }
            }
        }
    }
};
canvas.onmousedown = () => (mouseDown = true);
canvas.onmouseup = () => (mouseDown = false);
canvas.ontouchstart = () => (mouseDown = true);
canvas.ontouchend = () => (mouseDown = false);
