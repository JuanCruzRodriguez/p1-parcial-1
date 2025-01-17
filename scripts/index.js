'use strict';

let discos = [];

// Se cargan los discos desde discos.json
fetch('discos.json')
    .then(response => response.json())
    .then(data => {
     // Se recorre cada disco en el JSON y se agrega a la lista de discos
    data.forEach(discoData => {
        let disco = new Disco(discoData.nombre, discoData.artista, discoData.id, discoData.portada);

        // Se agregan las pistas al disco
        discoData.pistas.forEach(pistaData => {
            let pista = new Pista(pistaData.nombre, pistaData.duracion);
            disco.agregarPista(pista);
        });

        discos.push(disco);
    });

    console.log("Se han cargado los discos desde el JSON");
    })

    .catch(error => console.error('Error al cargar los discos:', error));


// Función cargar
function cargar() {
    let nombre;
    do {
        nombre = prompt("Ingrese el nombre del disco:");
    } while (!validarCampo(nombre, "El nombre del disco no puede estar vacío."));

    let artista;
    do {
        artista = prompt("Ingrese el autor o banda:");
    } while (!validarCampo(artista, "El nombre del autor o banda no puede estar vacío."));

    let id;
    do {
        id = parseInt(prompt("Ingrese el código único del disco (entre 1 y 999):"));
    } while (!validarCodigo(id, discos));

    let portada;
    do {
        portada = prompt("Ingrese el link de la portada:");
    } while (!validarCampo(portada, "El link de la portada no puede estar vacío."));

    let disco = new Disco(nombre, artista, id, portada);

    let continuar;
    do {
        let nombrePista;
        do {
            nombrePista = prompt("Ingrese el nombre de la pista:");
        } while (!validarCampo(nombrePista, "El nombre de la pista no puede estar vacío."));

        let duracion;
        do {
            duracion = parseInt(prompt("Ingrese la duración de la pista en segundos (entre 0 y 7200):"));
        } while (!validarDuracion(duracion));

        let pista = new Pista(nombrePista, duracion);
        disco.agregarPista(pista);

        continuar = confirm("¿Desea ingresar otra pista?");
    } while (continuar);

    discos.push(disco);
    alert("Se ha cargado el disco.");
}



// Función mostrar
function mostrar() {
    // Contador de discos cargados
    let contador = document.getElementById('contador');
    if (discos.length === 0) {
        contador.innerHTML = '<p>No se ha cargado ningún disco.</p>';
        return; 
    } else {
        contador.innerHTML = `<p>Discos cargados: ${discos.length}</p>`;
    }

    // Discos
    let container = document.getElementById('discos');
    container.innerHTML = '';

    discos.forEach(disco => {
        let discoDiv = document.createElement('div');
        discoDiv.classList.add('disco');
        discoDiv.innerHTML = `
            <img src="${disco.portada}" alt="Portada de ${disco.nombre}" width="100">
            <h2>${disco.nombre}</h2>
            <h3>Autor: ${disco.artista}</h3>
            <h3>Codigo: ${disco.id}</h3>
            <h3>Cantidad de pistas: ${disco.pistas.length}</h3>
            <h3>Duración total: ${disco.formatearDuracion(disco.duracionTotal())}</h3>
            <h3>Promedio: ${disco.formatearDuracion(disco.duracionPromedio())}</h3>
            <h3>Pista más larga: ${disco.pistaMasLarga().nombre}</h3>
            <h3>Pistas: </h3>
        `;

        // Pistas
        let listaPistas = document.createElement('ol');
        disco.pistas.forEach(pista => {
            let pistaItem = document.createElement('li');
            let minutos = Math.floor(pista.duracion / 60);
            let segundos = pista.duracion % 60;
            let tiempo = `${minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

            // Se resalta la pista si dura más de 3 minutos
            if (pista.duracion > 180) {
                pistaItem.classList.add('pista-larga');
            }
            pistaItem.textContent = `${pista.nombre} - ${tiempo}`;
            listaPistas.appendChild(pistaItem);
        });

        discoDiv.appendChild(listaPistas);
        container.appendChild(discoDiv);
    });
}