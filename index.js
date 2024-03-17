const canvas = document.querySelector("canvas")

canvas.height = innerHeight
canvas.width = innerWidth

const app = canvas.getContext("2d");
addEventListener("resize",()=>{
    canvas.height = innerHeight
    canvas.width = innerWidth
})

const mouse = {
    x: innerWidth/2,
    y: innerHeight/2
}

addEventListener("mousemove",(event)=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

// contrustion fun

function SupperClass(x,y,radius,color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distance = (Math.random() * 120 + 50) + 50
    this.lastMouse = {x:x,y:y}
    this.design = function(values){
        app.beginPath();
        app.strokeStyle = this.color;
        app.lineWidth = this.radius;
        app.moveTo(values.x,values.y);
        app.lineTo(this.x,this.y);
        app.stroke();
        app.closePath();
    }
    this.anime = function(){
        const lastLocation = {
            x:this.x,
            y:this.y
        }
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.03;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.03;
        this.radians += this.velocity;
        this.x = this.lastMouse.x +  Math.cos(this.radians) * this.distance;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance;
        this.design(lastLocation)
    }
}

// creating new instances
let objArray;
function init(){
    objArray = []
    const x = innerWidth/2
    const y = innerHeight/2
    for(let i =0;i<50;i++){
        const radius = Math.random() * 5 + 1
        const color = `rgb(${Math.random() * 255},
    ${Math.random() *255},${Math.random() * 255})`
        objArray.push(new SupperClass(x,y,radius,color))
    }
}


// animation

function animate(){
    requestAnimationFrame(animate);
    app.fillStyle = "rgba(255,255,255,0.05)"
    app.fillRect(0,0,canvas.width,canvas.height)
    objArray.forEach(element => {
        element.anime()
        console.log(element)
    });
}

init()
animate()