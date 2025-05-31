// 간단한 메이플스토리 스타일의 점프&몬스터 피하기 게임
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const hero = {
    x: 80,
    y: 300,
    width: 40,
    height: 60,
    vy: 0,
    jumpPower: -13,
    gravity: 0.7,
    onGround: true,
    color: '#ffb347'
};

const monster = {
    x: 600,
    y: 320,
    width: 50,
    height: 50,
    speed: 5,
    color: '#b22222'
};

let gameOver = false;
let score = 0;

function drawHero() {
    ctx.fillStyle = hero.color;
    ctx.fillRect(hero.x, hero.y, hero.width, hero.height);
}

function drawMonster() {
    ctx.fillStyle = monster.color;
    ctx.fillRect(monster.x, monster.y, monster.width, monster.height);
}

function drawScore() {
    ctx.font = '24px Arial';
    ctx.fillStyle = '#222';
    ctx.fillText('점수: ' + score, 20, 40);
}

function updateHero() {
    hero.y += hero.vy;
    hero.vy += hero.gravity;
    if (hero.y + hero.height >= 360) {
        hero.y = 360 - hero.height;
        hero.vy = 0;
        hero.onGround = true;
    } else {
        hero.onGround = false;
    }
}

function updateMonster() {
    monster.x -= monster.speed;
    if (monster.x + monster.width < 0) {
        monster.x = 600 + Math.random() * 200;
        score++;
        monster.speed += 0.2; // 난이도 증가
    }
}

function checkCollision() {
    if (
        hero.x < monster.x + monster.width &&
        hero.x + hero.width > monster.x &&
        hero.y < monster.y + monster.height &&
        hero.y + hero.height > monster.y
    ) {
        gameOver = true;
    }
}

function drawGameOver() {
    ctx.font = '48px Arial';
    ctx.fillStyle = '#d32f2f';
    ctx.fillText('게임 오버!', 180, 200);
    ctx.font = '32px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText('최종 점수: ' + score, 210, 250);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHero();
    drawMonster();
    drawScore();
    if (!gameOver) {
        updateHero();
        updateMonster();
        checkCollision();
        requestAnimationFrame(gameLoop);
    } else {
        drawGameOver();
    }
}

document.addEventListener('keydown', function(e) {
    if ((e.code === 'Space' || e.key === ' ') && hero.onGround && !gameOver) {
        hero.vy = hero.jumpPower;
    }
});

function restartGame() {
    hero.y = 300;
    hero.vy = 0;
    monster.x = 600;
    monster.speed = 5;
    score = 0;
    gameOver = false;
    gameLoop();
}

gameLoop();
