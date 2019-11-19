//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);

function crearRow(data) {

    return "<tr>" + data.results[0].members.map(function(senador) {
        
        function chequearNull(senador) {
            if (senador.middle_name == null || senador.middle_name == undefined) {
            return " ";  
        } else { 
            return senador.middle_name + " ";
        }
        }
        
    return "<td>" + "<a href=\""+ senador.url + "\">" + senador.first_name + " " + chequearNull(senador) + senador.last_name + "</a>" + "</td>" 
      + "<td>" + senador.party + "</td>" + "<td>" + senador.state + "</td>" + "<td>" + senador.seniority + "</td>" + "<td>" + senador.votes_with_party_pct
      + " %" + "</td></tr>";
    }).join("");
}

function renderRows(data){
    var html = crearRow(data);
    document.getElementById("table‐rows").innerHTML = html;
}
renderRows(data);

/*
function crearColumna(row){
    return row.data.map(function(element){
        return "<td>" + element.
    }
}*/



