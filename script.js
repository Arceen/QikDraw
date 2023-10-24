// element variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const scale = window.devicePixelRatio;
const aspectRatio = 4 / 3;

canvas.width = viewportWidth * scale;
canvas.height = (viewportWidth / aspectRatio) * scale;
canvas.style.width = viewportWidth + "px";
canvas.style.height = viewportWidth / aspectRatio + "px";
ctx.scale(scale, scale);

ctx.strokeStyle = "rgba(0, 0, 0)";
ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
ctx.lineCap = "round";
let [prev_x, prev_y] = [-1, -1];
let isDrawing = false;

//====== ALL FUNCTIONS  START ========
canvas.addEventListener("pointerdown", (e) => {
  isDrawing = true;
  setPosition(e);
});

canvas.addEventListener("pointermove", (e) => {
  if (isDrawing) {
    draw(e);
  }
});

canvas.addEventListener("pointerup", () => {
  isDrawing = false;
});

function setPosition(e) {
  const { x, y } = getMousePos(canvas, e);
  prev_x = x;
  prev_y = y;
}

function draw(e) {
  const { x, y } = getMousePos(canvas, e);
  ctx.beginPath();
  ctx.moveTo(prev_x, prev_y);
  ctx.lineTo(x, y);
  ctx.stroke();
  prev_x = x;
  prev_y = y;
}

// mouse function
function getMousePos(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

//====== ALL FUNCTIONS  END ========
