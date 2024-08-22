/* Función para encriptar el texto ingresado */
function encriptar() {
    let ingresoTexto = document.getElementById("ingresoTexto").value.trim();
    const soloLetrasMinusculas = /^[a-z\s]+$/;
    
    if (!soloLetrasMinusculas.test(ingresoTexto) || ingresoTexto === "") {
        mostrarError("⚠️ Texto inválido. Por favor, ingrese solo letras minúsculas sin caracteres especiales.");
        return;
    }

    limpiarError();

    const convertir = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat',
    };

    let encriptado = ingresoTexto.split('').map(char => convertir[char] || char).join('');
    document.getElementById("salidaTexto").value = encriptado;

    // Oculta la imagen inicial
    document.getElementById('imagenInicial').style.display = 'none';

    mostrarTooltip(document.getElementById('btnEncriptar')); // Muestra el tooltip en el botón de encriptar
}

/* Función para desencriptar el texto ingresado */
function desencriptar() {
    let ingresoTexto = document.getElementById("ingresoTexto").value.trim();
    const soloLetrasMinusculas = /^[a-z\s]+$/;
    
    if (!soloLetrasMinusculas.test(ingresoTexto) || ingresoTexto === "") {
        mostrarError("⚠️ Texto inválido. Por favor, ingrese solo letras minúsculas sin caracteres especiales.");
        return;
    }

    limpiarError();

    const convertir = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };

    let desencriptado = ingresoTexto;
    for (let [key, value] of Object.entries(convertir)) {
        desencriptado = desencriptado.split(key).join(value);
    }

    document.getElementById("salidaTexto").value = desencriptado;

    // Oculta la imagen inicial
    document.getElementById('imagenInicial').style.display = 'none';

    mostrarTooltip(document.getElementById('btnDesencriptar')); // Muestra el tooltip en el botón de desencriptar
}

/* Función para copiar el texto encriptado o desencriptado al portapapeles */
function copiar() {
    let textoSalida = document.getElementById('salidaTexto').value;
    
    navigator.clipboard.writeText(textoSalida)
        .then(() => {
            mostrarTooltip(document.querySelector('.containerSalidaBotonCopiar')); // Muestra el tooltip en el botón de copiar
            console.log('Texto copiado al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar al portapapeles:', err);
        });
}

/* Función para mostrar un tooltip temporalmente */
function mostrarTooltip(elemento) {
    elemento.classList.add('show-tooltip');
    setTimeout(() => {
        elemento.classList.remove('show-tooltip');
    }, 2000); // Oculta el tooltip después de 2 segundos
}

/* Función para mostrar mensajes de error */
function mostrarError(mensaje) {
    const mensajeError = document.getElementById('mensajeError');
    mensajeError.textContent = mensaje;
    mensajeError.style.display = 'block';
}

/* Función para limpiar mensajes de error */
function limpiarError() {
    const mensajeError = document.getElementById('mensajeError');
    mensajeError.style.display = 'none';
}

/* Validación del texto ingresado y eventos asociados */
document.addEventListener('DOMContentLoaded', () => {
    const ingresoTexto = document.getElementById('ingresoTexto');

    function validarTexto(event) {
        const value = event.target.value;
        const soloLetrasMinusculas = /^[a-z\s]+$/;

        if (event.type === 'paste') {
            setTimeout(() => {
                const newValue = event.target.value;
                if (!soloLetrasMinusculas.test(newValue)) {
                    mostrarError('🚨Error: No se permiten mayúsculas ni caracteres especiales.🚨');
                    event.target.value = ''; // Borrar todo el texto pegado
                }
            }, 0);
        } else if (event.type === 'input' && event.inputType !== 'insertFromPaste') {
            if (!soloLetrasMinusculas.test(value)) {
                mostrarError('🚨Error: No se permiten mayúsculas ni caracteres especiales.🚨');
                event.target.value = value.slice(0, -1); // Eliminar el último carácter ingresado
            }
        }
    }

    ingresoTexto.addEventListener('paste', validarTexto);
    ingresoTexto.addEventListener('input', validarTexto);
});
