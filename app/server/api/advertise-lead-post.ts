// server/api/advertise-lead.post.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // minimal validation
    const email = String(body?.email || "").trim();
    const name = String(body?.name || "").trim();

    if (!email || !name) {
        throw createError({ statusCode: 400, statusMessage: "Missing required fields" });
    }

    // MVP: log it (replace later with DB insert)
    console.log("[advertise-lead]", {
        ts: new Date().toISOString(),
        ...body,
    });

    return { ok: true };
});
