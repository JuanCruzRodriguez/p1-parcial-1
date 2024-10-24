// Validar código único entre 1 y 999
function validarCodigo(id, discos) {
    if (isNaN(id) || id < 1 || id > 999 || discos.some(disco => disco.id === id)) {
        alert("El código debe ser un número entre 1 y 999 y no puede estar repetido.");
        return false;
    }
    return true;
}

// Validar duración de pista entre 0 y 7200 segundos
function validarDuracion(duracion) {
    if (isNaN(duracion) || duracion < 0 || duracion > 7200) {
        alert("La duración debe ser un número entre 0 y 7200 segundos.");
        return false;
    }
    return true;
}

// Validar que los campos no estén vacíos
function validarCampo(campo, mensaje) {
    if (!campo) {
        alert(mensaje);
        return false;
    }
    return true;
}
