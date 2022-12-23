const brush = document.querySelector("#brush");
const eraser = document.querySelector("#eraser");
const pens = document.querySelectorAll("i-container");
const color = document.querySelector("#color-picker");
const canvas_bg_color = document.querySelector("#bg-color")
const width_val = document.querySelector(".width-val");
const inc_btn = document.querySelector("button.inc-width");
const dec_btn = document.querySelector("button.dec-width");
const clear_btn = document.querySelector(".clear");
const download_btn = document.querySelector("#download");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Some default values that we begin with

let prevX = null;
let prevY = null;
let current_X = 0;
let current_Y = 0;
let is_drawing = false;


ctx.strokeStyle = 'black';
ctx.lineWidth = 2;

// Set the initial Values

// initial width display
width_val.textContent = `${ctx.lineWidth}`;

// initial canvas background
canvas.style.backgroundColor = "white";


// Choose Brush or Eraser

brush.addEventListener('click', ()=>{
    eraser.classList.remove("active")
    brush.classList.add("active")
});

eraser.addEventListener('click', ()=>{
    brush.classList.remove('active')
    eraser.classList.add("active");
})

// Functionality to Change color of the brush

color.addEventListener('change', (e)=>{
    ctx.strokeStyle = `${color.value}`;
})

// functionality to add background color to canvas
canvas_bg_color.addEventListener('change', ()=>{
    canvas.style.backgroundColor=`${canvas_bg_color.value}`;
})

// Functionality of our Width Controller Buttons

inc_btn.addEventListener('click', ()=>{
    ctx.lineWidth++;
    width_val.textContent = `${ctx.lineWidth}`;
})

dec_btn.addEventListener('click', ()=>{
    ctx.lineWidth--;
    width_val.textContent = `${ctx.lineWidth}`;
})

// Drawing on our Canvas

// 1. first see if we should draw or not
canvas.addEventListener("mousedown", (e) => is_drawing = true);
canvas.addEventListener("mouseup", (e) => is_drawing = false);


// 2. now make a line wherever the mouse goes
canvas.addEventListener("mousemove", function(e){

    mouse_coords = getMousePos(canvas, e)

    if(prevX == null || prevY == null || !is_drawing){

        prevX = mouse_coords.x;
        prevY = mouse_coords.y;
        return;
    }
    
    current_X = mouse_coords.x;
    current_Y = mouse_coords.y;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(current_X, current_Y);
    ctx.stroke();

    prevX = current_X;
    prevY = current_Y;
})


// Adding functionality to our clear and download buttons

clear_btn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

download_btn.addEventListener("click", () => {
    let data = canvas.toDataURL("image/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "drawing.png"
    a.click()
})


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), 
      scaleX = canvas.width / rect.width, 
      scaleY = canvas.height / rect.height;
  
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY
    }
  }