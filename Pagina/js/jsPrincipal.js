let statistics = {
    republicans: 0,
    democrats: 0,
    independents: 0,
    pct_republicans_voted: 0,
    pct_democrats_voted: 0,
    pct_independent_voted: 0,
    //republicanos: [],
    //members: [],
    least_engaged: [],
    missedVotes: [],
    most_engaged: [],
    least_loyal: [],
    most_loyal: [],
}


function calcularEstadisticas(members) {
    let democrats = [];
    let republicans = [];
    let independents = [];

    contarPartidos(members);
    function contarPartidos(members) {
        for (let i = 0; i < members.length; i++) {
            if (members[i].party === "R") {
                republicans.push(members[i]);
                statistics.pct_republicans_voted += members[i].votes_with_party_pct;

            } else if (members[i].party === "D") {
                democrats.push(members[i]);
                statistics.pct_democrats_voted = statistics.pct_democrats_voted + members[i].votes_with_party_pct;
            } else if (members[i].party === "I") {
                independents.push(members[i]);
                statistics.pct_independent_voted = statistics.pct_independent_voted + members[i].votes_with_party_pct;
            }
        }
    }

    //Cantidad de personas x partido
    statistics.democrats = democrats.length;
    statistics.republicans = republicans.length;
    statistics.independents = independents.length;

    //Porcentajes
    statistics.pct_republicans_voted = redondearPorcentajes(statistics.pct_republicans_voted / republicans.length);
    statistics.pct_democrats_voted = redondearPorcentajes(statistics.pct_democrats_voted / democrats.length);
    statistics.pct_independents_voted = redondearPorcentajes(statistics.pct_independents_voted / independents.length);

    // statistics.least_engaged = leastEngaged(members);
    // statistics.most_engaged = mostEngaged(members);

    leastEngaged(members);
    mostEngaged(members);
    leastLoyal(members);
    mostLoyal(members);

    return statistics;
}

function leastEngaged(members) {
    statistics.least_engaged = members;
    //Funciones:
    function ordenarMayorMenor(a, b) { //ORDENO
        if (a.missed_votes < b.missed_votes) {
            return 1;
        }
        if (a.missed_votes > b.missed_votes) {
            return -1;
        }
        return 0;
    }
    statistics.least_engaged.sort(ordenarMayorMenor); //ORDENO
    //VEO PORCENTAJE QUE NECESITO
    porcentajeMissedVotes(statistics.least_engaged);
    //LIMITO EL ARRAY A MI PORCENTAJE
    statistics.least_engaged = statistics.least_engaged.slice(0, porcentajePersonasRedondeado - 1);
}

function mostEngaged(members) {
    statistics.most_engaged = members;
    //Funciones
    function ordenarMenorMayor(a, b) {
        if (b.missed_votes < a.missed_votes) {
            return 1;
        }
        if (b.missed_votes > a.missed_votes) {
            return -1;
        }
        return 0;
    }
    statistics.most_engaged.sort(ordenarMenorMayor);
    //VEO EL PORCENTAJE QUE NECESITO
    porcentajeMissedVotes(statistics.most_engaged);
    //LIMITO EL ARRAY A MI PORCENTAJE
    statistics.most_engaged = statistics.most_engaged.slice(0, porcentajePersonasRedondeado - 1);
}

function porcentajeMissedVotes(array1) {
    porcentajePersonas = 10 * (array1.length - 1) / 100;
    porcentajePersonasRedondeado = Math.round(porcentajePersonas);
}

function redondearPorcentajes(numero) {
    var numeroRedondeado = Math.round(numero * 100) / 100;
    return numeroRedondeado;

}

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
    porcentajeMissedVotes(statistics.least_loyal);
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
    porcentajeMissedVotes(statistics.most_loyal);
    //LIMITO EL ARRAY A MI PORCENTAJE
    statistics.most_loyal = statistics.most_loyal.slice(0, porcentajePersonasRedondeado-1);
}


// function asignarApi(direccion) {
//     fetch(direccion, {
//         method: "GET",
//         headers: new Headers({
//             "X-API-Key": 'fLIuHWUUD9NTfg3NpJEPvQMSOIEWh0oDzhtwHcsg'
//         })
//     }).then(function (response) {
//         if (response.ok)
//             return response.json();
//         throw new Error(response.statusText);
//     }).then(function (json) {
//         console.log(json);
//     })
// }

async function asignarApi(url) {
    let response = await fetch(url, {
        headers: {
            'X-API-Key': '2vU9lczessgzn6rpjU92NcB6466XQVqRC2C43zrx'
        }
    });
    let json = await response.json();

    return json.results[0].members;
}



// function chequearNullCero(senador) {
//     if (senador == null || senador == undefined) {
//         return "0";
//     } else {
//         return senador;
//     }
// }

// function chequearNull(miembro) {
//     if (miembro.middle_name == null || miembro.middle_name == undefined) {
//         return " ";
//     } else {
//         return miembro.middle_name + " ";
//     }
// }  


// var numero_republicanos = 0;
// var numero_democratas = 0;
// var numero_independientes = 0;
// var porcentaje_republicanos = 0;
// var porcentaje_democratas = 0;
// var porcentaje_independientes = 0;
// var totalPersonas, porcentajePersonas;

