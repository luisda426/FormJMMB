import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/* ========================================
DATOS DE EJEMPLO
======================================== */

let solicitudes = [];
let solicitudActual = null;

//  VARIABLE PARA PROBAR API O USAR JSON DE EJEMPLO
// true para usar APi, y false para usar json de ejemplo
const USAR_API = false;

/* ========================================
ELEMENTOS
======================================== */

const detailContent = document.getElementById("detailContent");

const detailNotFound = document.getElementById("detailNotFound");

/* ========================================
AUTENTICACIÓN
======================================== */

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("./login.html");

    return;
  }

  const sidebarUserEmail = document.getElementById("sidebarUserEmail");

  if (sidebarUserEmail) {
    sidebarUserEmail.textContent = user.email;
  }

  const nombreUsuario = user.displayName || "Administrador";

  const sidebarUserName = document.getElementById("sidebarUserName");

  const headerUserName = document.getElementById("headerUserName");

  if (sidebarUserName) {
    sidebarUserName.textContent = nombreUsuario;
  }

  if (headerUserName) {
    headerUserName.textContent = nombreUsuario;
  }

  const inicial = nombreUsuario.charAt(0).toUpperCase();

  const sidebarAvatar = document.querySelector(".sidebar-user-avatar");

  const headerAvatar = document.querySelector(".header-avatar");

  if (sidebarAvatar) {
    sidebarAvatar.textContent = inicial;
  }

  if (headerAvatar) {
    headerAvatar.textContent = inicial;
  }

  cargarSolicitud();
});

/* ========================================
OBTENER ID DE LA URL
======================================== */

function obtenerIdSolicitud() {
  const parametros = new URLSearchParams(window.location.search);

  return parametros.get("id");
}

/* ========================================
CARGAR SOLICITUD
======================================== */

async function cargarSolicitud() {
  const id = obtenerIdSolicitud();

  if (!id) {
    mostrarNoEncontrado();
    return;
  }

  try {
    if (USAR_API) {
      // ==========================================
      // MODO API
      // ==========================================

      const respuesta = await fetch(
        `http://localhost:3000/api/solicitudes/${encodeURIComponent(id)}`,
      );

      if (respuesta.status === 404) {
        mostrarNoEncontrado();
        return;
      }

      if (!respuesta.ok) {
        throw new Error("No se pudo cargar la solicitud desde la API.");
      }

      solicitudActual = await respuesta.json();
    } else {
      // ==========================================
      // MODO JSON LOCAL
      // ==========================================

      const respuesta = await fetch("././datos.json");

      if (!respuesta.ok) {
        throw new Error("No se pudo cargar datos.json");
      }

      const solicitudes = await respuesta.json();

      solicitudActual = solicitudes.find(
        (item) => String(item.idSolicitud) === String(id),
      );

      if (!solicitudActual) {
        mostrarNoEncontrado();
        return;
      }
    }

    console.log(
      USAR_API
        ? "Solicitud cargada desde API:"
        : "Solicitud cargada desde JSON:",
      solicitudActual,
    );

    mostrarSolicitud(solicitudActual);

    cargarVinculacionCliente(solicitudActual);
  } catch (error) {
    console.error("Error cargando la solicitud:", error);

    mostrarNoEncontrado();
  }
}

async function cargarSolicitudes() {
  try {
    const respuesta = await fetch("././datos.json");

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar datos.json");
    }

    solicitudes = await respuesta.json();

    cargarSolicitud();
  } catch (error) {
    console.error("Error cargando solicitudes:", error);

    mostrarNoEncontrado();
  }
}

function cargarVinculacionCliente(solicitud) {
  const datosVinculacion = solicitud.datosVinculacion;

  if (datosVinculacion) {
    mostrarVinculacionComoDetalle(datosVinculacion);
    return;
  }

  mostrarVinculacionComoFormulario();
  preseleccionarActivosLiquidos(solicitud);
}

function obtenerDatosVinculacion() {
  const idSolicitud = Number(obtenerIdSolicitud());
  return {
    idSolicitud: idSolicitud,
    datosVinculacion: {
      tipoCliente: document.getElementById("tipoCliente").value,
      vinculacionMancomunada: convertirSiNoABoolean(
        document.querySelector('input[name="vinculacionMancomunada"]:checked')
          ?.value,
      ),
      duracionRelacion: document.getElementById("duracionRelacion").value,
      relacionCaraCara: convertirSiNoABoolean(
        document.querySelector('input[name="relacionCaraCara"]:checked')?.value,
      ),
      resumenCliente: document.getElementById("resumenCliente").value.trim(),
      productoAjustado: convertirSiNoABoolean(
        document.querySelector('input[name="productoAjustado"]:checked')?.value,
      ),
      activosLiquidos25M: convertirSiNoABoolean(
        document.querySelector('input[name="activosLiquidos25M"]:checked')
          ?.value,
      ),
      tipoClienteProspecto: document.getElementById("tipoClienteProspecto")
        .value,
      tolerancia: document.getElementById("tolerancia").value,
      bancarizacion:
        document.querySelector('input[name="bancarizacion"]:checked')?.value ||
        "",
    },
  };
}

//Funcion para converitr los SI y NO  en TRUE O FALSE

function convertirSiNoABoolean(valor) {
  if (valor === "Si") return true;
  if (valor === "No") return false;

  return null;
}

function mostrarVinculacionComoFormulario() {
  const formulario = document.getElementById("vinculacionFormulario");

  const detalle = document.getElementById("vinculacionDetalle");

  if (!formulario || !detalle) {
    return;
  }

  formulario.style.display = "block";
  detalle.style.display = "none";
}

// Funcion para preseleccionar el radio de 25M
function preseleccionarActivosLiquidos(solicitud) {
  const financiera = solicitud.datosCuestionario2 || {};
  const valor = financiera.totalActivosLiquidos;

  if (!valor) {
    return;
  }

  const esMasDe25M = valor.trim() === "Más de RD$25.0 Millones";
  const seleccion = esMasDe25M ? "Si" : "No";

  const radio = document.querySelector(
    `input[name="activosLiquidos25M"][value="${seleccion}"]`,
  );

  if (radio) {
    radio.checked = true;
  }
}

