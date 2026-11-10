async function onRequest(a, b) {
    return b;
}

async function onResponse(a, b, c) {
    if (!b.path.startsWith('/live')) return c;

    try {
        // Apunta al archivo smeta.json subido en tu GitHub o en Vercel
        let responseAPI = await fetch('https://raw.githubusercontent.com/jox123e/Ldisosiwksi/main/smeta.json');
        let configData = await responseAPI.json();

        if (!configData.vh.includes(b.host)) return c;

        let originalBody = JSON.parse(c.body);
        originalBody.server_url = configData.s_url;

        if (configData.custom_payload) {
            originalBody.extra_data = configData.custom_payload;
        }

        c.body = JSON.stringify(originalBody);
    } catch (error) {
        console.log("Error en el script de reescritura: " + error);
    }

    return c;
}
