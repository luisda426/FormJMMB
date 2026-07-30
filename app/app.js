// VARIABLES

const body = document.body;

const paginaAnterior = body.dataset.prev;
const paginaSiguiente = body.dataset.next;

const paginas = [

    "cliente.html",

    "laborales.html",

    "fatca.html",

    "pep.html",

    "adicional.html",

    "cuestionario.html",

    "declaracion.html"

];


const pasoActual = Number(document.body.dataset.step);


const formulario = document.getElementById("formRegistro");

const seccion = formulario.dataset.seccion;

const registroCliente = {
    datosCliente: {},
    datosLaborales: {},
    documentos: {}
};

const modalSalir = document.getElementById("modalSalir");

const btnSalir = document.getElementById("btnSalir");

const btnVolver = document.getElementById("btnVolver");

//=================Botones de los formularios==================//

// Boton siguente
const btnSiguiente = document.getElementById("btnSiguiente");


// btnSiguiente.addEventListener("click", guardarDatos);
btnSiguiente.addEventListener("click", () => {
    guardarDatos();
    window.location.href = paginas[pasoActual + 1];
});




//Boton atras
const btnAnterior = document.getElementById("btnAnterior");

if (pasoActual === 0) {

    btnAnterior.textContent = "Cancelar";

    btnAnterior.addEventListener("click", () => {

        modalSalir.classList.add("show");

        return;

    });

} else {
    btnAnterior.addEventListener("click", () => {

        window.location.href = paginas[pasoActual - 1];

    });

}


// BOTONES DEL MODAL 
if (btnVolver) {

    btnVolver.addEventListener("click", () => {

        modalSalir.classList.remove("show");

    });

}

if (btnSalir) {

    btnSalir.addEventListener("click", () => {

        sessionStorage.removeItem("registroCliente");

        window.location.href = "bienvenida.html";

    });

}



// Cuando la página termina de cargar
window.addEventListener("DOMContentLoaded", () => {

    if (window.location.pathname.includes("laborales.html") || window.location.pathname.includes("fatca.html")) {

        const registroCliente = JSON.parse(
            sessionStorage.getItem("registroCliente")
        );

        console.log(registroCliente);

    }

});

window.addEventListener("DOMContentLoaded", () => {

    cargarDatosFormulario();

});


// funcion que dependiendo de la pagina que sea, llama una funcion u otra.
function guardarDatos() {

    switch (seccion) {

        case "datosCliente":
            guardarDatosCliente();
            break;

        case "datosLaborales":
            guardarDatosLaborales();
            break;

        case "datosFatca":
            guardarDocumentos();
            break;

    }

}



// Funcion para guardar los datos de la primera pagina 
// function guardarDatosCliente() {

//     const tipoDocumento = document.querySelector('input[name="tipo"]:checked')?.value || "";

//     const ley155 = document.querySelector('input[name="ley"]:checked')?.value || "";

//     const sexo = document.querySelector('input[name="sexo"]:checked')?.value || "";

//     const ocupacion = document.querySelector('input[name="ocupacion"]:checked')?.value || "";

//     const datosCliente = {

//         nombres: document.getElementById("nombres").value,

//         apellidos: document.getElementById("apellidos").value,

//         tipoDocumento: tipoDocumento,

//         identificacion: document.getElementById("identificacion").value,

//         telefonoCasa: document.getElementById("telefonoCasa").value,

//         celular: document.getElementById("celular").value,

//         direccion: document.getElementById("direccion").value,

//         nacimiento: document.getElementById("nacimiento").value,

//         nacionalidad: document.getElementById("nacionalidad").value,

//         sector: document.getElementById("sector").value,

//         ciudad: document.getElementById("ciudad").value,

//         pais: document.getElementById("pais").value,

//         email: document.getElementById("email").value,

//         ley155: ley155,

//         civil: document.getElementById("civil").value,

//         sexo: sexo,

//         ocupacion: ocupacion,

//         profesion: document.getElementById("profesion").value

//     };

//     registroCliente.datosCliente = datosCliente;

//     sessionStorage.setItem(
//         "registroCliente",
//         JSON.stringify(registroCliente)
//     );

// }

function guardarDatosCliente() {

    const formulario = document.getElementById("formRegistro");

    const seccion = formulario.dataset.seccion;

    let registroCliente = JSON.parse(
        sessionStorage.getItem("registroCliente")
    );

    if (!registroCliente) {

        registroCliente = {

            datosCliente: {},

            datosLaborales: {},

            documentos: {}

        };

    }

    const datos = {};

    const campos = formulario.querySelectorAll("[data-field]");

    campos.forEach(campo => {

        const propiedad = campo.dataset.field;

        switch (campo.type) {
            case "radio":
                if (campo.checked) {

                    datos[propiedad] = campo.value;

                }
                break;
            case "checkbox":
                datos[propiedad] = campo.checked;
                break;
            default:
                datos[propiedad] = campo.value;

        }

    });

    registroCliente[seccion] = datos;

    sessionStorage.setItem(
        "registroCliente",
        JSON.stringify(registroCliente)
    );

}

function guardarDatosLaborales() {
    const formulario = document.getElementById("formRegistro");

    const seccion = formulario.dataset.seccion;

    let registroCliente = JSON.parse(
        sessionStorage.getItem("registroCliente")
    );

    if (!registroCliente) {

        registroCliente = {

            datosCliente: {},

            datosLaborales: {},

            documentos: {}

        };

    }

    const datos = {};

    const campos = formulario.querySelectorAll("[data-field]");

    campos.forEach(campo => {

        const propiedad = campo.dataset.field;

        switch (campo.type) {
            case "radio":
                if (campo.checked) {

                    datos[propiedad] = campo.value;

                }
                break;
            case "checkbox":
                datos[propiedad] = campo.checked;
                break;
            default:
                datos[propiedad] = campo.value;

        }

    });

    registroCliente[seccion] = datos;

    sessionStorage.setItem(
        "registroCliente",
        JSON.stringify(registroCliente)
    );
}

// Funcion para cargar los datos al formulario
function cargarDatosFormulario() {

    const registroCliente = JSON.parse(
        sessionStorage.getItem("registroCliente")
    );

    if (!registroCliente) return;

    const formulario = document.getElementById("formRegistro");

    if (!formulario) return;

    const seccion = formulario.dataset.seccion;

    const datos = registroCliente[seccion];

    if (!datos) return;

    const campos = formulario.querySelectorAll("[data-field]");

    campos.forEach(campo => {

        const propiedad = campo.dataset.field;

        if (!(propiedad in datos)) return;

        switch (campo.type) {

            case "radio":

                campo.checked = campo.value === datos[propiedad];
                break;

            case "checkbox":

                campo.checked = datos[propiedad];
                break;

            default:

                campo.value = datos[propiedad];

        }

    });

}