function mostrarVinculacionComoDetalle(datos) {
  const formulario = document.getElementById("vinculacionFormulario");

  const detalle = document.getElementById("vinculacionDetalle");

  if (!formulario || !detalle) {
    return;
  }

  formulario.style.display = "none";
  detalle.style.display = "block";

  document.getElementById("detalleTipoCliente").textContent =
    datos.tipoCliente || "-";

  document.getElementById("detalleVinculacionMancomunada").textContent =
    mostrarSiNo(datos.vinculacionMancomunada);

  document.getElementById("detalleDuracionRelacion").textContent =
    datos.duracionRelacion || "-";

  document.getElementById("detalleRelacionCaraCara").textContent = mostrarSiNo(
    datos.relacionCaraCara,
  );

  document.getElementById("detalleResumenCliente").textContent =
    datos.resumenCliente || "-";

  document.getElementById("detalleProductoAjustado").textContent = mostrarSiNo(
    datos.productoAjustado,
  );

  document.getElementById("detalleActivosLiquidos25M").textContent =
    mostrarSiNo(datos.activosLiquidos25M);

  document.getElementById("detalleTipoClienteProspecto").textContent =
    datos.tipoClienteProspecto || "-";

  document.getElementById("detalleBancarizacion").textContent =
    datos.bancarizacion || "-";

  document.getElementById("detalleTolerancia").textContent =
    datos.tolerancia || "-";
}

// Boton para guardar vinculacion del ASESOR
const guardarVinculacionButton = document.getElementById(
  "guardarVinculacionButton",
);

// if (guardarVinculacionButton) {
//   guardarVinculacionButton.addEventListener("click", () => {
//     const datosVinculacion = obtenerDatosVinculacion();

//     console.log("Datos de vinculación:", datosVinculacion);

//     // =========================================================
//     // SIMULACIÓN DE RESPUESTA DEL API
//     // Este true será reemplazado posteriormente por la respuesta
//     // real del API cuando hagamos el fetch().
//     // =========================================================

//     const respuestaAPI = true;

//     if (!respuestaAPI) {
//       console.error("No se pudo guardar la información.");
//       return;
//     }

//     // mostrarVinculacionComoDetalle(datosVinculacion);
//   });
// }

if (guardarVinculacionButton) {
  guardarVinculacionButton.addEventListener("click", async () => {
    try {
      const datosVinculacion = obtenerDatosVinculacion();

      const idSolicitud = datosVinculacion.idSolicitud;

      console.log("Datos enviados:", datosVinculacion.datosVinculacion);

      // ==========================================
      // GUARDAR EN LA BASE DE DATOS
      // ==========================================

      const respuesta = await fetch(
        `http://localhost:3000/api/solicitudes/${idSolicitud}/vinculacion`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(datosVinculacion.datosVinculacion),
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.error || "No se pudo guardar la información.",
        );
      }

      console.log("Vinculación guardada:", resultado);

      // ==========================================
      // VOLVER A CONSULTAR LA SOLICITUD
      // ==========================================

      await cargarSolicitud();
    } catch (error) {
      console.error("Error guardando vinculación:", error);

      alert("No se pudo guardar la información de vinculación.");
    }
  });
}
/* ========================================
MOSTRAR SOLICITUD
======================================== */

