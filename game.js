const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let d;
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

function collision(head, array) {
    for (let i = 1; i < array.length; i++) { // Changed i=0 to i=1
        if (head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    let newHead = { x: snakeX, y: snakeY };

    // 1. Wall and Self Collision Check
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || (d && collision(newHead, snake))) {
    clearInterval(game);
    alert("Game Over!");
    window.location.href = "index.html"; // Redirects back to the title screen
    return;
}
    // 2. Eating and Smart Food Respawn
    if (snakeX == food.x && snakeY == food.y) {
        let newFood;
        while (true) {
            newFood = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
            if (!collision(newFood, snake)) break;
        }
        food = newFood;
    } else {
        snake.pop();
    }

    snake.unshift(newHead);

    // 3. Render Snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // 4. Render Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}


let game = setInterval(draw, 100);
