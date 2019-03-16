/*
1(X)Loops, Conditional Statements, Functions, Variables, Parameters, Arrays, Associative Arrays
2(X)Object Creation Functions, Inheritance, Properties, Methods, Instantiation
3(X)JSON Parse, Stringify
4(X)Using XMLHTTPRequest to Consume a JSON Web Service
5(X)Local Storage API, Storing and Retrieving Simple Data, Arrays, Associative Arrays, and Objects
6(X)DOM Manipulation Using createElement, appendChild, insertBefore, removeChild, etc.
7(X)Manipulating CSS Class Properties Using JavaScript
8(X)Creating CSS3 Transitions and Animations in CSS and triggering them with JavaScript
9(X)Standard JavaScript Events Including those for Mobile Devices ( Ex. onTouch, onLoad, etc.) and Animation and Transition Events
10(X)HTML5 Tags - Video, Audio, and Canvas
11(X)Designing, Defining, and Triggering CSS3 Transitions without Custom Libraries (Thought Library)
12(X)Designing, Defining, and Triggering CSS3 Transforms without Custom Libraries (Thought Library)
13(X)Designing, Defining, and Triggering CSS3 Animations without Custom Libraries (Thought Library)
*/

// Everything I want to run onLoad.
function startUp() {
    someStyle();
    getFlux();
}

// 3(X)JSON Parse, Stringify
// 4(X)Using XMLHTTPRequest to Consume a JSON Web Service Solar Flux from NOAA
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

//6(X)DOM Manipulation Using createElement, appendChild, insertBefore, removeChild, etc.
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

//7(X)Manipulating CSS Class Properties Using JavaScript
function someStyle(){
    document.body.style.fontFamily = 'Times New Roman';
    document.body.style.color = 'linen';
    document.body.style.fontSize = '18px';
}

//8(X)Creating CSS3 Transitions and Animations in CSS and triggering them with JavaScript
function grownUp() {
  document.getElementById("alwaysSunny").style.transitionProperty = "transform";
  document.getElementById("alwaysSunny").style.transitionDuration = "2s";  
  document.getElementById("alwaysSunny").style.transform = "scale(1.5)"; 
 }

// 7(X)Manipulating CSS Class Properties Using JavaScript
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
    document.getElementById("pageName").innerHTML = "Solar Flux"; 
}
function pageThree() {
    document.getElementById("page1").style.display = "none"; 
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "block"; 
    document.getElementById("page4").style.display = "none"; 
    document.getElementById("pageName").innerHTML = "A and K Indexes"; 
}
function pageFour() {
    document.getElementById("page1").style.display = "none"; 
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none"; 
    document.getElementById("page4").style.display = "block";
    document.getElementById("pageName").innerHTML = "Solar Information"; 
}