function mostrarSolicitud(solicitud) {
  detailContent.style.display = "block";
  detailNotFound.classList.remove("show");

  const preferencias = solicitud.datosPreferencias || {};
  const cliente = solicitud.datosCliente || {};
  const solicitudInfo = solicitud.solicitud || {};
  const laboral = solicitud.datosLaborales || {};
  const fatca = solicitud.datosFatca || {};
  const pep = solicitud.datosPep || {};
  const adicionales = solicitud.datosAdicionales || {};
  const cuestionario = solicitud.datosCuestionario || {};
  const financiera = solicitud.datosCuestionario2 || {};
  const declaracion = solicitud.datosDeclaracion || {};
  const documentos = solicitud.datosDocumentos || [];

  // ========================================
  // ENCABEZADO
  // ========================================

  document.getElementById("detailId").textContent =
    `FJ-${solicitud.idSolicitud}`;

  const status = document.getElementById("detailStatus");

  status.textContent = solicitudInfo.estadoSolicitud || "-";

  status.className =
    "status-badge " + obtenerClaseEstado(solicitudInfo.estadoSolicitud);

  // ========================================
  // PREFERENCIAS DE VINCULACIÓN
  // ========================================

  document.getElementById("detailOficinaPreferencia").textContent =
    mostrarValor(preferencias.oficinaPreferencia);

  document.getElementById("detailPrimeraVez").textContent = mostrarSiNo(
    preferencias.primeraVez,
  );

  document.getElementById("detailEntidadesCliente").innerHTML = mostrarLista(
    preferencias.entidadesCliente,
  );

  document.getElementById("detailInstitucionesVincular").innerHTML =
    mostrarLista(preferencias.institucionesVincular);

  // ========================================
  // INFORMACIÓN PERSONAL
  // ========================================

  document.getElementById("detailNombres").textContent = mostrarValor(
    cliente.nombres,
  );

  document.getElementById("detailApellidos").textContent = mostrarValor(
    cliente.apellidos,
  );

  document.getElementById("detailTipoDocumento").textContent = mostrarValor(
    cliente.tipoDocumento,
  );

  document.getElementById("detailIdentificacion").textContent = mostrarValor(
    cliente.identificacion,
  );

  document.getElementById("detailIdExtranjero").textContent = mostrarValor(
    cliente.idExtranjero,
  );

  document.getElementById("detailFechaNacimiento").textContent = formatearFecha(
    cliente.fechaNacimiento,
  );

  document.getElementById("detailLugarNacimiento").textContent = mostrarValor(
    cliente.lugarNacimiento,
  );

  document.getElementById("detailNacionalidad").textContent = mostrarValor(
    cliente.nacionalidad,
  );

  document.getElementById("detailCivil").textContent = mostrarValor(
    cliente.civil,
  );

  document.getElementById("detailSexo").textContent = mostrarValor(
    cliente.sexo,
  );

  document.getElementById("detailProfesion").textContent = mostrarValor(
    cliente.profesion,
  );

  document.getElementById("detailOcupacion").textContent = mostrarValor(
    cliente.ocupacion,
  );

  document.getElementById("detailLey155").textContent = mostrarSiNo(
    cliente.ley155,
  );

  document.getElementById("detailCelular").textContent = mostrarValor(
    cliente.celular,
  );

  document.getElementById("detailOtroTelefono").textContent = mostrarValor(
    cliente.otroTelefono,
  );

  document.getElementById("detailTelefonoCasa").textContent = mostrarValor(
    cliente.telefonoCasa,
  );

  document.getElementById("detailEmail").textContent = mostrarValor(
    cliente.email,
  );

  document.getElementById("detailDireccion").textContent = mostrarValor(
    cliente.direccion,
  );

  document.getElementById("detailCiudad").textContent = mostrarValor(
    cliente.ciudad,
  );

  document.getElementById("detailSector").textContent = mostrarValor(
    cliente.sector,
  );

  document.getElementById("detailPais").textContent = mostrarValor(
    cliente.pais,
  );

  // CAMPOS AGREGADOS DESPUES
  document.getElementById("detailOtraProfesion").textContent = mostrarValor(
    cliente.otraProfesion,
  );

  document.getElementById("detailFuentesIngresos").textContent = mostrarSiNo(
    cliente.ingresosFormales,
  );

  document.getElementById("detailOtrasFuentesIngresos").textContent =
    mostrarValor(cliente.otrosIngresosFormales);

  document.getElementById("detailResidenteRD").textContent = mostrarSiNo(
    cliente.residenteRD,
  );

  document.getElementById("detailActLaboralFinanciera").textContent =
    mostrarSiNo(cliente.actLaboralFinanciera);

  document.getElementById("detailExplicacionActLaboralFinanciera").textContent =
    mostrarValor(cliente.explicacionActLaboralFinanciera);
  // ========================================
  // INFORMACIÓN CÓNYUGE
  // ========================================

  document.getElementById("detailNombresConyuge").textContent = mostrarValor(
    cliente.nombresConyuge,
  );

  document.getElementById("detailApellidosConyuge").textContent = mostrarValor(
    cliente.apellidosConyuge,
  );

  document.getElementById("detailEmailConyuge").textContent = mostrarValor(
    cliente.emailConyuge,
  );

  document.getElementById("detailEdadConyuge").textContent = mostrarValor(
    cliente.edadConyuge,
  );

  document.getElementById("detailTipoDocumentoConyuge").textContent =
    mostrarValor(cliente.tipoDocumentoConyuge);

  document.getElementById("detailIdentificacionConyuge").textContent =
    mostrarValor(cliente.identificacionConyuge);

  document.getElementById("detailLaboraConyuge").textContent = mostrarValor(
    cliente.laboraConyuge,
  );

  document.getElementById("detailCargoConyuge").textContent = mostrarValor(
    cliente.cargoConyuge,
  );

  document.getElementById("detailTelefonoCasaConyuge").textContent =
    mostrarValor(cliente.telefonoCasaConyuge);

  document.getElementById("detailCelularConyuge").textContent = mostrarValor(
    cliente.celularConyuge,
  );

  document.getElementById("detailIngresosConyuge").textContent = mostrarValor(
    cliente.ingresosConyuge,
  );

  // ========================================
  // INFORMACIÓN LABORAL
  // ========================================

  document.getElementById("detailEmpresa").textContent = mostrarValor(
    laboral.empresa,
  );

  document.getElementById("detailCargo").textContent = mostrarValor(
    laboral.cargo,
  );

  document.getElementById("detailIngreso").textContent = formatearFecha(
    laboral.fechaIngreso,
  );

  document.getElementById("detailTelefonoEmpresa").textContent = mostrarValor(
    laboral.telefono,
  );

  document.getElementById("detailEmailEmpresa").textContent = mostrarValor(
    laboral.email,
  );

  document.getElementById("detailDireccionEmpresa").textContent = mostrarValor(
    laboral.direccionEmpresa,
  );

  document.getElementById("detailCiudadEmpresa").textContent = mostrarValor(
    laboral.ciudad,
  );

  document.getElementById("detailSectorEmpresa").textContent = mostrarValor(
    laboral.sector,
  );

  document.getElementById("detailPaisEmpresa").textContent = mostrarValor(
    laboral.pais,
  );

  document.getElementById("detailComentariosLaborales").textContent =
    mostrarValor(laboral.comentarios);

  // ========================================
  // FATCA
  // ========================================

  document.getElementById("detailOtrasCiudadanias").textContent = mostrarSiNo(
    fatca.otrasCiudadanias,
  );

  document.getElementById("detailCiudadania1").textContent = mostrarValor(
    fatca.ciudadania1,
  );

  document.getElementById("detailCiudadania2").textContent = mostrarValor(
    fatca.ciudadania2,
  );

  document.getElementById("detailResidenciaFisicaUSA").textContent =
    mostrarSiNo(fatca.residenciaFisicaUSA);

  document.getElementById("detailTin").textContent = mostrarValor(fatca.tin);

  document.getElementById("detailGreenCard").textContent = mostrarSiNo(
    fatca.greenCard,
  );

  document.getElementById("detailMasResidenciaFiscal").textContent =
    mostrarSiNo(fatca.masResidenciaFiscal);

  document.getElementById("detailCondicionUSA").textContent = mostrarValor(
    fatca.condicionUSA,
  );

  document.getElementById("detailTelefonoExtranjero").textContent = mostrarSiNo(
    fatca.telefonoExtranjero,
  );

  document.getElementById("detailTelefonoExtranjeroNumero").textContent =
    mostrarValor(fatca.telefonoExtranjeroNumero);

  document.getElementById("detailPaisesResidenciaFiscal").textContent =
    mostrarValor(fatca.paisesResidenciaFiscal);

  document.getElementById("detailDireccionEnvio").textContent = mostrarValor(
    fatca.direccionEnvio,
  );

  document.getElementById("detailDireccionEnvioUSA").textContent = mostrarSiNo(
    fatca.direccionEnvioUSA,
  );

  document.getElementById("detailDetalleResidencia").textContent = mostrarValor(
    fatca.direccionResidencia,
  );

  document.getElementById("detailDireccionResidenciaUSA").textContent =
    mostrarSiNo(fatca.direccionResidenciaUSA);

  document.getElementById("detailComentariosFatca").textContent = mostrarValor(
    fatca.comentarios,
  );

  // ========================================
  // PEP
  // ========================================

  document.getElementById("detailEsPEP").textContent = mostrarSiNo(pep.esPEP);

  document.getElementById("detailCargoPEP").textContent = mostrarValor(
    pep.cargoPEP,
  );

  document.getElementById("detailPaisPEP").textContent = mostrarValor(
    pep.paisPEP,
  );

  document.getElementById("detailFechaDesignacionPEP").textContent =
    formatearFecha(pep.fechaDesignacionPEP);

  document.getElementById("detailFechaRemocionPEP").textContent =
    formatearFecha(pep.fechaRemocionPEP);

  document.getElementById("detailRelacionPEP").textContent = mostrarSiNo(
    pep.relacionPEP,
  );

  document.getElementById("detailNombrePEP").textContent = mostrarValor(
    pep.nombrePEP,
  );

  document.getElementById("detailPaisPEPRelacionado").textContent =
    mostrarValor(pep.paisPEPRelacionado);

  document.getElementById("detailParentescoPEP").textContent = mostrarValor(
    pep.parentescoPEP,
  );

  document.getElementById("detailCargoPEPRelacionado").textContent =
    mostrarValor(pep.cargoPEPRelacionado);

  document.getElementById("detailFechaDesignacionPEPRelacionado").textContent =
    formatearFecha(pep.fechaDesignacionPEPRelacionado);

  document.getElementById("detailFechaRemocionPEPRelacionado").textContent =
    formatearFecha(pep.fechaRemocionPEPRelacionado);

  // ========================================
  // INFORMACIÓN DE INVERSIÓN
  // ========================================

  document.getElementById("detailProductosSolicitados").innerHTML =
    mostrarLista(adicionales.productosSolicitados);

  //////////////////////////////////////////

  // INVERSIONES PUESTO

  document.getElementById("detailMontoEstimadoInversionPuestoUSD").textContent =
    mostrarValor(adicionales.montoEstimadoInversionPuestoUSD);

  document.getElementById("detailOrigenFondosPuestoUSD").textContent =
    mostrarValor(adicionales.origenFondosPuestoUSD);

  document.getElementById("detailOtroOrigenFondosPuestoUSD").textContent =
    mostrarValor(adicionales.otroOrigenFondosPuestoUSD);

  document.getElementById("detailMontoEstimadoInversionPuestoRD").textContent =
    mostrarValor(adicionales.montoEstimadoInversionPuestoRD);

  document.getElementById("detailOrigenFondosPuestoRD").textContent =
    mostrarValor(adicionales.origenFondosPuestoRD);

  document.getElementById("detailOtroOrigenFondosPuestoRD").textContent =
    mostrarValor(adicionales.otroOrigenFondosPuestoRD);

  // INVERSIONES SAFI

  document.getElementById("detailMontoEstimadoInversionSafiUSD").textContent =
    mostrarValor(adicionales.montoEstimadoInversionSafiUSD);

  document.getElementById("detailOrigenFondosSafiUSD").textContent =
    mostrarValor(adicionales.origenFondosSafiUSD);

  document.getElementById("detailOtroOrigenFondosSafiUSD").textContent =
    mostrarValor(adicionales.otroOrigenFondosSafiUSD);

  document.getElementById("detailMontoEstimadoInversionSafiRD").textContent =
    mostrarValor(adicionales.montoEstimadoInversionSafiRD);

  document.getElementById("detailOrigenFondosSafiRD").textContent =
    mostrarValor(adicionales.origenFondosSafiRD);

  document.getElementById("detailOtroOrigenFondosSafiRD").textContent =
    mostrarValor(adicionales.otroOrigenFondosSafiRD);

  document.getElementById("detailNumeroClienteUCS").textContent = mostrarValor(
    adicionales.numeroClienteUCS,
  );

  // BANCO

  document.getElementById("detailCuentaBancoMoneda").textContent = mostrarValor(
    adicionales.cuentaBancoMoneda,
  );

  document.getElementById("detailMontoPrestamo").textContent = mostrarValor(
    adicionales.montoPrestamo,
  );

  document.getElementById("detailMonedaCertificado").textContent = mostrarValor(
    adicionales.monedaCertificado,
  );

  document.getElementById("detailMontoCertificado").textContent = mostrarValor(
    adicionales.montoCertificado,
  );

  /////////////////////////////////////////////

  document.getElementById("detailBeneficiariosTransaccion").textContent =
    mostrarSiNo(adicionales.beneficiariosTransaccion);

  document.getElementById("detailIdentificacionBeneficiarioFinal").textContent =
    mostrarValor(adicionales.identificacionBeneficiarioFinal);

  document.getElementById("detailFormaTransacciones").textContent =
    mostrarValor(adicionales.formaTransacciones);

  document.getElementById("detailTipoTransferencia").textContent = mostrarValor(
    adicionales.tipoTransferencia,
  );

  document.getElementById("detailPersonasRelacionadas").textContent =
    mostrarSiNo(adicionales.personasRelacionadas);

  document.getElementById("detailCualesPersonasRelacionadas").textContent =
    mostrarValor(adicionales.cualesPersonasRelacionadas);

  document.getElementById("detailSelectVinculadoJMMB").textContent =
    mostrarSiNo(adicionales.selectVinculadoJMMB);

  document.getElementById("detailVinculadoJMMB").textContent = mostrarValor(
    adicionales.vinculadoJMMB,
  );

  // ========================================
  // PERFIL DEL INVERSIONISTA
  // ========================================

  document.getElementById("detailEdadInversionista").textContent = mostrarValor(
    cuestionario.edadInversionista,
  );

  document.getElementById("detailObjetivoCapital").textContent = mostrarValor(
    cuestionario.objetivoCapital,
  );

  document.getElementById("detailCriterioRiesgo").textContent = mostrarValor(
    cuestionario.criterioRiesgo,
  );

  document.getElementById("detailNivelAcademico").textContent = mostrarValor(
    cuestionario.nivelAcademico,
  );

  document.getElementById("detailPlazoObjetivos").textContent = mostrarValor(
    cuestionario.plazoObjetivos,
  );

  document.getElementById("detailPlazoNecesidadInversion").textContent =
    mostrarValor(cuestionario.plazoNecesidadInversion);

  document.getElementById("detailOperacionesFinancieras").innerHTML =
    mostrarLista(cuestionario.operacionesFinancieras);

  document.getElementById("detailOtrosDerivados").textContent = mostrarValor(
    cuestionario.otrosDerivados,
  );

  document.getElementById("detailCapacidadPerdidas").textContent = mostrarValor(
    cuestionario.capacidadPerdidas,
  );

  // ========================================
  // INFORMACIÓN FINANCIERA
  // ========================================

  document.getElementById("detailIngresosAnuales").textContent = mostrarValor(
    financiera.ingresosAnuales,
  );

  document.getElementById("detailCapacidadAhorro").textContent = mostrarValor(
    financiera.capacidadAhorro,
  );

  document.getElementById("detailTotalActivosLiquidos").textContent =
    mostrarValor(financiera.totalActivosLiquidos);

  document.getElementById("detailCuentaAhorroCorriente").textContent =
    mostrarValor(financiera.cuentaAhorroCorriente);

  document.getElementById("detailPatrimonioTotal").textContent = mostrarValor(
    financiera.patrimonioTotal,
  );

  document.getElementById("detailObligacionesDeudas").textContent =
    mostrarValor(financiera.obligacionesDeudas);

  document.getElementById("detailBanco1").textContent = mostrarValor(
    financiera.banco1,
  );

  document.getElementById("detailTipoCuenta1").textContent = mostrarValor(
    financiera.tipoCuenta1,
  );

  document.getElementById("detailTelefonoBanco1").textContent = mostrarValor(
    financiera.telefonoBanco1,
  );

  document.getElementById("detailOficialBanco1").textContent = mostrarValor(
    financiera.oficialBanco1,
  );

  document.getElementById("detailBanco2").textContent = mostrarValor(
    financiera.banco2,
  );

  document.getElementById("detailTipoCuenta2").textContent = mostrarValor(
    financiera.tipoCuenta2,
  );

  document.getElementById("detailTelefonoBanco2").textContent = mostrarValor(
    financiera.telefonoBanco2,
  );

  document.getElementById("detailOficialBanco2").textContent = mostrarValor(
    financiera.oficialBanco2,
  );

  document.getElementById("detailPatrimonioPeriodo1").textContent =
    formatearMonto(financiera.patrimonioPeriodo1);

  document.getElementById("detailPatrimonioPeriodo2").textContent =
    formatearMonto(financiera.patrimonioPeriodo2);

  document.getElementById("detailPasivosPeriodo1").textContent = formatearMonto(
    financiera.pasivosPeriodo1,
  );

  document.getElementById("detailPasivosPeriodo2").textContent = formatearMonto(
    financiera.pasivosPeriodo2,
  );
  // ========================================
  // DECLARACIÓN
  // ========================================

  document.getElementById("detailDeclaracionJurada").textContent = mostrarSiNo(
    declaracion.declaracionJurada,
  );

  // ========================================
  // DOCUMENTOS
  // ========================================

  const contenedorDocumentos = document.getElementById("detalleDocumentos");

  if (contenedorDocumentos) {
    contenedorDocumentos.innerHTML = "";

    if (documentos.length > 0) {
      documentos.forEach((documento) => {
        const tarjeta = document.createElement("div");

        tarjeta.className = "documento-card";

        tarjeta.innerHTML = `
        <div class="documento-info">

          <div class="documento-icono">
            📄
          </div>

          <div class="documento-datos">

            <span class="documento-nombre">
              ${documento.nombreArchivo}
            </span>

            <span class="documento-tipo">
              ${mostrarTipoDocumento(documento.tipoDocumento)}
            </span>

          </div>

        </div>

        <button
          type="button"
          class="btn-ver-documento documento-btn"
        >
          Ver documento
        </button>

        <!--  
         <a
           href="http://localhost:3000${documento.ruta}"
           target="_blank"
           class="documento-btn"
         >
           Ver documento
         </a>-->
      `;

        const botonVer = tarjeta.querySelector(".btn-ver-documento");

        botonVer.addEventListener("click", () => {
          abrirDocumento(documento);
        });

        contenedorDocumentos.appendChild(tarjeta);

        contenedorDocumentos.appendChild(tarjeta);
      });
    } else {
      contenedorDocumentos.innerHTML = `
      <div class="documentos-vacio">
        No hay documentos adjuntos
      </div>
    `;
    }
  }
}

