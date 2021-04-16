
function new_type_button(method,time){
    txt = ""
    txt += "<button style =\"opacity:0.9; background-color:#FFFFFF; color:#3E64FF \">"
    txt += method
    txt += "</button>"
    txt += "<div class=\"dropdown-content\">"
    for (x in method_array){
        txt += "<a href=\"#\" onclick = \"list_4('http://webapi19sa-1.course.tamk.cloud/v1/weather',\'" + method_array[x].toString() + "\','" + time.toString() + "')\">" + method_array[x].toString() + "</a>"
    }
    txt += "</div>"
    document.getElementById("type").innerHTML = txt;
}

function list_4(ADDRESS,method,time){
    //alert("clicked");
    var txt = "";
    const xhr = new XMLHttpRequest();
    if(time == '0'){
        xhr.open("GET", ADDRESS);
    } else {
        xhr.open("GET", (ADDRESS+'/'+method+'/'+time).toString());
    }
    const DONE = 4;
    const SUCCESS = 200;
    xhr.onreadystatechange = function() {
        if (this.readyState == DONE &&
            this.status == SUCCESS) {
            var myObj = JSON.parse(this.responseText);
            var x = 0, count = 0;
            
            //if time = 0 - (now)
            if(time == '0'){
                var cloneObj=[];
                for (x in myObj) {
                    if(Object.keys(myObj[x].data) == method){
                        cloneObj[24-count] = myObj[x]
                        if(count<24) count++
                        else{
                            break;
                        }
                    }
                }
            myObj = cloneObj
            }

            //for checking only
            //document.getElementById("checking").innerHTML = myObj;
            
            new_type_button(method,time)
            
            //float button
            txt += '<a href="#" onClick = "reset()" class="float"><img class = "reset" src="./style/image/circular-arrow.svg" alt="logo"></img><p class = "reset_text">Reset</p></a>'

            //Line graph
            txt += "<div class=\"card\" style=\"background-color: #1E2745;\">";   
            txt += "<canvas id=\"view4_chart\"></canvas>";
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
            count = 0;
            for (x in myObj) {
                    txt += "<tr class=\"row\" id=\"row"+x+"\""+ "onClick=\'row_tag("+x+")\' style=\"background-color: "+color+"\"><td>" + parseInt(parseInt(x,10) + 1,10)  +"</td>";
                    txt += "<td>" + myObj[x].date_time.toString().slice(0,10) + "</td>" + "<td>" + myObj[x].date_time.toString().slice(11,23) + "</td>";
                if(time == '0'){
                    txt += "<td>"+Object.keys(myObj[x].data)+"</td>"+"<td>"
                    txt += Object.values(myObj[x].data)
                }else {
                    txt += "<td>"+method+"</td>"+"<td>"
                    txt += myObj[x][method]
                }
                
                txt += "</td></tr>"
            }
            txt += "</table>" 
            document.getElementById("table").innerHTML = txt;

            //line chart gradient
            var ctx_humi = document.getElementById('view4_chart').getContext("2d");
            var gradientStroke_humi = ctx_humi.createLinearGradient(0, 0, 0, 500);
            gradientStroke_humi.addColorStop(0.4, "#3E64FF");
            gradientStroke_humi.addColorStop(1, "#A3B1FF");
            
            //Sort 
            let max = 0, min, min_isSafe = true;
            let date = [];
            let value = [];
            for (x in myObj) {
                date[x] = myObj[x].date_time.toString().slice(0,10) + " " + myObj[x].date_time.toString().slice(11,19);    
                if(time == '0') {
                    if (min_isSafe == true) {min = parseFloat(Object.values(myObj[x].data));min_isSafe=false}
                    value[x] = Object.values(myObj[x].data);
                } else { 
                    if (min_isSafe == true) {min = parseFloat(myObj[x][method]);min_isSafe=false}
                    value[x] = myObj[x][method];
                }
                if (parseFloat(value[x])>=max) max = parseFloat(value[x]);
                if (parseFloat(value[x])<=min) min = parseFloat(value[x]);
            }

            min_max_bar(min,max,parseFloat(value[x]))
            
            seekbar()
            document.getElementById("hoverNow").innerText = "Now: " + parseFloat(value[x]).toFixed(2);
            //document.getElementById("checking").innerHTML = date;
            //Create new chart
            
            let chart = new Chart(document.getElementById("view4_chart"), {
                    type: 'line',
                    data: {
                    labels: date,
                    datasets: [{ 
                        data: value,
                        label: method,
                        pointRadius: 6,
                        pointBackgroundColor: "#FFFFFF",
                        pointBorderColor: "#FFFFFF",
                        borderWidth: 0,
                        pointHoverBackgroundColor: "#3E64FF",
                        pointHoverBorderColor: "#3E64FF",
                        fill: true,
                        backgroundColor: gradientStroke_humi,
                        borderColor: "#FFFFFF",
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
                    legend: { display: false },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "#fff",
                                fontStyle: "bold",
                                suggestedMax:100,
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
