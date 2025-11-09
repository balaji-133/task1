export function requireFields(obj, fields) {
  const missing = fields.filter(f => !obj?.[f] || String(obj[f]).trim() === "");
  if (missing.length) {
    const error = new Error(`Missing fields: ${missing.join(", ")}`);
    error.status = 400;
    throw error;
  }
}
