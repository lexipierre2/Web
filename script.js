window.addEventListener("load", function () {
    var GAME_WIDTH = 640;
    var GAME_HEIGHT = 340;
  
    var gameLive = false;
    var level = 1;
    var life = 5;
  
    var selectedCharacter = null;
  
    var enemies = [
      { x: 100, y: 100, speedY: 2, w: 40, h: 40 },
      { x: 200, y: 0, speedY: 2, w: 40, h: 40 },
      { x: 330, y: 100, speedY: 3, w: 40, h: 40 },
      { x: 450, y: 100, speedY: -3, w: 40, h: 40 }
    ];
  
    var player = {
      x: 10,
      y: 160,
      speedX: 2,
      isMoving: false,
      w: 40,
      h: 40
    };
  
    var goal = {
      x: 580,
      y: 160,
      w: 50,
      h: 36
    };
  
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
  
    var sprites = {
      characters: {
        char1: "player1.png",
        char2: "player2.png",
        char3: "player3.png"
      },
      player: new Image(),
      enemy: new Image(),
      goal: new Image()
    };
  
    sprites.enemy.src = "enemy.png";
    sprites.goal.src = "goal.png";
  
    function showCharacterSelect() {
      var container = document.createElement("div");
      container.id = "character-select";
      container.style.position = "absolute";
      container.style.top = "50%";
      container.style.left = "50%";
      container.style.transform = "translate(-50%, -50%)";
      container.style.background = "rgba(0,0,0,0.8)";
      container.style.padding = "20px";
      container.style.borderRadius = "10px";
      container.style.textAlign = "center";
      container.style.zIndex = "1000";
  
      var title = document.createElement("h2");
      title.innerText = "Choose Your Character";
      title.style.color = "white";
      container.appendChild(title);
  
      Object.entries(sprites.characters).forEach(([key, src]) => {
        var img = document.createElement("img");
        img.src = src;
        img.style.width = "60px";
        img.style.height = "60px";
        img.style.margin = "10px";
        img.style.cursor = "pointer";
        img.onclick = function () {
          sprites.player.src = src;
          selectedCharacter = key;
          document.body.removeChild(container);
          gameLive = true;
          step();
        };
        container.appendChild(img);
      });
  
      document.body.appendChild(container);
    }
  
    var movePlayer = function () {
      player.isMoving = true;
    };
  
    var stopPlayer = function () {
      player.isMoving = false;
    };
  
    window.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        movePlayer();
      }
    });
  
    window.addEventListener("keyup", function (e) {
      if (e.key === "ArrowRight") {
        stopPlayer();
      }
    });
  
    var update = function () {
      if (checkCollision(player, goal)) {
        document.getElementById("winPopup").style.display = "flex";
        level += 1;
        life += 1;
        player.speedX += 1;
        player.x = 10;
        player.y = 160;
        player.isMoving = false;
  
        enemies.forEach(function (enemy) {
          enemy.speedY += (enemy.speedY > 1) ? 1 : -1;
        });
      }
  
      if (player.isMoving) {
        player.x += player.speedX;
      }
  
      enemies.forEach(function (enemy) {
        if (checkCollision(player, enemy)) {
          if (life === 0) {
            document.getElementById("winPopup").style.display = "flex";
            enemies.forEach(function (e) {
              e.speedY += (e.speedY > 1) ? -(level - 1) : (level - 1);
            });
            level = 1;
            life = 6;
            player.speedX = 2;
          }
  
          if (life > 0) {
            life -= 1;
          }
  
          player.x = 10;
          player.y = 160;
          player.isMoving = false;
        }
  
        enemy.y += enemy.speedY;
  
        if (enemy.y <= 10 || enemy.y >= GAME_HEIGHT - 50) {
          enemy.speedY *= -1;
        }
      });
    };
  
    var draw = function () {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
      ctx.font = "12px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Level : " + level, 10, 15);
      ctx.fillText("Life : " + life, 10, 35);
      ctx.fillText("Speed : " + player.speedX, 10, 55);
  
      ctx.drawImage(sprites.player, player.x, player.y, player.w, player.h);
  
      enemies.forEach(function (enemy) {
        ctx.drawImage(sprites.enemy, enemy.x, enemy.y, enemy.w, enemy.h);
      });
  
      ctx.drawImage(sprites.goal, goal.x, goal.y, goal.w, goal.h);
    };
  
    var step = function () {
      if (gameLive) {
        update();
        draw();
        window.requestAnimationFrame(step);
      }
    };
  
    var checkCollision = function (rect1, rect2) {
      var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
      var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
      return closeOnWidth && closeOnHeight;
    };
  
    showCharacterSelect();
  });
  function closePopup() {
    document.getElementById("winPopup").style.display = "none";
  }
  function closePopup() {
    document.getElementById("winPopup").style.display = "none";
  }