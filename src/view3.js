function list_rain(ADDRESS){
    document.getElementById("type").innerHTML = ""
    //alert("clicked");
    var txt = "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", ADDRESS);
    const DONE = 4;
    const SUCCESS = 200;
    xhr.onreadystatechange = function() {
        if (this.readyState == DONE &&
            this.status == SUCCESS) {
            var myObj = JSON.parse(this.responseText);
            var x = 0;
            
            //float button
            txt += '<a href="#" onClick = "reset()" class="float"><img class = "reset" src="./style/image/circular-arrow.svg" alt="logo"></img><p class = "reset_text">Reset</p></a>'

            //Bar graph
            txt += "<div class=\"card\" style=\"background-color: #3E64FF;\">";   
            txt += "<canvas id=\"rain_chart\"></canvas>";
            txt += "</div>";

            //slice
            txt += "<div class = \"bar_container\" id = \"minmaxbar\"></div>"

            //table
            txt += "<table id=\'memberTable\'>"
            
            txt += "<tr class = \"row\">";
            for (x = 0; x < 5; x++){
                txt += "<td  style=\"background-color: #3E64FF;color: #fff;text-align: center;\">" ;
                txt += header[x];
                txt += "</td>"
            }
            txt += "</tr>";
            x = 0;
            for (x in myObj) {
                    txt += "<tr class=\"row\" id=\"row"+x+"\""+ "onClick=\'row_tag("+x+")\' style=\"background-color: "+color+"\"><td>" + parseInt(parseInt(x,10) + 1,10)  +"</td>";
                    txt += "<td>" + myObj[x].date_time.toString().slice(0,10) + "</td>" + "<td>" + myObj[x].date_time.toString().slice(11,23) + "</td>";
                    txt += "<td> rain </td>"+"<td>"+myObj[x].rain+"</td>";
                    txt +="</td></tr>";
                }
            txt += "</table>" 
            document.getElementById("table").innerHTML = txt;

            //rain chart gradient
            var ctx_bar = document.getElementById('rain_chart');

            var gradientStroke_rain = ctx_bar.getContext("2d").createLinearGradient(0, 0, 0, 500);
            gradientStroke_rain.addColorStop(0.4, "#fff");
            gradientStroke_rain.addColorStop(1, "transparent");

            
            //Sort temperature
            let max = 0, min = myObj[0].rain;
            let date = [];
            let value = [];
            for (x in myObj) {
                    date[x] = myObj[x].date_time.toString().slice(0,10) + " " + myObj[x].date_time.toString().slice(11,19);
                    value[x] = myObj[x].rain;
                    if (parseFloat(myObj[x].rain)>=max) max = parseFloat(myObj[x].rain);
                    if (parseFloat(myObj[x].rain)<=min) min = parseFloat(myObj[x].rain);
            }

            min_max_bar(min,max,parseFloat(myObj[x].rain))
            seekbar()
            document.getElementById("hoverNow").innerText = "Now: " + parseFloat(value[x]).toFixed(2);
            //document.getElementById("checking").innerHTML = date;
            //Create new chart
            let chart = new Chart(document.getElementById("rain_chart"), {
                    type: 'bar',
                    data: {
                    labels: date,   
                    datasets: [
                {
                    label: "Rain (mm)",
                    backgroundColor: gradientStroke_rain,
                    hoverBackgroundColor: "#6987FF",
                    data: value
                }
                ],
                    borderWidth: 0,
                },
                    options: {
                        onClick:  function(evt) {   
                            var element = chart.getElementAtEvent(evt);
                            if(element.length > 0)
                            {
                            const firstPoint = element[0];
                            var label = chart.data.labels[firstPoint._index];
                            for (x in date) {
                                if (label == date[x]){
                                    row_tag(x);
                                    break;
                                }
                                
                            }                        
                            }
                        },    
                    cornerRadius: 12,
                    legend: { display: false },
                    scales: {
                    yAxes: [{
                    ticks: {
                    fontColor: "#fff",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 20
                },
                    gridLines: {
                    drawTicks: false,
                    display: false, 
                }
                }],
                    xAxes: [{
                    gridLines: {
                    drawTicks: false,
                    display: false,
                },
                    ticks: {
                    padding: 20,
                    fontColor: "#fff",
                    fontStyle: "bold"
                }
                }]
                }

                }
              });
        }
    };
    xhr.send();
}
