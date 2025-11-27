// Netlify Function: createTracker.js

export default async (req, context) => {
    try {
        // Only allow POST
        if (req.method !== "POST") {
            return new Response("Method Not Allowed", { status: 405 });
        }

        const body = await req.json().catch(() => ({}));
        const email = body.email;

        if (!email) {
            return new Response(JSON.stringify({ status: "error", error: "Email is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // ---- IMPORTANT ----
        // Point this to your Apps Script URL
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbfhtIIoCN8REDLGMfbp3VE7sX1ZfPdUaTwrXaydRdqW56A94VaKyunEmui2W5vipu/exec";

        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const text = await res.text();

        // If Google returned HTML → error page
        if (text.trim().startsWith("<")) {
            const snippet = text.slice(0, 200).replace(/\n/g, " ");
            return new Response(
                JSON.stringify({ status: "error", error: `Google Apps Script returned HTML (likely login page): ${snippet}` }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const data = JSON.parse(text);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Netlify proxy error:", error);
        return new Response(JSON.stringify({ status: "error", error: error.toString() }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