// function tablaMissedVotes(statistics) {
//     return statistics.least_engaged.map(function (miembro) {

//         return "<tr><td>" + "<a href=\"" + miembro.url + "\">" + miembro.first_name + " " + chequearNull(miembro) +
//             miembro.last_name + "</a></td><td>" + chequearNullCero(miembro.missed_votes) + "</td><td>" + chequearNullCero(miembro.missed_votes_pct) +
//             " %" + "</td><tr>";
//     }).join("");
// }

// // function tablaMissedVotes(statistics){
// //     return statistics.least_engaged.map(function(miembro) {

// //         return "<tr><td>" + "<a href=\""+ miembro.url + "\">" + miembro.first_name + " " + chequearNull(miembro) +
// //         miembro.last_name + "</a></td><td>" + (miembro.missedVotes ? "" : ) + "</td><td>" + chequearNullCero(miembro.missed_votes_pct) + 
// //         " %" + "</td><tr>";
// //     }).join("");
// // }

// function guardarDatosMissedVotes(statistics) {
//     document.getElementById("table-missed-votes").innerHTML = tablaMissedVotes(statistics);
// }

// function tablaMostEngaged(statistics) {
//     return statistics.most_engaged.map(function (miembro) {

//         return "<tr><td>" + "<a href=\"" + miembro.url + "\">" + miembro.first_name + " " + chequearNull(miembro) +
//             miembro.last_name + "</a></td><td>" + chequearNullCero(miembro.missed_votes) + "</td><td>" + chequearNullCero(miembro.missed_votes_pct) +
//             " %" + "</td><tr>";
//     }).join("");
// }

// function guardarDatosMostEngaged(statistics) {
//     document.getElementById("table-most-engaged").innerHTML = tablaMostEngaged(statistics);
// }

// guardarDatosMissedVotes(statistics);
// guardarDatosMostEngaged(statistics);


//encontrarEngaged(data);
//guardarDatos(data);

// function guardarDatosRepublicanos() {
//     //Cant de Personas en el Partido
//     statistics.number_republicans = numero_republicanos;
//     document.getElementById("republican-votes").innerHTML = statistics.number_republicans;
//     //Porcentaje de republicanos q Votan
//     statistics.pct_republicans_voted = porcentaje_republicanos / numero_republicanos;
//     document.getElementById("republican-pct").innerHTML = redondearPorcentajes(statistics.pct_republicans_voted);
// }

// function guardarDatosDemocratas() {
//     //Cant personas en el partido
//     statistics.number_democrats = numero_democratas;
//     document.getElementById("democratas-votes").innerHTML = statistics.number_democrats;
//     //cant democratas q votan
//     statistics.pct_democrats_voted = porcentaje_democratas / numero_democratas;
//     document.getElementById("democratas-pct").innerHTML = redondearPorcentajes(statistics.pct_democrats_voted);
// }

// function guardarDatosInd() {
//     //cant de independientes
//     statistics.number_independents = numero_independientes;
//     document.getElementById("independent-votes").innerHTML = statistics.number_independents;
//     //cant de independientes q votan
//     statistics.pct_independent_voted = porcentaje_independientes / numero_independientes;
//     document.getElementById("independent-pct").innerHTML = redondearPorcentajes(statistics.pct_independent_voted);
// }

// function encontrarEngaged(data) {
//     data.results[0].members.map(function (senador) {
//         statistics.members.push(senador); //EN MEMBERS TENGO TODO LO Q ES DATA.
//     })
//     leastEngaged(statistics.members);
//     mostEngaged(statistics.members);

//     function leastEngaged(members) {
//         statistics.least_engaged = members;
//         //funciones
//         function ordenarMayorMenor(a, b) { //ORDENO
//             if (a.missed_votes < b.missed_votes) {
//                 return 1;
//             }
//             if (a.missed_votes > b.missed_votes) {
//                 return -1;
//             }
//             return 0;
//         }
//         statistics.least_engaged.sort(ordenarMayorMenor); //ORDENO
//         //VEO PORCENTAJE QUE NECESITO
//         porcentajeMissedVotes(statistics.least_engaged);
//         //LIMITO EL ARRAY A MI PORCENTAJE
//         statistics.least_engaged = statistics.least_engaged.slice(0, porcentajePersonasRedondeado - 1);
//     }

//     function mostEngaged(members) {
//         statistics.most_engaged = members;
//         //Funciones
//         function ordenarMenorMayor(a, b) {
//             if (b.missed_votes < a.missed_votes) {
//                 return 1;
//             }
//             if (b.missed_votes > a.missed_votes) {
//                 return -1;
//             }
//             return 0;
//         }
//         statistics.most_engaged.sort(ordenarMenorMayor);
//         //VEO EL PORCENTAJE QUE NECESITO
//         porcentajeMissedVotes(statistics.most_engaged);
//         //LIMITO EL ARRAY A MI PORCENTAJE
//         statistics.most_engaged = statistics.most_engaged.slice(0, porcentajePersonasRedondeado - 1);
//     }

//     function porcentajeMissedVotes(array1) {
//         porcentajePersonas = 10 * (array1.length - 1) / 100;
//         porcentajePersonasRedondeado = Math.round(porcentajePersonas);
//     }


//     guardarDatosMissedVotes(statistics);
//     guardarDatosMostEngaged(statistics);

// }