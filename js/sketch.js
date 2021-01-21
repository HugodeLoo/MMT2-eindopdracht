var yearBubbles = [];
var placeBubbles = [];
let timeLineActive = true;
let raceOverlay = false;
var yearDisplayer = document.getElementById("selectedYear");
var myTerminal = document.getElementById("myTerminal");

let dataSetF1;
var formula1Bold;

function preload() {
dataSetF1 = loadJSON("JSON/f1data.json");
formula1Bold = loadFont('fonts/Formula1-Bold.otf');
}

function setup() {
  console.log(dataSetF1);
  var myCanvas = createCanvas(1455, 722);
  myCanvas.parent("canvasHolder");
  textFont(formula1Bold);
  for(var i = 0; i < 64; i++){
    yearBubbles[i] = {
      x: 0,
      y: 317,
      r: 15,
      year: 0,
      display: function(j){
        this.x = j * this.r*1.5 + this.r*1.25;
        if (j % 2 == 1) {
          this.y = 403;
        }
        fill(225, 6, 0);
        strokeWeight(10);
        ellipse(this.x, this.y, this.r*2, this.r*2);
        this.year = j + 1950;
        textSize(10);
        fill(0, 0, 0);
        strokeWeight(0);
        text(this.year, this.x - this.r, this.y + this.r/2.8);
      },
      clicked: function(){
        var d = dist(mouseX, mouseY, this.x, this.y);
        if(d < this.r){
          clear();
          timeLineActive = false;
          yearIsSelected(this.year);
        }
      }
    }
  }
}

function draw() {
  background(48, 48, 48, 0.0);
  if(timeLineActive == true) {
    drawTimeline();
  }
}

function drawTimeline() {
  background(48, 48, 48);
  strokeWeight(10);
  stroke(225, 6, 0)
  line(0, 360, 1455, 360);
  for (var i = 0; i < yearBubbles.length; i++) {
    yearBubbles[i].display(i);
  }
}

function mousePressed() {
  if( timeLineActive == true){
    for (let i = 0; i < yearBubbles.length; i++) {
      yearBubbles[i].clicked();
    }
  }
  if (timeLineActive == false){
    for (let i = 0; i < placeBubbles.length; i++) {
      placeBubbles[i].clicked();
    }
  }
  if (raceOverlay == false) {
    if (mouseX > 1150 && mouseX < 1725 && mouseY > 665 && mouseY < 997.5) {
      clear();
      timeLineActive = true;
    }
  }
  if (raceOverlay == true) {
    if (mouseX > 1185 && mouseX < 1400 && mouseY > 640 && mouseY < 670) {
      clear();
      raceOverlay = false;
      drawPlaces();
    }
  }
}

function yearIsSelected(year) {
  yearDisplayer.innerHTML = year;
  placeBubbles = [];
  ncrementer = 0;
  for (let i = 0; i < 897; i++) {

    if(dataSetF1[i].year === year) {

      placeBubbles[ncrementer] = {
        x: dataSetF1[i].circuit.lng,
        y: dataSetF1[i].circuit.lat,
        r: 5,
        raceId: dataSetF1[i].raceId,
        display: function(){

          fill(225, 6, 0);
          ellipse(this.x, this.y, this.r*2, this.r*2);
          for (let j = 0; j < 897; j++) {
            if(dataSetF1[j].raceId == this.raceId){
              textSize(12);
              fill(255, 255, 255);
              text(dataSetF1[j].circuit.circuitRef, this.x, this.y);
            }
          }
        },
        clicked: function(){
          var d = dist(mouseX, mouseY, this.x, this.y);
          if(d < this.r){
            venueIsSelected(this.raceId);
          }
        }
      }
      ncrementer = ncrementer + 1;
    }

  }
  console.log(placeBubbles);
  drawPlaces();

}

function drawPlaces() {

  for (var j = 0; j < placeBubbles.length; j++) {
    placeBubbles[j].display();
  }

  fill(225, 6, 0);
  rect(1150, 665, 260, 30, 12);
  textSize(20);
  fill(255, 255, 255);
  text('back to the timeline', 1165, 687);

}

function venueIsSelected(raceId) {
  raceOverlay = true;

  for (let i = 0; i < 897; i++) {
    if(dataSetF1[i].raceId == raceId){
      myTerminal.innerHTML = dataSetF1[i].circuit.circuitRef;

      rect(15, 15, 1425, 692, 20);

      stroke(225, 6, 0);
      strokeWeight(10);
      noFill();
      strokeCap(SQUARE);

      beginShape();

      vertex(400, 30);
      vertex(1410, 30);
      quadraticVertex(1425, 30, 1425, 45);
      vertex(1425, 677);
      quadraticVertex(1425, 692, 1410, 692);
      vertex(45, 692);
      endShape();

      fill(225, 6, 0);
      rect(1185, 640, 215, 30, 12);
      noStroke();
      textSize(20);
      fill(255, 255, 255);
      text('back to the map', 1198, 662);

    }
  }
}