function mostrarTipoDocumento(tipo) {
  const tipos = {
    cedula: "Documento de identidad",
    certificacion: "Certificación de ingresos",
  };

  return tipos[tipo?.toLowerCase()] || tipo || "-";
}

// Funcion que al abrir un documento que sera image, te manda esa mini pagina.

function abrirDocumento(documento) {
  const urlDocumento = `http://localhost:3000${documento.ruta}`;

  const esImagen = documento.tipoArchivo?.startsWith("image/");

  if (esImagen) {
    const ventana = window.open("", "_blank");

    ventana.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${documento.nombreArchivo}</title>

          <style>
            body {
              margin: 0;
              padding: 20px;
              text-align: center;
              font-family: Arial, sans-serif;
              background: #f5f5f5;
            }

            .acciones {
              margin-bottom: 20px;
            }

            button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 8px 14px;
              border-radius: 6px;
              border: none;
              outline: none;
              background: #ed1c29;
              color: white;
              text-decoration: none;
              font-size: 13px;
              font-weight: 600;
              white-space: nowrap;
            }

            img {
              display: block;
              max-width: 100%;
              max-height: 90vh;
              margin: auto;
              background: white;
            }

            @media print {
              .acciones {
                display: none;
              }

              body {
                padding: 0;
                background: white;
              }

              img {
                max-width: 100%;
                max-height: 100vh;
              }
            }
          </style>
        </head>

        <body>

          <div class="acciones">
            <button onclick="window.print()">
              Imprimir
            </button>
          </div>

          <img
            src="${urlDocumento}"
            alt="${documento.nombreArchivo}"
          />

        </body>
      </html>
    `);

    ventana.document.close();

    return;
  }

  window.open(urlDocumento, "_blank");
}

// ========================================
// SI ES NULL, PONE -
// ========================================
function mostrarValor(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return "-";
  }

  return valor;
}

// ========================================
// CAMBIO 1 y 0 POR SI Y NO
// ========================================

function mostrarSiNo(valor) {
  if (valor === null || valor === undefined) {
    return "-";
  }

  return Number(valor) === 1 ? "Sí" : "No";
}

// ========================================
//  FORMATEAR LA FECHA
// ========================================

function formatearFecha(fecha) {
  if (!fecha) {
    return "-";
  }

  const fechaObjeto = new Date(fecha);

  return new Intl.DateTimeFormat("es-DO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(fechaObjeto);
}

// ========================================
//  CREACION DE LISTAS DE PRODUCTOS
// ========================================

function mostrarLista(lista) {
  if (!Array.isArray(lista) || lista.length === 0) {
    return "-";
  }

  return lista.map((item) => `• ${item}`).join("<br>");
}

// ========================================
//  FORMATEAR EL MONTO DE INVERSION
// ========================================

function formatearMonto(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return "-";
  }

  const numero = Number(valor);

  if (Number.isNaN(numero)) {
    return valor;
  }

  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 2,
  }).format(numero);
}

/* ========================================
SOLICITUD NO ENCONTRADA
======================================== */

function mostrarNoEncontrado() {
  detailContent.style.display = "none";

  detailNotFound.classList.add("show");
}

/* ========================================
CLASE DEL ESTADO
======================================== */

function obtenerClaseEstado(estado) {
  switch (estado) {
    case "Pendiente":
      return "status-pending";

    case "Revisión":
      return "status-review";

    case "Completado":
      return "status-completed";

    default:
      return "";
  }
}

/* ========================================
IMPRIMIR SOLICITUD
======================================== */

/* ========================================
BOTON DE IMPRIMIR
======================================== */

const printButton = document.getElementById("printButton");

if (printButton) {
  printButton.addEventListener("click", async () => {
    if (!solicitudActual) {
      console.warn("No hay una solicitud cargada todavía.");
      return;
    }

    await imprimirTodosLosPDF(solicitudActual);
  });
}

/////////////////////////////////////////////////////////////////////

function convertirSiNo(valor) {
  if (valor === null || valor === undefined || valor === "") return "";
  return Number(valor) === 1 ? "Si" : "No";
}

function obtenerFechaHoy() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = hoy.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

function marcarX(valor) {
  return Number(valor) === 1 ? "X" : "";
}

function mapearIngresosAnuales(texto) {
  const mapa = {
    "Menos de RD$2 Millones": "2",
    "Entre RD$2.0 y RD$5.7 Millones": "5",
    "Entre RD$7.0 y RD$20 Millones": "7",
    "Más de RD$25.0 Millones": "25",
  };
  return mapa[texto?.trim()] || "";
}

function mapearActivosLiquidos(texto) {
  const mapa = {
    "Menos de RD$2 Millones": "2",
    "Entre RD$2.0 y RD$7 Millones": "7",
    "Entre RD$10.0 y RD$15 Millones": "10",
    "Entre RD$15.0 y RD$24 Millones": "20", // penúltima -> mismo bucket que la última
    "Más de RD$25.0 Millones": "20",
  };
  return mapa[texto?.trim()] || "";
}

function mapearPatrimonioTotal(texto) {
  const mapa = {
    "Menos de RD$2 Millones": "2",
    "Entre RD$2.0 y RD$7 Millones": "7",
    "Entre RD$10.0 y RD$15 Millones": "10",
    "Más de RD$20.0 Millones": "20",
  };
  return mapa[texto?.trim()] || "";
}

// campo del PDF -> función que saca el valor de la solicitud completa
const MAPEO_TEXTO = {
  apellidos: (s) => s.datosCliente?.apellidos || "",
  nombres: (s) => s.datosCliente?.nombres || "",
  "identificacion-cedula": (s) =>
    s.datosCliente?.tipoDocumento === "Cedula"
      ? s.datosCliente?.identificacion || ""
      : "",
  pasaporte: (s) =>
    s.datosCliente?.tipoDocumento === "Pasaporte"
      ? s.datosCliente?.identificacion || ""
      : "",
  "id-estranjero": (s) => s.datosCliente?.idExtranjero || "",
  "fecha-nacimiento": (s) =>
    formatearFecha(s.datosCliente?.fechaNacimiento) || "",
  "telefono-casa": (s) => s.datosCliente?.telefonoCasa || "",
  celular: (s) => s.datosCliente?.celular || "",
  "lugar-nacimiento": (s) => s.datosCliente?.lugarNacimiento || "",
  nacionalidad: (s) => s.datosCliente?.nacionalidad || "",
  sector: (s) => s.datosCliente?.sector || "",
  ciudad: (s) => s.datosCliente?.ciudad || "",
  pais: (s) => s.datosCliente?.pais || "",
  email: (s) => s.datosCliente?.email || "",
  profesion: (s) => s.datosCliente?.profesion || "",
  direccion: (s) => s.datosCliente?.direccion || "",

  empresa: (s) => s.datosLaborales?.empresa || "",
  "empresa-ciudad": (s) => s.datosLaborales?.ciudad || "",
  "empresa-pais": (s) => s.datosLaborales?.pais || "",
  "empresa-sector": (s) => s.datosLaborales?.sector || "",
  "empresa-direccion": (s) => s.datosLaborales?.direccionEmpresa || "",
  "empresa-cargo": (s) => s.datosLaborales?.cargo || "",
  "empresa-fecha-ingreso": (s) =>
    formatearFecha(s.datosLaborales?.fechaIngreso) || "",
  "empresa-telefono": (s) => s.datosLaborales?.telefono || "",
  "empresa-email": (s) => s.datosLaborales?.email || "",
  "empresa-comentarios": (s) => s.datosLaborales?.comentarios || "",

  "fatca-otra-ciudadania-1": (s) => s.datosFatca?.ciudadania1 || "",
  "fatca-otra-ciudadania-2": (s) => s.datosFatca?.ciudadania2 || "",
  "fatca-telefono": (s) => s.datosFatca?.telefonoExtranjeroNumero || "",
  "fatca-comentarios": (s) => s.datosFatca?.comentarios || "",

  "pep-cargo": (s) => s.datosPep?.cargoPEP || "",
  "pep-pais": (s) => s.datosPep?.paisPEP || "",
  "pep-fecha-designacion": (s) =>
    formatearFecha(s.datosPep?.fechaDesignacionPEP) || "",
  "pep-fecha-remocion": (s) =>
    formatearFecha(s.datosPep?.fechaRemocionPEP) || "",
  "pep-relacion-nombre": (s) => s.datosPep?.nombrePEP || "",
  "pep-relacion-parentesco": (s) => s.datosPep?.parentescoPEP || "",
  "pep-relacion-cargo": (s) => s.datosPep?.cargoPEPRelacionado || "",
  "pep-relacion-fecha-designacion": (s) =>
    formatearFecha(s.datosPep?.fechaDesignacionPEPRelacionado) || "",
  "pep-relacion-fecha-remocion": (s) =>
    formatearFecha(s.datosPep?.fechaRemocionPEPRelacionado) || "",

  // "adicional-origen": (s) => s.datosAdicionales?.origenDestinoFondos || "",
  "adicional-beneficiario": (s) =>
    mostrarSiNo(s.datosAdicionales?.beneficiariosTransaccion ? 1 : 0),
  "adicional-id-beneficiario": (s) =>
    s.datosAdicionales?.identificacionBeneficiarioFinal || "",
  "adicional-declaracion-relacionadas": (s) =>
    mostrarSiNo(s.datosAdicionales?.personasRelacionadas ? 1 : 0),
  "adicional-vinculado-jmmb": (s) => s.datosAdicionales?.vinculadoJMMB || "",

  "adicional-capacidad-ahorro": (s) =>
    s.datosCuestionario2?.capacidadAhorro || "",
  "adicional-cuenta-ahorro-corriente": (s) =>
    s.datosCuestionario2?.cuentaAhorroCorriente || "",
  "adicional-obligaciones": (s) =>
    s.datosCuestionario2?.obligacionesDeudas || "",
  "adicional-banco-1": (s) => s.datosCuestionario2?.banco1 || "",
  "adicional-tipo-banco-1": (s) => s.datosCuestionario2?.tipoCuenta1 || "",
  "adicional-telefono-banco-1": (s) =>
    s.datosCuestionario2?.telefonoBanco1 || "",
  "adicional-oficial-banco-1": (s) => s.datosCuestionario2?.oficialBanco1 || "",

  "adicional-cuenta-ahorro": (s) =>
    s.datosAdicionales?.montoEstimadoInversionPuestoUSD || "",
  "adicional-certificado-financiero": (s) =>
    s.datosAdicionales?.montoCertificado || "",
  "adicional-prestamo-linea": (s) => s.datosAdicionales?.montoPrestamo || "",

  "perfil-resumen": (s) => s.vinculacionClientePersonal?.resumenCliente || "",
  cliente: (s) => s.idSolicitud || "",

  "fatca-mas-residencias-1": (s) => s.datosFatca?.ciudadania1 || "",
  "fatca-mas-residencias-2": (s) => s.datosFatca?.ciudadania2 || "",

  "adicional-proposito": (s) =>
    (s.datosAdicionales?.productosSolicitados || []).join(", "),

  "adicional-operaciones-otro": (s) =>
    s.datosAdicionales?.otraCantidadOperaciones || "",

  "perfil-nombre-cliente": (s) => {
    const c = s.datosCliente || {};
    return `${c.nombres || ""} ${c.apellidos || ""}`.trim();
  },

  "fecha-oficial": () => obtenerFechaHoy(),
  "fecha-cliente": () => obtenerFechaHoy(),

  "adicional-periodos-1": () => "2024",
  "adicional-periodos-2": () => "2025",
  "adicional-total-patrimonio-1": (s) =>
    s.datosCuestionario2?.patrimonioPeriodo1 || "",
  "adicional-total-patrimonio-2": (s) =>
    s.datosCuestionario2?.patrimonioPeriodo2 || "",
  "adicional-total-activos-1": (s) =>
    s.datosCuestionario2?.pasivosPeriodo1 || "",
  "adicional-total-activos-2": (s) =>
    s.datosCuestionario2?.pasivosPeriodo2 || "",

  "declaracion-1": (s) => marcarX(s.datosDeclaracion?.declaracionJurada),
  "declaracion-2": (s) => marcarX(s.datosDeclaracion?.declaracionJurada),
  "declaracion-3": (s) => marcarX(s.datosDeclaracion?.declaracionJurada),
  "declaracion-4": (s) => marcarX(s.datosDeclaracion?.declaracionJurada),
};

// campo del PDF (grupo de radio) -> función que saca el valor
const MAPEO_RADIO = {
  "tipo-documento": (s) => s.datosCliente?.tipoDocumento || "",
  sexo: (s) => s.datosCliente?.sexo || "",
  ocupacion: (s) => s.datosCliente?.ocupacion || "",
  civil: (s) => s.datosCliente?.civil || "",
  ley155: (s) => convertirSiNo(s.datosCliente?.ley155),

  fatca: (s) => convertirSiNo(s.datosFatca?.otrasCiudadanias),
  USA: (s) => s.datosFatca?.condicionUSA || "",
  "fatca-residencia": (s) => convertirSiNo(s.datosFatca?.residenciaFisicaUSA),
  "fatca-mas-residencia": (s) =>
    convertirSiNo(s.datosFatca?.masResidenciaFiscal),
  "fatca-telefonico": (s) => convertirSiNo(s.datosFatca?.telefonoExtranjero),
  "fatca-direccion-residencia": (s) =>
    convertirSiNo(s.datosFatca?.direccionResidenciaUSA),
  "fatca-direccionUSA": (s) => convertirSiNo(s.datosFatca?.direccionEnvioUSA),
  "fatca-greencard": (s) => convertirSiNo(s.datosFatca?.greenCard),

  pep: (s) => convertirSiNo(s.datosPep?.esPEP),
  "pep-relacion": (s) => convertirSiNo(s.datosPep?.relacionPEP),

  "adicional-cuenta-basica": (s) =>
    convertirSiNo(s.datosAdicionales?.cuentaAhorroBasica),
  "adicional-operaciones": (s) => s.datosAdicionales?.cantidadOperaciones || "",
  "adicional-transacciones": (s) =>
    s.datosAdicionales?.formaTransacciones || "",
  "adicional-transferencias": (s) =>
    s.datosAdicionales?.tipoTransferencia || "",

  "perfil-cara": (s) =>
    convertirSiNo(s.datosVinculacion.relacionCaraCara ? 1 : 0), // TODO revisar
  "perfil-producto-ajustado": (s) =>
    convertirSiNo(s.datosVinculacion?.productoAjustado ? 1 : 0),
  "adicional-cuenta-verificada": (s) =>
    convertirSiNo(s.datosAdicionales?.unicaCuenta),
  "adicional-ingresos": (s) =>
    mapearIngresosAnuales(s.datosCuestionario2?.ingresosAnuales),
  "adicional-activos": (s) =>
    mapearActivosLiquidos(s.datosCuestionario2?.totalActivosLiquidos),
  "adicional-patrimonio": (s) =>
    mapearPatrimonioTotal(s.datosCuestionario2?.patrimonioTotal),
};

/* ========================================
RELLENER PDF 1 
======================================== */

async function rellenarPDF(solicitud) {
  const { PDFDocument, PDFTextField, PDFRadioGroup } = PDFLib;

  const pdfBytes = await fetch("/admin/pdf/formulario-banco.pdf").then(
    (res) => {
      if (!res.ok) throw new Error(`No se pudo cargar el PDF: ${res.status}`);
      return res.arrayBuffer();
    },
  );

  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  Object.entries(MAPEO_TEXTO).forEach(([nombreCampo, obtenerValor]) => {
    try {
      const campo = form.getField(nombreCampo);
      if (campo instanceof PDFTextField) {
        campo.setText(String(obtenerValor(solicitud) ?? ""));
      }
    } catch (err) {
      console.warn(`Texto no encontrado: "${nombreCampo}"`);
    }
  });

  Object.entries(MAPEO_RADIO).forEach(([nombreGrupo, obtenerValor]) => {
    try {
      const grupo = form.getRadioGroup(nombreGrupo);
      const valor = obtenerValor(solicitud);

      //   console.log(
      //   `RADIO "${nombreGrupo}"`,
      //   "valor recibido:",
      //   valor,
      //   "opciones PDF:",
      //   grupo.getOptions(),
      // );

      if (valor) grupo.select(valor);
    } catch (err) {
      console.warn(
        `No se pudo seleccionar "${nombreGrupo}" con valor "${obtenerValor(solicitud)}"`,
      );
    }
  });

  form.flatten();

  return pdfDoc;
}

/* ========================================
RELLENER PDF 2
======================================== */

async function rellenarPDF2(solicitud) {
  const pdfBytes = await fetch(
    "/admin/pdf/formulario-moneyline-banco.pdf",
  ).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

  const form = pdfDoc.getForm();

  const cliente = solicitud.datosCliente || {};

  const MAPEO_TEXTO_PDF2 = {
    nombres: cliente.nombres,
    apellidos: cliente.apellidos,
    identificacion: cliente.identificacion,
    "fecha-nacimiento": formatearFecha(cliente.fechaNacimiento),
    celular: cliente.celular,
    email: cliente.email,

    "fecha-firma": formatearFecha(new Date()),
  };

  Object.entries(MAPEO_TEXTO_PDF2).forEach(([campo, valor]) => {
    try {
      form
        .getTextField(campo)
        .setText(valor !== null && valor !== undefined ? String(valor) : "");
    } catch (error) {
      console.warn(`No se pudo rellenar "${campo}"`, error);
    }
  });

  try {
    const grupoSexo = form.getRadioGroup("sexo");

    const valorSexo = solicitud.datosCliente?.sexo;

    if (valorSexo) {
      grupoSexo.select(valorSexo);
    }
  } catch (error) {
    console.warn(
      `No se pudo seleccionar "sexo" con valor "${solicitud.datosCliente?.sexo}"`,
      error,
    );
  }

  // MUY IMPORTANTE
  form.flatten();

  return pdfDoc;
}

/* ========================================
RELLENER PDF 3
======================================== */

async function rellenarPDF3(solicitud) {
  const pdfBytes = await fetch("/admin/pdf/contrato-marco-banco.pdf").then(
    (res) => res.arrayBuffer(),
  );

  const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

  const form = pdfDoc.getForm();

  const cliente = solicitud.datosCliente || {};

  const MAPEO_TEXTO_PDF3 = {
    nombres: cliente.nombres,
    apellidos: cliente.apellidos,
    identificacion: cliente.identificacion,
    nacionalidad: cliente.nacionalidad,
    direccion: cliente.direccion,
    sector: cliente.sector,
    ciudad: cliente.ciudad,

    provincia: cliente.provincia,
  };

  Object.entries(MAPEO_TEXTO_PDF3).forEach(([campo, valor]) => {
    try {
      form
        .getTextField(campo)
        .setText(valor !== null && valor !== undefined ? String(valor) : "");
    } catch (error) {
      console.warn(`No se pudo rellenar "${campo}"`, error);
    }
  });

  form.flatten();

  return pdfDoc;
}

async function unirPDFs(documentosPDF) {
  const pdfFinal = await PDFLib.PDFDocument.create();

  for (const pdfDoc of documentosPDF) {
    const cantidadPaginas = pdfDoc.getPageCount();

    const indices = Array.from({ length: cantidadPaginas }, (_, i) => i);

    const paginas = await pdfFinal.copyPages(pdfDoc, indices);

    paginas.forEach((pagina) => {
      pdfFinal.addPage(pagina);
    });
  }

  return pdfFinal;
}

async function imprimirTodosLosPDF(solicitud) {
  try {
    // PDF que ya tienes
    const pdf1 = await rellenarPDF(solicitud);

    // Nuevo PDF
    const pdf2 = await rellenarPDF2(solicitud);

    // Nuevo PDF
    const pdf3 = await rellenarPDF3(solicitud);

    // Unirlos
    const pdfFinal = await unirPDFs([pdf1, pdf2, pdf3]);

    // Generar PDF final
    const pdfBytes = await pdfFinal.save();

    const blob = new Blob([pdfBytes], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    const ventana = window.open(url);

    if (!ventana) {
      console.warn("El navegador bloqueó la ventana del PDF.");

      return;
    }

    ventana.onload = () => {
      ventana.print();
    };
  } catch (error) {
    console.error("Error generando los PDFs:", error);
  }
}

//////////////////////////////////////////
/* ========================================
CERRAR SESIÓN
======================================== */

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await signOut(auth);

      window.location.replace("./login.html");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  });
}
