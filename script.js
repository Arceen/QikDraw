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
ctx.lineWidth = "100";
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

// Other functions

const navPanel = document.getElementById("left-panel");
const navBarChangeButtonSVG = document.querySelector("#change-sides svg ");
const navBarChangeButton = document.getElementById("change-sides");
navBarChangeButton.addEventListener("pointerdown", () => {
  if (navPanel.style.left === "0px") {
    navPanel.style.left = "auto";
    navPanel.style.right = "0px";
    navBarChangeButtonSVG.style.transform = "rotate(180deg)";
  } else {
    navPanel.style.right = "auto";
    navPanel.style.left = "0px";
    navBarChangeButtonSVG.style.transform = "rotate(0deg)";
  }
});

// block on color selection
const colorSelection = document.getElementById("color-selection");
colorSelection.addEventListener("pointerover", (e) => {
  console.log("Take events");
  e.preventDefault();
  isDrawing = false;
});

const isMouseInElement = (element, event) => {
  const { left, top, right, bottom } = element.getBoundingClientRect();
  if (
    event.clientX >= left &&
    event.clientY >= top &&
    event.clientX <= right &&
    event.clientY <= bottom
  ) {
    return true;
  }
  return false;
};

document.addEventListener("pointerdown", (e) => {
  if(isMouseInElement(brushSizePanel, e)){
    return;
  }
  if (isMouseInElement(colorPicker, e)) {
    return;
  } else if (!isMouseInElement(colorSelection, e)) {
    console.log("Comes to document mousedown");
    colorSelection.style.display = "none";
  } else {
    colorSelection.style.display = "flex";
  }
});

// utils
// const colorPuck =

// // Color Picker logic
const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  console.log(colorSelection.style.display);
  if (colorSelection.style.display === "none") {
    console.log("INSIDE");
    console.log(colorSelection.style.display);
    colorSelection.style.display = "flex";
  }
});

// Handle Sliders

// Initialize

let colorVal1 = 0;
const slider1 = document.getElementById("slider1");
const sliderText1 = document.getElementById("slider1-value");

let colorVal2 = 0;
const slider2 = document.getElementById("slider2");
const sliderText2 = document.getElementById("slider2-value");

let colorVal3 = 0;
const slider3 = document.getElementById("slider3");
const sliderText3 = document.getElementById("slider3-value");

let colorVal4 = 1;
const slider4 = document.getElementById("slider4");
const sliderText4 = document.getElementById("slider4-value");

// Events

slider1.addEventListener("input", function () {
  colorVal1 = +slider1.value;
  sliderText1.innerText = "" + colorVal1;
  handleColorUpdate();
});

slider2.addEventListener("input", function () {
  colorVal2 = +slider2.value;
  sliderText2.innerText = "" + colorVal2;

  handleColorUpdate();
});

slider3.addEventListener("input", function () {
  colorVal3 = +slider3.value;
  sliderText3.innerText = "" + colorVal3;

  handleColorUpdate();
});

slider4.addEventListener("input", function () {
  colorVal4 = parseFloat(slider4.value, 2);
  sliderText4.innerText = "" + colorVal4;

  handleColorUpdate();
});

// handle when color is changed
const colorSelected = document.getElementById("color-selected");

const handleColorUpdate = () => {
  const parsedColor = `rgba(${colorVal1}, ${colorVal2}, ${colorVal3}, ${colorVal4})`;
  colorSelected.style.backgroundColor = parsedColor;
  colorPicker.style.backgroundColor = parsedColor;
  ctx.strokeStyle = parsedColor;
};

// brush size

const brushSizePanel = document.getElementById("brush-size-panel");
colorPicker.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  console.log(colorSelection.style.display);
  if (colorSelection.style.display === "none") {
    console.log("INSIDE");
    console.log(colorSelection.style.display);
    colorSelection.style.display = "flex";
  }
});

const sizeSlider =