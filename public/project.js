
// Everything I want to run onLoad.
function startUp() {
    someStyle();
    getFlux();
}

function getFlux() {
        var xhttp = new XMLHttpRequest();
        var text;
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
             text = JSON.parse(this.responseText);
             
             fluxMeter(text);
          }
        };
        xhttp.open("GET", "https://services.swpc.noaa.gov/products/summary/10cm-flux.json", true);
        xhttp.send();
}


function fluxMeter(data) {
    var fluxVal;
    //Check in case my value exceeds my meter limit just max the meter and show the value as it is still
    if (data.Flux > 255){
        fluxVal = 255; 
    }
    else {
        fluxVal = data.Flux;
    }
    var x = document.createElement("meter");
    x.className = 'myMeter';
    x.setAttribute("min", "0");
    x.setAttribute("low", "70");
    x.setAttribute("optimum", "150");
    x.setAttribute("high", "100");
    x.setAttribute("max", "255");
    x.setAttribute("value", fluxVal);
    x.setAttribute("style", "text-align:center");

    document.getElementById("meter").appendChild(x);
    document.getElementById("updated").innerHTML = "Solar flux measured value: "  + data.Flux + "<br> Last update: " + data.TimeStamp; 
}

function someStyle(){
    document.body.style.fontFamily = 'Times New Roman';
    document.body.style.color = 'linen';
    document.body.style.fontSize = '18px';
}


function grownUp() {
  document.getElementById("alwaysSunny").style.transitionProperty = "transform";
  document.getElementById("alwaysSunny").style.transitionDuration = "2s";  
  document.getElementById("alwaysSunny").style.transform = "scale(1.5)"; 
 }


// These turn on and off the parts of the page I want to display
function pageOne() {
    document.getElementById("page1").style.display = "block"; 
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none"; 
    document.getElementById("page4").style.display = "none";
    document.getElementById("pageName").innerHTML = "Radio Propagation"; 
}
function pageTwo() {
    document.getElementById("page1").style.display = "none"; 
    document.getElementById("page2").style.display = "block";
    document.getElementById("page3").style.display = "none"; 
    document.getElementById("page4").style.display = "none";
    document.getElementById("pageName").innerHTML = "Band Conditions"; 
}
function pageThree() {
    document.getElementById("page1").style.display = "none"; 
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "block"; 
    document.getElementById("page4").style.display = "none"; 
    document.getElementById("pageName").innerHTML = "About"; 
}
function pageFour() {
    document.getElementById("page1").style.display = "none"; 
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none"; 
    document.getElementById("page4").style.display = "block";
    document.getElementById("pageName").innerHTML = "Extras"; 
}
