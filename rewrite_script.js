async function onRequest(a, b) {
    // Permite que la petición saliente del cliente continúe sin alteraciones
    return b;
}

async function onResponse(a, b, c) {
    // Filtra únicamente las respuestas cuyas rutas inicien con '/live'
    if (!b.path.startsWith('/live')) return c;

    try {
        // Consulta tu archivo de configuración remoto (ej. subido a Vercel o Gist)
        let responseAPI = await fetch('https://tu-endpoint-personalizado.vercel.app/smeta.json');
        let configData = await responseAPI.json();

        // Valida si el host actual se encuentra en la lista del array 'vh'
        if (!configData.vh.includes(b.host)) return c;

        // Parsea el cuerpo JSON original que devuelve el servidor
        let originalBody = JSON.parse(c.body);

        // Sobrescribe la URL del servidor con el valor especificado en 's_url'
        originalBody.server_url = configData.s_url;

        // Adjunta parámetros de carga útil adicionales si están definidos
        if (configData.custom_payload) {
            originalBody.extra_data = configData.custom_payload;
        }

        // Empaqueta de nuevo el cuerpo modificado en formato JSON para el cliente iOS
        c.body = JSON.stringify(originalBody);
    } catch (error) {
        console.log("Error al procesar el script de reescritura: " + error);
    }

    return c;
}
