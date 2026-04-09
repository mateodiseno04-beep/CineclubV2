export default async function handler(req, res) {
  // Permisos CORS para que tu web pueda hablar con la API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { table, method, id, body } = req.body;
    const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID } = process.env;

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}${id ? `/${id}` : ''}`;

    const response = await fetch(url, {
      method: method || 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
