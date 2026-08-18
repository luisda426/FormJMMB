import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/* ========================================
DATOS DE EJEMPLO
======================================== */

//  VARIABLE PARA PROBAR API O USAR JSON DE EJEMPLO
const USAR_API = true;

let solicitudes = [];

async function cargarSolicitudes() {
  try {
    const url = USAR_API
      ? "http://localhost:3000/api/solicitudes"
      : "././datos.json";

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar las solicitudes.");
    }

    solicitudes = await respuesta.json();

    console.log(
      USAR_API
        ? "Solicitudes cargadas desde API:"
        : "Solicitudes cargadas desde JSON:",
      solicitudes,
    );

    
    renderSolicitudes();
  } catch (error) {
    console.error("Error cargando solicitudes:", error);
  }
}

/* ========================================
ELEMENTOS
======================================== */

const tableBody = document.getElementById("requestsTableBody");

const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const statusFilter = document.getElementById("statusFilter");

/* ========================================
AUTENTICACIÓN
======================================== */

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("./login.html");

    return;
  }

  console.log("Administrador autenticado:", user.email);

  const sidebarUserEmail = document.getElementById("sidebarUserEmail");

  if (sidebarUserEmail) {
    sidebarUserEmail.textContent = user.email;
  }

  const nombreUsuario = user.displayName || "Administrador";

  const sidebarUserName = document.getElementById("sidebarUserName");

  if (sidebarUserName) {
    sidebarUserName.textContent = nombreUsuario;
  }

  const inicial = nombreUsuario.charAt(0).toUpperCase();

  const sidebarAvatar = document.querySelector(".sidebar-user-avatar");

  if (sidebarAvatar) {
    sidebarAvatar.textContent = inicial;
  }

  cargarSolicitudes();
});

/* ========================================
RENDERIZAR SOLICITUDES
======================================== */
function renderSolicitudes() {
  tableBody.innerHTML = "";

  const textoBusqueda = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const estadoSeleccionado = statusFilter ? statusFilter.value : "todos";

  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    const cliente = solicitud.datosCliente || {};
    const datosSolicitud = solicitud.solicitud || {};

    const nombreCompleto =
      `${cliente.nombres || ""} ${cliente.apellidos || ""}`.toLowerCase();

    const identificacion = (cliente.identificacion || "").toLowerCase();

    const celular = (cliente.celular || "").toLowerCase();

    const telefonoCasa = (cliente.telefonoCasa || "").toLowerCase();

    const idSolicitud = String(solicitud.idSolicitud || "").toLowerCase();

    const estado = (datosSolicitud.estadoSolicitud || "").toLowerCase();

    const coincideBusqueda =
      textoBusqueda === "" ||
      idSolicitud.includes(textoBusqueda) ||
      nombreCompleto.includes(textoBusqueda) ||
      identificacion.includes(textoBusqueda) ||
      celular.includes(textoBusqueda) ||
      telefonoCasa.includes(textoBusqueda);

    const coincideEstado =
      estadoSeleccionado === "todos" ||
      estado === estadoSeleccionado.toLowerCase();

    return coincideBusqueda && coincideEstado;
  });

  if (solicitudesFiltradas.length === 0) {
    emptyState.classList.add("show");
    return;
  }

  emptyState.classList.remove("show");

  solicitudesFiltradas.forEach((solicitud) => {
    const cliente = solicitud.datosCliente || {};

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>
        <span class="request-id">
          FJ-${solicitud.idSolicitud}
        </span>
      </td>

      <td>
        <div class="client-cell">
          <div class="client-avatar">
            ${(cliente.nombres || "?").charAt(0).toUpperCase()}
          </div>

          <span>
            ${cliente.nombres || "-"}
            ${cliente.apellidos || ""}
          </span>
        </div>
      </td>

      <td>
        ${cliente.identificacion}
      </td>

      <td>
        ${cliente.celular || cliente.telefonoCasa || "-"}
      </td>

      <td>
        ${formatearFecha(solicitud.solicitud.fechaCreacion)}
      </td>

      <td>
        <span
          class="status-badge ${obtenerClaseEstado(
            solicitud.solicitud.estadoSolicitud,
          )}"
        >
          ${solicitud.solicitud.estadoSolicitud}
        </span>
      </td>

      <td>
        <button
          class="view-button"
          type="button"
          data-id="${solicitud.idSolicitud}"
        >
          Ver
        </button>
      </td>
    `;

    tableBody.appendChild(fila);
  });
}

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
BUSCADOR
======================================== */

if (searchInput) {
  searchInput.addEventListener("input", renderSolicitudes);
}

/* ========================================
FILTRO
======================================== */

if (statusFilter) {
  statusFilter.addEventListener("change", renderSolicitudes);
}

/* ========================================
VER SOLICITUD
======================================== */

if (tableBody) {
  tableBody.addEventListener("click", (event) => {
    const button = event.target.closest(".view-button");

    if (!button) {
      return;
    }

    const id = button.dataset.id;

    window.location.href = `./detalles.html?id=${encodeURIComponent(id)}`;
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
