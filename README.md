# Cielo Claro - aplicación de clima con IA

Aplicación web académica que consulta el clima actual y el pronóstico de cinco días para cualquier ciudad. Consume dos endpoints públicos de [Open-Meteo](https://open-meteo.com/): geocodificación para localizar la ciudad y pronóstico meteorológico para mostrar los datos.

## Demo local

No requiere instalación ni clave de API.

1. Descarga o clona el repositorio.
2. Abre una terminal en la carpeta del proyecto.
3. Levanta un servidor local:

   ```bash
   python -m http.server 5500
   ```

4. Visita `http://localhost:5500` en el navegador.

También puedes abrir `index.html` directamente, aunque un servidor local es recomendable para probar la geolocalización del navegador.

## Funcionalidades

- Búsqueda de ciudades en español.
- Clima actual: temperatura, sensación térmica, humedad, viento y precipitación.
- Pronóstico de cinco días con máximas, mínimas y probabilidad de lluvia.
- Botón para usar la ubicación actual del navegador.
- Estados de carga, ciudad no encontrada, falta de conexión y permiso de ubicación rechazado.
- Diseño responsive y etiquetas accesibles para teclado y lectores de pantalla.

## Prueba rápida

- Busca `Monterrey` para comprobar una respuesta válida.
- Busca `CiudadQueNoExiste999` para comprobar la respuesta vacía.
- Desconecta la red y realiza una búsqueda para comprobar el mensaje de modo offline.
- Reduce el ancho del navegador para comprobar la vista responsive.

## API utilizada

- `https://geocoding-api.open-meteo.com/v1/search`: convierte el nombre de la ciudad en coordenadas.
- `https://api.open-meteo.com/v1/forecast`: consulta condiciones actuales y pronóstico diario.

Open-Meteo se utiliza sin una clave privada para este proyecto académico. Consulta sus [términos de uso](https://open-meteo.com/en/terms) antes de publicar la aplicación en producción.

## Declaración de herramientas de IA

En este proyecto se utilizó ChatGPT/Codex como asistente de programación para:

- proponer la estructura inicial de la aplicación y la interfaz;
- generar una primera versión de `index.html`, `styles.css` y `app.js`;
- explicar el formato de los endpoints de Open-Meteo y los códigos meteorológicos;
- revisar manejo de errores, accesibilidad y diseño responsive;
- redactar y revisar la documentación y la bitácora.

La persona estudiante revisó, ajustó y validó el resultado final, especialmente la selección de la API, los textos en español, el diseño visual, la experiencia móvil y la ausencia de claves secretas. La responsabilidad de comprender y explicar el código es de quien entrega el proyecto.

## Trabajo realizado sin ayuda directa de IA

- Selección final del tema de clima y de Open-Meteo como API pública.
- Decisión del nombre, identidad visual, textos y estructura de la interfaz.
- Revisión del comportamiento esperado y de los criterios de entrega.
- Verificación manual de que el proyecto no contiene claves privadas.

## Entregables de la tarea

- Aplicación: archivos en la raíz del repositorio.
- Declaración de IA e instrucciones: este `README.md`.
- Bitácora de programación con IA: [`docs/BITACORA-IA.md`](docs/BITACORA-IA.md).
- Guion para la demostración: [`docs/GUIA-DEMO.md`](docs/GUIA-DEMO.md).
- Evidencias de GitHub: [`docs/EVIDENCIAS-GITHUB.md`](docs/EVIDENCIAS-GITHUB.md).

## Evidencia de GitHub Pro y repositorio

La cuenta de GitHub Student Developer Pack se encuentra en proceso de aprobación. Cuando sea aprobada, agrega en [`docs/EVIDENCIAS-GITHUB.md`](docs/EVIDENCIAS-GITHUB.md):

1. una captura donde se vea el plan GitHub Pro activo;
2. el enlace a tu perfil de GitHub;
3. el enlace al repositorio público de esta aplicación.

No se incluye ninguna captura o enlace inventado mientras la solicitud siga en revisión.
