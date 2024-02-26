let dataBar = []; 
let dataPie = [2756, 234,435,5456];
let colors=['pink','red','orange','yellow','brown'];
let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2Na0f_SOm4XT6zcd8SbeWnSaFA58V_2F759vP6KjtwxCw9lPyA-cf3nutYJT88MYny1EP35hTNH13/pub?gid=0&single=true&output=csv'
let dataSheet;
let urlAPI = "https://api.openweathermap.org/data/2.5/weather?q=lampung&appid=99f6ce2c7870643d25a8d65df342858f&units=metric";
let dataAPI;

let xData;
let yData;


function preload(){
  dataSheet = loadTable(url, 'csv', 'header');
  dataAPI = loadJSON(urlAPI);
}


function linePlot(xData, yData){
 
  var maxX = max(xData);
  var minX = min(xData);
  var maxY = max(yData);
  var minY = min(yData);
  var w = (windowWidth/2) / (xData.length-1);
  
  for (var i=0; i < xData.length; i++){
  var x1 = map(xData[i],
  minX,
  maxX,
  0,
  windowWidth/2 );
  var x2 = map(xData[i+1],
  minX,
  maxX,
  0,
  windowWidth/2 );
  var y1 = map(yData[i],
  minY,
  maxY,
  0,
  windowHeight/2 );
  var y2 = map(yData[i+1],
  minY,
  maxY,
  0,
  windowHeight/2 );
  line(i*w,
  windowHeight - y1,
       (i+1)*w,
  windowHeight - y2);
  ellipse(i*w,
  windowHeight - y1,10,10)
 }
}

function barPlot(dataBar){
 stroke('red');
 fill('pink');
 var maxBar = max(dataBar);
 var w = (windowWidth/2) / dataBar.length; 
 for (var i=0; i<dataBar.length;i++){
  var dat = map(dataBar[i], 0, maxBar, 0, windowHeight/2 )
  rect(i*w, windowHeight/2 - dat, w, dat)
 }
}


function persentase(arr){
  var tot = 0;
  for (var i=0; i<arr.length;i++){
    tot = tot + arr[i]
 }

  var per = []
  for (var i=0; i<arr.length;i++){
    per[i] = arr[i] / tot
 }
  return per
}


function piePlot(dataPie){
 let diameter = windowHeight / 3;
 let lastAngle = 0;
 var dataPer = persentase(dataPie);
 strokeWeight(4);
  
for (let i = 0; i < dataPer.length; i++) {
   var angles = dataPer[i] * 360;
   fill(colors[i])
   arc(
     windowWidth * 3 / 4,
     windowHeight * 1 / 4,
     diameter,
     diameter,
     lastAngle,
     lastAngle + radians(angles)
     );
  lastAngle += radians(angles);
 }
}

  
function infoCuaca(x, y, data,fontsize){
 textSize(fontsize)
 fill('white')
 stroke("white")
 text(data.name,
      posX = x,
      posY = y)
 text("Cuaca = "+ data.weather[0].main,
	posX = x,
 	posY = y + fontsize)
 text("Suhu = "+ data.main.temp,
 	posX = x ,
 	posY = y + 2*fontsize)
 text("Kecepatan angin = "+ data.wind.speed,
 	posX = x,
 	posY = y + 3*fontsize)
}
  
 


function setup() {
   createCanvas(windowWidth, windowHeight);
   for (var i = 0; i < 20; i++){
      dataBar[i] = random(0,100);
  }
  
  xData = dataSheet.getColumn('x');
  yData = dataSheet.getColumn('y');
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
 }



function draw() {
  background(20)
  
  stroke(255,255,255)
  strokeWeight(4);
  line(windowWidth/2, 0, windowWidth/2, windowHeight)
  line(0, windowHeight/2, windowWidth, windowHeight/2)
  barPlot(dataBar);
  piePlot(dataPie);
  linePlot(xData, yData);
  

  infoCuaca(
 	windowWidth * 3 / 5,           windowHeight * 3 / 4,dataAPI, windowWidth/40 )
  
 }
