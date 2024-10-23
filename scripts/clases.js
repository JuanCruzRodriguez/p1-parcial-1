// Clase Pista
class Pista {
    constructor(nombre, duracion) {
        this.nombre = nombre;
        this.duracion = duracion;
    }
}

//Clase Disco
class Disco {
    constructor(nombre, artista, id, portada) {
        this.nombre = nombre;
        this.artista = artista;
        this.id = id;
        this.portada = portada;
        this.pistas = [];
    }

    // Método para agregar una pista
    agregarPista(pista) {
        this.pistas.push(pista);
    }

    // Método para obtener la duración total del disco
    duracionTotal() {
        return this.pistas.reduce((total, pista) => total + pista.duracion, 0);
    }

    // Método para obtener la pista con mayor duración
    pistaMasLarga() {
        return this.pistas.reduce((masLarga, pista) => pista.duracion > masLarga.duracion ? pista : masLarga, this.pistas[0]);
    }

    // Método para obtener el promedio de duración de las pistas
    duracionPromedio() {
        return this.pistas.length > 0 ? this.duracionTotal() / this.pistas.length : 0;
    }

    // Método para formatear duración en HH:MM:SS
    formatearDuracion(segundosTotales) {
        let horas = Math.floor(segundosTotales / 3600);
        let minutos = Math.floor((segundosTotales % 3600) / 60);
        let segundos = segundosTotales % 60;
        return `${horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
    }
}