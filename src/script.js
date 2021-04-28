const header = ["Order","Date","Time","Type","Value"];
const method_array = ["vuoret_temperature","vuoret_wind_speed"]
const color = "#ffffff";
Chart.defaults.global.defaultFontColor = "#fff";
function min_max_bar(min,max,value){
    let txt = "";
    
    txt += "<div class=\"minmaxbar\">";   
    txt += "<h3 id=\"title_bar\">Data Ruler</h3>"; 
    txt +="<div class=\"valuetext\">"+"Min: "+parseFloat(min).toFixed(2)+"</div>"
    //document.getElementById("checking").innerHTML = (((parseFloat(value,10)-parseFloat(min,10))/(parseFloat(max,10)-parseFloat(min,10)))*100).toString().slice(0,2);
    txt +="<div class=\"seekbar\" data-seekbar-value=\""+(((parseFloat(value,10)-parseFloat(min,10))/(parseFloat(max,10)-parseFloat(min,10)))*100).toString()+"\"></div>";
    txt +="<div class=\"valuetext\">"+"Max: "+parseFloat(max).toFixed(2)+"</div>"    
    //txt +="<div class=\"nowtest\">"+"Now: "+parseFloat(value).toFixed(2)+"</div>"
    txt += "</div>";
    
    document.getElementById("minmaxbar").innerHTML = txt;
    
}

function row_tag(x){
    //alert(document.getElementById("row"+x).style.backgroundColor)
    if (document.getElementById("row"+x).style.backgroundColor === "rgb(255, 211, 131)"){
        document.getElementById("row"+x).style.backgroundColor = "rgb(255, 255, 255)"
    } else document.getElementById("row"+x).style.backgroundColor = "rgb(255, 211, 131)"
}

function reset() {
	var elements = document.getElementsByClassName('row'); // get all elements
	for(var i = 0; i < elements.length; i++){
		elements[i].style.backgroundColor = "rgb(255, 255, 255)";
	}
}

function show_help(){
    let txt = "";
    txt += '<img class = "tuto" src="./style/image/Tuto.svg" alt="logo"></img>'
    document.getElementById("table").innerHTML = txt;
}

show_help();