const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "rgba(0, 0, 0)";
ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
ctx.lineCap = "round";
let [mouse_x, mouse_y] = [-1, -1];
let [prev_x, prev_y] = [mouse_x, mouse_y];
let shouldUpdate = false;
let isDrawing = false;

document.addEventListener("pointerdown", (e) => {
  isDrawing = true;
  const {
    x: tx,
    y: ty,
    left,
    top,
    right,
    bottom,
  } = canvas.getBoundingClientRect();
  if (
    e.clientX < left ||
    e.clientY < top ||
    e.clientX > right ||
    e.clientY > bottom
  )
    return;
  prev_x = mouse_x = e.clientX - tx;
  prev_y = mouse_y = e.clientY - ty;
});
document.addEventListener("pointerup", (e) => {
  isDrawing = false;
  prev_x = mouse_x;
  prev_y = mouse_y;
});

document.addEventListener("pointermove", (e) => {
  if (!isDrawing) return;
  const {
    x: tx,
    y: ty,
    left,
    top,
    right,
    bottom,
  } = canvas.getBoundingClientRect();
  if (
    e.clientX < left ||
    e.clientY < top ||
    e.clientX > right ||
    e.clientY > bottom
  )
    return;
  mouse_x = e.clientX - tx;
  mouse_y = e.clientY - ty;
});

const draw = () => {
  ctx.beginPath();
  ctx.moveTo(prev_x, prev_y);
  ctx.lineTo(mouse_x, mouse_y);
  ctx.stroke();
  prev_x = mouse_x;
  prev_y = mouse_y;
};
const update = () => {
  if (!isDrawing) return;

  draw();
};

setInterval(() => {
  update();
}, 60);
