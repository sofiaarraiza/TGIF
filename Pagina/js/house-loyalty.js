statistics = {
    "number_republicans": 0,
    "number_democrats": 0,
    "num_independents": 0,
    "pct_republicans_voted":0,
    "pct_democrats_voted":0,
    "pct_independent_voted":0,

    "members": [],
    "least_loyal":[],
    "most_loyal": [],
}

var numero_republicanos = 0;
var numero_democratas = 0;
var numero_independientes = 0;
var porcentaje_republicanos= 0;
var porcentaje_democratas = 0;
var porcentaje_independientes = 0;

guardarDatos();
encontrarEngaged(data);

function contarPartidos (data) {
    return data.results[0].members.map(function(senador) {
        if (senador.party === "R") {
            numero_republicanos++;
            porcentaje_republicanos= porcentaje_republicanos + senador.votes_with_party_pct;

        } else if 
            (senador.party === "D") {
                numero_democratas += 1;
                porcentaje_democratas= porcentaje_democratas + senador.votes_with_party_pct;
            } else if 
            (senador.party === "I") {
                numero_independientes++;
                porcentaje_independientes= porcentaje_independientes + senador.votes_with_party_pct;
            }
        
    })
}

function redondearPorcentajes(numero) {
    var numeroRedondeado = Math.round(numero *100)/100;
    return numeroRedondeado;

}

function guardarDatos(){
    contarPartidos (data);
    statistics.number_independents = numero_independientes;
    statistics.number_democrats = numero_democratas;
    statistics.number_republicans = numero_republicanos;
        
    statistics.pct_democrats_voted = porcentaje_democratas/numero_democratas;
    statistics.pct_republicans_voted = porcentaje_republicanos/numero_republicanos;
    statistics.pct_independent_voted = porcentaje_independientes/numero_independientes;

    document.getElementById("republican-votes").innerHTML = statistics.number_republicans;
    document.getElementById("democratas-votes").innerHTML = statistics.number_democrats;
    document.getElementById("independent-votes").innerHTML = statistics.number_independents;
    
    document.getElementById("republican-pct").innerHTML = redondearPorcentajes(statistics.pct_republicans_voted);
    document.getElementById("democratas-pct").innerHTML = redondearPorcentajes(statistics.pct_democrats_voted);
    document.getElementById("independent-pct").innerHTML = redondearPorcentajes(statistics.pct_independent_voted);
}

function encontrarEngaged (data) {
    data.results[0].members.map(function(senador) {
        statistics.members.push(senador); //EN MEMBERS TENGO TODO LO Q ES DATA.
    }) 
    leastLoyal(statistics.members);
    mostLoyal(statistics.members);

    function leastLoyal(members){
        statistics.least_loyal = members;
        //funciones
        function ordenarMayorMenor(a, b) { //ORDENO
        if ( b.votes_with_party_pct < a.votes_with_party_pct ){
          return 1;
        }
        if ( b.votes_with_party_pct > a.votes_with_party_pct ){
          return -1;
        }
        return 0;
        }
        statistics.least_loyal.sort(ordenarMayorMenor); //ORDENO
        //VEO PORCENTAJE QUE NECESITO
        porcentajePartyVotes(statistics.least_loyal);
        //LIMITO EL ARRAY A MI PORCENTAJE
        statistics.least_loyal = statistics.least_loyal.slice(0, porcentajePersonasRedondeado-1);
    }       

    function mostLoyal(members){
        statistics.most_loyal = members;
        //Funciones
        function ordenarMenorMayor(a, b) {
            if ( a.votes_with_party_pct < b.votes_with_party_pct ){
              return 1;
            }
            if ( a.votes_with_party_pct > b.votes_with_party_pct ){
              return -1;
            }
            return 0;
        }
        statistics.most_loyal.sort(ordenarMenorMayor);
        //VEO EL PORCENTAJE QUE NECESITO
        porcentajePartyVotes(statistics.most_loyal);
        //LIMITO EL ARRAY A MI PORCENTAJE
        statistics.most_loyal = statistics.most_loyal.slice(0, porcentajePersonasRedondeado-1);
    }

    function porcentajePartyVotes(array1){
        porcentajePersonas = 10*(array1.length-1)/100;
        porcentajePersonasRedondeado = Math.round(porcentajePersonas);
    }
    
}

function chequearNullCero(senador) {
    if (senador == null || senador == undefined) {
    return "0";  
    } else {
        return senador;
    }
}

function chequearNull(miembro) {
    if (miembro.middle_name == null || miembro.middle_name == undefined) {
    return " ";  
    } else { 
    return miembro.middle_name + " ";
    }
}

function tablaLeastLoyal(statistics){
    return statistics.least_loyal.map(function(miembro) {
        return "<tr><td>" + "<a href=\""+ miembro.url + "\">" + miembro.first_name + " " + chequearNull(miembro) +
        miembro.last_name + "</a></td><td>" + chequearNullCero(miembro.total_votes) + "</td><td>" + chequearNullCero(miembro.votes_with_party_pct) + 
        " %" + "</td><tr>";
    }).join("");
}

function guardarDatosLeastLoyal(statistics){
    document.getElementById("table-least-loyal").innerHTML = tablaLeastLoyal(statistics);
}

function tablaMostLoyal(statistics){
    return statistics.most_loyal.map(function(miembro) {
        return "<tr><td>" + "<a href=\""+ miembro.url + "\">" + miembro.first_name + " " + chequearNull(miembro) +
        miembro.last_name + "</a></td><td>" + chequearNullCero(miembro.total_votes) + "</td><td>" + chequearNullCero(miembro.votes_with_party_pct) + 
        " %" + "</td><tr>";
    }).join("");
}

function guardarDatosMostLoyal(statistics){
    document.getElementById("table-most-loyal").innerHTML = tablaMostLoyal(statistics);
}

guardarDatosLeastLoyal(statistics);
guardarDatosMostLoyal(statistics);


