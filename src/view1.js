function list_all_50(ADDRESS){
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
            txt += "<table id=\'memberTable\'>"
            txt += "<tr class = \"row\">";
            for (x = 0; x < 5; x++){
                txt += "<td  style=\"background-color: #3E64FF;color: #fff;text-align: center;\">" ;
                txt += header[x];
                txt += "</td>"
            }
            txt += "</tr>";

            for (x in myObj) {
                order = parseInt(x,10) + 1;
                
                txt += "<tr class = \"row\" id=\"row"+x+"\""+ " style=\"background-color: "+color+"\""+"><td>" + order +"</td>";
                txt += "<td>" + myObj[x].date_time.toString().slice(0,10) + "</td>" + "<td>" + myObj[x].date_time.toString().slice(11,23) + "</td>";
                txt += "<td>"+Object.keys(myObj[x].data)+"</td>"+"<td>"+Object.values(myObj[x].data)+"</td>";
                txt +="</td><tr>";

                if (order===50) break;
            }
            txt += "</table>" 
            document.getElementById("table").innerHTML = txt;
        }
    };
    xhr.send();
}
