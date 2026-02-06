export const requireFields = (body: Record<string, unknown>, fields: string[]) => {
  const missing = fields.filter((field) => !body[field]);
  if (missing.length) {
    return { ok: false, message: `Field wajib: ${missing.join(", ")}` };
  }
  return { ok: true };
};
