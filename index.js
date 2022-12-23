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

let prevX = 0;
let prevY = 0;
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


// Functionality to Change color of the brush

color.addEventListener('change', (e)=>{
    ctx.strokeStyle = `${color.value}`;
})

// functionality to add background color to canvas
canvas_bg_color.addEventListener('change', ()=>{
    canvas.style.backgroundColor=`${canvas_bg_color.value}`;
    // console.log(canvas_bg_color.value)
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

canvas.addEventListener("click", (e)=>{
    console.log(e.offsetX, e.offsetY)
    console.log(canvas.width, canvas.height)
})

// 1. first see if we should draw or not
canvas.addEventListener("mousedown", (e) => is_drawing = true);
canvas.addEventListener("mouseup", (e) => is_drawing = false);


// 2. now make a line wherever the mouse goes
canvas.addEventListener("mousemove", function(e){

    // console.log("Mouse X: " + e.offsetX);
    // console.log("Mouse Y: " + e.offsetY);


    if(prevX == 0 || prevY == 0 || !is_drawing){
        prevX = e.offsetX;
        prevY = e.offsetY;
        return;
    }
    
    // var rect = e.target.getBoundingClientRect();
    // var x = e.clientX - rect.left; //x position within the element.
    // var y = e.clientY - rect.top;  //y position within the element.
   
    current_X = e.offsetX;
    current_Y = e.offsetY;
    

    console.log("Prev X is: "+prevX);
    console.log("Prev Y is: "+prevY);
    console.log("Current X: "+ current_X);
    console.log("Current Y: "+ current_Y);

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(current_X, current_Y);
    ctx.stroke();

    prevX = e.offsetX;
    prevY = e.offsetY;
})


// Adding functionality to our clear and download buttons

clear_btn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

download_btn.addEventListener("click", () => {
    let data = canvas.toDataURL("image/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "sketch.png"
    a.click()
})
