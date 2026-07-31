// VARIABLES
const paises = [
  { value: "Afganistan", nombre: "Afganistán" },
  { value: "Albania", nombre: "Albania" },
  { value: "Alemania", nombre: "Alemania" },
  { value: "Andorra", nombre: "Andorra" },
  { value: "Angola", nombre: "Angola" },
  { value: "Antigua y Barbuda", nombre: "Antigua y Barbuda" },
  { value: "Arabia Saudita", nombre: "Arabia Saudita" },
  { value: "Argelia", nombre: "Argelia" },
  { value: "Argentina", nombre: "Argentina" },
  { value: "Armenia", nombre: "Armenia" },
  { value: "Australia", nombre: "Australia" },
  { value: "Austria", nombre: "Austria" },
  { value: "Azerbaiyan", nombre: "Azerbaiyán" },

  { value: "Bahamas", nombre: "Bahamas" },
  { value: "Bahrein", nombre: "Bahrein" },
  { value: "Bangladesh", nombre: "Bangladés" },
  { value: "Barbados", nombre: "Barbados" },
  { value: "Belarus", nombre: "Bielorrusia" },
  { value: "Belgica", nombre: "Bélgica" },
  { value: "Belice", nombre: "Belice" },
  { value: "Benin", nombre: "Benín" },
  { value: "Bhutan", nombre: "Bután" },
  { value: "Bolivia", nombre: "Bolivia" },
  { value: "Bosnia y Herzegovina", nombre: "Bosnia y Herzegovina" },
  { value: "Botswana", nombre: "Botsuana" },
  { value: "Brasil", nombre: "Brasil" },
  { value: "Brunei", nombre: "Brunéi" },
  { value: "Bulgaria", nombre: "Bulgaria" },
  { value: "Burkina Faso", nombre: "Burkina Faso" },
  { value: "Burundi", nombre: "Burundi" },

  { value: "Cabo Verde", nombre: "Cabo Verde" },
  { value: "Camboya", nombre: "Camboya" },
  { value: "Camerun", nombre: "Camerún" },
  { value: "Canada", nombre: "Canadá" },
  { value: "Catar", nombre: "Catar" },
  { value: "Chad", nombre: "Chad" },
  { value: "Chile", nombre: "Chile" },
  { value: "China", nombre: "China" },
  { value: "Chipre", nombre: "Chipre" },
  { value: "Colombia", nombre: "Colombia" },
  { value: "Comoras", nombre: "Comoras" },
  { value: "Congo", nombre: "Congo" },
  { value: "Corea del Norte", nombre: "Corea del Norte" },
  { value: "Corea del Sur", nombre: "Corea del Sur" },
  { value: "Costa de Marfil", nombre: "Costa de Marfil" },
  { value: "Costa Rica", nombre: "Costa Rica" },
  { value: "Croacia", nombre: "Croacia" },
  { value: "Cuba", nombre: "Cuba" },

  { value: "Dinamarca", nombre: "Dinamarca" },
  { value: "Dominica", nombre: "Dominica" },

  { value: "Ecuador", nombre: "Ecuador" },
  { value: "Egipto", nombre: "Egipto" },
  { value: "El Salvador", nombre: "El Salvador" },
  { value: "Emiratos Arabes Unidos", nombre: "Emiratos Árabes Unidos" },
  { value: "Eritrea", nombre: "Eritrea" },
  { value: "Eslovaquia", nombre: "Eslovaquia" },
  { value: "Eslovenia", nombre: "Eslovenia" },
  { value: "España", nombre: "España" },
  { value: "Estados Unidos", nombre: "Estados Unidos" },
  { value: "Estonia", nombre: "Estonia" },
  { value: "Eswatini", nombre: "Esuatini" },
  { value: "Etiopia", nombre: "Etiopía" },

  { value: "Fiji", nombre: "Fiyi" },
  { value: "Filipinas", nombre: "Filipinas" },
  { value: "Finlandia", nombre: "Finlandia" },
  { value: "Francia", nombre: "Francia" },

  { value: "Gabon", nombre: "Gabón" },
  { value: "Gambia", nombre: "Gambia" },
  { value: "Georgia", nombre: "Georgia" },
  { value: "Ghana", nombre: "Ghana" },
  { value: "Granada", nombre: "Granada" },
  { value: "Grecia", nombre: "Grecia" },
  { value: "Guatemala", nombre: "Guatemala" },
  { value: "Guinea", nombre: "Guinea" },
  { value: "Guinea-Bisau", nombre: "Guinea-Bisáu" },
  { value: "Guinea Ecuatorial", nombre: "Guinea Ecuatorial" },
  { value: "Guyana", nombre: "Guyana" },

  { value: "Haiti", nombre: "Haití" },
  { value: "Honduras", nombre: "Honduras" },
  { value: "Hungria", nombre: "Hungría" },

  { value: "India", nombre: "India" },
  { value: "Indonesia", nombre: "Indonesia" },
  { value: "Irak", nombre: "Irak" },
  { value: "Iran", nombre: "Irán" },
  { value: "Irlanda", nombre: "Irlanda" },
  { value: "Islandia", nombre: "Islandia" },
  { value: "Islas Marshall", nombre: "Islas Marshall" },
  { value: "Islas Salomon", nombre: "Islas Salomón" },
  { value: "Israel", nombre: "Israel" },
  { value: "Italia", nombre: "Italia" },

  { value: "Jamaica", nombre: "Jamaica" },
  { value: "Japon", nombre: "Japón" },
  { value: "Jordania", nombre: "Jordania" },

  { value: "Kazajistan", nombre: "Kazajistán" },
  { value: "Kenia", nombre: "Kenia" },
  { value: "Kirguistan", nombre: "Kirguistán" },
  { value: "Kiribati", nombre: "Kiribati" },
  { value: "Kuwait", nombre: "Kuwait" },

  { value: "Laos", nombre: "Laos" },
  { value: "Lesoto", nombre: "Lesoto" },
  { value: "Letonia", nombre: "Letonia" },
  { value: "Libano", nombre: "Líbano" },
  { value: "Liberia", nombre: "Liberia" },
  { value: "Libia", nombre: "Libia" },
  { value: "Liechtenstein", nombre: "Liechtenstein" },
  { value: "Lituania", nombre: "Lituania" },
  { value: "Luxemburgo", nombre: "Luxemburgo" },

  { value: "Madagascar", nombre: "Madagascar" },
  { value: "Malasia", nombre: "Malasia" },
  { value: "Malaui", nombre: "Malaui" },
  { value: "Maldivas", nombre: "Maldivas" },
  { value: "Mali", nombre: "Malí" },
  { value: "Malta", nombre: "Malta" },
  { value: "Marruecos", nombre: "Marruecos" },
  { value: "Mauricio", nombre: "Mauricio" },
  { value: "Mauritania", nombre: "Mauritania" },
  { value: "Mexico", nombre: "México" },
  { value: "Micronesia", nombre: "Micronesia" },
  { value: "Moldavia", nombre: "Moldavia" },
  { value: "Monaco", nombre: "Mónaco" },
  { value: "Mongolia", nombre: "Mongolia" },
  { value: "Montenegro", nombre: "Montenegro" },
  { value: "Mozambique", nombre: "Mozambique" },
  { value: "Myanmar", nombre: "Myanmar" },

  { value: "Namibia", nombre: "Namibia" },
  { value: "Nauru", nombre: "Nauru" },
  { value: "Nepal", nombre: "Nepal" },
  { value: "Nicaragua", nombre: "Nicaragua" },
  { value: "Niger", nombre: "Níger" },
  { value: "Nigeria", nombre: "Nigeria" },
  { value: "Noruega", nombre: "Noruega" },
  { value: "Nueva Zelanda", nombre: "Nueva Zelanda" },

  { value: "Oman", nombre: "Omán" },

  { value: "Paises Bajos", nombre: "Países Bajos" },
  { value: "Pakistan", nombre: "Pakistán" },
  { value: "Palaos", nombre: "Palaos" },
  { value: "Palestina", nombre: "Palestina" },
  { value: "Panama", nombre: "Panamá" },
  { value: "Papua Nueva Guinea", nombre: "Papúa Nueva Guinea" },
  { value: "Paraguay", nombre: "Paraguay" },
  { value: "Peru", nombre: "Perú" },
  { value: "Polonia", nombre: "Polonia" },
  { value: "Portugal", nombre: "Portugal" },

  { value: "Reino Unido", nombre: "Reino Unido" },
  { value: "Republica Centroafricana", nombre: "República Centroafricana" },
  { value: "Republica Checa", nombre: "República Checa" },
  {
    value: "Republica Democratica del Congo",
    nombre: "República Democrática del Congo",
  },
  { value: "Republica Dominicana", nombre: "República Dominicana" },
  { value: "Rumania", nombre: "Rumanía" },
  { value: "Rusia", nombre: "Rusia" },
  { value: "Ruanda", nombre: "Ruanda" },

  { value: "Samoa", nombre: "Samoa" },
  { value: "San Cristobal y Nieves", nombre: "San Cristóbal y Nieves" },
  { value: "San Marino", nombre: "San Marino" },
  {
    value: "San Vicente y las Granadinas",
    nombre: "San Vicente y las Granadinas",
  },
  { value: "Santa Lucia", nombre: "Santa Lucía" },
  { value: "Santo Tome y Principe", nombre: "Santo Tomé y Príncipe" },
  { value: "Senegal", nombre: "Senegal" },
  { value: "Serbia", nombre: "Serbia" },
  { value: "Seychelles", nombre: "Seychelles" },
  { value: "Sierra Leona", nombre: "Sierra Leona" },
  { value: "Singapur", nombre: "Singapur" },
  { value: "Siria", nombre: "Siria" },
  { value: "Somalia", nombre: "Somalia" },
  { value: "Sri Lanka", nombre: "Sri Lanka" },
  { value: "Sudafrica", nombre: "Sudáfrica" },
  { value: "Sudan", nombre: "Sudán" },
  { value: "Sudan del Sur", nombre: "Sudán del Sur" },
  { value: "Suecia", nombre: "Suecia" },
  { value: "Suiza", nombre: "Suiza" },
  { value: "Surinam", nombre: "Surinam" },

  { value: "Tailandia", nombre: "Tailandia" },
  { value: "Taiwan", nombre: "Taiwán" },
  { value: "Tanzania", nombre: "Tanzania" },
  { value: "Tayikistan", nombre: "Tayikistán" },
  { value: "Timor Oriental", nombre: "Timor Oriental" },
  { value: "Togo", nombre: "Togo" },
  { value: "Tonga", nombre: "Tonga" },
  { value: "Trinidad y Tobago", nombre: "Trinidad y Tobago" },
  { value: "Tunez", nombre: "Túnez" },
  { value: "Turkmenistan", nombre: "Turkmenistán" },
  { value: "Turquia", nombre: "Turquía" },
  { value: "Tuvalu", nombre: "Tuvalu" },

  { value: "Ucrania", nombre: "Ucrania" },
  { value: "Uganda", nombre: "Uganda" },
  { value: "Uruguay", nombre: "Uruguay" },
  { value: "Uzbekistan", nombre: "Uzbekistán" },

  { value: "Vanuatu", nombre: "Vanuatu" },
  { value: "Vaticano", nombre: "Vaticano" },
  { value: "Venezuela", nombre: "Venezuela" },
  { value: "Vietnam", nombre: "Vietnam" },

  { value: "Yemen", nombre: "Yemen" },
  { value: "Yibuti", nombre: "Yibuti" },

  { value: "Zambia", nombre: "Zambia" },
  { value: "Zimbabue", nombre: "Zimbabue" },
];

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

  "cuestionario2.html",

  "declaracion.html",
];

