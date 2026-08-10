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
    const respuesta = await fetch("././datos.json");

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar datos.json");
    }

    solicitudes = await respuesta.json();

    solicitudActual = solicitudes.find(
      (item) => String(item.idSolicitud) === String(id),
    );

    if (!solicitudActual) {
      mostrarNoEncontrado();
      return;
    }

    mostrarSolicitud(solicitudActual);
  } catch (error) {
    console.error("Error cargando la solicitud:", error);
    mostrarNoEncontrado();
  }
}

/* ========================================
MOSTRAR SOLICITUD
======================================== */

function mostrarSolicitud(solicitud) {
  detailContent.style.display = "block";
  detailNotFound.classList.remove("show");

  const cliente = solicitud.datosCliente || {};
  const solicitudInfo = solicitud.solicitud || {};
  const laboral = solicitud.datosLaborales || {};
  const fatca = solicitud.datosFatca || {};
  const pep = solicitud.datosPep || {};
  const adicionales = solicitud.datosAdicionales || {};
  const cuestionario = solicitud.datosCuestionario || {};
  const financiera = solicitud.datosCuestionario2 || {};
  const declaracion = solicitud.datosDeclaracion || {};

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

  // ========================================
  // INFORMACIÓN LABORAL
  // ========================================

  document.getElementById("detailEmpresa").textContent = mostrarValor(
    laboral.empresa,
  );

  document.getElementById("detailCargo").textContent = mostrarValor(
    laboral.cargo,
  );

  document.getElementById("detailIngreso").textContent = mostrarValor(
    laboral.ingreso,
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

  document.getElementById("detailMontoInversion").textContent = formatearMonto(
    adicionales.montoInversion,
  );

  document.getElementById("detailOrigenDestinoFondos").textContent =
    mostrarValor(adicionales.origenDestinoFondos);

  document.getElementById("detailCantidadOperaciones").textContent =
    mostrarValor(adicionales.cantidadOperaciones);

  document.getElementById("detailFormaTransacciones").textContent =
    mostrarValor(adicionales.formaTransacciones);

  document.getElementById("detailTipoTransferencia").textContent = mostrarValor(
    adicionales.tipoTransferencia,
  );

  document.getElementById("detailProductosSolicitados").innerHTML =
    mostrarLista(adicionales.productosSolicitados);

  document.getElementById("detailBeneficiariosTransaccion").textContent =
    mostrarValor(adicionales.beneficiariosTransaccion);

  document.getElementById("detailIdentificacionBeneficiarioFinal").textContent =
    mostrarValor(adicionales.identificacionBeneficiarioFinal);

  document.getElementById("detailCuentaAhorroBasica").textContent = mostrarSiNo(
    adicionales.cuentaAhorroBasica,
  );

  document.getElementById("detailUnicaCuenta").textContent = mostrarSiNo(
    adicionales.unicaCuenta,
  );

  document.getElementById("detailPersonasRelacionadas").textContent =
    mostrarValor(adicionales.personasRelacionadas);

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
  // DOCUMENTOS Y DECLARACIÓN
  // ========================================

  document.getElementById("detailDeclaracionJurada").textContent = mostrarSiNo(
    declaracion.declaracionJurada,
  );
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

  const [anio, mes, dia] = fecha.split("-");

  return `${dia}/${mes}/${anio}`;
}

// ========================================
//  CREACION DE LISTAS DE PRODUCTOS
// ========================================

function mostrarLista(lista) {
  if (!Array.isArray(lista) || lista.length === 0) {
    return "-";
  }

  return lista
    .map((item) => `• ${item}`)
    .join("<br>");
}

// ========================================
//  FORMATEAR EL MONTO DE INVERSION
// ========================================

function formatearMonto(valor) {
  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {
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

    case "Completo":
      return "status-completed";

    default:
      return "";
  }
}

/* ========================================
IMPRIMIR SOLICITUD
======================================== */

const printButton = document.getElementById("printButton");

if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}

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
