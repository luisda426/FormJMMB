import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/* ========================================
DATOS DE EJEMPLO
======================================== */

//  VARIABLE PARA PROBAR API O USAR JSON DE EJEMPLO
// true para usar APi, y false para usar json de ejemplo
const USAR_API = false;

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

    actualizarEstadisticas?.();
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
ESTADÍSTICAS
======================================== */

function actualizarEstadisticas() {
  const total = solicitudes.length;

  const pendientes = solicitudes.filter(
    (solicitud) => solicitud.solicitud.estadoSolicitud === "Pendiente",
  ).length;

  const revision = solicitudes.filter(
    (solicitud) => solicitud.solicitud.estadoSolicitud === "Revisión",
  ).length;

  const completadas = solicitudes.filter(
    (solicitud) => solicitud.solicitud.estadoSolicitud === "Completado",
  ).length;

  const totalSolicitudes = document.getElementById("totalSolicitudes");

  const totalPendientes = document.getElementById("totalPendientes");

  const totalRevision = document.getElementById("totalRevision");

  const totalCompletadas = document.getElementById("totalCompletadas");

  if (totalSolicitudes) {
    totalSolicitudes.textContent = total;
  }

  if (totalPendientes) {
    totalPendientes.textContent = pendientes;
  }

  if (totalRevision) {
    totalRevision.textContent = revision;
  }

  if (totalCompletadas) {
    totalCompletadas.textContent = completadas;
  }
}

/* ========================================
RENDERIZAR ÚLTIMAS SOLICITUDES
======================================== */

function renderSolicitudes() {
  const ultimasSolicitudes = solicitudes
    .slice()
    .sort(
      (a, b) =>
        new Date(b.solicitud.fechaCreacion) -
        new Date(a.solicitud.fechaCreacion),
    )
    .slice(0, 8);

  tableBody.innerHTML = "";

  if (ultimasSolicitudes.length === 0) {
    emptyState.classList.add("show");

    return;
  }

  emptyState.classList.remove("show");

  ultimasSolicitudes.forEach((solicitud) => {
    const cliente = solicitud.datosCliente;

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

              ${cliente.nombres.charAt(0).toUpperCase()}

            </div>

            <span>

              ${cliente.nombres}
              ${cliente.apellidos}

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
  if (!fecha) return "-";

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
