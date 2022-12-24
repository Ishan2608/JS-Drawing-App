document.addEventListener('DOMContentLoaded', start_script);

function start_script(){
    // -------------------------------------------------------------
    // SELECTING OUR DOM CONTENTS
    // -------------------------------------------------------------

    // SELECT THE DIV THAT REPRESENT BRUSH AND ERASER. ALSO SELECT THE ERASER ITSELF

    // the clickable div representing brush
    const brush_icon = document.querySelector("#brush");
    // the clickable div representing eraser
    const eraser_icon = document.querySelector("#eraser");
    // the actual eraser
    const eraser = document.querySelector('.eraser')

    // SELECT THE COLOR PICKERS OF OUR APP

    // brush color picker
    const color = document.querySelector("#color-picker");
    // canvas background color picker
    const canvas_bg_color = document.querySelector("#bg-color")

    // SELECT THE TEXT THAT SHOWS THE CURRENT PEN AND ITS SIZE
    const width_text = document.querySelector(".width-text")
    const width_val = document.querySelector(".width-val");

    // SELECT THE BUTTONS THAT MANIPULATE SIZE OF PEN
    const inc_btn = document.querySelector("button.inc-width");
    const dec_btn = document.querySelector("button.dec-width");

    // SELECT THE MAJOR BUTTONS - CLEAR BUTTON AND DOWNLOAD BUTTON
    const clear_btn = document.querySelector(".clear");
    const download_btn = document.querySelector("#download");

    // SELECT THE CANVAS ITSELF
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // -------------------------------------------------------------
    // SOME DEFAULT VALUES THAT WE BEGIN WITH
    // -------------------------------------------------------------

    let prevX = null;
    let prevY = null;
    let current_X = 0;
    let current_Y = 0;
    let is_drawing = false;

    let mouse_coords = null

    ctx.strokeStyle = 'black'

    let choice = "Brush";

    // Display the initial Values of pen and its size
    setChoice()


    // initial size display
    if (choice === "Brush"){
        ctx.lineWidth = 2;
        width_val.textContent = `${ctx.lineWidth}`;
    }

    else{
        width_val.textContent = `${eraser.offsetWidth}`;
    }

    // initial canvas background
    canvas.style.backgroundColor = "white";

    // -------------------------------------------------------------
    // DEFINING UTILITY FUNCTIONS
    // -------------------------------------------------------------

    // Choose Brush or Eraser

    // display or hide eraser. Display the pen and its size
    function setChoice(){
        width_text.textContent = `${choice} Size :`;
        if (choice === "Eraser"){
            eraser.style.display = "block";
            width_val.textContent = eraser.offsetWidth;
        } else{
            eraser.style.display = "none";
        }
    }


    // get mouse coordinates inside the canvas
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(), 
        scaleX = canvas.width / rect.width, 
        scaleY = canvas.height / rect.height;
    
        return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
        }
    }

    // get eraser dimensions
    function getEraserDimensions(){
        let width = eraser.offsetWidth;
        let height = eraser.offsetHeight;
        return {w: width, h: height}
    }

    // -------------------------------------------------------------
    // DEFINING EVENT LISTENERS
    // -------------------------------------------------------------

    // when brush icon is clicked, it should be shown as active
    brush_icon.addEventListener('click', ()=>{
        eraser_icon.classList.remove("active");
        brush_icon.classList.add("active");
        choice = "Brush";
        // display the pen and its size
        setChoice()
    });

    // when eraser icon is clicked, it should be shown as active
    eraser_icon.addEventListener('click', ()=>{
        brush_icon.classList.remove('active');
        eraser_icon.classList.add("active");
        is_drawing = false;
        choice = "Eraser";
        // display the pen and its size
        setChoice()
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
        if (choice === "Brush"){
            ctx.lineWidth++;
            width_val.textContent = `${ctx.lineWidth}`;
        }
        else{
            
            eraser_dims = getEraserDimensions();
            eraser_dims.w += 5;
            eraser_dims.h += 5;
            eraser.style.width = `${eraser_dims.w}px`;
            eraser.style.height = `${eraser_dims.h}px`;
            width_val.textContent = `${eraser_dims.w}`;
        }
    })

    dec_btn.addEventListener('click', ()=>{
        if (choice === "Brush"){
            ctx.lineWidth--;
            width_val.textContent = `${ctx.lineWidth}`;
        }
        else{
            eraser_dims = getEraserDimensions();
            eraser_dims.w -= 5;
            eraser_dims.h -= 5;
            eraser.style.width = `${eraser_dims.w}px`;
            eraser.style.height = `${eraser_dims.h}px`;
            width_val.textContent = `${eraser_dims.w}`;
        }
    })



    // -------------------------------------------------------------
    // DRAWING ON CANVAS
    // -------------------------------------------------------------

    // 1. first see if we should draw or not
    canvas.addEventListener("mousedown", (e) => is_drawing = true);
    canvas.addEventListener("mouseup", (e) => is_drawing = false);


    // 2. now make a line wherever the mouse goes
    canvas.addEventListener("mousemove", function(e){

        mouse_coords = getMousePos(canvas, e)

        if(choice === "Brush"){

            // set the starting point of the line to draw
            if(prevX == null || prevY == null || !is_drawing){
                prevX = mouse_coords.x;
                prevY = mouse_coords.y;
                return;
            }
            
            // set the current point, till which we draw line
            current_X = mouse_coords.x;
            current_Y = mouse_coords.y;

            // draw line
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(current_X, current_Y);
            ctx.stroke();

            // set prev point to current point for next points
            prevX = current_X;
            prevY = current_Y;
        }

        // If the user has chosen eraser, display the eraser and move it.
        else{
            eraser.style.top = mouse_coords.x;
            eraser.style.left = mouse_coords.y; 
            
        }
    })


    // Adding functionality to our clear and download buttons

    clear_btn.addEventListener("click", () => {
        ctx.fillStyle = canvas_bg_color.value;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    })

    download_btn.addEventListener("click", () => {
        let data = canvas.toDataURL("image/png")
        let a = document.createElement("a")
        a.href = data
        a.download = "drawing.png"
        a.click()
    })


}