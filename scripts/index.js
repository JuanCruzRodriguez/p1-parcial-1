'use strict';

let discos = [];

// Se cargan los discos desde discos.json
fetch('discos.json')
    .then(response => response.json())
    .then(data => {
     // Recorrer cada disco en el JSON y agregarlo a la lista de discos
    data.forEach(discoData => {
        let disco = new Disco(discoData.nombre, discoData.autor, discoData.portada, discoData.codigo);

        // Agregar las pistas al disco
        discoData.pistas.forEach(pistaData => {
            let pista = new Pista(pistaData.nombre, pistaData.duracion);
            disco.agregarPista(pista);
        });

        discos.push(disco);
    });

    alert("Se han cargado los discos desde el archivo JSON.");
    mostrar(); // Mostrar los discos una vez cargados
    })
    .catch(error => console.error('Error al cargar los discos:', error));

function cargar() {
    let nombre = prompt("Ingrese el nombre del disco:");
    if (!validarCampo(nombre, "El nombre del disco no puede estar vacío.")) return;

    let autor = prompt("Ingrese el autor o banda:");
    if (!validarCampo(autor, "El nombre del autor o banda no puede estar vacío.")) return;

    let codigo;
    do {
        codigo = parseInt(prompt("Ingrese el código único del disco (entre 1 y 999):"));
    } while (!validarCodigo(codigo, discos));

    let portada = prompt("Ingrese el link de la portada:");
    if (!validarCampo(portada, "El link de la portada no puede estar vacío.")) return;

    let disco = new Disco(nombre, autor, codigo, portada);

    let continuar;
    do {
        let nombrePista = prompt("Ingrese el nombre de la pista:");
        if (!validarCampo(nombrePista, "El nombre de la pista no puede estar vacío.")) return;

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
            <h3>Autor: ${disco.autor}</h3>
            <h3>Codigo: ${disco.codigo}</h3>
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

            // Resaltar si dura más de 3 minutos
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