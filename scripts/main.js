
var linValue = 2;
var logValue = 100;




// Deze functie zal de input uit het element halen, omvormen en tonen
function convertNumber(element){


  if(element.id == "linInput" && element.value != 0){
    linValue = element.value;

    logValue =  Math.log10(linValue);

    document.getElementById("logInput").value = logValue;

  }else if(element.value == 0){

    document.getElementById("logInput").value = "NaN, Error, log10(0) = -oneindig";

  }

  if(element.id == "logInput" ){

    logValue = element.value;

    linValue =  Math.pow(10, logValue);

    document.getElementById("linInput").value = linValue;
    
  }

  main();


}

/*
* Dit is een grafische versie
* Deze werkt nog niet volledig
* En is nog niet duidelijk gecommend
*/


var canvas;
var tekenObj;
var dpi;

var scale = 1;

var originalHeight ;
var originalWidth ;

var height ;
var width ;






// Als alle html objecten zijn galden, roep dan initialiseer
window.onload = initialiseer;

// Maak een enum(= soort van nieuw data type)
const scaleType={
  LIN: "linear",
  LOG: "logaritmisch"


}
var xAs={
  scale:scaleType.LIN,
  start: 80,
  einde: 380
};

var yAs={
  scale:scaleType.LOG,
  start: 400,
  einde: 0
};

var xScale = scaleType.LIN;
var yScale = scaleType.LIN;



// Hier gebuuren alle hoofdzaken
function main(){

  scaleAll();
  tekenObj.scale(scale,scale);

  tekenObj.strokeStyle = "#000000";


  tekenObj.fillRect(mapXToLinCO(linValue) - 1, 400 - 2,5,5);

  if(yAs.scale == scaleType.LIN){
    downArrow(mapXToLinCO( linValue) + 1.5, yAs.start - 7, "Linear getal");
  }else if(yAs.scale == scaleType.LOG){
    downArrow(mapXToLogCO( linValue) + 1.5, yAs.start - 7, "Linear getal");
  }

  if(xAs.scale == scaleType.LIN){
    leftArrow(xAs.start + 7, mapYToLinCO(linValue), "Logaritmisch getal");
  }else if(xAs.scale == scaleType.LOG){
    leftArrow(xAs.start + 7, mapYToLogCO(linValue), "Logaritmisch getal");
  }




  tekenAssen()

}


function tekenAssen(){


  tekenObj.beginPath();

  tekenObj.moveTo(80, 2);
  tekenObj.lineTo(75, 10);
  tekenObj.lineTo(85, 10);
  tekenObj.fill();

  tekenObj.strokeStyle = "#000000";
  tekenObj.moveTo(80, 5)
  tekenObj.lineTo(80, 450);
  tekenObj.moveTo(30, 400);
  tekenObj.lineTo(380, 400);
  tekenObj.stroke();
  tekenObj.closePath();

  tekenObj.moveTo(390,400);
  tekenObj.lineTo(380, 395);
  tekenObj.lineTo(380, 405);
  tekenObj.fill();


  // Cijfers op grafiek


  if(yAs.scale == scaleType.LIN){
    for (var i = 1; i < 10;i++){
      tekenObj.fillRect(mapXToLinCO(-0.16),mapYToLinCO(i),10,3);

      tekenObj.fillText(i+" ", mapXToLinCO(-0.16)-10,mapYToLinCO(i));
    }
  }else if(yAs.scale == scaleType.LOG){
    for (var i = 1; i < 10;i++){
      tekenObj.fillRect(mapXToLinCO(-0.16),mapYToLinCO(i),10,3);

      tekenObj.fillText("10"+(((i - 1) != 0)?"e"+(i - 1):""), mapXToLinCO(-1)-10,mapYToLinCO(i));
    }
  }
  if(xAs.scale == scaleType.LIN){
    for (var i = 1; i < 10;i++){
      tekenObj.fillRect(mapXToLinCO(i),mapYToLinCO(0.13),3,10);

      tekenObj.fillText(i+" ", mapXToLinCO(i),mapYToLinCO(0.13)+20);
    }
  }else if(xAs.scale == scaleType.LOG){
    for (var i = 1; i < 10;i++){
      tekenObj.fillRect(mapXToLinCO(i),mapYToLinCO(0.13),3,10);

      tekenObj.fillText("10"+(((i - 1) != 0)?"e"+(i - 1):""), mapXToLinCO(i)-10,mapYToLinCO(0.13)+20);
    }
  }

}

function leftArrow(x, y, text) {

  tekenObj.beginPath();
  tekenObj.moveTo(x, y);
  tekenObj.lineTo(x+20, y-5);
  tekenObj.lineTo(x+20, y+5);
  tekenObj.fill();

  tekenObj.lineWidth = 3;
  tekenObj.beginPath();
  tekenObj.moveTo(x+10, y);
  tekenObj.lineTo(x+33, y);
  tekenObj.stroke();
  tekenObj.closePath();

  tekenObj.lineWidth = 2;

  tekenObj.fillText(text,x+25,y-5);

}

