statistics = {
    "number_republicans": 0,
    "number_democrats": 0,
    "number_independents": 0,
    "pct_republicans_voted":0,
    "pct_democrats_voted":0,
    "pct_independent_voted":0,
    "republicanos": [],
    "members": [],
    "least_engaged":[],
    "missedVotes": [],
    "most_engaged": []
}

var numero_republicanos = 0;
var numero_democratas = 0;
var numero_independientes = 0;
var porcentaje_republicanos= 0;
var porcentaje_democratas = 0;
var porcentaje_independientes = 0;
var totalPersonas, porcentajePersonas;

//encontrarEngaged(data);
//guardarDatos(data);

function guardarDatos(data){
    contarPartidos(data);    
    guardarDatosDemocratas();
    guardarDatosRepublicanos();
    guardarDatosInd();
    guardarDatosMissedVotes(statistics);
    guardarDatosMostEngaged(statistics);
}

function contarPartidos (data) {
    return data.results[0].members.map(function(senador) {
        if (senador.party === "R") {
            //republicanos.push(senador);
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

function guardarDatosRepublicanos(){
    //Cant de Personas en el Partido
    statistics.number_republicans = numero_republicanos;
    document.getElementById("republican-votes").innerHTML = statistics.number_republicans;
    //Porcentaje de republicanos q Votan
    statistics.pct_republicans_voted = porcentaje_republicanos/numero_republicanos;
    document.getElementById("republican-pct").innerHTML = redondearPorcentajes(statistics.pct_republicans_voted);
}

function guardarDatosDemocratas(){
    //Cant personas en el partido
    statistics.number_democrats = numero_democratas;
    document.getElementById("democratas-votes").innerHTML = statistics.number_democrats;
    //cant democratas q votan
    statistics.pct_democrats_voted = porcentaje_democratas/numero_democratas;
    document.getElementById("democratas-pct").innerHTML = redondearPorcentajes(statistics.pct_democrats_voted);
}

function guardarDatosInd(){
    //cant de independientes
    statistics.number_independents = numero_independientes; 
    document.getElementById("independent-votes").innerHTML = statistics.number_independents;
    //cant de independientes q votan
    statistics.pct_independent_voted = porcentaje_independientes/numero_independientes;
    document.getElementById("independent-pct").innerHTML = redondearPorcentajes(statistics.pct_independent_voted);
}

function encontrarEngaged (data) {
    data.results[0].members.map(function(senador) {
        statistics.members.push(senador); //EN MEMBERS TENGO TODO LO Q ES DATA.
    }) 
    leastEngaged(statistics.members);
    mostEngaged(statistics.members);

    function leastEngaged(members){
        statistics.least_engaged = members;
        //funciones
        function ordenarMayorMenor(a, b) { //ORDENO
        if ( a.missed_votes < b.missed_votes ){
          return 1;
        }
        if ( a.missed_votes > b.missed_votes ){
          return -1;
        }
        return 0;
        }
        statistics.least_engaged.sort(ordenarMayorMenor); //ORDENO
        //VEO PORCENTAJE QUE NECESITO
        porcentajeMissedVotes(statistics.least_engaged);
        //LIMITO EL ARRAY A MI PORCENTAJE
        statistics.least_engaged = statistics.least_engaged.slice(0, porcentajePersonasRedondeado-1);
    }       

    function mostEngaged(members){
        statistics.most_engaged = members;
        //Funciones
        function ordenarMenorMayor(a, b) {
            if ( b.missed_votes < a.missed_votes ){
              return 1;
            }
            if ( b.missed_votes > a.missed_votes ){
              return -1;
            }
            return 0;
        }
        statistics.most_engaged.sort(ordenarMenorMayor);
        //VEO EL PORCENTAJE QUE NECESITO
        porcentajeMissedVotes(statistics.most_engaged);
        //LIMITO EL ARRAY A MI PORCENTAJE
        statistics.most_engaged = statistics.most_engaged.slice(0, porcentajePersonasRedondeado-1);
    }

    function porcentajeMissedVotes(array1){
        porcentajePersonas = 10*(array1.length-1)/100;
        porcentajePersonasRedondeado = Math.round(porcentajePersonas);
    }

    
    guardarDatosMissedVotes(statistics);
    guardarDatosMostEngaged(statistics);
    
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

function tablaMissedVotes(statistics){
    return statistics.least_engaged.map(function(miembro) {
       
        return "<tr><td>" + "<a href=\""+ miembro.url + "\">" + miembro.first_name + " " + chequearNull(miembro) +
        miembro.last_name + "</a></td><td>" + chequearNullCero(miembro.missed_votes) + "</td><td>" + chequearNullCero(miembro.missed_votes_pct) + 
        " %" + "</td><tr>";
    }).join("");
}

// function tablaMissedVotes(statistics){
//     return statistics.least_engaged.map(function(miembro) {
       
//         return "<tr><td>" + "<a href=\""+ miembro.url + "\">" + miembro.first_name + " " + chequearNull(miembro) +
//         miembro.last_name + "</a></td><td>" + (miembro.missedVotes ? "" : ) + "</td><td>" + chequearNullCero(miembro.missed_votes_pct) + 
//         " %" + "</td><tr>";
//     }).join("");
// }

function guardarDatosMissedVotes(statistics){
    document.getElementById("table-missed-votes").innerHTML = tablaMissedVotes(statistics);
}

function tablaMostEngaged(statistics){
    return statistics.most_engaged.map(function(miembro) {

        return "<tr><td>" + "<a href=\""+ miembro.url + "\">" + miembro.first_name + " " + chequearNull(miembro) +
        miembro.last_name + "</a></td><td>" + chequearNullCero(miembro.missed_votes) + "</td><td>" + chequearNullCero(miembro.missed_votes_pct) + 
        " %" + "</td><tr>";
    }).join("");
}

function guardarDatosMostEngaged(statistics){
    document.getElementById("table-most-engaged").innerHTML = tablaMostEngaged(statistics);
}

// guardarDatosMissedVotes(statistics);
// guardarDatosMostEngaged(statistics);