const pasoActual = Number(document.body.dataset.step);

const formulario = document.getElementById("formRegistro");

const seccion = formulario.dataset.seccion;

const registroCliente = {
  datosCliente: {},
  datosLaborales: {},
  documentos: {},
};

const modalSalir = document.getElementById("modalSalir");

const btnSalir = document.getElementById("btnSalir");

const btnVolver = document.getElementById("btnVolver");

// FIN DE LAS VARIABLES

// Funcion para cargar los paises en los select

function cargarPaises() {
  const selects = document.querySelectorAll("select[data-paises]");

  selects.forEach((select) => {
    const valorActual = select.value;

    select.innerHTML = "";

    const opcionInicial = document.createElement("option");

    opcionInicial.value = "";

    opcionInicial.textContent = "Seleccione un país";

    select.appendChild(opcionInicial);

    paises.forEach((pais) => {
      const option = document.createElement("option");

      option.value = pais.value;

      option.textContent = pais.nombre;

      select.appendChild(option);
    });

    // Si ya tenía un valor guardado
    if (valorActual) {
      select.value = valorActual;
    }
  });
}

//=================Botones de los formularios==================//
// Boton siguente
const btnSiguiente = document.getElementById("btnSiguiente");

if (btnSiguiente) {
  btnSiguiente.addEventListener("click", () => {
    guardarDatos();
    window.location.href = paginas[pasoActual + 1];
  });
}

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
    // No queremos que borre el cache de los datos ya guardados
    // localStorage.removeItem("registroCliente");

    window.location.href = "index.html";
  });
}

