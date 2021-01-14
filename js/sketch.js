var yearBubbles = [];
let timeLineActive = true;
var yearDisplayer = document.getElementById("selectedYear");
let dataSetF1Races;
let dataSetF1Circuits;
var formula1Bold;
function preload() {
dataSetF1Races = loadJSON("http://student-1820877loo.mamdt.com/MMT-eindopdracht/JSON/races.json");
dataSetF1Circuits = loadJSON("http://student-1820877loo.mamdt.com/MMT-eindopdracht/JSON/circuits.json");
formula1Bold = loadFont('http://student-1820877loo.mamdt.com/MMT-eindopdracht/fonts/Formula1-Bold.otf');
}
function setup() {
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
  if (mouseX > 1150 && mouseX < 1725 && mouseY > 665 && mouseY < 997.5) {
    clear();
    timeLineActive = true;
  }
}
function yearIsSelected(year) {
  yearDisplayer.innerHTML = year;
  let currentRace;
  let currentPlace;
  var currentPlaceID;
  let currentDate;
  let glblX;
  let glblY;
  for (let i = 0; i < 996; i++) {

    if(dataSetF1Races[i].year === year) {
      currentRace = dataSetF1Races[i].round;
      currentPlaceID = dataSetF1Races[i].circuitId;
      currentPlace = dataSetF1Circuits[currentPlaceID - 1];
      currentDate = dataSetF1Races[i].date;

      console.log("Race is " + currentRace);
      console.log("ID is " + currentPlaceID);
      console.log(currentPlace);
      console.log("Date is " + currentDate);

      glblX = currentPlace.lng;
      glblY = currentPlace.lat;
      fill(225, 6, 0);
      ellipse(glblX, glblY, 10, 10);
      fill(255, 255, 255);
      text(currentPlace.circuitRef, glblX, glblY);
    }

  }

  fill(225, 6, 0);
  rect(1150, 665, 260, 30, 12);
  textSize(20);
  fill(255, 255, 255);
  text('back to the timeline', 1165, 687);

}

