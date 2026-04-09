export default async function handler(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return res.status(200).set(headers).end();
  }

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
    return res.status(response.status).set(headers).json(data);
  } catch (err) {
    return res.status(500).set(headers).json({ error: err.message });
  }
}
