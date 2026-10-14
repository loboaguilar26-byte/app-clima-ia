# Bitácora de programación con IA

**Proyecto:** Cielo Claro - aplicación de clima con Open-Meteo  
**Objetivo:** construir una aplicación web pequeña que consuma una API externa, presente resultados claros y declare el uso de IA.

Los prompts de esta bitácora documentan las instrucciones utilizadas para elaborar, revisar y corregir este entregable. Las respuestas fueron revisadas antes de conservarlas en el proyecto.

## Prompt 1 - estructura inicial

> Diseña una aplicación web académica en español que consulte el clima actual y el pronóstico de cinco días para una ciudad. Debe ser pequeña, clara, responsive y consumir una API externa sin requerir una clave privada.

**Respuesta y resultado:** se propuso una aplicación estática llamada Cielo Claro usando Open-Meteo, con búsqueda de ciudad, clima actual y tarjetas de pronóstico. La estructura se usó como base para `index.html`, `styles.css` y `app.js`.

**¿Funcionó a la primera?** Funcionó como propuesta inicial. Se ajustaron los textos, colores y distribución para que la interfaz quedara más clara y apropiada para una tarea académica.

## Prompt 2 - integración de la API

> Explica cómo consultar la API de geocodificación de Open-Meteo y después usar latitud y longitud para pedir temperatura, humedad, viento, precipitación y pronóstico diario. Incluye manejo de respuestas vacías y errores HTTP.

**Respuesta y resultado:** se definió el flujo de dos peticiones: primero buscar la ciudad y después consultar el pronóstico con sus coordenadas. Se implementaron `fetchJson`, `findCity` y `fetchWeather` con validación de respuestas.

**¿Funcionó a la primera?** La lógica general sí, pero fue necesario agregar un mensaje específico cuando no existen resultados para la ciudad y otro para fallas de red.

## Prompt 3 - interfaz y accesibilidad

> Revisa una interfaz de clima y propón mejoras para que sea legible, responsive y accesible. Debe incluir estados de carga y error, navegación por teclado, etiquetas para formularios y una jerarquía visual sencilla.

**Respuesta y resultado:** se incorporaron `label` oculto para el campo de búsqueda, `aria-live`, `aria-busy`, `role="alert"`, estados de carga y error, contraste alto en botones y una adaptación para pantallas pequeñas.

**¿Funcionó a la primera?** La base funcionó. Se ajustó el layout móvil para que el botón de búsqueda ocupara una línea completa y el pronóstico pasara de cinco columnas a dos.

## Prompt 4 - revisión de errores

> Revisa el código JavaScript de una app que usa Open-Meteo. Busca errores por respuestas incompletas, valores nulos, códigos meteorológicos no contemplados, permisos de geolocalización y formato de horas locales.

**Respuesta y resultado:** se añadió un valor alternativo para códigos meteorológicos desconocidos, se validó que la geocodificación tuviera resultados, se controló el rechazo de geolocalización y se usó la zona horaria devuelta por la API al presentar la hora.

**Error detectado:** una primera aproximación podía interpretar la hora local del servicio con la zona horaria del navegador del usuario. **Corrección:** la presentación usa la zona horaria proporcionada por Open-Meteo mediante `Intl.DateTimeFormat`.

## Prompt 5 - documentación y seguridad

> Redacta un README en español con instrucciones de ejecución local, endpoints utilizados, funciones principales, declaración honesta del uso de IA y recordatorio de no subir claves de API al repositorio.

**Respuesta y resultado:** se creó el `README.md` con instrucciones usando `python -m http.server`, descripción de funcionalidades, endpoints, declaración de herramientas de IA, trabajo realizado sin IA y la nota de seguridad sobre secretos.

**¿Funcionó a la primera?** La documentación fue correcta, pero se agregó una sección separada para las evidencias de GitHub y se dejó explícito que la cuenta sigue en aprobación, para no presentar datos inventados.

## Aprendizajes

- Una API sin clave simplifica la entrega, pero aun así es necesario revisar sus límites y términos de uso.
- Separar geocodificación y pronóstico ayuda a detectar en qué paso ocurrió una falla.
- Los estados de carga y error son parte de la funcionalidad, no solamente decoración.
- Los datos de fecha y hora deben mostrarse con la zona horaria de la ubicación consultada.
- La IA acelera la primera versión, pero la persona que entrega debe leer, probar y poder explicar cada parte del código.

## Qué haría diferente la próxima vez

Probaría desde el inicio con ciudades de distintos países, revisaría la app en una conexión lenta y agregaría pruebas automatizadas para las funciones de formato y para los códigos meteorológicos antes de publicar el repositorio.
