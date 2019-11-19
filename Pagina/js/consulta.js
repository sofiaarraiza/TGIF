function asignarApi(direccion) {
    fetch(direccion, {
        method: "GET",
        headers: new Headers({
            "X-API-Key": 'fLIuHWUUD9NTfg3NpJEPvQMSOIEWh0oDzhtwHcsg'
        })
    }).then(function (response) {
        if (response.ok)
            return response.json();
        throw new Error(response.statusText);
    }).then(function (json) {
        console.log(json);
    })
}