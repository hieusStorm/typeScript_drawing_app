const canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const colorPicker : HTMLInputElement = <HTMLInputElement>document.getElementById("colorPicker");
const clearButton : HTMLInputElement = <HTMLInputElement>document.querySelector("input[type='button']");
let draw: boolean  = false;
let color: string = "black";

// event listeners
// add an event event listener that draw when the mouse is clicked
if(canvas) { 
    canvas.addEventListener("mousedown", (event)=> {
        draw = true
        let mouseX : number = event.clientX;
        let mouseY : number = event.clientY;
        drawing(mouseX, mouseY);
    }); 
    canvas.addEventListener("mouseup", ()=> draw = false);
    canvas.addEventListener("mousemove", (event)=> {
        let mouseX : number = event.clientX;
        let mouseY : number = event.clientY;
        drawing(mouseX, mouseY);
    });
} else {
    console.error("Canvas is not availble");
}

// Add event to change the current color
if (colorPicker) {
    colorPicker.addEventListener("change", ()=> color = colorPicker.value);
} else {
    console.error("Color Picker isn't available");
}

// Add event to clear the screen
if (clearButton) {
    clearButton.addEventListener("click", ()=> {
        let ctx : CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas?.getContext("2d");
        ctx?.clearRect(0,0, canvas.width, canvas.height);
    });
} else {
    console.error("Can't clear the screen please refresh to clear");
    alert("Can't clear the screen please refresh to clear")
}


async function drawing(mouseX : number, mouseY : number) {
    if (draw) {
        
        const ctx = canvas?.getContext("2d");

        // Get the actual position of the mouse
        // determine how to scale x and y based on the canvas tag
        let rect = canvas?.getBoundingClientRect();
        let scaleX : number = canvas?.width / rect?.width;
        let scaleY : number = canvas?.height / rect?.height;

        let xPos : number = (mouseX - rect?.left) * scaleX;
        let yPos : number = (mouseY - rect?.top) * scaleY;

        // Draw the circle
        if(ctx) {
            ctx.beginPath();
            ctx.arc(xPos, yPos, 5, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        } else {
            console.error("Couldn't get context of the canvas element");
        }
    } else {
        return;
    }
}