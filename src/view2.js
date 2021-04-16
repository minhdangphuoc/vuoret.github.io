function list_temp(ADDRESS){
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

            //bar graph
            txt += "<div class=\"card\" style=\"background-color: #1E2745;\">";   
            txt += "<canvas id=\"temp_chart\"></canvas>";
            txt += "</div>";

            //slice
            txt += "<div class = \"bar_container\" id = \"minmaxbar\"></div>"
            
            //Table
            txt += "<table id=\'memberTable\'>"
            
            txt += "<tr class = \"row\">";
            for (x = 0; x < 5; x++){
                txt += "<td  style=\"background-color: #3E64FF;color: #fff;text-align: center;\">" ;
                txt += header[x];
                txt += "</td>"
            }
            txt += "</tr>";
            
            for (x in myObj) {
                txt += "<tr class=\"row\" id=\"row"+x+"\""+ "onClick=\'row_tag("+x+")\' style=\"background-color: "+color+"\"><td>" + parseInt(parseInt(x,10) + 1,10)  +"</td>";
                txt += "<td>" + myObj[x].date_time.toString().slice(0,10) + "</td>" + "<td>" + myObj[x].date_time.toString().slice(11,23) + "</td>";
                txt += "<td>temperature</td>"+"<td>"+myObj[x].temperature+"</td>";
                txt +="</td></tr>";
            }
            txt += "</table>" 
            document.getElementById("table").innerHTML = txt;

            //line chart gradient
            var ctx_temp = document.getElementById('temp_chart').getContext("2d");
            var gradientStroke_temp = ctx_temp.createLinearGradient(0, 0, 0, 300);
            gradientStroke_temp.addColorStop(0.1, "#FF5C38");
            gradientStroke_temp.addColorStop(1, "#3E64FF");
            
            //Sort temperature
            let max = 0, min = myObj[0].temperature;
            let date = [];
            let value = [];
            for (x in myObj) {
                date[x] = myObj[x].date_time.toString().slice(0,10) + " " + myObj[x].date_time.toString().slice(11,19);
                value[x] = myObj[x].temperature
                if (parseFloat(myObj[x].temperature)>=max) max = parseFloat(myObj[x].temperature);
                if (parseFloat(myObj[x].temperature)<=min) min = parseFloat(myObj[x].temperature);
            }

            min_max_bar(min,max,parseFloat(myObj[x].temperature))
            seekbar()
            document.getElementById("hoverNow").innerText = "Now: " + parseFloat(value[x]).toFixed(2);

            //document.getElementById("checking").innerHTML = date;
            //Create new chart
            let chart = new Chart(document.getElementById("temp_chart"), {
                type: 'bar',
                data: {
                  labels: date,
                  datasets: [{ 
                      data: value,
                      label: "Tampere Temp(C)",
                      borderWidth: 0,
                      backgroundColor: gradientStroke_temp,
                      hoverBackgroundColor: "#FFFFFF",
                      fill: false,
                      borderCapStyle: "round"
                    }]
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
                                beginAtZero: false,
                                maxTicksLimit: 5,
                                padding: 20
                            },
                            gridLines: {
                                color: "#FFFFFF",
                                drawTicks: false,
                                display: false, 
                            }
                            }],
                        xAxes: [{
                            gridLines: {
                                color: "#FFFFFF",
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

        