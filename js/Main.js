let boton = document.getElementById("boton");

boton.addEventListener("click", traerdatos);

function traerdatos() {
    let dni = document.getElementById("dni").value;

    // Validar que el DNI tenga 8 dígitos
    if (dni.length !== 8) {
        document.getElementById("error").innerText = "El DNI debe tener 8 dígitos.";
        limpiarCampos();
        return;
    }

    fetch("https://apiperu.dev/api/dni/" + dni + "?api_token=a609b5819213e4ab9b0f33f874b9862019157e315dccda85f0fbe38e236bb9f3")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then((datos) => {
            if (datos.data) {
                document.getElementById("doc").value = datos.data.numero;
                document.getElementById("nombre").value = datos.data.nombres;
                document.getElementById("apellido").value = datos.data.apellido_paterno + " " + datos.data.apellido_materno;
                document.getElementById("cui").value = datos.data.cui;
                document.getElementById("error").innerText = "";
            } else {
                throw new Error('No se encontraron datos para el DNI ingresado');
            }
        })
        .catch((error) => {
            document.getElementById("error").innerText = error.message;
            limpiarCampos();
        });
}

function limpiarCampos() {
    document.getElementById("doc").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("cui").value = "";
}
