# Formulario de Vinculación de Clientes

Sistema web desarrollado para gestionar el proceso de solicitud y vinculación de clientes de una entidad financiera.

La aplicación permite que los clientes completen de manera digital toda la información necesaria para su proceso de vinculación, incluyendo datos personales, laborales, financieros, información FATCA, PEP, productos solicitados, declaraciones y carga de documentos.

El sistema cuenta además con un panel administrativo desde el cual los asesores pueden consultar las solicitudes recibidas, visualizar la información del cliente, completar datos internos del proceso, actualizar el estado de cada solicitud y generar la documentación correspondiente en formato PDF.

La solución está diseñada bajo una arquitectura separada entre frontend, API y base de datos, evitando que el cliente acceda directamente a la información almacenada en el servidor.

## Funcionalidades principales

- Formulario de vinculación dividido en múltiples etapas.
- Validación de datos antes del envío.
- Registro de información personal y de contacto.
- Información laboral y profesional.
- Declaraciones FATCA.
- Información relacionada con PEP.
- Información financiera y patrimonial.
- Selección de productos financieros.
- Declaración jurada.
- Carga y validación de documentos de identidad.
- Almacenamiento de solicitudes mediante una API.
- Panel administrativo para consulta y gestión de solicitudes.
- Visualización detallada de la información de cada cliente.
- Registro de información adicional por parte del asesor.
- Gestión del estado de las solicitudes.
- Generación automática de formularios PDF utilizando los datos registrados.
- Autenticación del panel administrativo.
- Arquitectura preparada para integración con servicios de autenticación, almacenamiento y despliegue en producción.

## Arquitectura general

El proyecto está compuesto principalmente por:

- **Frontend:** HTML, CSS y JavaScript.
- **Panel administrativo:** interfaz web para gestión de solicitudes.
- **Backend / API:** Node.js con Express.
- **Base de datos:** Microsoft SQL Server.
- **Autenticación:** Firebase Authentication.
- **Generación de documentos:** PDF-Lib.
- **Hosting del frontend:** compatible con Firebase Hosting.

El frontend se comunica únicamente con la API, mientras que la API se encarga de validar, procesar y almacenar la información en la base de datos.

## Estructura del codigo 
La interfaz web de cada página, la tenemos en la carpeta raiz en cada HTML. 

En la carpeta /app encontraremos la lógica de la interfaz web en un único archivo JavaScript.
En la carpeta /assets encontraremos todas las imagenes e iconos necesarios para el diseño de la web.
En la carpeta /css encontraremos el diseño en un único archivo CSS de la página web.
En la carpeta /fonts encontraremos los fonts de la empresa.
En la carpeta /admin encontraremos los HTML, CSS y Javascript del panel administrativo.
