# Guion para la demostración

Duración sugerida: 2 a 3 minutos.

1. **Presentación (20 s).** Explica que Cielo Claro es una app web de clima hecha para consultar una ciudad sin usar una clave privada.
2. **Búsqueda (35 s).** Escribe `Monterrey` o cualquier ciudad y muestra que la app primero localiza sus coordenadas y después consulta el pronóstico.
3. **Resultado (45 s).** Señala la temperatura actual, sensación térmica, humedad, viento, precipitación y las cinco tarjetas del pronóstico.
4. **Manejo de errores (30 s).** Busca una cadena inexistente para mostrar el mensaje de ciudad no encontrada. Después explica que también existen estados para errores de red y respuestas vacías.
5. **Ubicación (20 s).** Si el navegador lo permite, pulsa `Usar mi ubicación` y explica que el permiso se solicita únicamente en el navegador.
6. **Código y seguridad (30 s).** Muestra `app.js`, las funciones `findCity`, `fetchWeather` y `renderWeather`; después abre el README para señalar la declaración de IA y que no hay claves en el repositorio.

Si la API no responde durante la demostración, explica que la aplicación muestra un estado de error controlado y enseña el flujo en el código. No compartas ninguna clave privada en pantalla.