// Cuando la página termina de cargar ESTO ES UN EJEMPLO POR AHORA
window.addEventListener("DOMContentLoaded", () => {
  if (
    window.location.pathname.includes("laborales.html") ||
    window.location.pathname.includes("fatca.html")
  ) {
    const registroCliente = JSON.parse(
      localStorage.getItem("registroCliente"),
    );

    console.log(registroCliente);
  }
});

// Funcion que cuando cargue cualquier pagina, carga lo datos correspondientes a dicha pagina
window.addEventListener("DOMContentLoaded", () => {
  cargarPaises();

  cargarDatosFormulario();

  inicializarCamposCondicionales();

  inicializarFirma();
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
function guardarDatosCliente() {
  const formulario = document.getElementById("formRegistro");

  const seccion = formulario.dataset.seccion;

  let registroCliente = JSON.parse(localStorage.getItem("registroCliente"));

  if (!registroCliente) {
    registroCliente = {
      datosCliente: {},

      datosLaborales: {},

      documentos: {},
    };
  }

  const datos = {};

  const campos = formulario.querySelectorAll("[data-field]");

  campos.forEach((campo) => {
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

  localStorage.setItem("registroCliente", JSON.stringify(registroCliente));
}

// Funcion para guardar los datos de la segunda pagina
function guardarDatosLaborales() {
  const formulario = document.getElementById("formRegistro");

  const seccion = formulario.dataset.seccion;

  let registroCliente = JSON.parse(localStorage.getItem("registroCliente"));

  if (!registroCliente) {
    registroCliente = {
      datosCliente: {},

      datosLaborales: {},

      documentos: {},
    };
  }

  const datos = {};

  const campos = formulario.querySelectorAll("[data-field]");

  campos.forEach((campo) => {
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

  localStorage.setItem("registroCliente", JSON.stringify(registroCliente));
}

// Funcion poara guardar los datos de la tercera pagina
function guardarDocumentos() {
  console.log();
}

///////////////////////////////////////////////////////

function inicializarCamposCondicionales() {
  const radios = document.querySelectorAll('input[type="radio"][data-target]');

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      actualizarCampoCondicional(radio);
    });
  });

  // Revisar el estado inicial
  // por si venimos de otra página
  radios.forEach((radio) => {
    if (radio.checked) {
      actualizarCampoCondicional(radio);
    }
  });
}

function actualizarCampoCondicional(radio) {
  const targetId = radio.dataset.target;

  const valorMostrar = radio.dataset.showValue;

  const target = document.getElementById(targetId);

  if (!target) return;

  const grupo = document.querySelectorAll(
    `input[type="radio"][data-target="${targetId}"]`,
  );

  const radioSeleccionado = [...grupo].find((radio) => radio.checked);

  if (radioSeleccionado && radioSeleccionado.value === valorMostrar) {
    target.classList.remove("hidden");
  } else {
    target.classList.add("hidden");

    limpiarCampos(target);
  }
}

document.querySelectorAll("select[data-target]").forEach(select => {

    function actualizar() {

        const target = document.getElementById(
            select.dataset.target
        );

        if (!target) return;

        if (select.value === select.dataset.showValue) {

            target.classList.remove("hidden");

        } else {

            target.classList.add("hidden");

        }

    }

    actualizar();

    select.addEventListener("change", actualizar);

});

function limpiarCampos(contenedor) {
  const campos = contenedor.querySelectorAll("input, textarea, select");

  campos.forEach((campo) => {
    if (campo.type === "radio" || campo.type === "checkbox") {
      campo.checked = false;
    } else {
      campo.value = "";
    }
  });
}

//////////////////////////////////////////////////////

// Funcion para cargar los datos al formulario
function cargarDatosFormulario() {
  const registroCliente = JSON.parse(localStorage.getItem("registroCliente"));

  if (!registroCliente) return;

  const formulario = document.getElementById("formRegistro");

  if (!formulario) return;

  const seccion = formulario.dataset.seccion;

  const datos = registroCliente[seccion];

  if (!datos) return;

  const campos = formulario.querySelectorAll("[data-field]");

  campos.forEach((campo) => {
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

const check = document.getElementById("aceptaDeclaracion");
const btnAceptar = document.getElementById("btnAceptarDeclaracion");
const btnFinalizar = document.getElementById("btnFinalizar");

if (check) {
  check.addEventListener("change", () => {
    btnAceptar.disabled = !check.checked;
  });
}

if (btnAceptar) {
  btnAceptar.addEventListener("click", () => {
    document.getElementById("terminosCard").classList.add("hidden");

    document.getElementById("firmaCard").classList.remove("hidden");
  });
}

if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    window.location.href = "fin.html";
  });
}


function inicializarFirma() {

    const nombreFirma = document.getElementById("nombreClienteFirma");
    const fechaFirma = document.getElementById("fechaFirma");

    if (!nombreFirma || !fechaFirma) return;

    const registro = JSON.parse(localStorage.getItem("registroCliente"));

    nombreFirma.textContent =
        `${registro.datosCliente.nombres} ${registro.datosCliente.apellidos}`;

    fechaFirma.textContent = new Date().toLocaleDateString("es-DO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

}
