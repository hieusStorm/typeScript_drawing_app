const canvas = document.getElementById("canvas");
const colorPicker = document.getElementById("colorPicker");
const clearButton = document.querySelector("input[type='button']");
let draw = false;
let color = "black";
// event listeners
// add an event event listener that draw when the mouse is clicked
if (canvas) {
    canvas.addEventListener("mousedown", (event) => {
        draw = true;
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        drawing(mouseX, mouseY);
    });
    canvas.addEventListener("mouseup", () => draw = false);
    canvas.addEventListener("mousemove", (event) => {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        drawing(mouseX, mouseY);
    });
}
else {
    console.error("Canvas is not availble");
}
// Add event to change the current color
if (colorPicker) {
    colorPicker.addEventListener("change", () => color = colorPicker.value);
}
else {
    console.error("Color Picker isn't available");
}
// Add event to clear the screen
if (clearButton) {
    clearButton.addEventListener("click", () => {
        let ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}
else {
    console.error("Can't clear the screen please refresh to clear");
    alert("Can't clear the screen please refresh to clear");
}
function drawing(mouseX, mouseY) {
    if (draw) {
        const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
        // Get the actual position of the mouse
        // determine how to scale x and y based on the canvas tag
        let rect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
        let scaleX = (canvas === null || canvas === void 0 ? void 0 : canvas.width) / (rect === null || rect === void 0 ? void 0 : rect.width);
        let scaleY = (canvas === null || canvas === void 0 ? void 0 : canvas.height) / (rect === null || rect === void 0 ? void 0 : rect.height);
        let xPos = (mouseX - (rect === null || rect === void 0 ? void 0 : rect.left)) * scaleX;
        let yPos = (mouseY - (rect === null || rect === void 0 ? void 0 : rect.top)) * scaleY;
        // Draw the circle
        if (ctx) {
            ctx.beginPath();
            ctx.arc(xPos, yPos, 5, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }
        else {
            console.error("Couldn't get context of the canvas element");
        }
    }
    else {
        return;
    }
}