function downArrow(x, y,text) {

  tekenObj.beginPath();
  tekenObj.moveTo(x, y);
  tekenObj.lineTo(x-5, y-20);
  tekenObj.lineTo(x+5, y-20);
  tekenObj.fill();

  tekenObj.lineWidth = 3;
  tekenObj.beginPath();
  tekenObj.moveTo(x, y-10);
  tekenObj.lineTo(x, y-33);
  tekenObj.stroke();
  tekenObj.closePath();

  tekenObj.lineWidth = 2;

  tekenObj.fillText(text,x,y-37);
}

// Deze functie wordt geroepen waneer er input wordt gegeven
function scaleInput(element){

  // Zet de waarden tussen een minimum en maximun
  value = Math.min( Math.max(element.value, 0.00005), 1000000000);
  scale = value;


  main();
}



function mapValue(min, max, mapMin, mapMax, value) {
  //console.log("(  (("+max+" - "+min+") / "+value+") ("+mapMax+"-"+mapMin+")) + "+mapMin+"="+(((max - min) / value) * (mapMax-mapMin)) + mapMin)

  //(( (value-min) / (max - min) ) * (mapMax - mapMin)) + mapMin
  var x = value - min;
  x /= max - min;
  x *= mapMax - mapMin;
  x += mapMin
  return x;


}

function mapXToLinCO(x){
    return mapValue(0,10,xAs.start,xAs.einde,x);
}
function mapYToLinCO(y){
  return mapValue(0,10,yAs.start,yAs.einde,y)
}

function mapXToLogCO(x){
    return mapValue(0,Math.pow(10,8),xAs.start,xAs.einde,x);
}
function mapYToLogCO(y){
  return mapValue(0,Math.pow(10,8),yAs.start,yAs.einde,y)
}

function scaleAll(){


  console.log("scaling...");


  canvas.width = scale * originalWidth ;
  canvas.height = scale * originalHeight;

  canvas.style.width = `${scale * originalWidth}px`;
  canvas.style.height = `${scale * originalHeight}px`;

  tekenObj.scale(scale,scale);

  fix_dpi();
}


function fix_dpi() {

  height = getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
  width =  getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);


  //set the correct attributes for a crystal clear image!
  canvas.setAttribute('width', width * dpi);
  canvas.setAttribute('height', height * dpi);

  /*height = getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
  width =  getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);*/
}

// initialiseerd (=aanmaken) alle nodige dingen zoals het canvas maaken
function initialiseer() {

  dpi = window.devicePixelRatio;

  // sla het canvas op in een variable ( eigenlijk een referentie naar het object)
  canvas = document.getElementById("canvas");

  originalHeight = getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
  originalWidth =  getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);

  // maak een object dat renderen (=tekenen) naar het canvas
  tekenObj = canvas.getContext("2d");

  tekenObj.scale(scale,scale);

  // Je moet de pixels "stardelen", zo dat ze niet wazig zijn (probber maar weg te doen als bewijs)
  //tekenObj.translate(0.5, 0.5);
  fix_dpi()
  // Na dat alles is klaar gezet start het pogramma
  main();
}



// een basis toggel functie
// zodat je niet lin en log samen kan hebben
function toggel(element){

  var checkbox = document.getElementById(element.id);

  switch (element.id) {
    case "logX":
      document.getElementById("linX").checked = !element.checked;
      break;
    case "linX":
      document.getElementById("logX").checked = !element.checked;
      break;


    case "logY":
      document.getElementById("linY").checked = !element.checked;
      break;
    case "linY":
      document.getElementById("logY").checked = !element.checked;
      break;


  }



  if (element.id == "logX" && element.checked){
    xAs.scale = scaleType.LOG;
  }else if(element.id == "logX" && !element.checked){
    xAs.scale = scaleType.LIN;
  }

  if (element.id == "linX" && element.checked){
    xAs.scale = scaleType.LIN;
  }else if(element.id == "linX" && !element.checked){
    xAs.scale = scaleType.LOG;
  }

  if (element.id == "logY" && element.checked){
    yAs.scale = scaleType.LOG;
  }else if(element.id == "logY" && !element.checked){
    yAs.scale = scaleType.LIN;
  }

  if (element.id == "linY" && element.checked){
    yAs.scale = scaleType.LIN;
  }else if(element.id == "linY" && !element.checked){
    yAs.scale = scaleType.LOG;
  }

  main();
}


function scaleInput(element){

  value = Math.min( Math.max(element.value, 0.005), 100);
  scale = value;



  main();
}

function convertNumber(element){


  if(element.id == "linInput" && element.value != 0){
    linValue = element.value;
    logValue =  Math.log10(linValue);
    document.getElementById("logInput").value = logValue;
  }else if(element.value == 0){
    document.getElementById("logInput").value = "NaN, Error, log10(0) = -oneindig";
  }

  if(element.id == "logInput" ){
    logValue = element.value;
    linValue =  Math.pow(10, logValue);
    document.getElementById("linInput").value = linValue;
  }

  main();


}
