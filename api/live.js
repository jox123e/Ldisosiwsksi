export default function handler(req, res) {
  // Permite solicitudes desde cualquier origen (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // Responder inmediatamente a solicitudes pre-flight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Respuesta JSON estándar
  return res.status(200).json({
    status: "active",
    server_url: "https://loginbp.ppmainecoonabc.com/",
    mode: "client_override"
  });
}
