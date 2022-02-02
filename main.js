video = "";
model_status = "";
objects = [];

function preload() {
    video = createVideo("video.mp4");
}

function setup() {
    canvas = createCanvas(480,380);
    canvas.center()
    video.hide()
}

function start() {
    objectsDetected = ml5.objectDetector('cocossd' , modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded")
    video.play()
    video.speed(1)
    video.volume(0)
    model_status = true
}

function draw() {
    image(video,0,0,480,380)
    if(model_status != ""){
        objectsDetected.detect(video,gotResults)
        for(i=0 ; i<objects.length ; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected"
            document.getElementById("objects").innerHTML = "Number of Objects Detected: "+objects.length

            fill("red")
            percent = Math.floor(objects[i].confidence *100)
            text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[0].width , objects[0].height)
        }
    }
}

function gotResults(error , results) {
    if(error){
        console.error(error)
    }else{
        console.log(results)
        objects = results
    }
}